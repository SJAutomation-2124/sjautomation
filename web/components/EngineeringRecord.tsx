import { Oxanium } from 'next/font/google';
import type { CSSProperties } from 'react';

// 메인 맨 위 '기술 이력' 패널의 숫자 · 연도 · 영문 라벨에만 씁니다.
const display = Oxanium({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

// 대표 엔지니어 개인 경력입니다. 회사(에스제이모션) 실적으로 표기하지 않습니다.
const STATS = [
  { n: 15, unit: '년+', label: '현장 자동화 개발\n2011년부터' },
  { n: 5, unit: '년', label: '대기업 기업연구소\n제어 기술 개발' },
  { n: 9, unit: '건', label: '특허\n등록 7 · 출원 2' },
  { n: 7, unit: '편', label: 'SCI(E) 국제 논문\n제1저자 3편' },
];

const TIMELINE = [
  ['2011', '현장 자동화 개발 시작', 'PLC 연동 · HMI · 임베디드 · 자체 RTOS'],
  ['2015', '로봇 · 메카트로닉스 박사과정 · 국책 R&D 6건', '무인 · 원격 굴삭기, 보행 보조 로봇, 한미 공동연구'],
  ['2021', '대기업 기업연구소', '필드버스 기반 Advanced Control · 제진 프로파일 · 연구개발상'],
  ['2026', 'SJ MOTION', '연구소에서 다듬은 모션 제어를 현장 장비로'],
];

export default function EngineeringRecord() {
  return (
    <div className={display.variable}>
      <div className="rec">
        <span className="rec-scan" aria-hidden="true" />
        <div className="rec-head">
          <span>
            ENGINEERING RECORD<span className="rec-cursor" aria-hidden="true" />
          </span>
          <span className="rec-range">2011 — 2026</span>
        </div>

        <div className="rec-stats">
          {STATS.map((s, i) => (
            <div className="rec-stat" key={s.label} style={{ '--i': i } as CSSProperties}>
              <div className="rec-num">
                {/* 숫자는 0부터 올라가는 애니메이션으로 보여 주고, 글자 자체는 검색 · 낭독용으로 둡니다 */}
                <span className="rec-count" style={{ '--to': s.n, '--w': String(s.n).length } as CSSProperties} aria-hidden="true" />
                <span className="rec-sr">{s.n}</span>
                <span className="rec-unit">{s.unit}</span>
              </div>
              <div className="rec-label">{s.label}</div>
            </div>
          ))}
        </div>

        <ol className="rec-line">
          {TIMELINE.map(([year, title, desc], i) => (
            <li key={year} className={i === TIMELINE.length - 1 ? 'is-now' : undefined} style={{ '--i': i } as CSSProperties}>
              <span className="rec-year">{year}</span>
              <div>
                <div className="rec-title">{title}</div>
                <div className="rec-desc">{desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="photo-cap">
        <span>대표 엔지니어 기술 이력</span>
        <span>FIG. 01</span>
      </div>
    </div>
  );
}
