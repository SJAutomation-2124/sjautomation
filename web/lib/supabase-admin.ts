import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL } from '@/lib/supabase';

// 서버(Server Action, Route Handler)에서만 import 합니다. 비밀 키는 RLS를 우회하므로 브라우저로 나가면 안 됩니다.
export function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
