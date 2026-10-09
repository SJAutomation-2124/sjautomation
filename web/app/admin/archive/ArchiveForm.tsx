'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ARCHIVE_CATEGORIES, formatBytes, MAX_SITE_FILE_BYTES } from '@/lib/site-files';
import { createArchiveFile } from '../content-actions';
import { uploadSiteFile } from '../uploadSiteFile';

export default function ArchiveForm() {
  const router = useRouter();
  const [busy, setBusy] = useState<'' | 'upload' | 'save'>('');
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setDone('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!file) {
      setError('올릴 파일을 골라 주세요.');
      return;
    }
    try {
      setBusy('upload');
      const uploaded = await uploadSiteFile('archive', file);
      setBusy('save');
      const title = String(fd.get('title') ?? '');
      const res = await createArchiveFile({
        title,
        category: String(fd.get('category') ?? ''),
        description: String(fd.get('description') ?? ''),
        file: uploaded,
      });
      if (!res.ok) throw new Error(res.error);
      form.reset();
      setFile(null);
      setDone(`"${title}" 자료를 올렸습니다.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '올리지 못했습니다.');
    } finally {
      setBusy('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="grid grid-2" style={{ gap: 18 }}>
        <div className="field">
          <label htmlFor="ar-title">
            자료명 <span className="req">*</span>
          </label>
          <input id="ar-title" name="title" maxLength={200} required placeholder="예) SK-IV 백게이지 컨트롤러 사용 설명서" />
        </div>
        <div className="field">
          <label htmlFor="ar-category">
            분류 <span className="req">*</span>
          </label>
          <select
            id="ar-category"
            name="category"
            required
            defaultValue=""
            style={{ height: 50, border: '1px solid var(--line)', background: '#fff', padding: '0 12px', fontSize: 15, fontFamily: 'inherit' }}
          >
            <option value="" disabled>
              분류 선택
            </option>
            {ARCHIVE_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="ar-desc">
          설명 <span style={{ color: 'var(--faint)', fontWeight: 400 }}>선택 · 목록에 작게 보입니다</span>
        </label>
        <input id="ar-desc" name="description" maxLength={500} placeholder="예) 2026년 개정판, 파라미터 설정 부록 포함" />
      </div>
      <div className="field">
        <label htmlFor="ar-file">
          파일 <span className="req">*</span> <span style={{ color: 'var(--faint)', fontWeight: 400 }}>PDF · ZIP · EXE 등 · 최대 50MB</span>
        </label>
        <input
          id="ar-file"
          type="file"
          style={{ height: 'auto', padding: 14 }}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setFile(f);
            setError(f && f.size > MAX_SITE_FILE_BYTES ? `파일이 ${formatBytes(f.size)}입니다. 50MB 이하로 올려 주세요.` : '');
          }}
        />
      </div>
      {error && (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: '#c0392b' }}>
          {error}
        </p>
      )}
      {done && (
        <p role="status" style={{ margin: 0, fontSize: 14, color: '#1e7a40' }}>
          {done}
        </p>
      )}
      <div>
        <button type="submit" className="btn btn-primary" disabled={Boolean(busy)} style={{ minWidth: 160 }}>
          {busy === 'upload' ? '파일 올리는 중…' : busy === 'save' ? '저장 중…' : '자료 올리기'}
        </button>
      </div>
    </form>
  );
}
