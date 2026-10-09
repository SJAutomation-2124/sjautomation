-- SJ AUTOMATION 홈페이지 — Supabase 초기 설정
-- Supabase 대시보드 > SQL Editor 에 통째로 붙여넣고 Run.

-- 견적 문의
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text not null,
  name text not null,
  phone text not null,
  email text not null,
  types text[] not null default '{}',
  message text not null,
  attachment_path text,
  attachment_name text,
  status text not null default 'new'
);

-- RLS를 켜고 정책은 만들지 않습니다: 공개 키로는 읽기·쓰기 모두 막히고,
-- 홈페이지 서버(비밀 키)만 저장할 수 있습니다.
alter table public.inquiries enable row level security;

-- 첨부파일 저장소 (비공개, 파일당 20MB)
insert into storage.buckets (id, name, public, file_size_limit)
values ('inquiry-files', 'inquiry-files', false, 20971520)
on conflict (id) do nothing;
