import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";
import { formatDate as fmt } from "../../../utils/formatDate";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { matchesQuery } from "../components/matchesQuery";
import { loanStatus } from "../dashboard/summary";
export function LoansPage() {
  const { data, setDetail } = useOutletContext();
  const { home } = data;
  const [query, setQuery] = useState("");
  const matches = (r) => matchesQuery(r, query);
  const [filter, setFilter] = useState("");
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
      <SearchBox query={query} setQuery={setQuery} />
      <fieldset className="status-filter">
        <legend>처리 상태</legend>
        <div>
          {["", "대여 중", "기한 경과", "지각", "반환 대기", "반환 완료"].map(
            (f) => (
              <label key={f}>
                <input
                  type="radio"
                  name="status"
                  checked={filter === f}
                  onChange={() => setFilter(f)}
                />
                <span>{f || "전체"}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>
      {loans.map((l) => (
        <Record
          key={l.id}
          title={l.title + " · " + l.name}
          info={loanStatus(l) + " · " + l.codes + " · 반납 기한 " + fmt(l.due)}
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
      {!loans.length && <p className="empty">표시할 대여 기록이 없습니다.</p>}
    </>
  );
}
