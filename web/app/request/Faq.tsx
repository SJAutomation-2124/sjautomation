import Link from 'next/link';
import { FAQS } from '@/lib/faq';

// 접고 펴는 자주 묻는 질문. <details>라 자바스크립트 없이도 동작합니다.
export default function Faq() {
  return (
    <section id="faq" className="card" style={{ padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px)', scrollMarginTop: 96 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 10 }}>
        FAQ
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>자주 묻는 질문</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 20px' }}>
        견적 문의에서 가장 많이 받는 질문입니다. 여기 없는 내용은 문의 글로 남겨주세요.
      </p>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <details key={f.q} className="faq-item">
            <summary>
              <span className="mono faq-q">Q{i + 1}</span>
              <span className="faq-title">{f.q}</span>
              <svg className="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <div className="faq-answer">
              {f.a.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {f.links && (
                <div className="faq-links">
                  {f.links.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/request/new" className="btn btn-primary" style={{ height: 48 }}>
          문의 글쓰기
        </Link>
      </div>
    </section>
  );
}

export const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
  })),
};
