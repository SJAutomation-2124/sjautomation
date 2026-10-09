-- 문의 게시판 (2026-10) — Supabase 대시보드 > SQL Editor 에 통째로 붙여넣고 Run.
-- schema.sql 다음에 실행합니다. 여러 번 실행해도 안전합니다.

alter table public.inquiries
  add column if not exists title text,
  add column if not exists is_secret boolean not null default true,
  add column if not exists password_hash text,
  add column if not exists answer text,
  add column if not exists answered_at timestamptz;

-- 게시판 이전에 들어온 문의는 비밀글로 두고, 제목은 내용 앞부분으로 채웁니다.
update public.inquiries set title = left(message, 40) where title is null;
-- 새 코드를 올리기 전에 실행해도 기존 폼(제목 없이 저장)이 계속 동작하도록 기본값을 둡니다.
alter table public.inquiries alter column title set default '(제목 없음)';
alter table public.inquiries alter column title set not null;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
