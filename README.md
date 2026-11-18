# 🎓 빌려드립니다

동양미래대학교 한울타리 총학생회 물품 대여 관리 시스템

학생의 대여 신청부터 관리자의 승인·반납, 재고 관리, 이용 통계까지 하나의 웹 서비스에서 처리합니다.

## 팀

| 역할 | GitHub |
| --- | --- |
| Backend | [@Chae102](https://github.com/Chae102) |
| Frontend | [@wendygirl1336](https://github.com/wendygirl1336) |

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Backend | Java 17, Spring Boot, Spring Security, Spring Data JPA, Flyway |
| Frontend | React (JavaScript), Vite |
| Database | MySQL 8.4 (Docker) |
| CI | GitHub Actions |

## 폴더 구조

```text
campus-loan/
├─ backend/            Spring Boot 애플리케이션
├─ frontend/           React 애플리케이션
├─ docs/
│  ├─ api.md           API 명세 (백엔드·프론트 계약)
│  └─ CONVENTION.md    협업 규칙 (브랜치·커밋·PR)
├─ .github/            PR·이슈 템플릿, CODEOWNERS, CI
├─ docker-compose.yml  로컬 MySQL
└─ .env.example        환경변수 목록
```

## 시작하기

### 1. 준비물

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- JDK 17 (없으면 Gradle이 자동으로 내려받습니다)
- Node.js (버전은 `frontend/.nvmrc` 참고)

### 2. 환경변수

```bash
cp .env.example .env
```

`.env`를 열어 비밀번호 값을 채웁니다. `.env`는 커밋하지 않습니다.

### 3. DB 실행

```bash
docker compose up -d
```

### 4. 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

### 5. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

- 프론트엔드: <http://localhost:5173>
- 백엔드 API: <http://localhost:8080/api>

## 협업

- 작업 전 [협업 규칙](docs/CONVENTION.md)을 확인합니다.
- API를 추가·변경할 때는 [API 명세](docs/api.md)를 먼저 수정합니다.
