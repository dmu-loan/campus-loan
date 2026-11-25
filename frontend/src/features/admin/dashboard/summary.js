export function summarizeWeek(home, loans) {
  const today = home.now.slice(0, 10);
  const daily = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today + "T00:00:00Z");
    date.setUTCDate(date.getUTCDate() - 6 + i);
    return [date.toISOString().slice(0, 10), 0];
  });
  const counts = new Map(
    home.items.map((i) => [String(i.id), { title: i.title, count: 0 }]),
  );
  for (const loan of loans) {
    const day = daily.find(([key]) => loan.issued.startsWith(key));
    if (!day) continue;
    day[1]++;
    const id = String(loan.item_id);
    const row = counts.get(id) || { title: loan.title, count: 0 };
    row.count++;
    counts.set(id, row);
  }
  return {
    daily,
    items: [...counts.values()].sort((a, b) => b.count - a.count),
  };
}
export function loanStatus(l) {
  if (!l.returned) return "대여 중";
  return (l.deposit_received && !l.deposit_back) ||
    (l.card_received && !l.card_back)
    ? "반환 대기"
    : "반환 완료";
}
