import { useState } from "react";
import { Brand } from "./Pages.jsx";
import { usePage, Dialog, Pair, fmt } from "./shared.jsx";
import { summarizeWeek, loanStatus } from "./dashboard.js";
import { AdminStats } from "./AdminStats.jsx";
const pages = {
  overview: "대시보드",
  requests: "신청 목록",
  loans: "대여·반납",
  stock: "물품·고유번호",
  people: "지각·대여 제한",
  stats: "이용 통계",
  settings: "운영 설정",
  staff: "임원 연락처",
  audit: "작업 이력",
};
export function Metrics({ rows }) {
  return (
    <div className="metrics">
      {rows.map(([k, v]) => (
        <div className="card metric" key={k}>
          <small>{k}</small>
          <strong>{v}</strong>
        </div>
      ))}
    </div>
  );
}
function Record({ title, info, children }) {
  return (
    <article className="record">
      <div>
        <h3>{title}</h3>
        <small>{info}</small>
      </div>
      {children}
    </article>
  );
}
function Rows({ rows }) {
  return rows.map(([k, v]) => <Pair key={k} label={k} value={v} />);
}
function Requests({ list, open }) {
  return list.length ? (
    list.map((r) => (
      <Record
        key={r.id}
        title={r.title + " · " + r.name}
        info={r.student_no + " · " + fmt(r.created)}
      >
        <button onClick={() => open(r)}>신청 상세</button>
      </Record>
    ))
  ) : (
    <p className="empty">대기 중인 신청이 없습니다.</p>
  );
}
function Overview({ data, open }) {
  const { home, loans } = data,
    day = home.now.slice(0, 10),
    week = summarizeWeek(home, loans),
    most = week.items[0];
  return (
    <>
      <Metrics
        rows={[
          ["오늘 신청", data.todayRequests],
          ["신청 대기", data.requests.length],
          [
            "반환 대기",
            loans.filter((l) => loanStatus(l) === "반환 대기").length,
          ],
          ["현재 대여 중", loans.filter((l) => !l.returned).length],
          ["오늘 승인", loans.filter((l) => l.issued.startsWith(day)).length],
          [
            "기한 경과",
            loans.filter((l) => !l.returned && l.due < home.now).length,
          ],
        ]}
      />
      <h2>최근 신청</h2>
      <Requests list={data.requests.slice(0, 5)} open={open} />
      <section className="panel week-report">
        <h2>최근 7일 대여 현황</h2>
        <Pair
          label="최다 대여 물품"
          value={
            most?.count
              ? most.title + " · " + most.count + "건"
              : "대여 기록 없음"
          }
        />
        <div className="week">
          {week.daily.map(([d, n]) => (
            <div key={d}>
              <strong>{n}</strong>
              <small>{d.slice(5)}</small>
            </div>
          ))}
        </div>
        <details>
          <summary>물품별 승인 건수</summary>
          {week.items.map((i, n) => (
            <Pair key={n} label={i.title} value={i.count + "건"} />
          ))}
        </details>
      </section>
      <h2>업무 바로가기</h2>
      <div className="chips">
        {["requests", "loans", "stock", "stats"].map((k) => (
          <a key={k} className="btn" href={"#" + k}>
            {pages[k]}
          </a>
        ))}
      </div>
    </>
  );
}
function View({ page, data }) {
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState(""),
    [detail, setDetail] = useState(null);
  const { home } = data;
  const matches = (r) =>
    [r.name, r.student_no, r.phone, r.title, r.codes, r.officer].some((v) =>
      String(v ?? "").includes(query),
    );
  function openRequest(r) {
    setDetail({
      title: "신청 상세",
      rows: [
        ["물품", r.title],
        ["이름 · 학번", r.name + " · " + r.student_no],
        ["소속", r.faculty + " / " + r.department],
        ["전화번호", r.phone],
        ["신청 시각", fmt(r.created)],
        [
          "배정 가능 고유번호",
          data.units
            .filter((u) => u.item_id === r.item_id && u.state === "AVAILABLE")
            .map((u) => u.code)
            .join(", ") || "없음",
        ],
      ],
    });
  }
  const loans = data.loans.filter(
    (l) =>
      matches(l) &&
      (!filter ||
        filter === loanStatus(l) ||
        (filter === "지각" && l.late) ||
        (filter === "기한 경과" && !l.returned && l.due < home.now)),
  );
  return (
    <>
      <div className="sectiontitle">
        <h1>{pages[page]}</h1>
        <small>{fmt(home.now)} 기준</small>
      </div>
      {["requests", "loans", "people"].includes(page) && (
        <label>
          검색
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름, 학번, 물품 등"
          />
        </label>
      )}
      {page === "overview" && <Overview data={data} open={openRequest} />}
      {page === "requests" && (
        <Requests list={data.requests.filter(matches)} open={openRequest} />
      )}
      {page === "loans" && (
        <>
          <fieldset className="status-filter">
            <legend>처리 상태</legend>
            <div>
              {[
                "",
                "대여 중",
                "기한 경과",
                "지각",
                "반환 대기",
                "반환 완료",
              ].map((f) => (
                <label key={f}>
                  <input
                    type="radio"
                    name="status"
                    checked={filter === f}
                    onChange={() => setFilter(f)}
                  />
                  <span>{f || "전체"}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {loans.map((l) => (
            <Record
              key={l.id}
              title={l.title + " · " + l.name}
              info={
                loanStatus(l) + " · " + l.codes + " · 반납 기한 " + fmt(l.due)
              }
            >
              <button
                onClick={() =>
                  setDetail({
                    title: "대여 #" + l.id,
                    rows: [
                      ["상태", loanStatus(l)],
                      ["물품", l.title],
                      ["고유번호", l.codes],
                      ["학생", l.name + " · " + l.student_no],
                      ["전화번호", l.phone],
                      ["담당 임원", l.officer],
                      ["비고", l.memo || "—"],
                      ["승인 시각", fmt(l.issued)],
                      ["반납 기한", fmt(l.due)],
                      ["실제 반납", fmt(l.returned) || "—"],
                    ],
                  })
                }
              >
                상세 보기
              </button>
            </Record>
          ))}
          {!loans.length && (
            <p className="empty">표시할 대여 기록이 없습니다.</p>
          )}
        </>
      )}
      {page === "stock" && (
        <div className="catalog-list">
          {home.items.map((i) => (
            <Record
              key={i.id}
              title={i.title}
              info={`전체 ${i.total}개 · 대여 가능 ${i.available}개 · 대여 중 ${i.rented}개 · 사용 불가 ${i.total - i.available - i.rented}개`}
            >
              <button
                onClick={() =>
                  setDetail({
                    title: i.title,
                    rows: data.units
                      .filter((u) => u.item_id === i.id)
                      .map((u) => [
                        u.code,
                        {
                          AVAILABLE: "대여 가능",
                          OUT: "대여 중",
                          DISABLED: "사용 불가",
                        }[u.state],
                      ]),
                  })
                }
              >
                고유번호 보기
              </button>
            </Record>
          ))}
        </div>
      )}
      {page === "people" && (
        <>
          {data.borrowers.filter(matches).map((b) => (
            <Record
              key={b.student_no}
              title={b.name + " · " + b.student_no}
              info={
                "누적 지각 " +
                b.late_count +
                "회 · " +
                (b.suspended ? "정지" : "신청 가능")
              }
            />
          ))}
          {!data.borrowers.some(matches) && (
            <p className="empty">학생 기록이 없습니다.</p>
          )}
        </>
      )}
      {page === "stats" && <AdminStats data={data} />}
      {page === "settings" && (
        <>
          <section className="panel">
            <h2>정기 운영</h2>
            <Rows
              rows={[
                [
                  "운영 요일",
                  [..."월화수목금토일"]
                    .filter((_, i) => home.policy.weekdays.includes(i + 1))
                    .join(" · "),
                ],
                [
                  "운영 시간",
                  home.policy.opens.slice(0, 5) +
                    " – " +
                    home.policy.closes.slice(0, 5),
                ],
              ]}
            />
          </section>
          <section className="panel">
            <h2>대여 중단 기간</h2>
            {home.closures.map((c) => (
              <Record
                key={c.id}
                title={c.reason}
                info={c.starts + " ~ " + c.ends}
              />
            ))}
          </section>
        </>
      )}
      {page === "staff" &&
        data.staff.map((s) => (
          <Record
            key={s.id}
            title={s.name}
            info={
              (s.phone || "번호 미등록") +
              (s.username ? " · " + s.username : "")
            }
          />
        ))}
      {page === "audit" &&
        data.audit.map((a) => (
          <Record
            key={a.id}
            title={a.detail}
            info={fmt(a.happened) + " · " + a.actor}
          />
        ))}
      {detail && (
        <Dialog onClose={() => setDetail(null)}>
          <h2>{detail.title}</h2>
          <Rows rows={detail.rows} />
        </Dialog>
      )}
    </>
  );
}
export function AdminScreen({ data }) {
  const hash = usePage("overview"),
    page = Object.hasOwn(pages, hash) ? hash : "overview";
  return (
    <>
      <header>
        <div className="bar">
          <Brand />
          <div className="inline">
            <span>관리자</span>
            <form action="/login/" method="get">
              <button>로그아웃</button>
            </form>
          </div>
        </div>
      </header>
      <div className="desk">
        <aside data-master="true">
          <b>운영 관리</b>
          <nav id="tabs">
            {Object.entries(pages).map(([k, v]) => (
              <a
                href={"#" + k}
                key={k}
                className={k === page ? "on" : ""}
                aria-current={k === page ? "page" : undefined}
              >
                {v}
              </a>
            ))}
          </nav>
        </aside>
        <main id="app">
          <View key={page} page={page} data={data} />
        </main>
      </div>
    </>
  );
}
