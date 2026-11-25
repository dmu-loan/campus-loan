# 빌려드립니다 프론트엔드

학생 모바일과 관리자 데스크톱 화면을 React(JavaScript·JSX)와 Vite로 구현했습니다. Node 버전은 `.nvmrc`에 있습니다.

```sh
cd frontend
npm ci
npm run dev
```

- 학생 홈 `/`에서 물품 조회, 상세, 신청 내용 확인까지 진행할 수 있습니다. 신청서 바로가기는 `/apply/`입니다.
- 관리자 `/admin/`에서 대시보드, 주간 집계, 신청·대여 목록, 재고, 통계, 운영 설정과 이력을 조회합니다. 로그인 화면은 `/login/`입니다.
- 4단계까지의 화면은 예시 데이터를 사용합니다. 실제 로그인, 접수, 승인·반납 및 서버 저장은 이후 연동 범위입니다.
- `npm run lint`, `npm test`, `npm run build`로 검사합니다.

## 파일 구성

```text
src/
├── main.jsx              React 앱 시작점
├── app/router.jsx        URL과 페이지 연결
├── layouts/              학생 헤더·메뉴, 관리자 사이드바
├── components/           로고, 대화상자, 항목·값 표시
├── features/
│   ├── student/          catalog(물품), application(신청), guide(안내)
│   ├── admin/            대시보드, 신청, 대여, 재고, 학생, 통계, 운영
│   └── auth/             관리자 로그인 화면
└── utils/                날짜 표시 등 공통 함수
```

## 화면 경로

| 구분 | 경로 |
| --- | --- |
| 학생 홈·대여 신청 | `/`, `/apply` |
| 이용 안내·운영 시간·당직자 연락 | `/guide`, `/hours`, `/contact` |
| 관리자 로그인·대시보드 | `/login`, `/admin` |
| 신청·대여·재고·학생 | `/admin/requests`, `/admin/loans`, `/admin/stock`, `/admin/people` |
| 통계·운영 설정·임원·이력 | `/admin/stats`, `/admin/settings`, `/admin/staff`, `/admin/audit` |

React Router가 주소에 따라 공통 레이아웃 안에 해당 페이지를 표시합니다. 기존 북마크(예: `/admin/#loans`)도 새 주소로 이동합니다. 정적 서버에 배포할 때는 화면 경로로 직접 접속해도 `index.html`을 제공하도록 설정합니다.
