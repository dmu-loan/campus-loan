import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";

export function StaffPage() {
  const { data } = useOutletContext();
  return data.staff.map((s) => (
    <Record
      key={s.id}
      title={s.name}
      info={(s.phone || "번호 미등록") + (s.username ? " · " + s.username : "")}
    />
  ));
}
