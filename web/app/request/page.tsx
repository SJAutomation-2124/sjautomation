import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Board from './Board';
import ContactAside from './ContactAside';
import InquiryNotice from './InquiryNotice';

export const metadata: Metadata = pageMeta({
  title: '제작 · 견적 문의',
  description:
    '자동화 기계 제작, 설계 · 가공, PLC · 모션 제어, 스마트팩토리 견적 문의 게시판. 비밀글로 남길 수 있고, 접수 즉시 담당자에게 메일로 전달됩니다. 전화 010-6297-3279.',
  path: '/request',
});

export const dynamic = 'force-dynamic';

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ page?: string; done?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);

  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">CONTACT</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>
            제작 · 견적 문의
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 680 }}>
            자동화 기계, 설계 · 가공, PLC · 임베디드 제어, 스마트팩토리 연동 무엇이든 문의 주세요. 도면이나 사양서가 없어도
            괜찮습니다. 만들고 싶은 것과 현장 조건만 알려주시면 방식부터 같이 잡아드립니다.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container grid split-8-4" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            {sp.done === '1' && (
              <div role="status" style={{ padding: '18px 22px', background: '#eaf7ef', border: '1px solid #bfe3cc', borderLeft: '4px solid #1e8e4a' }}>
                <strong style={{ display: 'block', fontSize: 16, color: '#1e7a40', marginBottom: 4 }}>✓ 문의가 접수되었습니다</strong>
                <span style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--body)' }}>
                  담당자가 확인한 뒤 영업일 기준 1일 이내에 남겨주신 연락처로 회신드립니다. 답변은 아래 게시판에서도 확인하실 수
                  있습니다.
                </span>
              </div>
            )}

            <InquiryNotice />

            <div className="card" style={{ padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px) 40px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: 16,
                  flexWrap: 'wrap',
                  marginBottom: 24,
                }}
              >
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>문의 게시판</h2>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', margin: 0 }}>
                    비밀글은 담당자와 비밀번호를 아는 분만 볼 수 있습니다.
                  </p>
                </div>
                <Link href="/request/new" className="btn btn-primary" style={{ height: 48 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  문의 글쓰기
                </Link>
              </div>
              <Board page={page} />
            </div>
          </div>

          <ContactAside />
        </div>
      </section>
    </main>
  );
}
