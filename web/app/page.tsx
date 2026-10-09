import Image from 'next/image';
import Link from 'next/link';
import { PHONE, PHONE_HREF } from '@/lib/contact';
import { WORKS } from '@/lib/works';

const BUSINESS_AREAS = [
  {
    num: '01',
    tag: 'TURNKEY',
    title: '자동화 기계 제작',
    desc: '시제품부터 실제 생산 라인 장비까지 턴키로 제작합니다.',
    img: '/images/works/cnc-retrofit-panel.jpg',
    imgPosition: 'center 50%',
    items: ['시제품 · 라인 장비 제작', 'NC 자동화 장비 제작', '로보틱스 응용'],
  },
  {
    num: '02',
    tag: 'MACHINING',
    title: '설계 · 가공',
    desc: '2D/3D 설계와 정적 해석부터 실가공까지 자체 설비로 처리합니다.',
    img: '/images/works/okuma-mcv-machining.jpg',
    imgPosition: 'center 45%',
    items: ['2D / 3D 설계, 정적 해석', '절곡 · 절단 · 대형 프레나', '선반 · 밀링 · NC 가공'],
  },
  {
    num: '03',
    tag: 'CONTROL',
    title: '모션 · 제어',
    desc: '상용 PLC부터 ARM 기반 커스텀 보드까지, 필요한 층위에서 제어합니다.',
    img: '/images/works/servo-tuner-render.png',
    imgPosition: 'center',
    items: ['PLC / HMI · IO 솔루션', '서보 제어 · 튜닝', 'ARM 기반 임베디드 커스텀'],
  },
  {
    num: '04',
    tag: 'SMART FACTORY',
    title: '스마트팩토리 · 고도화',
    desc: '이미 돌아가는 설비에 데이터를 붙여 생산 현황을 눈에 보이게 만듭니다.',
    img: '/images/works/press-brake-scada.png',
    imgPosition: 'left top',
    items: ['생산 · 재고 ERP 연동', '관제 시스템 구축', '사내 전산 DB 연동'],
  },
];

const RECENT_WORKS = ['excavator-teleop', 'cnc-retrofit', 'press-brake-scada'].map(
  (slug) => WORKS.find((w) => w.slug === slug)!,
);

