import { formatDate } from '@/lib/inquiry';

export default function PostBody({
  message,
  answer,
  answeredAt,
  hasAttachment,
}: {
  message: string;
  answer: string | null;
  answeredAt: string | null;
  hasAttachment: boolean;
}) {
  return (
    <>
      <div style={{ padding: 'clamp(24px, 4vw, 40px)', fontSize: 16, lineHeight: 1.95, color: 'var(--body)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {message}
        {hasAttachment && (
          <p className="mono" style={{ marginTop: 24, fontSize: 12, color: 'var(--faint)', whiteSpace: 'normal' }}>
            첨부파일 1개 — 담당자만 확인할 수 있습니다.
          </p>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--line)', background: '#f7f9fc', padding: 'clamp(24px, 4vw, 40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)' }}>
            ANSWER
          </span>
          {answeredAt && (
            <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
              {formatDate(answeredAt)}
            </span>
          )}
        </div>
        {answer ? (
          <div style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--ink)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{answer}</div>
        ) : (
          <p style={{ margin: 0, fontSize: 14, color: 'var(--faint)' }}>담당자가 확인 중입니다. 영업일 기준 1일 이내에 연락드립니다.</p>
        )}
      </div>
    </>
  );
}
