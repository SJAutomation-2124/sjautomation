'use client';

import { useTransition } from 'react';
import type { ActionResult } from '@/lib/inquiry';

export default function ConfirmDelete({
  id,
  message,
  action,
}: {
  id: string;
  message: string;
  action: (id: string) => Promise<ActionResult>;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(message)) return;
        start(async () => {
          const res = await action(id);
          if (!res.ok) alert(res.error);
        });
      }}
      style={{ background: 'none', border: 0, padding: 0, fontSize: 13, color: '#c0392b', cursor: 'pointer' }}
    >
      {pending ? '삭제 중…' : '삭제'}
    </button>
  );
}
