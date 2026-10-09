'use client';

import { useState, useTransition } from 'react';
import { deleteInquiry, saveAnswer } from './actions';

export function AnswerForm({ id, initial }: { id: string; initial: string | null }) {
  const [text, setText] = useState(initial ?? '');
  const [msg, setMsg] = useState('');
  const [pending, start] = useTransition();
  const dirty = text.trim() !== (initial ?? '').trim();

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setMsg('');
        }}
        placeholder="게시판에 보일 답변을 적습니다. 비우고 저장하면 답변이 지워지고 상태가 '접수'로 돌아갑니다."
        maxLength={5000}
        style={{
          width: '100%',
          minHeight: 120,
          border: '1px solid var(--line)',
          padding: 14,
          fontSize: 14,
          lineHeight: 1.8,
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ height: 44 }}
          disabled={pending || !dirty}
          onClick={() =>
            start(async () => {
              const res = await saveAnswer(id, text);
              setMsg(res.ok ? '저장했습니다.' : res.error);
            })
          }
        >
          {pending ? '저장 중…' : initial ? '답변 수정' : '답변 등록'}
        </button>
        {msg && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{msg}</span>}
      </div>
    </div>
  );
}

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`"${title}" 문의를 삭제할까요? 첨부파일도 함께 지워지며 되돌릴 수 없습니다.`)) return;
        start(async () => {
          const res = await deleteInquiry(id);
          if (!res.ok) alert(res.error);
        });
      }}
      style={{ background: 'none', border: 0, padding: 0, fontSize: 13, color: '#c0392b', cursor: 'pointer' }}
    >
      {pending ? '삭제 중…' : '삭제'}
    </button>
  );
}
