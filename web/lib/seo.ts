import type { Metadata } from 'next';
import { ADDRESS, EMAIL, PHONE } from '@/lib/contact';

export const SITE_URL = 'https://sjautosolution.com';
// 상호: 한글 에스제이모션 · 영문 SJ MOTION (2026-10 SJ AUTOMATION에서 변경). 둘 다 정식 이름으로 씁니다.
export const SITE_NAME = '에스제이모션';
export const SITE_NAME_EN = 'SJ MOTION';
export const HOME_TITLE = '에스제이모션 SJ MOTION — 자동화 기계 제작 · PLC 제어 · 스마트팩토리';
export const HOME_DESCRIPTION =
  '경기 화성 에스제이모션(SJ MOTION). 자동화 기계 턴키 제작, 2D · 3D 설계와 오쿠마 프레나 4m 이상 대형 밀링 가공, PLC · 서보 모션 제어, ARM 임베디드 보드, 스마트팩토리 · ERP 전산 연동까지 한 곳에서 합니다.';
// 검색 키워드. 구글은 이 목록을 보지 않고 네이버도 비중이 낮아, 같은 단어를 실제 페이지 제목 · 본문에도 넣어 둡니다.
// 2026-10-22 추가: (CNC) 프레나 · 뿌레나 · 푸레나 (+가공) · 오쿠마 가공 · 오쿠마 · 대형밀링 · 4m 이상 장척 가공
// (사업분야 · 오쿠마 실적 · 회사소개 · 홈 설명에 반영)
export const SITE_KEYWORDS = [
  '에스제이모션',
  'SJ MOTION',
  '산업자동화',
  '자동화 기계 제작',
  '자동화 설비',
  'PLC 제어',
  '서보 모션 제어',
  'ACS Motion Control',
  'ACS 모션 제어기',
  'Elmo 모션 제어',
  'Elmo 서보 드라이브',
  'LS ELECTRIC PLC',
  'BECKHOFF',
  'OMRON',
  'Delta Tau',
  '델타타우',
  'OMRON Delta Tau',
  'HMI 개발',
  '임베디드',
  '스마트팩토리',
  'SCADA',
  'ERP 연동',
  '로보틱스',
  'CNC 개조',
  '리트로핏',
  '절곡기',
  '절단기',
  '화성 자동화',
  '프레나',
  '프레나가공',
  '프레나 가공',
  '뿌레나',
  '뿌레나가공',
  '뿌레나 가공',
  '푸레나',
  '푸레나가공',
  '푸레나 가공',
  'CNC 프레나',
  'CNC프레나',
  'CNC 뿌레나',
  'CNC뿌레나',
  'CNC 푸레나',
  'CNC푸레나',
  '오쿠마',
  '오쿠마 가공',
  '오쿠마 프레나',
  '대형밀링',
  '대형 밀링 가공',
  '4m 가공',
  '장척 가공',
  '문형 머시닝센터',
];
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, alt: '에스제이모션 SJ MOTION — 자동화 기계 제작 · PLC 제어 · 스마트팩토리' };

// 페이지별 제목 · 설명 · 대표 주소(canonical) · 공유 카드. 페이지에서 openGraph를 따로 쓰면
// 레이아웃 값이 통째로 덮이므로 사이트 이름 · 언어 · 이미지까지 여기서 함께 채웁니다.
export function pageMeta({
  title,
  description,
  path,
  image,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  const images = image ? [{ url: image, alt: title }] : [OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: images.map((i) => i.url) },
  };
}

// 검색엔진에 회사 정보를 정식 형식(schema.org)으로 알려줍니다.
export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: SITE_NAME_EN,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/sj-emblem-light.png`,
  image: `${SITE_URL}/og.png`,
  description:
    '경기 화성의 산업자동화 회사. 자동화 기계 턴키 제작, 설계 · 가공, PLC · 서보 모션 제어, 임베디드, 스마트팩토리 · 전산 연동.',
  telephone: `+82-${PHONE.replace(/^0/, '')}`,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.replace('경기도 화성시 만세구 ', ''),
    addressLocality: '화성시 만세구',
    addressRegion: '경기도',
    addressCountry: 'KR',
  },
  areaServed: 'KR',
  knowsAbout: ['산업자동화', '자동화 기계 제작', 'PLC 제어', '서보 모션 제어', 'ACS Motion Control · Elmo 모션 제어기 적용', '임베디드 시스템', '스마트팩토리', 'SCADA', 'ERP 연동', '로보틱스', '프레나(문형 머시닝센터) 가공', '오쿠마 가공', '대형 밀링 가공', '4m 이상 장척 가공'],
};
