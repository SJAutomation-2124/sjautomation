import Link from 'next/link';
import { BOARD_PAGE_SIZE, formatDate, maskName } from '@/lib/inquiry';
import { createAdminClient } from '@/lib/supabase-admin';

export const STATUS_LABEL: Record<string, string> = { new: '접수', answered: '답변완료' };

export function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5z" />
    </svg>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={status === 'answered' ? 'badge' : 'badge badge-muted'}>{STATUS_LABEL[status] ?? '접수'}</span>;
}

// 비밀글의 제목은 서버에서 지운 뒤 내려보내므로 브라우저에는 전달되지 않습니다.
export default async function Board({ page }: { page: number }) {
  const admin = createAdminClient();
  const from = (page - 1) * BOARD_PAGE_SIZE;
  const { data, count } = admin
    ? await admin
        .from('inquiries')
        .select('id, created_at, title, name, is_secret, status', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, from + BOARD_PAGE_SIZE - 1)
    : { data: null, count: 0 };
  const rows = data ?? [];
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / BOARD_PAGE_SIZE));

  return (
    <div>
      <div className="board-head board-row mono">
        <span>NO</span>
        <span>제목</span>
        <span>작성자</span>
        <span>작성일</span>
        <span>상태</span>
      </div>

      {rows.length === 0 ? (
        <p style={{ padding: '48px 0', textAlign: 'center', fontSize: 15, color: 'var(--faint)', borderBottom: '1px solid var(--line-soft)' }}>
          등록된 문의가 아직 없습니다.
        </p>
      ) : (
        rows.map((r, i) => (
          <Link key={r.id} href={`/request/${r.id}`} className="board-row board-link">
            <span className="mono board-no">{total - from - i}</span>
            <span className="board-title">
              {r.is_secret ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--faint)' }}>
                  <LockIcon />
                  비밀글입니다.
                </span>
              ) : (
                r.title
              )}
            </span>
            <span className="board-meta">{maskName(r.name)}</span>
            <span className="board-meta mono">{formatDate(r.created_at)}</span>
            <span className="board-meta">
              <StatusBadge status={r.status} />
            </span>
          </Link>
        ))
      )}

      {pages > 1 && (
        <nav aria-label="문의 게시판 페이지" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/request?page=${p}`}
              className="mono"
              aria-current={p === page ? 'page' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                fontSize: 13,
                background: p === page ? 'var(--ink)' : '#fff',
                color: p === page ? '#fff' : 'var(--ink)',
                border: p === page ? '1px solid var(--ink)' : '1px solid var(--line)',
              }}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
