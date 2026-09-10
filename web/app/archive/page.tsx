import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '자료실' };

const CATEGORIES = [
  { title: '기술지원 자료', desc: '설치 · 배선 · 파라미터 설정 가이드', primary: true },
  { title: '장비 매뉴얼', desc: '납품 장비 사용 · 정비 설명서', primary: false },
  { title: '강의 자료', desc: '교육용 PLC · 모션 제어 자료', primary: false },
  { title: '소프트웨어 툴', desc: '계산기 · 설정 유틸리티', primary: false },
];

export default function ArchivePage() {
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
            <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>자료실</h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640 }}>
              기술지원 자료, 장비 매뉴얼, 강의 자료, 소프트웨어 툴을 내려받으실 수 있습니다. 필요한 자료가
              목록에 없으면 문의로 요청해 주십시오.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL 0
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="grid grid-4">
            {CATEGORIES.map((c) => (
              <article
                key={c.title}
                className="card"
                style={{
                  padding: '26px 26px 30px',
                  background: c.primary ? 'var(--accent)' : '#fff',
                  borderColor: c.primary ? 'var(--accent)' : undefined,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: c.primary ? '#fff' : 'var(--ink)',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: c.primary ? '#c5d6f2' : 'var(--muted)' }}>
                  {c.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '48px 36px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--faint)' }}>등록된 자료가 아직 없습니다.</p>
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
              padding: '44px 44px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
                찾으시는 자료가 없나요?
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--dark-body)', maxWidth: 620 }}>
                납품받으신 장비의 도면이나 파라미터 설정값이 필요하시면 문의로 알려주십시오. 확인 후
                보내드립니다.
              </p>
            </div>
            <Link href="/request" className="btn btn-on-dark" style={{ width: 220, flexShrink: 0 }}>
              자료 요청하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
