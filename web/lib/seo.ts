import type { Metadata } from 'next';
import { ADDRESS, EMAIL, PHONE } from '@/lib/contact';

export const SITE_URL = 'https://sjautosolution.com';
export const SITE_NAME = 'SJ AUTOMATION';
export const HOME_TITLE = 'SJ AUTOMATION — 자동화 기계 제작 · PLC 제어 · 스마트팩토리';
export const HOME_DESCRIPTION =
  '경기 화성 SJ AUTOMATION. 자동화 기계 턴키 제작, 2D · 3D 설계와 가공, PLC · 서보 모션 제어, ARM 임베디드 보드, 스마트팩토리 · ERP 전산 연동까지 한 곳에서 합니다.';
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, alt: 'SJ AUTOMATION — 자동화 기계 제작 · PLC 제어 · 스마트팩토리' };

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
  knowsAbout: ['산업자동화', '자동화 기계 제작', 'PLC 제어', '서보 모션 제어', '임베디드 시스템', '스마트팩토리', 'SCADA', 'ERP 연동', '로보틱스'],
};
