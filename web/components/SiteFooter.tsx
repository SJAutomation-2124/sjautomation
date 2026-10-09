import Image from 'next/image';
import { ADDRESS, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image
              src="/brand/sj-emblem-light.svg"
              alt="SJ AUTOMATION 로고"
              width={84}
              height={84}
              unoptimized
              style={{ marginBottom: 14 }}
            />
            <h4 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 700, letterSpacing: '0.03em' }}>SJ AUTOMATION</h4>
            <p style={{ color: 'var(--faint)' }}>
              산업 자동화 기계 설계 · 제작
              <br />
              모션 제어 · 스마트팩토리 고도화
            </p>
          </div>
          <div>
            <div className="label mono">HWASEONG</div>
            <p>
              {ADDRESS}
              <br />
              자동화 기계 제작 · 가공 · 로보틱스 · 임베디드 · PLC 솔루션
            </p>
          </div>
          <div>
            <div className="label mono">CONTACT</div>
            <p>
              <a href={PHONE_HREF} style={{ color: 'inherit' }}>
                T. {PHONE}
              </a>
              <br />
              <a href={EMAIL_HREF} style={{ color: 'inherit' }}>
                E. {EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SJ AUTOMATION</span>
          <span className="legal-links">
            <a href="/privacy">개인정보처리방침</a>
            <a href="/admin">관리자</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
