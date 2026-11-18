# 🎓 빌려드립니다

> **빌리는 건 간편하게, 관리는 확실하게.** 동양미래대학교 한울타리 총학생회 물품 대여 관리 시스템

<br/>

## 📢 프로젝트 소개 (Project Overview)

**빌려드립니다**는 총학생회가 운영하는 물품 대여 서비스를 하나의 웹사이트로 통합한 시스템입니다. 학생은 로그인 없이 대여 가능한 물품을 확인하고 신청하며, 총학생회 임원은 승인·고유번호 배정·반납·연체·재고·운영 일정·이용 통계를 한곳에서 관리합니다.

- **기획 배경:** 기존에는 Google Forms로 신청을 받고 스프레드시트에 대여·반납을 수기로 기록했습니다. 물품별 재고를 바로 확인하기 어렵고, 승인과 반납 이력이 여러 곳에 흩어져 담당자의 수작업에 의존하는 문제가 있었습니다.
- **주요 사용자:**
  - **재학생:** 물품 조회, 대여 신청, 당직자 연락 (로그인 없음)
  - **총학생회 임원:** 대여 승인, 반납 관리, 재고·통계 확인 (관리자 로그인)
  - **총학생회 회장단:** 운영 설정, 임원·계정 관리 (최고 관리자)
- **핵심 가치:**
  - **실시간 재고와 자동 검사:** 운영시간·공휴일·시험기간·재고·이용 제한을 서버가 확인해 신청 가능 여부를 즉시 안내합니다.
  - **대여 이력의 일원화:** 신청부터 고유번호 배정, 보증금·학생증 수령, 반납, 연체 판정까지 하나의 흐름으로 기록합니다.
  - **임원 개인정보 보호:** 학생 화면에 임원의 이름·직급·전화번호를 직접 표시하지 않고 당직자 전화 연결 버튼만 제공합니다.

<br/>

## 👥 팀원 및 역할 분담 (Team & Roles)

