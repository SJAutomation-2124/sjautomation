-- 공지 · 칼럼 (2026-10) — Supabase 대시보드 > SQL Editor 에 통째로 붙여넣고 Run.
-- 여러 번 실행해도 안전합니다. 기존 공지는 그대로 '공지'로 남습니다.

-- 글 분류: notice(공지) / column(칼럼). 칼럼은 소분류(topic)를 하나 고릅니다.
alter table public.notices add column if not exists category text not null default 'notice';
alter table public.notices add column if not exists topic text;
alter table public.notices drop constraint if exists notices_category_check;
alter table public.notices add constraint notices_category_check check (category in ('notice', 'column'));
create index if not exists notices_category_idx on public.notices (category, created_at desc);

-- 본문 중간에 넣는 사진 저장소 (공개, 장당 5MB). 관리자 화면이 올리기 전에 크기를 줄이고
-- 촬영 위치 같은 사진 정보를 지운 뒤 올립니다. 올리기는 서버가 발급한 주소로만 됩니다.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/webp', 'image/jpeg'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/webp', 'image/jpeg'];
