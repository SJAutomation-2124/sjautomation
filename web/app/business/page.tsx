import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '사업분야' };

const AREAS = [
  {
    num: '01',
    tag: 'TURNKEY',
    title: '자동화 기계 제작',
    desc: '시제품 한 대부터 실제 생산 라인에 들어가는 장비까지 만듭니다. 기존 라인에 맞춰 설계하기 때문에, 공간과 기존 설비 조건을 먼저 확인합니다.',
    img: '/images/works/cnc-retrofit-panel.jpg',
    imgPosition: 'center 50%',
    imgAlt: '수동 밀링기를 CNC로 개조한 조작반과 서보 전장 박스',
    fields: [
      ['범위', '시제품 · 실제 라인 장비 제작'],
      ['NC', 'NC 자동화 장비 제작'],
      ['로보틱스', '로봇 응용 · 모션 플래닝'],
      ['대응 로봇', 'KUKA / YASKAWA / HYUNDAI'],
    ],
    imgFirst: true,
  },
  {
    num: '02',
    tag: 'DESIGN & MACHINING',
    title: '설계 · 가공',
    desc: '2D · 3D 설계와 정적 해석부터 실제 가공까지 자체 설비로 처리합니다. 도면만 주시면 가공만 받아 드리는 것도 가능합니다.',
    img: '/images/works/okuma-mcv-machining.jpg',
    imgPosition: 'center 45%',
    imgAlt: '오쿠마 MCV 문형 머시닝센터 가공',
    fields: [
      ['설계', '2D / 3D 설계, 정적 해석'],
      ['판금', '절곡 · 절단'],
      ['대형 가공', '대형 프레나'],
      ['절삭', '선반 · 밀링 · NC 가공'],
    ],
    imgFirst: false,
  },
  {
    num: '03',
    tag: 'MOTION & CONTROL',
    title: '모션 · 제어',
    desc: '상용 PLC로 되는 일은 상용 PLC로, 안 되는 일은 보드를 직접 만들어 해결합니다. 고속 계측처럼 일반 PLC로 정밀도가 안 나오는 영역은 ARM 기반 커스텀 보드로 대응합니다.',
    img: '/images/works/mobile-robot-controller.jpg',
    imgPosition: 'center 55%',
    imgAlt: '직접 설계한 모바일 로봇 무선 조종기',
    fields: [
      ['PLC / HMI', '시퀀스 제어 · IO 솔루션'],
      ['대응 브랜드', 'LS / MITSUBISHI / BECKHOFF / OMRON'],
      ['서보', '서보 제어 · 튜닝'],
      ['임베디드', 'ARM 기반 커스텀 보드'],
    ],
    imgFirst: true,
  },
  {
    num: '04',
    tag: 'SMART FACTORY',
    title: '스마트팩토리 · 고도화',
    desc: '장비를 새로 사지 않고도, 이미 돌아가는 설비에 데이터를 붙여 생산 현황을 눈에 보이게 만듭니다. 사내 전산이나 ERP와 연결하는 작업도 포함합니다.',
    img: '/images/works/press-brake-scada.png',
    imgPosition: 'left top',
    imgAlt: '절곡기 운전 데이터를 실시간으로 보여주는 모니터링 화면',
    fields: [
      ['연동', '생산 · 재고 ERP 전산 연동'],
      ['관제', '관제 시스템 구축'],
      ['DB', '사내 전산 DB 연동'],
      ['용역', '전용 프로그램 TOOL 개발'],
    ],
    imgFirst: false,
  },
];

const PROCESS = [
  { n: '01', title: '문의', desc: '만들려는 것과 현장 조건을 알려주십시오.' },
  { n: '02', title: '사양 협의', desc: '방식과 개략 견적을 함께 잡습니다.' },
  { n: '03', title: '설계', desc: '2D · 3D 도면과 해석 결과를 확인받습니다.' },
  { n: '04', title: '가공 · 제작', desc: '자체 설비로 가공하고 조립합니다.' },
  { n: '05', title: '제어 · 시운전', desc: 'PLC · 서보를 잡고 실제로 돌려봅니다.' },
  { n: '06', title: '납품 · 사후관리', desc: '현장 설치 후 [00개월] 무상 대응.' },
];

export default function BusinessPage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">BUSINESS</span>
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>사업분야</h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 680 }}>
            기계를 만드는 일과 그 기계를 움직이게 하는 일을 모두 합니다. 필요한 부분만 맡기셔도 되고, 처음부터
            끝까지 맡기셔도 됩니다.
          </p>
        </div>
      </section>

      {AREAS.map((area) => (
        <section className="section" style={{ paddingTop: 80, paddingBottom: 0 }} key={area.num}>
          <div
            className={`container grid ${area.imgFirst ? 'split-5-7' : 'split-7-5'}`}
            style={{ alignItems: 'start' }}
          >
            {area.imgFirst ? (
              <>
                <div className="photo-frame" style={{ position: 'relative', height: 400 }}>
                  <Image src={area.img} alt={area.imgAlt} fill sizes="(max-width: 900px) 100vw, 480px" style={{ objectFit: 'cover', objectPosition: area.imgPosition }} />
                </div>
                <AreaBody area={area} />
              </>
            ) : (
              <>
                <AreaBody area={area} />
                <div className="photo-frame" style={{ position: 'relative', height: 400 }}>
                  <Image src={area.img} alt={area.imgAlt} fill sizes="(max-width: 900px) 100vw, 480px" style={{ objectFit: 'cover', objectPosition: area.imgPosition }} />
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* 진행 순서 */}
      <section className="section section--dark" style={{ marginTop: 88 }}>
        <div className="container">
          <div className="eyebrow">
            <span className="num mono">05</span>
            <span className="rule" />
            <span className="label mono">PROCESS</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>
            진행 순서
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--dark-body)', maxWidth: 640, marginBottom: 44 }}>
            문의부터 납품까지 여섯 단계로 진행합니다. 각 단계에서 확인된 내용은 문서로 남겨 드립니다.
          </p>
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <div
                key={p.n}
                style={{ borderTop: `2px solid ${i === 0 ? '#6e9be0' : '#2a323b'}`, paddingTop: 22 }}
              >
                <div className="mono" style={{ fontSize: 22, color: i === 0 ? '#6e9be0' : 'var(--muted)', marginBottom: 14 }}>
                  {p.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--dark-body)' }}>{p.desc}</p>
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
              어느 단계부터든 맡기실 수 있습니다
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#c5d6f2', maxWidth: 560 }}>
              가공만, 제어만, 또는 처음부터 끝까지. 필요한 만큼만 말씀해 주십시오.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
            <Link href="/request" className="btn btn-on-dark" style={{ width: 260 }}>
              제작 · 견적 문의하기
            </Link>
            <Link href="/works" className="btn btn-on-dark-outline" style={{ width: 260 }}>
              실적사례 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function AreaBody({ area }: { area: (typeof AREAS)[number] }) {
  return (
    <div style={{ paddingBottom: 80 }}>
      <div className="eyebrow">
        <span className="num mono">{area.num}</span>
        <span className="rule" />
        <span className="label mono">{area.tag}</span>
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 18 }}>{area.title}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--body)', maxWidth: 620, marginBottom: 30 }}>
        {area.desc}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line)',
        }}
      >
        {area.fields.map(([label, value]) => (
          <div style={{ background: '#fff', padding: '20px 22px' }} key={label}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 8 }}>
              {label}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
