import { Record } from "../components/Record";
import { formatDate as fmt } from "../../../utils/formatDate";

export function RequestList({ list, open }) {
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
