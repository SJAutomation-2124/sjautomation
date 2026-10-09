import { createClient } from '@supabase/supabase-js';

// URL과 publishable 키는 브라우저에 그대로 노출되는 공개 값이라 코드에 둡니다.
// 비밀 키(SUPABASE_SECRET_KEY)는 Vercel 환경 변수에만 있습니다 — lib/supabase-admin.ts 참고.
export const SUPABASE_URL = 'https://qapjbvshkoqeizfbygqe.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_H1d3rwOhcJ2JqqO_-E-T7w_j0sUsYRV';

export function createBrowserClient() {
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
}