export default function HomePage() {
  return (
    <main className="bp-grid">
      {/* HERO */}
      <section className="section section--panel">
        <div className="container grid split-7-5" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">
              <span className="num mono">SJ AUTOMATION</span>
              <span className="rule" />
              <span className="label mono">FACTORY AUTOMATION · ROBOTICS · PLC</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(34px, 4.5vw, 58px)',
                lineHeight: 1.24,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                marginBottom: 28,
              }}
            >
              기계 설계부터 제어,
              <br />
              스마트팩토리 연동까지
              <br />
              <span style={{ color: 'var(--accent)' }}>한 곳에서 끝냅니다</span>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: 'var(--muted)',
                maxWidth: 560,
                marginBottom: 40,
              }}
            >
              도면 한 장에서 출발해 가공, 조립, PLC 제어, 생산 데이터 연동까지. 외주를 여러 곳에
              쪼개지 않고 SJ AUTOMATION 한 곳에서 턴키로 진행합니다.
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 56, flexWrap: 'wrap' }}>
              <Link href="/request/new" className="btn btn-primary">
                제작 · 견적 문의하기
              </Link>
              <Link href="/works" className="btn btn-outline">
                실적사례 보기
              </Link>
            </div>

            <div
              className="mono"
              style={{
                paddingTop: 10,
                borderTop: '1px solid var(--line)',
                fontSize: 11,
                letterSpacing: '0.08em',
                color: 'var(--faint)',
              }}
            >
              KUKA · YASKAWA · HYUNDAI ROBOTICS　/　LS · MITSUBISHI · BECKHOFF · OMRON
            </div>
          </div>

          <div>
            <div className="photo-frame" style={{ position: 'relative', height: 456 }}>
              <Image src="/images/line-cutting.jpg" alt="절단기 가공 라인시스템" fill sizes="480px" />
            </div>
            <div className="photo-cap">
              <span>절단기 가공 라인시스템 · 화성 공장</span>
              <span>FIG. 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* 사업분야 4축 */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 24,
              marginBottom: 44,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div className="eyebrow">
                <span className="num mono">01</span>
                <span className="rule" />
                <span className="label mono">BUSINESS AREA</span>
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em' }}>
                네 가지 축으로 대응합니다
              </h2>
            </div>
            <p style={{ maxWidth: 400, fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', textAlign: 'right' }}>
              기계 · 전장 · 소프트웨어가 한 팀 안에 있어
              <br />
              설계 변경과 현장 대응이 빠릅니다.
            </p>
          </div>

          <div className="grid grid-4">
            {BUSINESS_AREAS.map((area) => (
              <article className="card" key={area.num}>
                <div style={{ position: 'relative', height: 190 }}>
                  <Image src={area.img} alt={area.title} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 320px" style={{ objectFit: 'cover', objectPosition: area.imgPosition }} />
                </div>
                <div className="card-body">
                  <span className="tag mono">
                    {area.num} — {area.tag}
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 12 }}>
                    {area.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                    {area.desc}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 9,
                      borderTop: '1px solid var(--line-soft)',
                      paddingTop: 18,
                    }}
                  >
                    {area.items.map((item) => (
                      <span key={item} style={{ fontSize: 13, color: 'var(--muted)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 보유 설비 / 대응 브랜드 */}
      <section className="section section--dark">
        <div className="container grid split-4-8" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">
              <span className="num mono">02</span>
              <span className="rule" />
              <span className="label mono">EQUIPMENT &amp; STACK</span>
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 22 }}>
              직접 갖추고
              <br />
              직접 다룹니다
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--dark-body)' }}>
              가공은 자체 설비로, 제어는 현장에서 쓰는 주요 브랜드를 그대로. 견적 단계에서 어떤
              장비와 어떤 컨트롤러로 갈지 함께 정합니다.
            </p>
          </div>

          <div>
            {[
              { label: '가공 설비', items: ['절곡기', '절단기', '대형 프레나', '선반', '밀링', 'NC 가공'] },
              { label: '로봇', items: ['KUKA', 'YASKAWA', 'HYUNDAI'] },
              { label: 'PLC / 제어', items: ['LS ELECTRIC', 'MITSUBISHI', 'BECKHOFF', 'OMRON'] },
              { label: '임베디드', items: ['ARM 기반 커스텀 보드', '고속 IO 계측 모듈'] },
              { label: '소프트웨어 (HMI · 전산 · 관제)', items: ['C# / JAVA', '파이썬', '파워빌더', 'Oracle DB'] },
            ].map((row, i, all) => (
              <div
                key={row.label}
                className="stack-row"
                style={{ borderBottom: i === all.length - 1 ? '1px solid var(--dark-edge)' : undefined }}
              >
                <div className="stack-label mono">{row.label}</div>
                <div className="stack-chips">
                  {row.items.map((item) => (
                    <span key={item} className="stack-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최근 실적 */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 44,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div className="eyebrow">
                <span className="num mono">03</span>
                <span className="rule" />
                <span className="label mono">SELECTED WORKS</span>
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em' }}>최근 실적</h2>
            </div>
            <Link href="/works" style={{ fontSize: 14, fontWeight: 500 }}>
              실적사례 전체 보기 →
            </Link>
          </div>

          <div className="grid grid-3">
            {RECENT_WORKS.map((work) => (
              <Link href={`/works/${work.slug}`} className="card link-card" key={work.slug}>
                <div style={{ position: 'relative', height: 240 }}>
                  <Image
                    src={work.img}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    style={{ objectFit: 'cover', objectPosition: work.imgPosition }}
                  />
                </div>
                <div className="card-body">
                  <span className="tag mono">{work.category}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{work.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 공지사항 + 자료실 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card" style={{ padding: '36px 36px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>공지사항</h3>
              <Link href="/notice" className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)' }}>
                MORE +
              </Link>
            </div>
            <p style={{ fontSize: 14, color: 'var(--faint)' }}>등록된 공지가 아직 없습니다.</p>
          </div>

          <div className="card" style={{ padding: '36px 36px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>자료실</h3>
              <Link href="/archive" className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--faint)' }}>
                MORE +
              </Link>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>
              기술 지원 자료, 매뉴얼, 강의 자료를 내려받으실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--accent" style={{ padding: '76px 0' }}>
        <div className="container grid split-7-5" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 16 }}>
              도면이 없어도 괜찮습니다
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#c5d6f2', maxWidth: 560 }}>
              만들고 싶은 것과 현장 조건만 알려주시면, 방식과 개략 견적부터 같이 잡아드립니다.
              문의 내용은 공개되지 않습니다.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
            <Link href="/request/new" className="btn btn-on-dark" style={{ width: 260 }}>
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
