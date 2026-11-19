export default function ItemList({ items, onSelect }) {
  if (items.length === 0) {
    return <p className="empty-state muted">등록된 물품이 없습니다.</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <button className="item-card" onClick={() => onSelect(item)} aria-haspopup="dialog">
            <span className="item-symbol" aria-hidden="true">{item.symbol}</span>
            <span className="item-info">
              <strong>{item.name}</strong>
              <span className="muted">전체 {item.total}개 · 대여 중 {item.total - item.available}개</span>
            </span>
            <span className={`item-stock ${item.available === 0 ? 'unavailable' : ''}`}>
              <strong>{item.available}개</strong>
              <span>{item.available > 0 ? '대여 가능' : '대여 불가'}</span>
            </span>
            <span aria-hidden="true">›</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
