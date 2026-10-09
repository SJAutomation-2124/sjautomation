import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatDate, maskName } from '@/lib/inquiry';
import { createAdminClient } from '@/lib/supabase-admin';
import { LockIcon, StatusBadge } from '../Board';
import PostBody from '../PostBody';
import SecretGate from './SecretGate';

export const dynamic = 'force-dynamic';

// 문의 글은 검색엔진에 노출하지 않습니다.
export const metadata: Metadata = { title: '문의 게시판', robots: { index: false, follow: false } };

async function getPost(id: string) {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin
    .from('inquiries')
    .select('id, created_at, title, name, is_secret, status, message, answer, answered_at, attachment_path')
    .eq('id', id)
    .maybeSingle();
  return data;
}

export default async function InquiryPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <Link href="/request">CONTACT</Link>
            <span>/</span>
            <span className="current">VIEW</span>
          </div>

          <article className="card">
            <header style={{ padding: 'clamp(24px, 4vw, 40px)', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <StatusBadge status={post.status} />
                {post.is_secret && (
                  <span className="badge badge-muted" style={{ gap: 6 }}>
                    <LockIcon />
                    비밀글
                  </span>
                )}
              </div>
              {!post.is_secret && (
                <h1 style={{ fontSize: 'clamp(22px, 3.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.45, margin: '0 0 16px' }}>
                  {post.title}
                </h1>
              )}
              <div className="mono" style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--faint)', flexWrap: 'wrap' }}>
                <span>작성자 {maskName(post.name)}</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
            </header>

            {post.is_secret ? (
              <SecretGate id={post.id} />
            ) : (
              <PostBody
                message={post.message}
                answer={post.answer}
                answeredAt={post.answered_at}
                hasAttachment={Boolean(post.attachment_path)}
              />
            )}
          </article>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <Link href="/request" className="btn btn-dark">
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
