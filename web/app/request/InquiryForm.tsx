'use client';

import { useRef, useState, type FormEvent } from 'react';
import { createAttachmentUpload, submitInquiry } from './actions';
import { INQUIRY_BUCKET, INQUIRY_TYPES, MAX_ATTACHMENT_BYTES } from '@/lib/inquiry';

type Status = 'idle' | 'uploading' | 'sending' | 'done';

const formatSize = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)}MB` : `${Math.max(1, Math.round(b / 1024))}KB`);

export default function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const busy = status === 'uploading' || status === 'sending';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError('');
    const fd = new FormData(e.currentTarget);
    const types = fd.getAll('type').map(String);
    if (types.length === 0) {
      setError('문의 분야를 하나 이상 선택해 주세요.');
      return;
    }
    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setError('첨부파일은 20MB까지 올릴 수 있습니다.');
      return;
    }

    try {
      let attachmentPath: string | undefined;
      if (file) {
        setStatus('uploading');
        const slot = await createAttachmentUpload(file.name, file.size);
        if (!slot.ok) throw new Error(slot.error);
        const { createBrowserClient } = await import('@/lib/supabase');
        const { error: upErr } = await createBrowserClient()
          .storage.from(INQUIRY_BUCKET)
          .uploadToSignedUrl(slot.path, slot.token, file, { contentType: file.type || 'application/octet-stream' });
        if (upErr) throw new Error('첨부파일을 올리지 못했습니다. 파일을 빼고 보내시거나 잠시 후 다시 시도해 주세요.');
        attachmentPath = slot.path;
      }

      setStatus('sending');
      const res = await submitInquiry({
        company: String(fd.get('company') ?? ''),
        name: String(fd.get('name') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        email: String(fd.get('email') ?? ''),
        message: String(fd.get('message') ?? ''),
        types,
        consent: fd.get('consent') === 'on',
        website: String(fd.get('website') ?? ''),
        attachmentPath,
        attachmentName: file?.name,
      });
      if (!res.ok) throw new Error(res.error);
      setStatus('done');
      formRef.current?.reset();
      setFile(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : '접수 중 문제가 생겼습니다. 전화로 문의해 주세요.');
    }
  }

  if (status === 'done') {
    return (
      <div className="card" style={{ padding: '56px 40px 60px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 16 }}>
          RECEIVED
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 14 }}>문의가 접수되었습니다</h2>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 32, maxWidth: 520 }}>
          담당자가 내용을 확인한 뒤 영업일 기준 1일 이내에 남겨주신 연락처로 회신드리겠습니다. 급한 건은 전화 주시면 더
          빠릅니다.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="card" style={{ padding: '40px 40px 44px' }} onSubmit={handleSubmit}>
      <div style={{ padding: '14px 18px', background: 'var(--accent-soft)', marginBottom: 36 }}>
        <span style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.6 }}>
          이 문의는 <strong style={{ fontWeight: 600 }}>공개되지 않습니다.</strong> 담당자만 확인하며, 접수 즉시 메일로
          알림이 갑니다.
        </span>
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          홈페이지 <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset disabled={busy} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <div className="grid grid-2" style={{ marginBottom: 20 }}>
          <div className="field">
            <label htmlFor="iq-company">
              회사명 <span className="req">*</span>
            </label>
            <input id="iq-company" type="text" name="company" placeholder="(주)○○○" maxLength={100} required />
          </div>
          <div className="field">
            <label htmlFor="iq-name">
              담당자명 <span className="req">*</span>
            </label>
            <input id="iq-name" type="text" name="name" placeholder="홍길동" maxLength={50} required />
          </div>
        </div>

        <div className="grid grid-2" style={{ marginBottom: 32 }}>
          <div className="field">
            <label htmlFor="iq-phone">
              연락처 <span className="req">*</span>
            </label>
            <input id="iq-phone" type="tel" name="phone" className="mono" placeholder="010-0000-0000" maxLength={30} required />
          </div>
          <div className="field">
            <label htmlFor="iq-email">
              이메일 <span className="req">*</span>
            </label>
            <input
              id="iq-email"
              type="email"
              name="email"
              className="mono"
              placeholder="name@company.co.kr"
              maxLength={120}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            문의 분야 <span className="req">*</span>{' '}
            <span style={{ color: 'var(--faint)', fontWeight: 400 }}>중복 선택 가능</span>
          </span>
          <div className="grid grid-2">
            {INQUIRY_TYPES.map((type) => (
              <label
                key={type}
                className="checkline"
                style={{ height: 52, padding: '0 18px', border: '1px solid var(--line)', background: '#fff' }}
              >
                <input type="checkbox" name="type" value={type} />
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field" style={{ marginBottom: 24 }}>
          <label htmlFor="iq-message">
            문의 내용 <span className="req">*</span>
          </label>
          <textarea
            id="iq-message"
            name="message"
            maxLength={5000}
            placeholder="만들고 싶은 장비나 해결하려는 문제, 현장 조건(설치 공간, 전원, 기존 설비), 희망 일정을 적어주시면 더 정확한 답변을 드릴 수 있습니다."
            required
          />
        </div>

        <div className="field" style={{ marginBottom: 28 }}>
          <label htmlFor="iq-file">
            첨부파일 <span style={{ color: 'var(--faint)', fontWeight: 400 }}>도면, 사진, 사양서 · 최대 20MB</span>
          </label>
          <input
            id="iq-file"
            type="file"
            style={{ height: 'auto', padding: 16 }}
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              setError(f && f.size > MAX_ATTACHMENT_BYTES ? `첨부파일이 ${formatSize(f.size)}입니다. 20MB 이하로 올려주세요.` : '');
            }}
          />
          {file && (
            <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
              {file.name} · {formatSize(file.size)}
            </span>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 18, marginBottom: 28 }}>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.8,
              color: 'var(--muted)',
              background: '#fafbfc',
              border: '1px solid var(--line-soft)',
              padding: '14px 16px',
              marginBottom: 14,
            }}
          >
            <strong style={{ fontWeight: 600, color: 'var(--body)' }}>개인정보 수집 · 이용 안내</strong>
            <br />
            수집 항목: 회사명, 담당자명, 연락처, 이메일, 문의 내용, 첨부파일
            <br />
            이용 목적: 견적 · 제작 문의에 대한 상담과 회신
            <br />
            보유 기간: 문의 처리 완료 후 3년간 보관 후 파기
            <br />
            동의를 거부할 수 있으며, 이 경우 온라인 문의 접수가 제한됩니다. 전화나 이메일로는 계속 문의하실 수 있습니다.
          </div>
          <label className="checkline">
            <input type="checkbox" name="consent" required />
            <span>위 개인정보 수집 및 이용에 동의합니다.</span>
          </label>
        </div>
      </fieldset>

      {error && (
        <p role="alert" style={{ margin: '0 0 18px', fontSize: 14, color: '#c0392b' }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-primary" style={{ width: 220 }} disabled={busy}>
          {status === 'uploading' ? '첨부파일 올리는 중…' : status === 'sending' ? '보내는 중…' : '문의 보내기'}
        </button>
        <span style={{ fontSize: 13, color: 'var(--faint)' }}>영업일 기준 1일 이내에 회신드립니다.</span>
      </div>
    </form>
  );
}