| 이름 | 역할 및 담당 | GitHub |
| :---: | :--- | :--- |
| **이채린** | • 백엔드<br>• 레포 초기 설정, DB·API 설계<br>• 대여·반납·운영 정책, 외부 API 연동 | [@Chae102](https://github.com/Chae102) |
| **이효정** | • 프론트엔드<br>• 학생용 모바일 UI, 관리자 데스크톱 UI | [@wendygirl1336](https://github.com/wendygirl1336) |

<br/>

## 📱 주요 기능 (Features)

| 서비스 | 기능 | 설명 |
| :--- | :--- | :--- |
| **학생** | 물품 대여 현황 | 품목별 잔여 수량과 대여 가능 여부 확인 |
| | 대여 신청 | 유의사항 확인 → 학부·학과·학번·이름·연락처·물품 입력 → 반납 기한 확인 |
| | 당직자 전화 연결 | 임원 정보를 노출하지 않고 당직자 A/B 전화 연결 |
| | 이용 안내 | 보증금·학생증·반납 규정·운영시간·FAQ |
| **관리자** | 신청 승인 | 신청 품목의 고유번호 선택, 담당 임원 지정, 보증금·학생증 수령 확인 |
| | 반납 처리 | 보증금·학생증 반환 확인, 재고 복구, 연체 판정 |
| | 물품·재고 관리 | 품목·고유번호 등록, 사용 불가 처리, 품목 사진 |
| | 운영·당직 관리 | 운영 요일·시간, 시험기간·임시 휴무, Google Sheets 당직표 |
| | 연체·이용 제한 | 연체 3회 누적 시 자동 제한, 관리자 해제와 사유·이력 관리 |
| | 이용 통계 | 기간·품목·요일·시간대별 대여 현황 차트 |
| | 임원·계정 관리 | 임원 연락처·직급 관리, 관리자 계정 발급 (최고 관리자) |
| **외부 연동** | 문자 알림 | SOLAPI로 승인·반납 안내·반납 완료·연체 문자 발송 |
| | 공휴일 조회 | 공공데이터포털 특일 정보 API로 공휴일 자동 휴무 처리 |

### 대여 및 반납 정책

| 구분 | 정책 |
| :--- | :--- |
| 보증금 / 신분 확인 | 현금 10,000원 / 학생증 보관 |
| 반납 기한 | 일반 물품은 대여 당일, 우산은 다음 운영일 |
| 휴무 조건 | 운영시간 외, 시험기간, 공휴일, 관리자 지정 휴무일 |
| 이용 제한 | 연체 3회 누적 시 대여 차단, 관리자 수동 해제 |

<br/>

## 🏗️ 시스템 아키텍처 (Architecture)

```text
[학생 모바일 웹] ─┐                       ┌─▶ [MySQL 8.4]
                 ├─▶ [React SPA] ──REST──▶ [Spring Boot API] ─┼─▶ [SOLAPI 문자 발송]
[관리자 데스크톱] ─┘    (Vite)    세션+CSRF  (Spring Security)  ├─▶ [공공데이터포털 공휴일 API]
                                                              └─▶ [Google Sheets 당직표 CSV]
```

- 학생과 관리자는 같은 웹사이트에 접속하며, 학생 화면은 모바일 중심, 관리자 화면은 데스크톱 중심으로 구성합니다.
- 관리자 인증은 세션 쿠키와 CSRF 토큰 기반이며, 권한은 임원(`ADMIN`)과 최고 관리자(`MASTER`)로 구분합니다.

<br/>

## 📔 Tech Stack

| 분류 | 기술 | 비고 |
| :--- | :--- | :--- |
| **Backend** | Java 17, Spring Boot 4.1 | REST API 서버 |
| **Security** | Spring Security, BCrypt | 관리자 인증·권한 제어 |
| **Data** | Spring Data JPA, Flyway | 엔티티 매핑, 스키마 버전 관리 |
| **Database** | MySQL 8.4 (Docker) | 개발·테스트 동일 환경 |
| **Frontend** | React, JavaScript, Vite | SPA, 빠른 HMR |
| **Chart** | Chart.js | 이용 통계 시각화 |
| **External** | SOLAPI, 공공데이터포털 특일 정보 API, Google Sheets CSV | 문자 알림, 공휴일, 당직표 |
| **Test** | JUnit 5, Testcontainers | 실제 MySQL 컨테이너로 통합 테스트 |
| **Quality** | Spotless (google-java-format), ESLint, Prettier | 코드 포맷·컨벤션 |
| **CI** | GitHub Actions | PR마다 변경 영역 테스트·빌드 |
| **Collaboration** | GitHub, Notion, Figma | 형상 관리, 문서, 디자인 |

<br/>

## ⚙️ Prerequisites (사전 요구 사항)

- **Docker Desktop:** MySQL 컨테이너와 Testcontainers 테스트에 필요합니다.
- **JDK 17:** 설치되어 있지 않으면 Gradle이 자동으로 내려받습니다.
- **Node.js:** `frontend/.nvmrc`에 적힌 버전 (LTS)

> **Tip:** 팀원 간 Node 버전을 맞추기 위해 NVM 사용을 권장합니다. `frontend/` 폴더에서 `nvm use`를 실행하세요.

<br/>

## 🚀 Getting Started (설치 및 실행)

### 1. 프로젝트 클론

```bash
git clone https://github.com/dmu-loan/campus-loan.git
cd campus-loan
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env`를 열어 비밀번호 값을 채웁니다. DB 비밀번호는 처음 MySQL 컨테이너를 만들 때 사용되는 새 값입니다. `.env`는 커밋하지 않습니다.

| 변수 | 설명 |
| :--- | :--- |
| `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` | 앱이 사용할 MySQL DB·계정 |
| `DB_PORT` | MySQL 포트 (기본 3306) |
| `MYSQL_ROOT_PASSWORD` | MySQL root 비밀번호 |
| `ADMIN_PASSWORD` | 최고 관리자 계정 비밀번호 |
| `SHEETS_ID`, `GOOGLE_APPLICATION_CREDENTIALS` | 당직표 Google Sheets 설정 |

### 3. DB 실행

```bash
docker compose up -d
docker compose ps   # campus-loan-mysql 이 healthy 인지 확인
```

### 4. 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

`http://localhost:8080`에서 서버가 실행됩니다. 서버가 시작될 때 Flyway가 테이블 구조를 자동으로 맞춥니다.

### 5. 프론트엔드 실행

```bash
cd frontend
npm ci
npm run dev
```

`http://localhost:5173`에서 화면을 확인합니다. `/api` 요청은 백엔드(`8080`)로 프록시됩니다.

<br/>

## 📂 Project Structure (폴더 구조)

```text
campus-loan/
├── backend/                         # Spring Boot (담당: @Chae102)
│   ├── build.gradle
│   └── src/
│       ├── main/java/kr/ac/dongyang/loan/
│       │   ├── item/                # 품목·고유번호·사진
│       │   ├── rental/              # 대여 신청·승인·반납
│       │   ├── borrower/            # 학생·이용 제한
│       │   ├── staff/               # 임원·관리자 계정
│       │   ├── policy/              # 운영시간·휴무·공휴일
│       │   ├── duty/                # 당직표 연동
│       │   ├── notification/        # 문자 발송
│       │   ├── stats/               # 이용 통계
│       │   └── global/              # 보안, 예외 처리, 공통 설정
│       ├── main/resources/
│       │   ├── application.yml      # 공통 설정
│       │   ├── application-local.yml # 로컬 MySQL 접속
│       │   └── db/migration/        # Flyway 마이그레이션 (V1__init.sql …)
│       └── test/
├── frontend/                        # React (담당: @wendygirl1336)
├── .github/                         # PR·이슈 템플릿, CODEOWNERS, CI
├── docker-compose.yml               # 로컬 MySQL
└── .env.example                     # 환경 변수 목록
```

### 백엔드 개발 원칙

1. **도메인 중심 패키지:** 기능별 패키지 안에 `Controller`, `Service`, `Repository`, `Entity`, `dto`를 함께 둡니다.
2. **계층 책임 분리:** Controller는 요청·응답만, Service는 비즈니스 로직만, Repository는 DB 접근만 담당합니다. Controller에서 Repository를 직접 호출하지 않습니다.
3. **Entity 비노출:** API 응답에는 Entity 대신 DTO를 사용합니다.
4. **스키마는 Flyway로만:** 테이블 변경은 새 마이그레이션 파일로 추가하고, 병합된 파일은 수정하지 않습니다.
5. **시간은 서울 기준:** 모든 업무 시각은 `Asia/Seoul` 기준으로 처리합니다.

<br/>

## 🛠️ 스크립트

```bash
# DB
docker compose up -d         # MySQL 실행
docker compose down          # MySQL 중지 (데이터 유지)
docker compose down -v       # MySQL 초기화 (데이터 삭제)

# 백엔드 (backend/)
./gradlew bootRun            # 개발 서버 실행
./gradlew test               # 테스트 (Docker 필요)
./gradlew spotlessApply      # 코드 포맷 자동 정리
./gradlew check              # 포맷 검사 + 테스트 (CI와 동일)

# 프론트엔드 (frontend/)
npm run dev                  # 개발 서버 실행
npm run lint                 # 린트 검사
npm run build                # 프로덕션 빌드
```

<br/>

## 🤝 Contribution Guide (협업 규칙)

### 1. Git Flow 및 브랜치 전략

```text
main (제출·발표용) ← develop (기본 브랜치, 통합) ← <type>/<영역>-<이슈번호>-<설명>
```

- `main`: 제출·발표용 안정 버전. `develop`에서 PR로만 병합하고 마일스톤마다 태그(`v0.1`, `v1.0`)를 붙입니다.
- `develop`: 개발 통합 브랜치. 직접 푸시는 막혀 있으며 작업 브랜치에서 PR로만 병합합니다.
- 작업 브랜치: 이슈 하나에 브랜치 하나. 최신 `develop`에서 분기하고 병합 후 삭제합니다.

**📌 브랜치 명명 규칙: `타입/영역-이슈번호-설명`**

| 타입 | 설명 | 사용 예시 |
| :--- | :--- | :--- |
| `feature` | 새로운 기능 추가 | `feature/be-12-items-api` |
| `fix` | 버그 수정 | `fix/be-20-umbrella-due` |
| `refactor` | 동작 변화 없는 구조 개선 | `refactor/fe-31-api-client` |
| `docs` | README 등 문서 수정 | `docs/common-5-readme` |
| `chore` | 빌드·설정·의존성·CI | `chore/common-2-ci` |

- 영역: `be`(백엔드), `fe`(프론트엔드), `common`(공통)
- 브랜치 이름에 `#`은 쓰지 않습니다. (셸에서 주석으로 처리될 수 있음)
- 브랜치는 **반나절~2일 안에 병합**할 수 있는 크기로 만듭니다.

### 1-1. 이슈 생성 기준

- 작업 전 이슈를 먼저 만들고, 이슈 템플릿(기능·버그)에 맞춰 작성합니다.
- 이슈 페이지의 **Development → Create a branch**로 브랜치를 만들면 이슈와 자동으로 연결됩니다.
- 라벨: `BE`, `FE`, `feature`, `bug`, `api`, `db`, `docs`, `chore`

### 2. Commit Convention

```text
<type>(<scope>): <요약>
```

- type: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`
- scope: `be`, `fe`, `api`, `db`
- 요약은 한국어로, 마침표 없이 50자 이내

```text
feat(be): 물품 목록 조회 API 구현
feat(fe): 대여 신청 폼 구현
fix(be): 우산 반납 기한이 휴무일에 잡히는 문제 수정
style(fe): Prettier 적용
```

- 포맷만 바꾼 변경은 기능 변경과 섞지 않고 `style` 커밋으로 분리합니다.

### 3. Code Quality (PR 전 필수 확인)

```bash
# 백엔드
./gradlew spotlessApply && ./gradlew check

# 프론트엔드
npm run lint && npm run build
```

PR과 `develop`·`main` 푸시 때 GitHub Actions가 바뀐 영역만 같은 검사를 실행합니다. 최종 결과 체크 `ci-result`가 통과해야 병합할 수 있습니다.

### 4. develop 동기화 규칙

- **새 작업 시작:** `git switch develop` → `git pull` → `git switch -c <브랜치명>`
- **PR에 충돌이 표시될 때:** 작업 브랜치에서 `git pull origin develop` → 충돌 해결 → 커밋 → 푸시
- 공유된(푸시된) 브랜치에서는 `push --force`를 사용하지 않습니다.
- 병합 후 로컬 정리: `git switch develop && git pull && git branch -d <브랜치명> && git fetch -p`

<br/>

## 🚀 PR 컨벤션 (Pull Request Convention)

### 1. PR 제목 규칙

**형식:** `태그(영역): 작업 내용 요약 (#이슈번호)`

**예시:** `feat(be): 대여 신청 API 구현 (#12)`

### 2. PR 본문 작성 규칙

`.github/pull_request_template.md`에 맞춰 작성합니다.

1. **관련 이슈:** `Closes #이슈번호`로 자동 연동
2. **작업 내용:** 핵심 변경 사항 요약
3. **변경 영역:** BE / FE / API 변경(노션 API 명세 수정) / DB 변경(마이그레이션 추가, 노션 ERD 수정)
4. **확인 방법:** 리뷰어가 따라 할 수 있는 확인 순서
5. **스크린샷:** 화면 변경 시 캡처 또는 GIF

### 3. 코드 리뷰 규칙 (P-Rule)

| 태그 | 의미 |
| :--- | :--- |
| `[P1] 필수` | 버그, 보안 문제, 규칙 위반 — 반드시 수정 후 병합 |
| `[P2] 권장` | 더 나은 구현 제안 — 합당한 이유가 있으면 유지 가능 |
| `[P3] 의견` | 가벼운 제안, 칭찬 |

- 리뷰 요청을 받으면 24시간 안에 응답합니다.
- 질문과 결정 사항은 PR·이슈 댓글로 남깁니다.

### 4. 머지(Merge) 조건

- 상대방의 **Approve 1개 이상**과 **CI(`ci-result`) 통과**가 필요합니다. (GitHub Rulesets로 강제)
- 리뷰 댓글은 모두 해결(Resolve) 상태여야 합니다.
- 모든 피드백 반영 후 **PR을 올린 본인이 직접** 병합합니다.
  - 작업 브랜치 → `develop`: **Squash merge**
  - `develop` → `main`: **Merge commit** (Squash하면 두 브랜치 기록이 갈라져 다음 병합 때 충돌이 납니다)

### 5. 영역 규칙

- 각자 자기 영역(`backend/`, `frontend/`)만 수정합니다. 상대 영역을 고쳐야 하면 PR에서 상대방에게 리뷰를 요청합니다.
- 공용 파일(`.github/`, 루트 설정 파일, `docker-compose.yml`)은 수정 전에 알립니다.
- 리뷰 담당자는 `CODEOWNERS`에 따라 자동 지정됩니다.

<br/>

## 🔗 링크

- 기획서 — 노션 (링크 준비 중)
- ERD — 노션 (링크 준비 중)
- API 명세 — 노션 (링크 준비 중)
- 디자인 — Figma (링크 준비 중)

<br/>

## ⚠️ Troubleshooting (문제 해결)

**Q. `docker compose up` 시 `Only one usage of each socket address` 오류가 나요.**
> **A.** PC에 설치된 MySQL이 3306 포트를 쓰고 있습니다. `.env`에서 `DB_PORT=3307`로 바꾼 뒤 다시 실행하세요. DB 툴로 접속할 때도 3307을 사용합니다.

**Q. `docker` 명령을 찾을 수 없거나 Docker 연결 오류가 나요.**
> **A.** Docker Desktop이 실행 중인지 확인하세요. 설치 직후라면 터미널을 새로 열어야 `docker` 명령이 인식됩니다.

**Q. `./gradlew test`가 Docker 관련 오류로 실패해요.**
> **A.** 테스트는 Testcontainers로 MySQL 컨테이너를 띄웁니다. Docker Desktop을 실행한 상태에서 다시 시도하세요.

**Q. CI에서 `spotlessJavaCheck`가 실패해요.**
> **A.** 코드 포맷이 맞지 않아서입니다. `./gradlew spotlessApply`를 실행한 뒤 다시 커밋하세요.

**Q. DB 비밀번호를 바꿨더니 백엔드가 DB에 접속하지 못해요.**
> **A.** MySQL 비밀번호는 컨테이너를 처음 만들 때만 적용됩니다. `docker compose down -v`로 초기화한 뒤 다시 `docker compose up -d` 하세요. (데이터가 삭제됩니다)

**Q. `git commit` 때 `LF will be replaced by CRLF` 경고가 나와요.**
> **A.** Windows 줄바꿈 변환 안내입니다. 저장소는 `.gitattributes`로 LF를 사용하므로 무시해도 됩니다.
