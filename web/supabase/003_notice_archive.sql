-- 공지사항 · 자료실 (2026-10) — Supabase 대시보드 > SQL Editor 에 통째로 붙여넣고 Run.
-- 여러 번 실행해도 안전합니다.

-- 공지사항
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  body text not null default '',
  pinned boolean not null default false,
  views integer not null default 0,
  attachment_path text,
  attachment_name text,
  attachment_size bigint
);
alter table public.notices enable row level security;
create index if not exists notices_list_idx on public.notices (pinned desc, created_at desc);

-- 자료실
create table if not exists public.archive_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null,
  description text,
  file_path text not null,
  file_name text not null,
  file_size bigint not null default 0,
  downloads integer not null default 0
);
alter table public.archive_files enable row level security;
create index if not exists archive_files_created_at_idx on public.archive_files (created_at desc);

-- RLS 정책을 두지 않아 공개 키로는 읽기 · 쓰기 모두 막히고, 홈페이지 서버(비밀 키)만 접근합니다.

-- 공지 첨부 · 자료실 파일 저장소 (비공개, 파일당 50MB). 내려받을 때만 서버가 잠깐 열리는 링크를 줍니다.
insert into storage.buckets (id, name, public, file_size_limit)
values ('site-files', 'site-files', false, 52428800)
on conflict (id) do nothing;

-- 조회수 · 내려받기 수를 동시에 여러 명이 눌러도 정확히 1씩 올리는 함수 (서버만 호출)
create or replace function public.bump_notice_views(nid uuid) returns void
language sql as $$ update public.notices set views = views + 1 where id = nid $$;
create or replace function public.bump_archive_downloads(fid uuid) returns void
language sql as $$ update public.archive_files set downloads = downloads + 1 where id = fid $$;
revoke execute on function public.bump_notice_views(uuid) from public, anon, authenticated;
revoke execute on function public.bump_archive_downloads(uuid) from public, anon, authenticated;
