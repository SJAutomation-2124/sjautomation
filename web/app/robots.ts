import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// 관리자 화면, 서버 주소, 개별 문의 글(비밀글 포함)은 검색에서 뺍니다. 문의 게시판 목록(/request)은 허용.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/request/', '/archive/download/', '/notice/*/download'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
