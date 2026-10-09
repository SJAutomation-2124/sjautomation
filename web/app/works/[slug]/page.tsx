import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WORKS, hasVideo } from '@/lib/works';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/contact';

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = WORKS.find((w) => w.slug === slug);
  if (!work) return { title: '실적사례' };
  return { title: work.title, description: work.summary, openGraph: { images: [work.img] } };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = WORKS.find((w) => w.slug === slug);
  if (!work) notFound();

  const related = WORKS.filter((w) => w.category === work.category && w.slug !== work.slug).slice(0, 3);
  const gallery = work.gallery ?? [];
  const videos = work.videos ?? [];

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <Link href="/works">WORKS</Link>
            <span>/</span>
            <span className="current">{work.category}</span>
          </div>

          <div className="grid split-7-5" style={{ alignItems: 'start', gap: 32 }}>
            <div>
              <span className="badge" style={{ marginBottom: 20 }}>
                {work.category}
              </span>
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  lineHeight: 1.35,
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  marginBottom: 20,
                }}
              >
                {work.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 600 }}>{work.summary}</p>
            </div>

            <div style={{ border: '1px solid var(--line)', background: '#fff' }}>
              {work.client && <InfoRow label="발주처">{work.client}</InfoRow>}
              <InfoRow label="분류">{work.category}</InfoRow>
              <InfoRow label="적용 기술" last>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {work.tech.map((t) => (
                    <span key={t} className="badge badge-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </InfoRow>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="photo-frame" style={{ height: 'clamp(280px, 48vw, 560px)' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: work.imgContain ? 'var(--ink)' : undefined,
              }}
            >
              <Image
                src={work.img}
                alt={work.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                style={{ objectFit: work.imgContain ? 'contain' : 'cover', objectPosition: work.imgPosition }}
              />
            </div>
          </div>
          <div className="photo-cap">
            <span>{work.imgCaption}</span>
            <span>FIG. 01</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid split-8-4" style={{ alignItems: 'start', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56, minWidth: 0 }}>
            <BodyBlock num="01" tag="BACKGROUND" title="과제 배경" text={work.background} />

            <BodyBlock num="02" tag="APPROACH" title="진행 방식" text={work.approach}>
              {gallery.length > 0 && (
                <div className={gallery.length > 1 ? 'grid grid-2' : 'grid'} style={{ marginTop: 28, gap: 16 }}>
                  {gallery.map((photo, i) => (
                    <figure key={photo.src} style={{ margin: 0, border: '1px solid var(--line)', background: '#fff', padding: 10 }}>
                      <div style={{ position: 'relative', height: 'clamp(240px, 36vw, 420px)', background: '#f1f3f5' }}>
                        <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 900px) 100vw, 800px" style={{ objectFit: 'contain' }} />
                      </div>
                      <figcaption className="mono" style={{ padding: '12px 4px 4px', fontSize: 11, color: 'var(--faint)', lineHeight: 1.6 }}>
                        FIG. {String(i + 2).padStart(2, '0')} — {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </BodyBlock>

            <BodyBlock num="03" tag="RESULT" title="결과" text={work.result} />

            {hasVideo(work) && (
              <BodyBlock num="04" tag="VIDEO" title="작동 영상">
                <div className={videos.length > 1 ? 'grid grid-2' : 'grid'} style={{ gap: 16 }}>
                  {videos.map((v, i) => (
                    <figure key={v.src} style={{ margin: 0, border: '1px solid var(--line)', background: '#fff', padding: 10 }}>
                      <video
                        src={v.src}
                        poster={v.poster}
                        controls
                        playsInline
                        preload="none"
                        style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', background: 'var(--ink)' }}
                      />
                      <figcaption className="mono" style={{ padding: '12px 4px 4px', fontSize: 11, color: 'var(--faint)', lineHeight: 1.6 }}>
                        VIDEO {String(i + 1).padStart(2, '0')} — {v.caption}
                      </figcaption>
                    </figure>
                  ))}
                  {work.youtubeId && (
                    <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--ink)' }}>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}`}
                        title={`${work.title} 영상`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                      />
                    </div>
                  )}
                </div>
              </BodyBlock>
            )}
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--ink)', padding: '32px 30px 34px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#6e9be0', marginBottom: 16 }}>
                INQUIRY
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 600, color: '#fff', lineHeight: 1.5, letterSpacing: '-0.015em', marginBottom: 14 }}>
                비슷한 장비가
                <br />
                필요하신가요?
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--dark-body)', marginBottom: 24 }}>
                이 사례를 기준으로 사양과 개략 견적을 잡아드립니다.
              </p>
              <Link href="/request" className="btn btn-on-dark btn-block">
                이 사례로 문의하기
              </Link>
            </div>

            <div className="card" style={{ padding: '28px 28px 30px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: 18 }}>
                CONTACT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a href={PHONE_HREF} className="mono" style={{ fontSize: 14, color: 'var(--ink)' }}>
                  T. {PHONE}
                </a>
                <span className="mono" style={{ fontSize: 14 }}>
                  {EMAIL}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 16,
                marginBottom: 32,
                paddingTop: 48,
                borderTop: '1px solid var(--line)',
              }}
            >
              <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>같은 분야의 다른 실적</h2>
              <Link href={`/works?category=${encodeURIComponent(work.category)}`} style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>
                전체 보기
              </Link>
            </div>
            <div className="grid grid-3">
              {related.map((w) => (
                <Link href={`/works/${w.slug}`} className="card link-card" key={w.slug}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={w.img} alt={w.title} fill sizes="(max-width: 640px) 100vw, 400px" style={{ objectFit: 'cover', objectPosition: w.imgPosition }} />
                  </div>
                  <div className="card-body">
                    <span className="tag mono">{w.category}</span>
                    <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.5 }}>{w.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function InfoRow({ label, last, children }: { label: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '96px 1fr',
        borderBottom: last ? undefined : '1px solid var(--line-soft)',
      }}
    >
      <div className="mono" style={{ padding: '16px 18px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)' }}>
        {label}
      </div>
      <div style={{ padding: '14px 18px', fontSize: 14, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function BodyBlock({
  num,
  tag,
  title,
  text,
  children,
}: {
  num: string;
  tag: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="eyebrow">
        <span className="num mono">{num}</span>
        <span className="rule" />
        <span className="label mono">{tag}</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 16 }}>{title}</h2>
      {text && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.95, color: 'var(--body)' }}>{text}</p>}
      {children}
    </div>
  );
}
