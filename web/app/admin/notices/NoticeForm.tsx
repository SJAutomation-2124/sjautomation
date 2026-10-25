'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import PostBody from '@/components/PostBody';
import { COLUMN_TOPICS, MAX_POST_BODY, POST_TYPES, type PostType } from '@/lib/posts';
import { formatBytes, MAX_SITE_FILE_BYTES } from '@/lib/site-files';
import { saveNotice } from '../content-actions';
import { uploadSiteFile } from '../uploadSiteFile';
import { uploadPostImage } from './postImage';

type Initial = {
  id: string;
  category: string;
  topic: string | null;
  title: string;
  body: string;
  pinned: boolean;
  attachment_name: string | null;
  attachment_size: number | null;
};

type Edit = { value: string; selStart: number; selEnd: number };

export default function NoticeForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [busy, setBusy] = useState<'' | 'upload' | 'save'>('');
  const [imageBusy, setImageBusy] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [removeFile, setRemoveFile] = useState(false);
  const [category, setCategory] = useState<PostType>(initial?.category === 'column' ? 'column' : 'notice');
  const [body, setBody] = useState(initial?.body ?? '');
  const [preview, setPreview] = useState(false);
  const isColumn = category === 'column';
  const locked = Boolean(busy) || Boolean(imageBusy);

  // 본문 글상자의 커서 자리를 고치고, 고친 뒤 커서(선택 범위)를 다시 놓습니다
  function edit(change: (value: string, start: number, end: number) => Edit) {
    const ta = bodyRef.current;
    if (!ta) return;
    const next = change(ta.value, ta.selectionStart, ta.selectionEnd);
    setBody(next.value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(next.selStart, next.selEnd);
    });
  }

  // 커서가 있는 줄을 소제목으로 (이미 소제목이면 되돌림)
  const toggleHeading = () =>
    edit((v, s) => {
      const lineStart = s === 0 ? 0 : v.lastIndexOf('\n', s - 1) + 1;
      if (v.startsWith('## ', lineStart)) {
        const pos = Math.max(lineStart, s - 3);
        return { value: v.slice(0, lineStart) + v.slice(lineStart + 3), selStart: pos, selEnd: pos };
      }
      return { value: `${v.slice(0, lineStart)}## ${v.slice(lineStart)}`, selStart: s + 3, selEnd: s + 3 };
    });

  const makeBold = () =>
    edit((v, s, e) => {
      const text = v.slice(s, e) || '굵게 할 글자';
      return { value: `${v.slice(0, s)}**${text}**${v.slice(e)}`, selStart: s + 2, selEnd: s + 2 + text.length };
    });

  // 사진 줄은 항상 한 줄을 통째로 씁니다
  const insertLines = (lines: string) =>
    edit((v, s, e) => {
      const before = v.slice(0, s);
      const after = v.slice(e);
      const head = before && !before.endsWith('\n') ? '\n' : '';
      const tail = after.startsWith('\n') ? '' : '\n';
      const pos = (before + head + lines + tail).length;
      return { value: before + head + lines + tail + after, selStart: pos, selEnd: pos };
    });

  async function addImages(files: File[]) {
    if (!files.length) return;
    setError('');
    const lines: string[] = [];
    try {
      for (const [i, f] of files.entries()) {
        setImageBusy(files.length > 1 ? `사진 올리는 중… ${i + 1}/${files.length}` : '사진 올리는 중…');
        lines.push(`![](${await uploadPostImage(f)})`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '사진을 올리지 못했습니다.');
    } finally {
      if (lines.length) insertLines(lines.join('\n'));
      setImageBusy('');
    }
  }

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
        category,
        topic: isColumn ? String(fd.get('topic') ?? '') : null,
        title: String(fd.get('title') ?? ''),
        body,
        pinned: !isColumn && fd.get('pinned') === 'on',
        attachment,
        removeAttachment: removeFile,
      });
      if (!res.ok) throw new Error(res.error);
      if (initial) {
        router.push('/admin/notices');
      } else {
        form.reset();
        setBody('');
        setFile(null);
        setPreview(false);
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
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="field">
          <span className="field-label">분류</span>
          <div className="seg" role="radiogroup" aria-label="분류">
            {POST_TYPES.map((t) => (
              <label key={t.key} className={`seg-opt${category === t.key ? ' is-on' : ''}`}>
                <input type="radio" name="category" value={t.key} checked={category === t.key} onChange={() => setCategory(t.key)} />
                {t.label}
              </label>
            ))}
          </div>
        </div>
        {isColumn && (
          <div className="field" style={{ flex: '0 1 220px' }}>
            <label htmlFor="nt-topic">
              칼럼 분류 <span className="req">*</span>
            </label>
            <select id="nt-topic" name="topic" required defaultValue={initial?.topic ?? ''} className="select">
              <option value="" disabled>
                분류 선택
              </option>
              {COLUMN_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="nt-title">
          제목 <span className="req">*</span>
        </label>
        <input
          id="nt-title"
          name="title"
          defaultValue={initial?.title}
          maxLength={200}
          required
          placeholder={isColumn ? '예) PID 튜닝, 현장에서는 왜 교과서대로 안 될까' : '예) 추석 연휴 휴무 안내'}
        />
      </div>

      <div className="field">
        <label htmlFor="nt-body">내용</label>
        <div className="post-tools">
          <button type="button" onClick={toggleHeading} disabled={preview || locked}>
            소제목
          </button>
          <button type="button" onClick={makeBold} disabled={preview || locked} style={{ fontWeight: 700 }}>
            굵게
          </button>
          <label className={`post-tool${preview || locked ? ' is-off' : ''}`}>
            {imageBusy || '사진 넣기'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              hidden
              disabled={preview || locked}
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = '';
                void addImages(files);
              }}
            />
          </label>
          <button type="button" className="post-tool-preview" onClick={() => setPreview((p) => !p)} aria-pressed={preview} disabled={locked}>
            {preview ? '다시 쓰기' : '미리보기'}
          </button>
        </div>
        <textarea
          ref={bodyRef}
          id="nt-body"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_POST_BODY}
          hidden={preview}
          style={{ height: isColumn ? 480 : 260 }}
          placeholder="줄바꿈은 그대로 보입니다. 빈 줄로 문단을 나눕니다."
        />
        {preview && (
          <div className="post-preview">{body.trim() ? <PostBody body={body} title="" /> : <p style={{ margin: 0, color: 'var(--faint)' }}>내용이 없습니다.</p>}</div>
        )}
        <p className="field-hint">
          &apos;## &apos;로 시작하는 줄은 소제목, **글자**는 굵게 보입니다. 사진 줄의 [ ] 안에 글을 쓰면 사진 아래 설명으로 나옵니다. 사진은
          올릴 때 크기를 줄이고 촬영 위치 같은 정보를 지웁니다.
        </p>
      </div>

      {!isColumn && (
        <label className="checkline">
          <input type="checkbox" name="pinned" defaultChecked={initial?.pinned} />
          <span>목록 맨 위에 고정 (중요 공지)</span>
        </label>
      )}

      <div className="field">
        <label htmlFor="nt-file">
          첨부파일 <span style={{ color: 'var(--faint)', fontWeight: 400 }}>내려받을 파일(PDF 등) · 최대 50MB · 본문 사진은 위 &apos;사진 넣기&apos;로</span>
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
        <button type="submit" className="btn btn-primary" disabled={locked} style={{ minWidth: 160 }}>
          {busy === 'upload' ? '파일 올리는 중…' : busy === 'save' ? '저장 중…' : initial ? '수정 저장' : isColumn ? '칼럼 등록' : '공지 등록'}
        </button>
        {initial && (
          <button type="button" className="btn btn-outline" onClick={() => router.push('/admin/notices')} disabled={locked}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}
