import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatDate } from '@/lib/inquiry';
import { pageMeta } from '@/lib/seo';
import { formatBytes, IMAGE_EXT, SITE_FILES_BUCKET } from '@/lib/site-files';
import { createAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

type Notice = {
  id: string;
  created_at: string;
  title: string;
  body: string;
  pinned: boolean;
  views: number;
  attachment_path: string | null;
  attachment_name: string | null;
  attachment_size: number | null;
};

async function getNotice(id: string) {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const db = createAdminClient();
  if (!db) return null;
  const { data } = await db
    .from('notices')
    .select('id, created_at, title, body, pinned, views, attachment_path, attachment_name, attachment_size')
    .eq('id', id)
    .maybeSingle();
  return data as Notice | null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const n = await getNotice((await params).id);
  if (!n) return { title: '공지사항' };
  const description = n.body.replace(/\s+/g, ' ').trim().slice(0, 140) || `SJ AUTOMATION 공지 — ${n.title}`;
  return pageMeta({ title: n.title, description, path: `/notice/${n.id}` });
}

export default async function NoticePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = await getNotice(id);
  if (!n) notFound();
  const db = createAdminClient()!;

  await db.rpc('bump_notice_views', { nid: n.id });

  const [{ data: older }, { data: newer }] = await Promise.all([
    db.from('notices').select('id, title, created_at').lt('created_at', n.created_at).order('created_at', { ascending: false }).limit(1).maybeSingle(),
    db.from('notices').select('id, title, created_at').gt('created_at', n.created_at).order('created_at', { ascending: true }).limit(1).maybeSingle(),
  ]);

  // 첨부가 사진이면 본문에 보여주기 위해 1시간짜리 링크를 만듭니다(저장소는 비공개).
  let imageUrl: string | null = null;
  if (n.attachment_path && n.attachment_name && IMAGE_EXT.test(n.attachment_name)) {
    const { data } = await db.storage.from(SITE_FILES_BUCKET).createSignedUrl(n.attachment_path, 60 * 60);
    imageUrl = data?.signedUrl ?? null;
  }

  const sibling = (label: string, s: { id: string; title: string; created_at: string } | null) => (
    <div className="notice-sib">
      <span className="mono notice-sib-label">{label}</span>
      {s ? (
        <Link href={`/notice/${s.id}`} className="notice-sib-title">
          {s.title}
        </Link>
      ) : (
        <span className="notice-sib-title" style={{ color: 'var(--faint)' }}>
          {label === '이전 글' ? '이전 글이 없습니다.' : '다음 글이 없습니다.'}
        </span>
      )}
      <span className="mono notice-sib-date">{s ? formatDate(s.created_at) : ''}</span>
    </div>
  );

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <Link href="/notice">NOTICE</Link>
            <span>/</span>
            <span className="current">VIEW</span>
          </div>

          <article className="card">
            <header style={{ padding: 'clamp(24px, 4vw, 44px) clamp(20px, 4vw, 48px) 28px', borderBottom: '1px solid var(--line)' }}>
              {n.pinned && (
                <span className="badge" style={{ background: 'var(--accent)', color: '#fff', marginBottom: 18 }}>
                  공지
                </span>
              )}
              <h1 style={{ fontSize: 'clamp(24px, 3.6vw, 34px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.4, margin: '0 0 18px', wordBreak: 'break-word' }}>
                {n.title}
              </h1>
              <div className="mono" style={{ display: 'flex', gap: 22, fontSize: 13, color: 'var(--faint)', flexWrap: 'wrap' }}>
                <span>{formatDate(n.created_at)}</span>
                <span>조회 {n.views + 1}</span>
                <span>관리자</span>
              </div>
            </header>

            <div style={{ padding: 'clamp(24px, 4vw, 44px) clamp(20px, 4vw, 48px)' }}>
              {n.body && (
                <div style={{ fontSize: 16, lineHeight: 2, color: 'var(--body)', maxWidth: 860, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{n.body}</div>
              )}
              {imageUrl && (
                <div className="photo-frame" style={{ maxWidth: 860, marginTop: n.body ? 32 : 0 }}>
                  {/* 서명 링크는 매번 바뀌어 이미지 최적화 캐시를 쓰지 않습니다 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt={n.attachment_name ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
            </div>

            {n.attachment_path && (
              <div style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 44px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#fafbfc', border: '1px solid var(--line-soft)', flexWrap: 'wrap' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true">
                    <path d="M20 11l-8 8a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" />
                  </svg>
                  <span style={{ fontSize: 14, flex: '1 1 200px', minWidth: 0, wordBreak: 'break-all' }}>{n.attachment_name}</span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
                    {formatBytes(n.attachment_size)}
                  </span>
                  <a href={`/notice/${n.id}/download`} className="file-get" rel="nofollow">
                    다운로드
                  </a>
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--line)' }}>
              {sibling('이전 글', older)}
              {sibling('다음 글', newer)}
            </div>
          </article>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <Link href="/notice" className="btn btn-dark">
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
