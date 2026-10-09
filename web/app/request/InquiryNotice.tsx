export default function InquiryNotice() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: '20px 22px',
        background: 'var(--accent-soft)',
        border: '1px solid #c9d8ef',
        borderLeft: '4px solid var(--accent)',
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        aria-hidden="true"
        style={{ flexShrink: 0, marginTop: 1 }}
      >
        <path d="M3 6h18v12H3zM3 6l9 7 9-7" />
      </svg>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: 'var(--accent)' }}>
          문의를 남기시면 게시판에 등록되고, 동시에 담당자 메일로 바로 전달됩니다.
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: 'var(--body)' }}>
          비밀글로 쓰시면 담당자와 비밀번호를 아는 분만 볼 수 있습니다. 공개글이어도 회사명 · 연락처 · 이메일 · 첨부파일은
          공개되지 않습니다.
        </p>
      </div>
    </div>
  );
}
