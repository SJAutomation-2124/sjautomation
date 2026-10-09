import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '회사소개' };

const PROFILE_ROWS = [
  ['회사명', 'SJ AUTOMATION', '대표자', '[대표자명]'],
  ['설립일', '[YYYY.MM.DD]', '사업자등록번호', '[000-00-00000]'],
  ['임직원', '[00]명', '주요 거래처', '한양대학교 외 [00]개사'],
];

const HISTORY = [
  {
    year: '[2026]',
    items: ['한양대학교 무인 굴삭기 조종 관제 시스템 납품', '한양대학교 모바일 로봇 조종기 커스텀 제작', '[그 해의 다른 실적을 적습니다]'],
  },
  { year: '[2025]', items: ['[주요 납품 또는 설비 도입 내용]'] },
  { year: '[2023]', items: ['[주요 납품 또는 설비 도입 내용]'] },
  { year: '[설립]', items: ['SJ AUTOMATION 설립'] },
];

export default function AboutPage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">ABOUT</span>
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>
            회사소개
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 680 }}>
            설계실과 공장을 함께 가지고 있습니다. 도면을 그리는 사람과 쇳가루를 만지는 사람이 같은
            회사 안에 있어, 설계 변경이 생겨도 다음 날 바로 반영됩니다.
          </p>
        </div>
      </section>

      {/* 인사말 */}
      <section className="section">
        <div className="container grid split-7-5" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">
              <span className="num mono">01</span>
              <span className="rule" />
              <span className="label mono">GREETINGS</span>
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.45, marginBottom: 28 }}>
              쪼개서 맡기면
              <br />
              책임질 사람이 없어집니다
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.95, color: 'var(--body)', maxWidth: 620, marginBottom: 22 }}>
              장비 하나를 만들려면 설계, 가공, 조립, 전장, 제어, 시운전이 다 필요합니다. 이걸 업체
              다섯 곳에 나눠 맡기면 문제가 생겼을 때 서로 책임을 미룹니다. SJ AUTOMATION은 그
              과정을 한 곳에서 끝내려고 만든 회사입니다.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.95, color: 'var(--body)', maxWidth: 620, marginBottom: 22 }}>
              현장에서 오래 일하다 보면, 정말 잘 만든 장비는 설계자와 만든 사람이 같다는 걸 알게
              됩니다. 도면을 그린 사람이 가공까지 지켜보고, 가공을 한 사람이 제어까지 손대야
              어긋남 없이 돌아갑니다. SJ AUTOMATION은 그 원칙 하나로 시작한 회사입니다.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.95, color: 'var(--body)', maxWidth: 620, marginBottom: 36 }}>
              규모가 크지 않은 만큼, 문의 주신 내용은 저희 팀이 직접 검토하고 답을 드립니다. 할 수
              있는 일과 시간이 걸리는 일을 정직하게 말씀드리는 것부터 시작하겠습니다.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--faint)' }}>
                대표이사
              </span>
              <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>[대표자명]</span>
            </div>
          </div>

          <div>
            <div className="photo-frame" style={{ position: 'relative', height: 420 }}>
              <Image
                src="/images/works/okuma-mcv-machining.jpg"
                alt="오쿠마 MCV 문형 머시닝센터에서 장척 판재를 가공하는 모습"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              />
            </div>
            <div className="photo-cap">
              <span>화성 공장 가공 현장</span>
              <span>FIG. 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 개요 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="eyebrow">
            <span className="num mono">02</span>
            <span className="rule" />
            <span className="label mono">COMPANY PROFILE</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 32 }}>
            회사 개요
          </h2>

          <div style={{ border: '1px solid var(--line)', background: 'var(--panel)' }}>
            {PROFILE_ROWS.map((row, i) => (
              <div
                key={i}
                className="profile-row"
                style={{
                  display: 'grid',
                  borderBottom: i < PROFILE_ROWS.length - 1 ? '1px solid var(--line-soft)' : undefined,
                }}
              >
                <div className="mono" style={{ padding: '20px 22px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)', background: '#fafbfc' }}>
                  {row[0]}
                </div>
                <div style={{ padding: '20px 22px', fontSize: 15, borderRight: '1px solid var(--line-soft)' }}>{row[1]}</div>
                <div className="mono" style={{ padding: '20px 22px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)', background: '#fafbfc' }}>
                  {row[2]}
                </div>
                <div style={{ padding: '20px 22px', fontSize: 15 }}>{row[3]}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', borderTop: '1px solid var(--line-soft)' }}>
              <div className="mono" style={{ padding: '20px 22px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)', background: '#fafbfc' }}>
                사업 분야
              </div>
              <div style={{ padding: '20px 22px', fontSize: 15, lineHeight: 1.7 }}>
                자동화 기계 제작(턴키) · 설계 및 가공 · 모션/제어 솔루션 · 스마트팩토리 고도화
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 두 사업장 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="eyebrow">
            <span className="num mono">03</span>
            <span className="rule" />
            <span className="label mono">TWO SITES</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>
            사업장 두 곳
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640, marginBottom: 32 }}>
            제어와 소프트웨어를 다루는 팀, 기계를 만드는 팀이 각각 자리를 잡고 있습니다.
          </p>

          <div className="grid grid-2">
            <article className="card">
              <div style={{ position: 'relative', height: 260 }}>
                <Image
                  src="/images/works/excavator-teleop-screen.jpg"
                  alt="굴삭기 원격 조종 관제 화면"
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                />
              </div>
              <div className="card-body" style={{ padding: '30px 30px 34px' }}>
                <span className="tag mono">GWANGMYEONG</span>
                <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 12 }}>
                  로보틱스 · 임베디드 · PLC 솔루션 팀
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 22 }}>
                  제어 로직, 임베디드 보드, 관제 소프트웨어를 설계하고 개발합니다. 연구 과제와 용역
                  개발도 이곳에서 진행합니다.
                </p>
                <p style={{ fontSize: 14, color: 'var(--body)', paddingTop: 20, borderTop: '1px solid var(--line-soft)' }}>
                  경기도 광명시 원광명로 [상세 주소]
                </p>
              </div>
            </article>

            <article className="card">
              <div style={{ position: 'relative', height: 260 }}>
                <Image
                  src="/images/works/coil-cut-line.jpg"
                  alt="코일 공급부터 교정, 절단까지 이어지는 가공 라인"
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
                />
              </div>
              <div className="card-body" style={{ padding: '30px 30px 34px' }}>
                <span className="tag mono">HWASEONG</span>
                <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 12 }}>
                  자동화 기계 제작 · 가공 솔루션 팀
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 22 }}>
                  절곡, 절단, 대형 프레나, 선반, 밀링 설비를 직접 갖추고 부품 가공부터 장비 조립까지
                  처리합니다.
                </p>
                <p style={{ fontSize: 14, color: 'var(--body)', paddingTop: 20, borderTop: '1px solid var(--line-soft)' }}>
                  경기도 화성시 팔탄면 [상세 주소]
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="section section--dark">
        <div className="container grid split-4-8" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">
              <span className="num mono">04</span>
              <span className="rule" />
              <span className="label mono">HISTORY</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 20 }}>
              걸어온 길
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--dark-body)' }}>
              연혁은 설립, 사업장 이전이나 증설, 설비 도입, 인증 취득, 규모가 큰 납품 위주로
              정리했습니다.
            </p>
          </div>

          <div>
            {HISTORY.map((h, i) => (
              <div
                key={h.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 28,
                  padding: '26px 0',
                  borderTop: '1px solid var(--dark-edge)',
                  borderBottom: i === HISTORY.length - 1 ? '1px solid var(--dark-edge)' : undefined,
                }}
              >
                <div className="mono" style={{ fontSize: 20, color: '#6e9be0', letterSpacing: '0.02em' }}>
                  {h.year}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {h.items.map((item, j) => (
                    <span key={j} style={{ fontSize: 15, color: i === 0 ? 'var(--dark-ink)' : 'var(--dark-body)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--accent" style={{ padding: '76px 0' }}>
        <div className="container grid split-7-5" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 34, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 16 }}>
              한 번 이야기해 보시죠
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#c5d6f2', maxWidth: 560 }}>
              지금 고민 중인 공정이나 장비가 있다면, 가능한지부터 같이 따져보겠습니다.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
            <Link href="/request" className="btn btn-on-dark" style={{ width: 260 }}>
              제작 · 견적 문의하기
            </Link>
            <a href="tel:" className="btn btn-on-dark-outline mono" style={{ width: 260 }}>
              T. [전화번호]
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
