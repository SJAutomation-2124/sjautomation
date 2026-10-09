import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR, IBM_Plex_Mono, IBM_Plex_Serif } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, ORGANIZATION_JSON_LD, SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

const sans = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// 로고 옆 회사명(SJ AUTOMATION)에만 씁니다. 로고 안의 SJ와 같은 글꼴입니다.
const serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: '%s · SJ AUTOMATION',
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  // 검색엔진 소유 확인 (구글 서치 콘솔 · 네이버 서치어드바이저)
  verification: {
    google: 'ndMvrTXpxd_ozHlow7DUFch61U-jhB6JqLmdiNNEqfk',
    other: { 'naver-site-verification': '98ba8f4bc4183b7c5c4a4bf7c1f5a12bb1a0a892' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
