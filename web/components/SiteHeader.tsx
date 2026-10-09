'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/nav';
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container util-row">
        <span>
          경기 화성 · 자동화 기계 제작 · 가공 · 로보틱스 · 임베디드 · PLC 솔루션
        </span>
        <span>
          <a href={PHONE_HREF}>T. {PHONE}</a>　·　<a href={EMAIL_HREF}>{EMAIL}</a>
        </span>
      </div>

      <div className="container main-row">
        <Link href="/" className="brand">
          <span className="brand-name">SJ AUTOMATION</span>
          <span className="brand-tag mono">산업자동화 설계 · 제작</span>
        </Link>

        <nav className="nav-row" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-pill${active ? ' is-active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/request" className="nav-pill is-cta">
            견적 문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
