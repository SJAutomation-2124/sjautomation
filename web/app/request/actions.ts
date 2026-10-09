'use server';

import { EMAIL } from '@/lib/contact';
import { revalidatePath } from 'next/cache';
import {
  INQUIRY_BUCKET,
  INQUIRY_TYPES,
  MAX_ATTACHMENT_BYTES,
  MIN_PASSWORD_LENGTH,
  type ActionResult,
  type InquiryInput,
} from '@/lib/inquiry';
import { hashPassword, verifyPassword } from '@/lib/password';
import { createAdminClient } from '@/lib/supabase-admin';

const UNAVAILABLE = '지금은 온라인 접수를 받을 수 없습니다. 전화나 이메일로 문의해 주세요.';
const ATTACHMENT_PATH = /^\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\.[a-z0-9]{1,10}$/;
const LINK_DAYS = 7;

// Supabase 저장소 경로에는 한글을 쓸 수 없어서, 경로는 날짜/무작위ID.확장자로 만들고
// 원래 파일명은 DB(attachment_name)에 따로 남깁니다.
export async function createAttachmentUpload(
  fileName: string,
  size: number,
): Promise<ActionResult<{ path: string; token: string }>> {
  if (!(size > 0) || size > MAX_ATTACHMENT_BYTES) return { ok: false, error: '첨부파일은 20MB까지 올릴 수 있습니다.' };
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: UNAVAILABLE };

  const ext = (/\.([A-Za-z0-9]{1,10})$/.exec(fileName)?.[1] ?? 'bin').toLowerCase();
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await admin.storage.from(INQUIRY_BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    console.error('[inquiry] signed upload url failed', error);
    return { ok: false, error: '첨부파일을 올릴 준비를 하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }
  return { ok: true, path: data.path, token: data.token };
}

export async function submitInquiry(input: InquiryInput): Promise<ActionResult> {
  if (input.website) return { ok: true };

  const title = input.title?.trim().slice(0, 100) ?? '';
  const company = input.company?.trim().slice(0, 100) ?? '';
  const name = input.name?.trim().slice(0, 50) ?? '';
  const phone = input.phone?.trim().slice(0, 30) ?? '';
  const email = input.email?.trim().slice(0, 120) ?? '';
  const message = input.message?.trim().slice(0, 5000) ?? '';
  const types = (input.types ?? []).filter((t): t is (typeof INQUIRY_TYPES)[number] =>
    (INQUIRY_TYPES as readonly string[]).includes(t),
  );
  const attachmentPath = input.attachmentPath && ATTACHMENT_PATH.test(input.attachmentPath) ? input.attachmentPath : null;
  const attachmentName = attachmentPath ? (input.attachmentName ?? '').trim().slice(0, 200) || null : null;

  if (!title || !company || !name || !phone || !email || !message) return { ok: false, error: '필수 항목을 모두 입력해 주세요.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: '이메일 주소를 확인해 주세요.' };
  if (types.length === 0) return { ok: false, error: '문의 분야를 하나 이상 선택해 주세요.' };
  if (!input.consent) return { ok: false, error: '개인정보 수집 및 이용에 동의해 주세요.' };
  const isSecret = input.isSecret !== false;
  const password = (input.password ?? '').slice(0, 100);
  if (isSecret && password.length < MIN_PASSWORD_LENGTH)
    return { ok: false, error: `비밀글 비밀번호를 ${MIN_PASSWORD_LENGTH}자 이상 입력해 주세요.` };

  const admin = createAdminClient();
  if (!admin) return { ok: false, error: UNAVAILABLE };

  const { error } = await admin.from('inquiries').insert({
    title,
    is_secret: isSecret,
    password_hash: isSecret ? hashPassword(password) : null,
    company,
    name,
    phone,
    email,
    types,
    message,
    attachment_path: attachmentPath,
    attachment_name: attachmentName,
  });
  if (error) {
    console.error('[inquiry] insert failed', error);
    return { ok: false, error: '접수 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.' };
  }

  let attachmentUrl: string | null = null;
  if (attachmentPath) {
    const { data } = await admin.storage.from(INQUIRY_BUCKET).createSignedUrl(attachmentPath, 60 * 60 * 24 * LINK_DAYS);
    attachmentUrl = data?.signedUrl ?? null;
  }

  // 메일이 실패해도 문의는 이미 저장됐으므로 손님에게는 성공으로 안내합니다.
  revalidatePath('/request');
  await notify({ title, isSecret, company, name, phone, email, types, message, attachmentName, attachmentUrl }).catch((e) =>
    console.error('[inquiry] notify failed', e),
  );
  return { ok: true };
}

type Notice = {
  title: string;
  isSecret: boolean;
  company: string;
  name: string;
  phone: string;
  email: string;
  types: string[];
  message: string;
  attachmentName: string | null;
  attachmentUrl: string | null;
};

async function notify(n: Notice) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const receivedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const rows: [string, string][] = [
    ['제목', n.title],
    ['공개 여부', n.isSecret ? '비밀글 (게시판에 내용 비공개)' : '공개글 (게시판에 제목 · 내용 공개)'],
    ['회사명', n.company],
    ['담당자', n.name],
    ['연락처', n.phone],
    ['이메일', n.email],
    ['문의 분야', n.types.join(', ')],
    ['접수 시각', receivedAt],
  ];
  const attachment = n.attachmentName
    ? n.attachmentUrl
      ? `<a href="${esc(n.attachmentUrl)}">${esc(n.attachmentName)}</a> <span style="color:#8a939c">(링크 ${LINK_DAYS}일간 유효)</span>`
      : esc(n.attachmentName)
    : '없음';

  const html = `<div style="font-family:'Malgun Gothic',sans-serif;font-size:14px;color:#0e1319;max-width:640px">
  <h2 style="font-size:18px;margin:0 0 16px">홈페이지 견적 문의가 접수되었습니다</h2>
  <table style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;background:#f4f6f8;border:1px solid #dce1e6;width:110px;color:#5a646e">${k}</td><td style="padding:8px 12px;border:1px solid #dce1e6">${esc(v)}</td></tr>`,
      )
      .join('')}
    <tr><td style="padding:8px 12px;background:#f4f6f8;border:1px solid #dce1e6;color:#5a646e">첨부파일</td><td style="padding:8px 12px;border:1px solid #dce1e6">${attachment}</td></tr>
  </table>
  <h3 style="font-size:15px;margin:24px 0 8px">문의 내용</h3>
  <div style="white-space:pre-wrap;line-height:1.7;padding:14px;border:1px solid #dce1e6;background:#fafbfc">${esc(n.message)}</div>
  <p style="margin-top:20px"><a href="https://sjautosolution.com/admin" style="color:#10428e">관리자 화면에서 보기 · 답변 달기 →</a></p>
  <p style="color:#8a939c;font-size:12px;margin-top:8px">이 메일에 답장하면 문의하신 분(${esc(n.email)})에게 바로 회신됩니다.</p>
