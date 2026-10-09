import Link from 'next/link';
import type { Metadata } from 'next';
import { ADDRESS, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';
import Board from './Board';
import InquiryForm from './InquiryForm';

export const metadata: Metadata = { title: '제작 · 견적 문의' };

export const dynamic = 'force-dynamic';

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Number.parseInt((await searchParams).page ?? '1', 10) || 1);

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
          <InquiryForm />

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
                <span style={{ fontSize: 14, color: 'var(--dark-ink)' }}>평일 업무시간 응대</span>
              </div>
            </div>

            <div className="card" style={{ padding: '28px 28px 30px' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 14 }}>
                HWASEONG
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>{ADDRESS}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--faint)' }}>
                자동화 기계 제작 · 가공 · 로보틱스 · 임베디드 · PLC 솔루션
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="board" className="section" style={{ paddingTop: 0, scrollMarginTop: 120 }}>
        <div className="container">
          <div className="card" style={{ padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px) 44px' }}>
            <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>
              문의 게시판
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 30 }}>
              위 문의 폼으로 남기신 글이 이곳에 올라갑니다. 비밀글은 담당자와 비밀번호를 아는 분만 볼 수 있고, 답변이
              달리면 상태가 &lsquo;답변완료&rsquo;로 바뀝니다.
            </p>
            <Board page={page} />
          </div>
        </div>
      </section>
    </main>
  );
}
