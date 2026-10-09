# SJ AUTOMATION 홈페이지 — 인수인계 문서

이 폴더(`sj-automation`) 전체를 그대로 새 PC로 옮기면, 대화 내용 없이도
이 문서 하나만 읽으면 이어서 작업할 수 있게 정리했습니다.

작성일: 2026-09-10

---

## 1. 확정된 것 (다시 논의할 필요 없음)

| 항목 | 내용 |
|---|---|
| 도메인 | **sjautosolution.com** (가비아에서 구매 완료, 등록 2026-09-10 / 만료 2027-09-10) |
| 회사명 | SJ AUTOMATION 그대로 사용 (도메인만 다른 이름으로 우회) |
| 디자인 방향 | "정밀 도면" 스타일 — 흰 바탕, 얇은 그리드, 딥블루(#10428E) 포인트 |
| 헤더 스타일 | 어두운 바(#161D25) + 밝은 파랑(#3B82F6) 버튼형 메뉴 |
| 서체 | IBM Plex Sans KR (본문) / IBM Plex Mono (라벨·숫자) |
| 스택 | Next.js 15 + Vercel(무료 배포) + Supabase(무료 DB) |
| 구성 | 메인 / 회사소개 / 사업분야 / 실적사례(목록·상세) / 자료실 / 공지사항(목록·상세) / 문의(비공개 폼 + 공개 게시판) |
| 예상 비용 | 도메인만 연 1.3~1.8만원, 서버비 0원 |

**도메인이 왜 sjautosolution.com인지**: sjautomation.com/.net/.co.kr/.kr, sj-automation.com,
sjrobotics.com이 전부 타사(경기 화성의 "삼정오토메이션" 등)가 이미 소유하고 있어서,
회사명은 그대로 두고 도메인만 다르게 잡았습니다.

## 2. 지금까지 만든 것

`web/` 폴더 — 실제 Next.js 프로젝트 (배포할 코드)

- 메인 페이지 (`app/page.tsx`)
- 회사소개 페이지 (`app/about/page.tsx`) — **대표 인사말은 Claude가 직접 작성**해서
  넣었습니다. 톤이 마음에 안 들면 이 파일 안의 문단만 고치면 됩니다.
- 공통 헤더/푸터 (`components/SiteHeader.tsx`, `components/SiteFooter.tsx`)
- 디자인 시스템 CSS (`app/globals.css`)
- Git 저장소로 초기화 + 첫 커밋 완료 (커밋 로그에 상세 내용 있음)
- 빌드 확인: 타입 에러 0개, 보안 취약점 0개, 로컬 서버(`localhost:3000`)로
  실제 렌더링까지 확인 완료
- 사업분야 / 실적사례(목록·상세 13건) / 자료실 / 공지사항 / 문의 화면 (2026-09~10)
- **실적사례 내용은 `web/lib/works.ts` 한 파일에 전부 있습니다.** 제목·요약·배경·진행
  방식·결과·적용 기술·사진·영상을 여기서 고치면 목록, 상세, 홈 "최근 실적"에 같이
  반영됩니다. 글은 사진을 보고 Claude가 초안으로 쓴 것이라 사실 확인이 필요합니다.
- 실적 사진은 `web/public/images/works/`, 영상은 `web/public/videos/` (웹용으로 줄이고
  위치정보 등 메타데이터를 지운 사본). 원본은 `design/`에만 두고 git에는 올리지 않음
  (원본 일부에 GPS 정보가 있음)

`design/` 폴더 — 시안 원본 (참고용, 배포 대상 아님)

- `*.dc.html` 열 개 — 승인된 화면별 정적 시안 원본
- `*.jpg` — 시안/실사이트에 쓴 실적 사진 (아임웹 원본 사이트에서 가져온 것)
- 시안 아티팩트: https://claude.ai/code/artifact/259227a6-420d-4fdf-98d2-3887cbb3fcf6
- 실사이트 미리보기: https://claude.ai/code/artifact/2fafa574-7b26-40e7-8b35-cedb1efc3133

## 3. Supabase 연동 (2026-10-09 시작)

- 프로젝트: `https://qapjbvshkoqeizfbygqe.supabase.co` (Region: Seoul, Free 플랜)
- **1단계 — 견적 문의 폼: 운영 중 (2026-10-09 실사이트 테스트 완료 — 저장 · 첨부 · 메일 알림 모두 확인).** 문의는 `inquiries` 테이블, 첨부파일은 비공개
  `inquiry-files` 저장소(20MB)에 저장. 공개 키로는 읽기·쓰기 모두 막혀 있고
  홈페이지 서버만 비밀 키로 저장함. 접수 시 Resend로 jeniussdi@naver.com에 알림
  (메일에 답장하면 손님에게 회신, 첨부는 7일짜리 다운로드 링크).
  - DB 구조: `web/supabase/schema.sql` (SQL Editor에서 실행)
  - Vercel 환경 변수: `SUPABASE_SECRET_KEY`, `RESEND_API_KEY` (비밀 값 — 채팅·코드에 넣지 말 것)
  - 무료 플랜 7일 미사용 일시정지 방지: `web/vercel.json` 크론이 매일 `/api/keepalive` 호출
  - Resend는 도메인 인증 전이라 가입 메일(jeniussdi@naver.com)로만 발송 가능
- 2단계 — 공지사항 · 자료실 관리자 화면 (예정)
- 공개 문의 게시판은 보류 (스팸·관리 부담 대비 효과 적음)
- 개인정보처리방침 `/privacy` (2026-10-09 시행, 위탁: Vercel · Supabase · Resend / 국외 이전: Vercel · Resend 미국). 수탁 업체나 보유 기간이 바뀌면 이 페이지도 고칠 것
- 이용약관(`/terms`)은 아직 없음 (하단 링크만 있음)

## 4. 아직 못 받은 정보 (대괄호 `[ ]`로 남긴 것)

전화번호(010-6297-3279)·이메일(jeniussdi@naver.com)은 입력 완료. 전화·이메일·주소는 `web/lib/contact.ts` 한 파일만 고치면
사이트 전체(상단, 하단, 문의, 실적 상세, 홈·회사소개 버튼)에 반영됩니다.

- (주소 입력 완료: 경기도 화성시 만세구 팔탄면 푸른들판로 880 — 광명 사업부는 없어지고 모든 팀이 화성으로 합쳐짐)
- 사업자등록번호 — 나중에 넣기로 하고 지금은 사이트에서 뺌 (넣을 땐 하단 SiteFooter.tsx와 회사소개 회사 개요 표)
- 실적별 발주처 · 납품 시기 (모르는 건 화면에서 행 자체를 숨김 — `works.ts`에 `client`를 넣으면 표시)

대표자 · 설립일 · 임직원은 사이트 어디에도 표시하지 않기로 함 (회사 개요 표, 인사말
서명, 하단 정보 모두 삭제). 회사소개의 연혁 섹션은 통째로 삭제함.

## 5. 새 PC에서 이어서 하는 절차

### 5-1. 폴더 옮기기

이 `sj-automation` 폴더 전체를 그대로 복사하면 됩니다. `web/node_modules`와
`web/.next`는 있으면 지우고 옮기세요 (용량만 크고, 새 PC에서 다시 만들어짐).
전부 빼면 폴더 전체가 1MB 남짓이라 USB든 클라우드든 압축이든 뭐든 괜찮습니다.

```
sj-automation/
├── HANDOFF.md          ← 이 문서
├── design/             ← 시안 원본 (참고용)
└── web/                ← 실제 배포할 프로젝트 (git 저장소로 이미 초기화됨)
```

### 5-2. 새 PC에서 준비

1. [nodejs.org](https://nodejs.org)에서 LTS 버전 설치
2. `web` 폴더에서 터미널 열고:
   ```
   npm install
   npm run dev
   ```
3. 브라우저에서 `http://localhost:3000` 열어서 지금까지 만든 화면 확인

### 5-3. GitHub에 올리기 — **완료 (2026-09-10, 전용 PC)**

저장소: <https://github.com/SJAutomation-2124/sjautomation>

`sj-automation` 폴더 **전체**가 하나의 git 저장소입니다 (HANDOFF.md + design/ + web/).
저장소 루트가 `web`이 아니라 그 한 단계 위라는 점만 기억하면 됩니다.

> 참고: 처음 올렸을 때 `web` 폴더 안에 별도의 `.git`이 남아 있어서 GitHub에는
> `web`이 빈 폴더로만 올라갔었습니다. 안쪽 `.git`을 저장소 밖
> (`Documents\hompage\web-git-backup`)으로 옮기고 다시 커밋해서 해결했습니다.
> 그 백업 폴더는 이제 필요 없으니 지워도 됩니다.

이후 변경사항을 올릴 때는 `sj-automation` 폴더에서:

```
git add -A
git commit -m "설명"
git push
```

### 5-4. Vercel 연결 — **완료 (2026-09-10)**

1. [vercel.com](https://vercel.com) 가입 (GitHub 계정으로 로그인하면 편함)
2. "New Project" → `SJAutomation-2124/sjautomation` 저장소 선택
3. **Root Directory를 `web`으로 지정** (Edit 버튼 → `web` 선택). 저장소 루트에는
   package.json이 없어서 이걸 안 하면 배포가 실패합니다. → Deploy
4. 몇 분 안에 임시 주소(`*.vercel.app`)가 나오면 배포 성공

> **겪었던 문제**: 최초 Import 때 Root Directory Edit을 건너뛰고 배포했다가,
> 나중에 Settings에서 Root Directory만 뒤늦게 `web`으로 고쳐서 Redeploy했더니
> 빌드 로그는 성공(`Build Completed`, `Deployment completed`)인데도 모든
> 배포 URL·심지어 프로젝트 기본 도메인(`*.vercel.app`)까지 계속
> `404 NOT_FOUND` (Vercel 플랫폼 레벨 에러, 앱 코드 문제 아님)가 떴습니다.
> Settings → Domains 메뉴에 도메인이 아예 하나도 없는 상태였던 게 단서였는데,
> 최초 생성 시점에 잘못된 설정으로 실패를 겪은 프로젝트라 도메인이 정상
> 프로비저닝되지 않은 것으로 보입니다. **해결책**: 그 프로젝트를 통째로
> 삭제(Settings → 맨 아래 Delete Project — GitHub 코드는 건드리지 않음)하고,
> **Import 화면에서 처음부터** Root Directory를 `web`으로 지정한 뒤 재생성하니
> 정상적으로 도메인이 붙고 해결됐습니다. → 앞으로 Vercel 프로젝트를 새로 만들
> 일이 있으면 **반드시 Import 단계에서 바로** Root Directory를 지정할 것,
> 나중에 Settings에서 고치는 방식은 피할 것.

5. Vercel 프로젝트 설정 → Domains → `sjautosolution.com` 추가
6. 가비아 도메인 관리 화면에서 Vercel이 알려주는 값대로 네임서버/DNS 레코드 설정
   (보통 10분~수 시간 내 반영)

### 5-5. 이후 Claude와 이어서 작업하기

새 PC에서 Claude Code를 켜고 이 `web` 폴더(또는 `sj-automation` 폴더)를 열어서,
"이 프로젝트 HANDOFF.md 읽고 이어서 작업해줘"라고 하면 이 문서를 읽고 맥락을
파악해서 이어갈 수 있습니다. 이전 대화 내용 자체는 다른 PC로 넘어가지 않지만,
이 문서 + git 커밋 로그 + 코드 자체가 필요한 맥락을 대부분 담고 있습니다.
