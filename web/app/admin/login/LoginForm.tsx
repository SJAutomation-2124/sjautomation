'use client';

import { createBrowserClient as createSsrBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const supabase = createSsrBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: String(fd.get('email') ?? '').trim(),
      password: String(fd.get('password') ?? ''),
    });
    if (err) {
      setBusy(false);
      setError('이메일 또는 비밀번호가 맞지 않습니다.');
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'clamp(28px, 5vw, 44px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="field">
        <label htmlFor="ad-email">이메일</label>
        <input id="ad-email" type="email" name="email" autoComplete="username" required />
      </div>
      <div className="field">
        <label htmlFor="ad-password">비밀번호</label>
        <input id="ad-password" type="password" name="password" autoComplete="current-password" required />
      </div>
      {error && (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: '#c0392b' }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
        {busy ? '로그인 중…' : '로그인'}
      </button>
    </form>
  );
}
