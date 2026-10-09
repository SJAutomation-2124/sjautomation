import Link from 'next/link';
import type { Metadata } from 'next';
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

export const metadata: Metadata = { title: '제작 · 견적 문의' };

const INQUIRY_TYPES = ['자동화 기계 제작 (턴키)', '설계 · 가공', 'PLC · 모션 제어 · 임베디드', '스마트팩토리 · 전산 연동'];

export default function RequestPage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">CONTACT</span>
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>
            제작 · 견적 문의
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 680 }}>
            자동화 기계, 설계 · 가공, PLC · 임베디드 제어, 스마트팩토리 연동 무엇이든 문의 주세요. 도면이나
            사양서가 없어도 괜찮습니다. 만들고 싶은 것과 현장 조건만 알려주시면 방식부터 같이 잡아드립니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid split-8-4" style={{ alignItems: 'start' }}>
          <form className="card" style={{ padding: '40px 40px 44px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 18px',
                background: 'var(--accent-soft)',
                marginBottom: 36,
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.6 }}>
                이 문의는 <strong style={{ fontWeight: 600 }}>공개되지 않습니다.</strong> 담당자만 확인하며,
                접수 즉시 메일로 알림이 갑니다.
              </span>
            </div>

            <div className="grid grid-2" style={{ marginBottom: 20 }}>
              <div className="field">
                <label>
                  회사명 <span className="req">*</span>
                </label>
                <input type="text" name="company" placeholder="(주)○○○" required />
              </div>
              <div className="field">
                <label>
                  담당자명 <span className="req">*</span>
                </label>
                <input type="text" name="name" placeholder="홍길동" required />
              </div>
            </div>

            <div className="grid grid-2" style={{ marginBottom: 32 }}>
              <div className="field">
                <label>
                  연락처 <span className="req">*</span>
                </label>
                <input type="tel" name="phone" className="mono" placeholder="010-0000-0000" required />
              </div>
              <div className="field">
                <label>
                  이메일 <span className="req">*</span>
                </label>
                <input type="email" name="email" className="mono" placeholder="name@company.co.kr" required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              <label style={{ fontSize: 13, fontWeight: 500 }}>
                문의 분야 <span className="req">*</span>{' '}
                <span style={{ color: 'var(--faint)', fontWeight: 400 }}>중복 선택 가능</span>
              </label>
              <div className="grid grid-2">
                {INQUIRY_TYPES.map((type) => (
                  <label
                    key={type}
                    className="checkline"
                    style={{ height: 52, padding: '0 18px', border: '1px solid var(--line)', background: '#fff' }}
                  >
                    <input type="checkbox" name="type" value={type} />
                    <span style={{ fontSize: 14, color: 'var(--ink)' }}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field" style={{ marginBottom: 24 }}>
              <label>
                문의 내용 <span className="req">*</span>
              </label>
              <textarea
                name="message"
                placeholder="만들고 싶은 장비나 해결하려는 문제, 현장 조건(설치 공간, 전원, 기존 설비), 희망 일정을 적어주시면 더 정확한 답변을 드릴 수 있습니다."
                required
              />
            </div>

            <div className="field" style={{ marginBottom: 28 }}>
              <label>
                첨부파일 <span style={{ color: 'var(--faint)', fontWeight: 400 }}>도면, 사진, 사양서 · 최대 20MB</span>
              </label>
              <input type="file" name="attachment" style={{ height: 'auto', padding: 16 }} />
            </div>

            <label
              className="checkline"
              style={{ padding: '18px 0', borderTop: '1px solid var(--line-soft)', marginBottom: 28 }}
            >
              <input type="checkbox" name="consent" required />
              <span>
                개인정보 수집 및 이용에 동의합니다. <a href="/privacy">약관 보기</a>
              </span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-primary" style={{ width: 220 }} disabled>
                문의 보내기
              </button>
              <span style={{ fontSize: 13, color: 'var(--faint)' }}>
                온라인 접수 기능은 준비 중입니다. 지금은 전화나 이메일로 문의해 주세요.
              </span>
            </div>
          </form>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--ink)', padding: '32px 30px 34px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#6e9be0', marginBottom: 20 }}>
                DIRECT
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--dark-body)', marginBottom: 24 }}>
                급한 건은 전화가 가장 빠릅니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a href={PHONE_HREF} className="mono" style={{ fontSize: 18, color: '#fff', letterSpacing: '0.02em' }}>
                  {PHONE}
                </a>
                <a href={EMAIL_HREF} className="mono" style={{ fontSize: 14, color: 'var(--dark-ink)' }}>
                  {EMAIL}
                </a>
                <span style={{ fontSize: 14, color: 'var(--dark-ink)' }}>평일 [09:00 – 18:00]</span>
              </div>
            </div>

            <div className="card" style={{ padding: '28px 28px 30px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 14 }}>
                GWANGMYEONG OFFICE
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>경기도 광명시 원광명로 [상세 주소]</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--faint)' }}>로보틱스 · 임베디드 · PLC 솔루션 팀</p>
            </div>

            <div className="card" style={{ padding: '28px 28px 30px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 14 }}>
                HWASEONG FACTORY
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>경기도 화성시 팔탄면 [상세 주소]</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--faint)' }}>자동화 기계 제작 · 가공 솔루션 팀</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card" style={{ padding: '40px 40px 44px' }}>
            <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>
              문의 게시판
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 30 }}>
              기술적인 질문이나 다른 분들도 궁금해할 내용은 여기에 남겨주세요. 비공개로 쓰면 담당자만 볼 수
              있습니다.
            </p>
            <div style={{ padding: '48px 0', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
              <p style={{ fontSize: 15, color: 'var(--faint)' }}>등록된 문의가 아직 없습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