</div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'SJ AUTOMATION 홈페이지 <onboarding@resend.dev>',
      to: [EMAIL],
      reply_to: n.email,
      subject: `[홈페이지 문의] ${n.title} — ${n.company} · ${n.name}`,
      html,
    }),
  });
  if (!res.ok) console.error('[inquiry] resend error', res.status, await res.text());
}

export type SecretPost = { title: string; message: string; answer: string | null; answeredAt: string | null; hasAttachment: boolean };

// 비밀글 열람: 비밀번호가 맞을 때만 본문과 답변을 돌려줍니다. 회사명 · 연락처 등은 여기서도 내보내지 않습니다.
export async function openSecretPost(id: string, password: string): Promise<ActionResult<{ post: SecretPost }>> {
  if (!/^[0-9a-f-]{36}$/.test(id) || !password) return { ok: false, error: '비밀번호를 입력해 주세요.' };
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: UNAVAILABLE };
  const { data } = await admin
    .from('inquiries')
    .select('title, message, answer, answered_at, attachment_path, password_hash, is_secret')
    .eq('id', id)
    .maybeSingle();
  if (!data || !data.is_secret || !verifyPassword(password.slice(0, 100), data.password_hash)) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: false, error: '비밀번호가 맞지 않습니다.' };
  }
  return {
    ok: true,
    post: { title: data.title, message: data.message, answer: data.answer, answeredAt: data.answered_at, hasAttachment: Boolean(data.attachment_path) },
  };
}
