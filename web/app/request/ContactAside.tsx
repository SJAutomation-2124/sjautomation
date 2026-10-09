import { ADDRESS, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

export default function ContactAside() {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'var(--ink)', padding: '32px 30px 34px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#6e9be0', marginBottom: 20 }}>
          DIRECT
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--dark-body)', marginBottom: 24 }}>급한 건은 전화가 가장 빠릅니다.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <a href={PHONE_HREF} className="mono" style={{ fontSize: 18, color: '#fff', letterSpacing: '0.02em' }}>
            {PHONE}
          </a>
          <a href={EMAIL_HREF} className="mono" style={{ fontSize: 14, color: 'var(--dark-ink)' }}>
            {EMAIL}
          </a>
          <span style={{ fontSize: 14, color: 'var(--dark-ink)' }}>평일 업무시간 응대</span>
        </div>
      </div>

      <div className="card" style={{ padding: '28px 28px 30px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 14 }}>
          HWASEONG
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>{ADDRESS}</p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--faint)' }}>자동화 기계 제작 · 가공 · 로보틱스 · 임베디드 · PLC 솔루션</p>
      </div>
    </aside>
  );
}
