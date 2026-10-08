import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WORKS } from '@/lib/works';

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
  return { title: work?.title ?? '실적사례' };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = WORKS.find((w) => w.slug === slug);
  if (!work) notFound();

  const related = WORKS.filter((w) => w.category === work.category && w.slug !== work.slug).slice(0, 3);

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

          <div className="grid split-7-5" style={{ alignItems: 'start' }}>
            <div>
              <span className="badge" style={{ marginBottom: 20 }}>
                {work.category}
              </span>
              <h1 style={{ fontSize: 40, lineHeight: 1.35, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 20 }}>
                {work.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 600 }}>
                [프로젝트 한 줄 요약을 적습니다. 어떤 문제를 어떤 방식으로 풀었는지 한 문장이면 충분합니다.]
              </p>
            </div>

            <div style={{ border: '1px solid var(--line)', background: '#fff' }}>
              <InfoRow label="발주처" value={work.client ?? '[발주처명]'} />
              <InfoRow label="분류" value={work.category} />
              <InfoRow label="납품 시기" value="[YYYY.MM]" mono />
              <InfoRow label="적용 기술" value="[적용 기술을 적습니다]" />
              <InfoRow label="작업 기간" value="[00개월]" mono last />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="photo-frame" style={{ position: 'relative', height: 520 }}>
            <Image src={work.img} alt={work.title} fill sizes="1200px" style={{ objectFit: 'cover' }} />
          </div>
          <div className="photo-cap">
            <span>[대표 사진 설명을 적습니다]</span>
            <span>FIG. 01</span>
          </div>
        </div>
      </section>

      {work.youtubeId && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="eyebrow">
              <span className="num mono">00</span>
              <span className="rule" />
              <span className="label mono">VIDEO</span>
            </div>
            <div style={{ position: 'relative', paddingTop: '56.25%', background: 'var(--ink)' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}`}
                title={`${work.title} 영상`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container grid split-8-4" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <BodyBlock num="01" tag="BACKGROUND" title="과제 배경">
              [고객이 어떤 상황이었고 무엇이 문제였는지 적습니다. 기존 방식의 한계, 요구 사양, 현장 제약 조건 같은
              내용이 들어가면 읽는 사람이 자기 상황과 대조해 볼 수 있습니다.]
            </BodyBlock>
            <BodyBlock num="02" tag="APPROACH" title="진행 방식">
              [설계 · 제작 · 제어 · 검증을 어떤 순서로 진행했는지 적습니다.]
            </BodyBlock>
            <BodyBlock num="03" tag="RESULT" title="결과">
              [납품 후 무엇이 달라졌는지 적습니다. 수치가 있으면 가장 강력합니다 — 사이클 타임, 정밀도, 불량률,
              인력 절감 같은 것들입니다.]
            </BodyBlock>
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
                <span className="mono" style={{ fontSize: 14 }}>
                  T. [전화번호]
                </span>
                <span className="mono" style={{ fontSize: 14 }}>
                  [이메일 주소]
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
                marginBottom: 32,
                paddingTop: 48,
                borderTop: '1px solid var(--line)',
              }}
            >
              <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>같은 분야의 다른 실적</h2>
              <Link href="/works" style={{ fontSize: 14, fontWeight: 500 }}>
                전체 보기
              </Link>
            </div>
            <div className="grid grid-3">
              {related.map((w) => (
                <Link href={`/works/${w.slug}`} className="card link-card" key={w.slug}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={w.img} alt={w.title} fill sizes="400px" style={{ objectFit: 'cover' }} />
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

function InfoRow({ label, value, mono, last }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        borderBottom: last ? undefined : '1px solid var(--line-soft)',
      }}
    >
      <div className="mono" style={{ padding: '16px 18px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)' }}>
        {label}
      </div>
      <div className={mono ? 'mono' : undefined} style={{ padding: '16px 18px', fontSize: 14 }}>
        {value}
      </div>
    </div>
  );
}

function BodyBlock({ num, tag, title, children }: { num: string; tag: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow">
        <span className="num mono">{num}</span>
        <span className="rule" />
        <span className="label mono">{tag}</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 16 }}>{title}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.95, color: 'var(--body)' }}>{children}</p>
    </div>
  );
}
