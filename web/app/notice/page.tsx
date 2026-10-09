import Link from 'next/link';
import type { Metadata } from 'next';
import { formatDate } from '@/lib/inquiry';
import { pageMeta } from '@/lib/seo';
import { createAdminClient } from '@/lib/supabase-admin';

export const metadata: Metadata = pageMeta({
  title: '공지사항',
  description: 'SJ AUTOMATION 공지사항 — 휴무 안내, 설비 도입, 인증 취득 등 거래처에 알려드리는 소식.',
  path: '/notice',
});

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function NoticePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Number.parseInt((await searchParams).page ?? '1', 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const db = createAdminClient();
  const { data, count } = db
    ? await db
        .from('notices')
        .select('id, created_at, title, pinned, views, attachment_name', { count: 'exact' })
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, from + PAGE_SIZE - 1)
    : { data: null, count: 0 };
  const rows = data ?? [];
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="crumb">
              <Link href="/">HOME</Link>
              <span>/</span>
              <span className="current">NOTICE</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>공지사항</h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640 }}>
              휴무 안내, 설비 도입, 인증 취득처럼 거래처가 알아야 할 소식을 올립니다.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL {total}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="card" style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
            <div className="notice-row notice-head mono">
              <span>NO</span>
              <span>제목</span>
              <span>작성일</span>
              <span>조회</span>
            </div>
            {rows.length === 0 ? (
              <p style={{ padding: '56px 0', textAlign: 'center', fontSize: 15, color: 'var(--faint)', margin: 0, borderBottom: '1px solid var(--line-soft)' }}>
                등록된 공지가 아직 없습니다.
              </p>
            ) : (
              rows.map((r, i) => (
                <Link key={r.id} href={`/notice/${r.id}`} className="notice-row board-link">
                  <span className="notice-no">
                    {r.pinned ? <span className="badge" style={{ background: 'var(--accent)', color: '#fff' }}>공지</span> : <span className="mono">{total - from - i}</span>}
                  </span>
                  <span className="notice-title" style={{ fontWeight: r.pinned ? 600 : 400 }}>
                    {r.title}
                    {r.attachment_name && (
                      <span className="mono" style={{ marginLeft: 8, padding: '1px 6px', border: '1px solid var(--line)', fontSize: 10, color: 'var(--faint)', fontWeight: 400 }}>
                        첨부
                      </span>
                    )}
                  </span>
                  <span className="mono notice-meta">{formatDate(r.created_at)}</span>
                  <span className="mono notice-meta">{r.views}</span>
                </Link>
              ))
            )}

            {pages > 1 && (
              <nav aria-label="공지사항 페이지" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/notice?page=${p}`}
                    className="mono"
                    aria-current={p === page ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      fontSize: 13,
                      background: p === page ? 'var(--ink)' : '#fff',
                      color: p === page ? '#fff' : 'var(--ink)',
                      border: p === page ? '1px solid var(--ink)' : '1px solid var(--line)',
                    }}
                  >
                    {p}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
