# 빌려드립니다 프론트엔드

Node.js 버전은 .nvmrc를 따릅니다. frontend에서 npm ci 후 npm run dev로 실행합니다.
학생 홈은 /, 대여 신청은 /apply/, 관리자 대시보드는 /admin/, 로그인 화면은 /login/입니다.

기존 Spring 프로젝트의 HTML, CSS, Pretendard 폰트와 이미지를 사용합니다.
화면은 일반 JavaScript로 동작하며 Vite로 빌드합니다. public/sample-data.json은 화면 확인용 데이터입니다.
실제 신청·로그인·관리 변경은 서버 연결 후 가능합니다. 신청 정보는 사용자가 기기 저장을 선택한 경우에만 브라우저에 저장합니다.

npm run lint로 정적 검사를, npm test로 입력 검증 테스트를, npm run build로 배포용 빌드를 실행합니다.
