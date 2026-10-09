import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { EMAIL } from '@/lib/contact';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase';

type CookieList = { name: string; value: string; options: CookieOptions }[];

// 관리자로 인정하는 로그인 계정. Supabase에서 다른 계정이 만들어져도 이 목록에 없으면 관리자가 아닙니다.
export const ADMIN_EMAILS = [EMAIL];

export async function createSessionClient() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list: CookieList) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server Component에서는 쿠키를 쓸 수 없음 — 세션 갱신은 middleware가 맡습니다.
        }
      },
    },
  });
}

export async function getAdminUser() {
  const supabase = await createSessionClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  return email && ADMIN_EMAILS.includes(email) ? data.user : null;
}
