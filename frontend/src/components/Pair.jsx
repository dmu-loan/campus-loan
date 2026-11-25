export function Pair({ label, value }) {
  return (
    <div className="pair">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
