import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '공지사항' };

export default function NoticePage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="crumb">
              <Link href="/">HOME</Link>
              <span>/</span>
              <span className="current">NOTICE</span>
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>공지사항</h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 640 }}>
              휴무 안내, 설비 도입, 인증 취득처럼 거래처가 알아야 할 소식을 올립니다.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--faint)', letterSpacing: '0.06em', paddingBottom: 6 }}>
            TOTAL 0
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '64px 36px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--faint)' }}>등록된 공지가 아직 없습니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
