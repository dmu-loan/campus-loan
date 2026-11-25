import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { matchesQuery } from "../components/matchesQuery";

export function BorrowersPage() {
  const { data } = useOutletContext();
  const [query, setQuery] = useState("");
  const matches = (r) => matchesQuery(r, query);
  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />
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
  );
}
