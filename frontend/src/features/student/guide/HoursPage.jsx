import { Pair } from "../../../components/Pair";
import { useOutletContext } from "react-router-dom";
export function HoursPage() {
  const { home } = useOutletContext();
  return (
    <>
      <div className="guide-head">
        <h1>운영 시간 안내</h1>
      </div>
      <section className="panel">
        <span className="pill">{home.closed || "운영 중"}</span>
        <h2>정기 운영 시간</h2>
        {[..."월화수목금토일"].map((day, i) => (
          <Pair
            key={day}
            label={day + "요일"}
            value={
              home.policy.weekdays.includes(i + 1)
                ? home.policy.opens.slice(0, 5) +
                  " – " +
                  home.policy.closes.slice(0, 5)
                : "휴무"
            }
          />
        ))}
      </section>
      <section className="panel closure-list">
        <h2>대여 중단 기간</h2>
        {home.closures.length ? (
          home.closures.map((c) => (
            <article key={c.id}>
              <strong>{c.reason}</strong>
              <small>
                {c.starts} – {c.ends}
              </small>
            </article>
          ))
        ) : (
          <p className="closure-empty">예정된 대여 중단 기간이 없습니다.</p>
        )}
      </section>
    </>
  );
}
