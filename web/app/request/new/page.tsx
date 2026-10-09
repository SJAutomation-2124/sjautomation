import Link from 'next/link';
import type { Metadata } from 'next';
import ContactAside from '../ContactAside';
import InquiryForm from '../InquiryForm';

export const metadata: Metadata = { title: '문의 글쓰기' };

export default function NewInquiryPage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <Link href="/request">CONTACT</Link>
            <span>/</span>
            <span className="current">WRITE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>
            문의 글쓰기
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 680 }}>
            도면이나 사양서가 없어도 괜찮습니다. 만들고 싶은 것과 현장 조건만 알려주시면 방식부터 같이 잡아드립니다.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container grid split-8-4" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <InquiryForm />
            <Link href="/request" style={{ fontSize: 14, alignSelf: 'flex-start' }}>
              ← 문의 게시판으로
            </Link>
          </div>
          <ContactAside />
        </div>
      </section>
    </main>
  );
}
