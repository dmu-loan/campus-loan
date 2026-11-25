import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";
import { formatDate as fmt } from "../../../utils/formatDate";

export function AuditPage() {
  const { data } = useOutletContext();
  return data.audit.map((a) => (
    <Record
      key={a.id}
      title={a.detail}
      info={fmt(a.happened) + " · " + a.actor}
    />
  ));
}
