import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

// 전화번호 · 이메일은 lib/contact.ts에서 바꾸면 사이트 전체에 반영됩니다.
const BIZ_NO = '[000-00-00000]';
const GWANGMYEONG_ADDR = '경기도 광명시 원광명로 [상세 주소]';
const HWASEONG_ADDR = '경기도 화성시 팔탄면 [상세 주소]';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>SJ AUTOMATION</h4>
            <p style={{ color: 'var(--faint)' }}>
              산업 자동화 기계 설계 · 제작
              <br />
              모션 제어 · 스마트팩토리 고도화
            </p>
          </div>
          <div>
            <div className="label mono">GWANGMYEONG</div>
            <p>
              {GWANGMYEONG_ADDR}
              <br />
              로보틱스 · 임베디드 · PLC 솔루션 팀
            </p>
          </div>
          <div>
            <div className="label mono">HWASEONG</div>
            <p>
              {HWASEONG_ADDR}
              <br />
              자동화 기계 제작 · 가공 솔루션 팀
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            사업자등록번호 {BIZ_NO}　·　<a href={PHONE_HREF} style={{ color: 'inherit' }}>T. {PHONE}</a>　·　<a href={EMAIL_HREF} style={{ color: 'inherit' }}>{EMAIL}</a>
          </span>
          <span className="legal-links">
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
