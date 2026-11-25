import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";
import { Rows } from "../components/Rows";
export function SettingsPage() {
  const {
    data: { home },
  } = useOutletContext();
  return (
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
  );
}
