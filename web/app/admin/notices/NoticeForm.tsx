'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { formatBytes, MAX_SITE_FILE_BYTES } from '@/lib/site-files';
import { saveNotice } from '../content-actions';
import { uploadSiteFile } from '../uploadSiteFile';

type Initial = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  attachment_name: string | null;
  attachment_size: number | null;
};

export default function NoticeForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [busy, setBusy] = useState<'' | 'upload' | 'save'>('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [removeFile, setRemoveFile] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      let attachment = null;
      if (file) {
        setBusy('upload');
        attachment = await uploadSiteFile('notices', file);
      }
      setBusy('save');
      const res = await saveNotice({
        id: initial?.id,
        title: String(fd.get('title') ?? ''),
        body: String(fd.get('body') ?? ''),
        pinned: fd.get('pinned') === 'on',
        attachment,
        removeAttachment: removeFile,
      });
      if (!res.ok) throw new Error(res.error);
      if (initial) {
        router.push('/admin/notices');
      } else {
        form.reset();
        setFile(null);
        setBusy('');
      }
      router.refresh();
    } catch (err) {
      setBusy('');
      setError(err instanceof Error ? err.message : '저장하지 못했습니다.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="field">
        <label htmlFor="nt-title">
          제목 <span className="req">*</span>
        </label>
        <input id="nt-title" name="title" defaultValue={initial?.title} maxLength={200} required placeholder="예) 추석 연휴 휴무 안내" />
      </div>
      <div className="field">
        <label htmlFor="nt-body">내용</label>
        <textarea id="nt-body" name="body" defaultValue={initial?.body} maxLength={20000} style={{ height: 260 }} placeholder="줄바꿈은 그대로 보입니다." />
      </div>
      <label className="checkline">
        <input type="checkbox" name="pinned" defaultChecked={initial?.pinned} />
        <span>목록 맨 위에 고정 (중요 공지)</span>
      </label>
      <div className="field">
        <label htmlFor="nt-file">
          첨부파일 <span style={{ color: 'var(--faint)', fontWeight: 400 }}>사진(JPG · PNG · WEBP)은 본문에 바로 보입니다 · 최대 50MB</span>
        </label>
        {initial?.attachment_name && !file && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--muted)', flexWrap: 'wrap' }}>
            <span>
              현재: {initial.attachment_name} ({formatBytes(initial.attachment_size)})
            </span>
            <label className="checkline" style={{ fontSize: 13 }}>
              <input type="checkbox" checked={removeFile} onChange={(e) => setRemoveFile(e.target.checked)} />
              <span>첨부 삭제</span>
            </label>
          </div>
        )}
        <input
          id="nt-file"
          type="file"
          style={{ height: 'auto', padding: 14 }}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setFile(f);
            setError(f && f.size > MAX_SITE_FILE_BYTES ? '파일은 50MB까지 올릴 수 있습니다.' : '');
          }}
        />
        {initial?.attachment_name && file && <span style={{ fontSize: 12, color: 'var(--faint)' }}>저장하면 기존 첨부가 새 파일로 바뀝니다.</span>}
      </div>
      {error && (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: '#c0392b' }}>
          {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-primary" disabled={Boolean(busy)} style={{ minWidth: 160 }}>
          {busy === 'upload' ? '파일 올리는 중…' : busy === 'save' ? '저장 중…' : initial ? '수정 저장' : '공지 등록'}
        </button>
        {initial && (
          <button type="button" className="btn btn-outline" onClick={() => router.push('/admin/notices')} disabled={Boolean(busy)}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}
