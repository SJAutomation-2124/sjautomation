import Link from 'next/link';
import type { Metadata } from 'next';
import ColumnList, { type ColumnItem } from '@/components/ColumnList';
import { formatDate } from '@/lib/inquiry';
import { COLUMN_TOPICS, postExcerpt, postImagePaths, postImageUrl, type PostType } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';
import { createAdminClient } from '@/lib/supabase-admin';

export const metadata: Metadata = pageMeta({
  title: '공지 · 칼럼',
  description: '에스제이모션 공지 · 칼럼 — 휴무 · 설비 안내 같은 공지와, 대표 엔지니어가 쓰는 제어 · 자동화 기술 칼럼과 현장 이야기.',
  path: '/notice',
});

export const dynamic = 'force-dynamic';

const TABS: { type?: PostType; label: string }[] = [{ label: '전체' }, { type: 'notice', label: '공지' }, { type: 'column', label: '칼럼' }];

type Search = { type?: string; topic?: string; page?: string };

const listHref = ({ type, topic, page }: { type?: string; topic?: string; page?: number }) => {
  const q = new URLSearchParams();
  if (type) q.set('type', type);
  if (topic) q.set('topic', topic);
  if (page && page > 1) q.set('page', String(page));
  const s = q.toString();
  return s ? `/notice?${s}` : '/notice';
};

export default async function NoticePage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const type: PostType | undefined = sp.type === 'notice' || sp.type === 'column' ? sp.type : undefined;
  const topic = type === 'column' ? COLUMN_TOPICS.find((t) => t === sp.topic) : undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const pageSize = type === 'column' ? 9 : 10;
  const from = (page - 1) * pageSize;
  const db = createAdminClient();

  const [counts, columnTopics, list] = db
    ? await Promise.all([
        Promise.all([
          db.from('notices').select('id', { count: 'exact', head: true }),
          db.from('notices').select('id', { count: 'exact', head: true }).eq('category', 'notice'),
          db.from('notices').select('id', { count: 'exact', head: true }).eq('category', 'column'),
        ]).then((r) => r.map((x) => x.count ?? 0)),
        type === 'column' ? db.from('notices').select('topic').eq('category', 'column').then((r) => (r.data ?? []).map((x) => x.topic as string | null)) : [],
        (() => {
          let q = db.from('notices').select('id, created_at, category, topic, title, pinned, views, attachment_name, body', { count: 'exact' });
          if (type) q = q.eq('category', type);
          if (topic) q = q.eq('topic', topic);
          if (type !== 'column') q = q.order('pinned', { ascending: false });
          return q.order('created_at', { ascending: false }).range(from, from + pageSize - 1);
        })(),
      ])
    : [[0, 0, 0], [], { data: null, count: 0 }];
  const tabCount = { all: counts[0], notice: counts[1], column: counts[2] };
  const rows = list.data ?? [];
  const total = list.count ?? 0;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const cards: ColumnItem[] = rows.map((r) => {
    const cover = postImagePaths(r.body)[0];
    return { id: r.id, created_at: r.created_at, title: r.title, topic: r.topic, views: r.views, excerpt: postExcerpt(r.body, 160), cover: cover ? postImageUrl(cover) : null };
  });

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="crumb">
              <Link href="/">HOME</Link>
              <span>/</span>
              <span className="current">NOTICE · COLUMN</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>공지 · 칼럼</h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640 }}>
              휴무 · 설비 안내 같은 공지와 함께, 현장에서 쌓은 제어 · 자동화 이야기를 대표 엔지니어가 칼럼으로 씁니다.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL {tabCount.all}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40, paddingBottom: 0 }}>
        <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <Link key={t.label} href={listHref({ type: t.type })} className={`pill${type === t.type ? ' is-on' : ''}`} aria-current={type === t.type ? 'page' : undefined}>
              {t.label} <span className="mono">{tabCount[t.type ?? 'all']}</span>
            </Link>
          ))}
        </div>
        {type === 'column' && (
          <div className="container" style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 18 }}>
            {[undefined, ...COLUMN_TOPICS].map((t) => (
              <Link key={t ?? 'all'} href={listHref({ type: 'column', topic: t })} className={`subtab${topic === t ? ' is-on' : ''}`}>
                {t ?? '모든 칼럼'} <span className="mono">{t ? columnTopics.filter((x) => x === t).length : tabCount.column}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          {type === 'column' ? (
            cards.length === 0 ? (
              <p className="card" style={{ padding: '56px 0', textAlign: 'center', fontSize: 15, color: 'var(--faint)', margin: 0 }}>
                아직 등록된 칼럼이 없습니다.
              </p>
            ) : (
              <ColumnList items={cards} />
            )
          ) : (
            <div className="card" style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
              <div className="notice-row notice-head mono">
                <span>NO</span>
                <span>제목</span>
                <span>작성일</span>
                <span>조회</span>
              </div>
              {rows.length === 0 ? (
                <p style={{ padding: '56px 0', textAlign: 'center', fontSize: 15, color: 'var(--faint)', margin: 0, borderBottom: '1px solid var(--line-soft)' }}>
                  등록된 글이 아직 없습니다.
                </p>
              ) : (
                rows.map((r, i) => (
                  <Link key={r.id} href={`/notice/${r.id}`} className="notice-row board-link">
                    <span className="notice-no">
                      {r.pinned ? <span className="badge" style={{ background: 'var(--accent)', color: '#fff' }}>공지</span> : <span className="mono">{total - from - i}</span>}
                    </span>
                    <span className="notice-title" style={{ fontWeight: r.pinned ? 600 : 400 }}>
                      {r.category === 'column' && (
                        <span className="mono" style={{ marginRight: 10, fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>
                          칼럼{r.topic ? ` · ${r.topic}` : ''}
                        </span>
                      )}
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
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="글 목록 페이지" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={listHref({ type, topic, page: p })}
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
      </section>
    </main>
  );
}
