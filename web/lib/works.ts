export type WorkCategory = '자동화 기계' | '설계 · 가공' | '모션 · 제어' | '스마트팩토리';

export type Work = {
  slug: string;
  category: WorkCategory;
  title: string;
  img: string;
  client?: string;
  /** 유튜브 영상 ID만 적습니다 (youtube.com/watch?v= 뒤에 붙는 부분). 없으면 영상 섹션이 아예 안 나옵니다. */
  youtubeId?: string;
};

export const WORKS: Work[] = [
  { slug: 'line-cutting-system', category: '자동화 기계', title: '절단기 가공 라인시스템', img: '/images/line-cutting.jpg' },
  { slug: 'steel-v-cutting', category: '자동화 기계', title: '철판 V-Cutting 시스템', img: '/images/cnc-machine.jpg' },
  { slug: 'steel-rolling', category: '자동화 기계', title: '철판 롤링기', img: '/images/rolling.jpg' },
  { slug: 'cnc-retrofit', category: '자동화 기계', title: '수동밀링 CNC 개조', img: '/images/cnc-retrofit.jpg' },
  {
    slug: 'frontgauge-calculator',
    category: '자동화 기계',
    title: '2축 프런트게이지 자동 차감연산기 탑재',
    img: '/images/press-hmi.jpg',
  },
  {
    slug: 'okuma-planer-machining',
    category: '설계 · 가공',
    title: '오쿠마 프레나 가공 · 대학교 납품',
    img: '/images/milling-bed.jpg',
  },
  { slug: 'io-precision-measure', category: '모션 · 제어', title: 'IO 모듈 고속 정밀 측정 솔루션', img: '/images/scope.jpg' },
  {
    slug: 'servo-tuner-hmi',
    category: '모션 · 제어',
    title: '서보 튜닝기 HMI 솔루션 · BECKHOFF',
    img: '/images/servo-hmi.jpg',
  },
  {
    slug: 'excavator-teleop',
    category: '모션 · 제어',
    title: '무인 굴삭기 조종 관제 시스템 · 한양대학교',
    img: '/images/robot.jpg',
    client: '한양대학교',
  },
  {
    slug: 'mobile-robot-controller',
    category: '모션 · 제어',
    title: '모바일 로봇 조종기 커스텀 제작 · 한양대학교',
    img: '/images/machining.jpg',
    client: '한양대학교',
  },
  { slug: 'smart-factory-install', category: '스마트팩토리', title: '스마트팩토리 기능 설치', img: '/images/mes.jpg' },
  {
    slug: 'rebar-design-tool',
    category: '스마트팩토리',
    title: '철근 설계 프로그램 TOOL 개발 · 용역',
    img: '/images/rebar-tool.jpg',
  },
];

export const WORK_CATEGORIES: WorkCategory[] = ['자동화 기계', '설계 · 가공', '모션 · 제어', '스마트팩토리'];
