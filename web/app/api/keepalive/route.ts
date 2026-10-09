import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// Supabase 무료 플랜은 7일간 요청이 없으면 일시정지되므로 Vercel Cron(vercel.json)이 매일 호출합니다.
export async function GET() {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false }, { status: 503 });
  const { error } = await admin.from('inquiries').select('id', { count: 'exact', head: true });
  return NextResponse.json({ ok: !error }, { status: error ? 500 : 200 });
}
