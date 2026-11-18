# 협업 규칙

## 1. 브랜치

| 브랜치 | 용도 | 규칙 |
| --- | --- | --- |
| `main` | 제출·발표용 안정 버전 | `develop`에서 PR로만 병합, 마일스톤마다 태그(`v0.1`, `v1.0`) |
| `develop` | 기본 브랜치, 개발 통합 | 직접 푸시 금지, 작업 브랜치에서 PR로만 병합 |
| 작업 브랜치 | 이슈 하나 = 브랜치 하나 | 최신 `develop`에서 분기, 병합 후 삭제 |

### 작업 브랜치 이름

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

## 2. 커밋 메시지

```text
<type>(<scope>): <요약>
```

- type: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`
- scope: `be`, `fe`, `api`, `db`, `docs`
- 요약은 한국어로, 마침표 없이 50자 이내
- 예
  - `feat(be): 물품 목록 조회 API 구현`
  - `feat(fe): 대여 신청 폼 구현`
  - `fix(be): 우산 반납 기한이 휴무일에 잡히는 문제 수정`
  - `style(fe): Prettier 적용`
- 포맷만 바꾼 변경은 기능 변경과 섞지 않고 `style` 커밋으로 분리합니다.

## 3. Pull Request

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

## 4. 영역 규칙

- 각자 자기 영역(`backend/`, `frontend/`)만 수정합니다.
- 상대 영역을 수정해야 하면 PR에서 상대방에게 리뷰를 요청합니다.
- 공용 파일(`.github/`, 루트 설정 파일, `docs/api.md`, `docker-compose.yml`)은 수정 전에 알립니다.

## 5. API 변경 규칙

1. 새 API나 응답 형식 변경은 **`docs/api.md` 수정 PR을 먼저** 올리고 둘 다 승인합니다.
2. 백엔드는 합의된 명세대로 구현하고, 프론트엔드는 합의된 예시 JSON으로 목업을 만들어 먼저 진행합니다.
3. 기존 필드의 삭제·이름 변경은 상대방 승인이 필수입니다. 가능하면 필드를 추가하는 방식으로 바꿉니다.

## 6. DB 변경 규칙

- 스키마 변경은 Flyway 마이그레이션 파일(`backend/src/main/resources/db/migration/V{번호}__{설명}.sql`)로만 합니다.
- 이미 `develop`에 병합된 마이그레이션 파일은 수정하지 않고, 새 버전 파일을 추가합니다.

## 7. 하루 작업 흐름

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

## 8. 일정

- 과제 일정은 GitHub 마일스톤으로 관리합니다.
- 이슈 상태는 Projects 보드에서 바로 옮깁니다. (Todo → In Progress → Review → Done)
- 주 1~2회 짧게 진행 상황을 공유합니다.
- 제출 전 `develop` → `main` PR을 병합하고 태그를 붙입니다.
