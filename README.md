# 🎓 빌려드립니다

동양미래대학교 한울타리 총학생회 물품 대여 관리 시스템

학생의 대여 신청부터 관리자의 승인·반납, 재고 관리, 이용 통계까지 하나의 웹 서비스에서 처리합니다.

> 기획서, ERD, API 명세 등 설계 문서는 팀 노션에서 관리합니다.

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

PC에 MySQL이 이미 설치되어 3306 포트를 쓰고 있다면 `.env`에서 `DB_PORT=3307`로 바꿉니다.

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

## Git 협업 규칙

### 브랜치

| 브랜치 | 용도 | 규칙 |
| --- | --- | --- |
| `main` | 제출·발표용 안정 버전 | `develop`에서 PR로만 병합, 마일스톤마다 태그(`v0.1`, `v1.0`) |
| `develop` | 기본 브랜치, 개발 통합 | 직접 푸시 금지, 작업 브랜치에서 PR로만 병합 |
| 작업 브랜치 | 이슈 하나 = 브랜치 하나 | 최신 `develop`에서 분기, 병합 후 삭제 |

작업 브랜치 이름:

```text
<type>/<영역>-<이슈번호>-<짧은-설명>
```

| type | 용도 |
| --- | --- |
| `feature` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 동작 변화 없는 구조 개선 |
| `docs` | 문서 |
| `chore` | 설정·빌드·기타 |

- 영역: `be`(백엔드), `fe`(프론트엔드), `common`(공통)
- 예: `feature/be-12-items-api`, `feature/fe-13-item-list`, `fix/be-20-umbrella-due`
- 브랜치 이름에 `#`은 쓰지 않습니다. (셸에서 주석으로 처리될 수 있음)
- 브랜치는 **반나절~2일 안에 병합**할 수 있는 크기로 만듭니다.

### 커밋 메시지

```text
<type>(<scope>): <요약>
```

- type: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`
- scope: `be`, `fe`, `api`, `db`
- 요약은 한국어로, 마침표 없이 50자 이내
- 예: `feat(be): 물품 목록 조회 API 구현`, `feat(fe): 대여 신청 폼 구현`, `fix(be): 우산 반납 기한이 휴무일에 잡히는 문제 수정`
- 포맷만 바꾼 변경은 기능 변경과 섞지 않고 `style` 커밋으로 분리합니다.
- 백엔드는 커밋 전 `./gradlew spotlessApply`로 코드 포맷을 맞춥니다.

### Pull Request

1. 작업 전 `develop`을 최신으로 받습니다.
2. 작업 브랜치에서 작게 자주 커밋합니다.
3. PR을 올리기 전 최신 `develop`을 반영하고 로컬에서 테스트·빌드를 통과시킵니다.
4. PR 템플릿을 채웁니다. (관련 이슈, 작업 내용, 확인 방법, 화면 변경 시 스크린샷)
5. 상대방 리뷰 **승인 1개**와 CI 통과 후 병합합니다.
6. 병합은 **작성자가** 합니다. 병합된 원격 브랜치는 자동 삭제됩니다.
   - 작업 브랜치 → `develop`: **Squash merge**
   - `develop` → `main`: **Merge commit** (Squash하면 두 브랜치 기록이 갈라져 다음 병합 때 충돌이 납니다)

- PR은 가능하면 변경 400줄 이하로 유지합니다.
- 리뷰 요청을 받으면 24시간 안에 응답합니다.
- 질문과 결정 사항은 PR·이슈 댓글로 남깁니다.

### 영역

- 각자 자기 영역(`backend/`, `frontend/`)만 수정합니다.
- 상대 영역을 수정해야 하면 PR에서 상대방에게 리뷰를 요청합니다.
- 공용 파일(`.github/`, 루트 설정 파일, `docker-compose.yml`)은 수정 전에 알립니다.

### 하루 작업 흐름

```bash
git switch develop && git pull
git switch -c feature/be-12-items-api
# 작업 & 커밋
git push -u origin HEAD
# GitHub에서 develop 대상으로 PR 생성
```

병합 후 정리:

```bash
git switch develop && git pull
git branch -d feature/be-12-items-api
git fetch -p
```

### 일정

- 과제 일정은 GitHub 마일스톤으로 관리합니다.
- 이슈 상태는 Projects 보드에서 바로 옮깁니다. (Todo → In Progress → Review → Done)
- 제출 전 `develop` → `main` PR을 병합하고 태그를 붙입니다.
