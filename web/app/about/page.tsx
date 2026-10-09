import Image from 'next/image';
import Link from 'next/link';
import { ADDRESS, PHONE, PHONE_HREF } from '@/lib/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '회사소개' };

const PROFILE_ROWS = [
  ['회사명', 'SJ AUTOMATION'],
  ['소재지', ADDRESS],
  ['주요 거래처', '한양대학교 등'],
  ['사업 분야', '자동화 기계 제작(턴키) · 설계 및 가공 · 모션/제어 솔루션 · 스마트팩토리 고도화'],
];

const SITE_TEAMS = [
  ['기계 제작 · 가공', '절곡, 절단, 대형 프레나, 선반, 밀링 설비로 부품 가공부터 장비 조립까지'],
  ['제어 · PLC', '시퀀스 제어, 서보 제어 · 튜닝, HMI 화면 구성'],
  ['로보틱스 · 임베디드 · 소프트웨어', '임베디드 보드, 관제 · 모니터링 소프트웨어, 연구 과제와 용역 개발'],
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
            <p style={{ fontSize: 16, lineHeight: 1.95, color: 'var(--body)', maxWidth: 620, marginBottom: 0 }}>
              규모가 크지 않은 만큼, 문의 주신 내용은 저희 팀이 직접 검토하고 답을 드립니다. 할 수
              있는 일과 시간이 걸리는 일을 정직하게 말씀드리는 것부터 시작하겠습니다.
            </p>
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
            {PROFILE_ROWS.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  borderTop: i > 0 ? '1px solid var(--line-soft)' : undefined,
                }}
              >
                <div className="mono" style={{ padding: '20px 22px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)', background: '#fafbfc' }}>
                  {label}
                </div>
                <div style={{ padding: '20px 22px', fontSize: 15, lineHeight: 1.7 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사업장 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="eyebrow">
            <span className="num mono">03</span>
            <span className="rule" />
            <span className="label mono">SITE</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>
            화성 사업장
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640, marginBottom: 32 }}>
            기계를 만드는 팀과 제어 · 소프트웨어를 다루는 팀이 모두 화성 사업장 한 곳에 있습니다.
          </p>

          <article className="card grid split-5-7" style={{ gap: 0 }}>
            <div style={{ position: 'relative', minHeight: 300 }}>
              <Image
                src="/images/works/coil-cut-line.jpg"
                alt="코일 공급부터 교정, 절단까지 이어지는 가공 라인"
                fill
                sizes="(max-width: 900px) 100vw, 500px"
                style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
              />
            </div>
            <div className="card-body" style={{ padding: '32px 32px 34px' }}>
              <span className="tag mono">HWASEONG</span>
              <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 12 }}>
                설계부터 가공 · 제어 · 소프트웨어까지 한 곳에서
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 22 }}>
                도면이 바뀌면 같은 사업장 안에서 바로 가공과 제어에 반영됩니다.
              </p>
              <div style={{ borderTop: '1px solid var(--line-soft)' }}>
                {SITE_TEAMS.map(([team, desc]) => (
                  <div key={team} style={{ padding: '14px 0', borderBottom: '1px solid var(--line-soft)' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{team}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)' }}>{desc}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: 'var(--body)', paddingTop: 18, margin: 0 }}>{ADDRESS}</p>
            </div>
          </article>
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
            <a href={PHONE_HREF} className="btn btn-on-dark-outline mono" style={{ width: 260 }}>
              T. {PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
