import { useOutletContext } from "react-router-dom";

import "chart.js/auto";
import { Chart as ReactChart } from "react-chartjs-2";
import { useState } from "react";
import { Pair } from "../../../components/Pair";
import { loanStatus } from "../dashboard/summary";

function series(list, label, keys = []) {
  const values = new Map(keys.map((k) => [k, 0]));
  for (const loan of list) {
    const k = label(loan);
    values.set(k, (values.get(k) || 0) + 1);
  }
  return [...values];
}
function periodLabel(issued, period) {
  const date = issued.slice(0, 10);
  if (period === "month") return date.slice(0, 7);
  if (period === "day") return date;
  const d = new Date(date + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
function Chart({ title, values }) {
  const series = {
    labels: values.map(([key]) => key),
    datasets: [
      {
        label: title,
        data: values.map(([, count]) => count),
        borderColor: "#536986",
        backgroundColor: "#7088a9",
      },
    ],
  };
  const options = {
    animation: false,
    maintainAspectRatio: false,
    indexAxis: title === "물품별 대여 횟수" ? "y" : "x",
    scales: {
      x: { ticks: { maxRotation: 0, maxTicksLimit: 8 } },
      y: { ticks: { precision: 0 } },
    },
    plugins: { legend: { display: false } },
  };
  return (
    <section className="card">
      <h3>{title}</h3>
      <div className="plot-area">
        <ReactChart
          type={title === "대여 추이" ? "line" : "bar"}
          data={series}
          options={options}
          aria-label={title}
        />
      </div>
      <details>
        <summary>수치 보기</summary>
        {values.map(([key, count]) => (
          <Pair key={key} label={key} value={count + "건"} />
        ))}
      </details>
    </section>
  );
}
export function StatsPage() {
  const { data } = useOutletContext();
  const [start, setStart] = useState(""),
    [end, setEnd] = useState(""),
    [id, setId] = useState(""),
    [period, setPeriod] = useState("day");
  const list = data.loans.filter(
      (l) =>
        (!id || String(l.item_id) === id) &&
        (!start || l.issued.slice(0, 10) >= start) &&
        (!end || l.issued.slice(0, 10) <= end),
    ),
    done = list.filter((l) => l.returned);
  const late = done.filter((l) => l.late).length;
  const hours = [
    "00–06시",
    "06–09시",
    "09–12시",
    "12–15시",
    "15–18시",
    "18–24시",
  ];
  return (
    <>
      <section className="panel">
        <div className="formgrid">
          <label>
            시작일
            <input
              type="date"
              value={start}
              max={end || undefined}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            종료일
            <input
              type="date"
              value={end}
              min={start || undefined}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <label>
            물품
            <select value={id} onChange={(e) => setId(e.target.value)}>
              <option value="">전체</option>
              {data.home.items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            집계 단위
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              {Object.entries({ day: "일별", week: "주별", month: "월별" }).map(
                ([k, v]) => (
                  <option value={k} key={k}>
                    {v}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </section>
      <div className="metrics">
        {[
          ["승인 건수", list.length],
          [
            "평균 이용 시간",
            (done.length
              ? Math.round(
                  done.reduce(
                    (s, l) =>
                      s +
                      (Date.parse(l.returned + "+09:00") -
                        Date.parse(l.issued + "+09:00")) /
                        60000,
                    0,
                  ) / done.length,
                )
              : 0) + "분",
          ],
          ["미반납", list.length - done.length],
          [
            "반환 대기",
            done.filter((l) => loanStatus(l) === "반환 대기").length,
          ],
        ].map(([k, v]) => (
          <div className="card metric" key={k}>
            <small>{k}</small>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
      <Pair
        label="지각 건수 / 반납 대비 비율"
        value={
          late +
          "건 / " +
          (done.length ? ((100 * late) / done.length).toFixed(1) : 0) +
          "%"
        }
      />
      <div className="charts">
        <Chart
          title="대여 추이"
          values={series(list, (l) => periodLabel(l.issued, period)).sort(
            ([a], [b]) => a.localeCompare(b),
          )}
        />
        <Chart
          title="물품별 대여 횟수"
          values={series(
            list,
            (l) => l.title,
            data.home.items.map((i) => i.title),
          )}
        />
        <Chart
          title="요일별 이용"
          values={series(
            list,
            (l) =>
              "일월화수목금토"[
                new Date(l.issued.slice(0, 10) + "T00:00:00Z").getUTCDay()
              ],
            [..."월화수목금토일"],
          )}
        />
        <Chart
          title="시간대별 이용"
          values={series(
            list,
            (l) =>
              hours[
                [6, 9, 12, 15, 18, 24].findIndex(
                  (h) => Number(l.issued.slice(11, 13)) < h,
                )
              ],
            hours,
          )}
        />
      </div>
    </>
  );
}
