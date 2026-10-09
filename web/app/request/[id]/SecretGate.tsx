'use client';

import { useState, type FormEvent } from 'react';
import { openSecretPost, type SecretPost } from '../actions';
import PostBody from '../PostBody';

export default function SecretGate({ id }: { id: string }) {
  const [post, setPost] = useState<SecretPost | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await openSecretPost(id, String(new FormData(e.currentTarget).get('password') ?? ''));
    setBusy(false);
    if (res.ok) setPost(res.post);
    else setError(res.error);
  }

  if (post) {
    return (
      <>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600, letterSpacing: '-0.02em', padding: 'clamp(24px, 4vw, 40px)', paddingBottom: 0, margin: 0 }}>
          {post.title}
        </h2>
        <PostBody message={post.message} answer={post.answer} answeredAt={post.answeredAt} hasAttachment={post.hasAttachment} />
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 'clamp(32px, 6vw, 64px) clamp(24px, 4vw, 40px)', textAlign: 'center' }}>
      <p style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 600 }}>비밀글입니다</p>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)' }}>글을 쓸 때 정한 비밀번호를 입력해 주세요.</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          type="password"
          name="password"
          aria-label="비밀번호"
          autoComplete="current-password"
          required
          style={{ height: 50, width: 'min(260px, 100%)', border: '1px solid var(--line)', padding: '0 16px', fontSize: 15 }}
        />
        <button type="submit" className="btn btn-dark" style={{ height: 50 }} disabled={busy}>
          {busy ? '확인 중…' : '열람'}
        </button>
      </div>
      {error && (
        <p role="alert" style={{ margin: '16px 0 0', fontSize: 14, color: '#c0392b' }}>
          {error}
        </p>
      )}
    </form>
  );
}
