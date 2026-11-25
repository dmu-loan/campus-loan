import { useOutletContext } from "react-router-dom";
import { Pair } from "../../../components/Pair";
import { RequestList } from "../requests/RequestList";
import { requestDetail } from "../requests/requestDetail";
import { Link } from "react-router-dom";
import { pages, adminPath } from "../navigation";
import { summarizeWeek, loanStatus } from "./summary";
function Metrics({ rows }) {
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
export function DashboardPage() {
  const { data, setDetail } = useOutletContext();
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
      <RequestList
        list={data.requests.slice(0, 5)}
        open={(r) => setDetail(requestDetail(r, data.units))}
      />
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
          <Link key={k} className="btn" to={adminPath(k)}>
            {pages[k]}
          </Link>
        ))}
      </div>
    </>
  );
}
