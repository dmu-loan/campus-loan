import { Pair } from "../../../components/Pair";

export function Rows({ rows }) {
  return rows.map(([k, v]) => <Pair key={k} label={k} value={v} />);
}
