import Link from 'next/link';
import type { Metadata } from 'next';
import { formatDate } from '@/lib/inquiry';
import { pageMeta } from '@/lib/seo';
import { ARCHIVE_CATEGORIES, fileExt, formatBytes } from '@/lib/site-files';
import { createAdminClient } from '@/lib/supabase-admin';

export const metadata: Metadata = pageMeta({
  title: '자료실',
  description: 'SJ AUTOMATION 자료실 — 기술지원 자료, 납품 장비 매뉴얼, PLC · 모션 제어 강의 자료, 소프트웨어 툴.',
  path: '/archive',
});

export const dynamic = 'force-dynamic';

type FileRow = { id: string; created_at: string; title: string; category: string; description: string | null; file_name: string; file_size: number };

export default async function ArchivePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = ARCHIVE_CATEGORIES.some((c) => c.key === category) ? category : undefined;
  const db = createAdminClient();
  const { data } = db
    ? await db.from('archive_files').select('id, created_at, title, category, description, file_name, file_size').order('created_at', { ascending: false })
    : { data: null };
  const all = (data ?? []) as FileRow[];
  const rows = active ? all.filter((r) => r.category === active) : all;

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="crumb">
              <Link href="/">HOME</Link>
              <span>/</span>
              <span className="current">ARCHIVE</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>자료실</h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640 }}>
              기술지원 자료, 장비 매뉴얼, 강의 자료, 소프트웨어 툴을 내려받으실 수 있습니다. 필요한 자료가 목록에 없으면 문의로
              요청해 주십시오.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL {all.length}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0, paddingTop: 48 }}>
        <div className="container">
          <div className="grid grid-4">
            {ARCHIVE_CATEGORIES.map((c) => {
              const on = c.key === active;
              const n = all.filter((r) => r.category === c.key).length;
              return (
                <Link
                  key={c.key}
                  href={on ? '/archive' : `/archive?category=${encodeURIComponent(c.key)}`}
                  className="card link-card"
                  aria-current={on ? 'true' : undefined}
                  style={{ padding: '24px 24px 26px', background: on ? 'var(--accent)' : '#fff', borderColor: on ? 'var(--accent)' : undefined }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: on ? '#fff' : 'var(--ink)' }}>{c.title}</h3>
                    <span className="mono" style={{ fontSize: 12, color: on ? '#c5d6f2' : 'var(--faint)' }}>
                      {n}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: on ? '#c5d6f2' : 'var(--muted)' }}>{c.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="card" style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}>
                {active ? ARCHIVE_CATEGORIES.find((c) => c.key === active)?.title : '전체 자료'}
              </h2>
              {active && (
                <Link href="/archive" style={{ fontSize: 14 }}>
                  전체 보기
                </Link>
              )}
            </div>

            <div className="file-row file-head mono">
              <span>NO</span>
              <span>분류</span>
              <span>자료명</span>
              <span>형식</span>
              <span>용량</span>
              <span>등록일</span>
              <span>받기</span>
            </div>
            {rows.length === 0 ? (
              <p style={{ padding: '48px 0', textAlign: 'center', fontSize: 15, color: 'var(--faint)', margin: 0, borderBottom: '1px solid var(--line-soft)' }}>
                {active ? '이 분류에는 아직 자료가 없습니다.' : '등록된 자료가 아직 없습니다.'}
              </p>
            ) : (
              rows.map((r, i) => (
                <div key={r.id} className="file-row">
                  <span className="mono file-no">{rows.length - i}</span>
                  <span>
                    <span className="badge badge-muted">{r.category}</span>
                  </span>
                  <span className="file-title">
                    {r.title}
                    {r.description && <span className="file-desc">{r.description}</span>}
                  </span>
                  <span className="mono file-meta">{fileExt(r.file_name)}</span>
                  <span className="mono file-meta">{formatBytes(r.file_size)}</span>
                  <span className="mono file-meta">{formatDate(r.created_at)}</span>
                  <span>
                    <a href={`/archive/download/${r.id}`} className="file-get" rel="nofollow">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true">
                        <path d="M12 4v12M7 11l5 5 5-5M4 20h16" />
                      </svg>
                      받기
                    </a>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              background: 'var(--ink)',
              padding: 'clamp(28px, 5vw, 44px)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>찾으시는 자료가 없나요?</h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--dark-body)', maxWidth: 620 }}>
                납품받으신 장비의 도면이나 파라미터 설정값이 필요하시면 문의로 알려주십시오. 확인 후 보내드립니다.
              </p>
            </div>
            <Link href="/request/new" className="btn btn-on-dark" style={{ width: 220, flexShrink: 0 }}>
              자료 요청하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
