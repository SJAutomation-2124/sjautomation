import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { WORKS, WORK_CATEGORIES, hasVideo } from '@/lib/works';

export const metadata: Metadata = { title: '실적사례' };

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category ? WORKS.filter((w) => w.category === category) : WORKS;

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="crumb">
              <Link href="/">HOME</Link>
              <span>/</span>
              <span className="current">WORKS</span>
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>실적사례</h1>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', maxWidth: 620 }}>
              제작한 장비와 개발한 제어 · 소프트웨어 실적입니다. 비슷한 사례를 찾으셨다면 그 페이지에서 바로
              문의하실 수 있습니다.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL {WORKS.length}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <FilterPill href="/works" label={`전체 ${WORKS.length}`} active={!category} />
          {WORK_CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              href={`/works?category=${encodeURIComponent(c)}`}
              label={`${c} ${WORKS.filter((w) => w.category === c).length}`}
              active={category === c}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {filtered.map((work) => (
              <Link href={`/works/${work.slug}`} className="card link-card" key={work.slug} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 230 }}>
                  <Image
                    src={work.img}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 400px"
                    style={{ objectFit: 'cover', objectPosition: work.imgPosition }}
                  />
                  {hasVideo(work) && (
                    <span
                      className="mono"
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        height: 26,
                        padding: '0 10px',
                        background: 'rgba(14, 19, 25, 0.82)',
                        color: '#fff',
                        fontSize: 11,
                        letterSpacing: '0.08em',
                      }}
                    >
                      <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                        <path d="M0 0l9 5-9 5z" fill="currentColor" />
                      </svg>
                      VIDEO
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <span className="tag mono">{work.category}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.5, marginBottom: 10 }}>
                    {work.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: 'var(--muted)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {work.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 44,
        padding: '0 22px',
        borderRadius: 2,
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        background: active ? 'var(--ink)' : '#fff',
        border: active ? '1px solid var(--ink)' : '1px solid var(--line)',
        color: active ? '#fff' : 'var(--ink)',
      }}
    >
      {label}
    </Link>
  );
}
