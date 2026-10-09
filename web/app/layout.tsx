import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR, IBM_Plex_Mono, IBM_Plex_Serif } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
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
  metadataBase: new URL('https://sjautosolution.com'),
  title: {
    default: 'SJ AUTOMATION',
    template: '%s · SJ AUTOMATION',
  },
  description:
    '자동화 기계 제작(턴키), 설계·가공, 모션/제어 솔루션, 스마트팩토리 고도화. SJ AUTOMATION.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
