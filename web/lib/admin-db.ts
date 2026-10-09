import { createAdminClient } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/supabase-server';

// 관리자로 로그인했을 때만 비밀 키 DB 클라이언트를 돌려줍니다. 관리자 서버 액션에서만 씁니다.
export async function adminDb() {
  if (!(await getAdminUser())) return null;
  return createAdminClient();
}

export const UUID = /^[0-9a-f-]{36}$/;
