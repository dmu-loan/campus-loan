import { useOutletContext } from "react-router-dom";
import { Record } from "../components/Record";

export function StockPage() {
  const { data, setDetail } = useOutletContext();
  const { home } = data;
  return (
    <div className="catalog-list">
      {home.items.map((i) => (
        <Record
          key={i.id}
          title={i.title}
          info={`전체 ${i.total}개 · 대여 가능 ${i.available}개 · 대여 중 ${i.rented}개 · 사용 불가 ${i.total - i.available - i.rented}개`}
        >
          <button
            onClick={() =>
              setDetail({
                title: i.title,
                rows: data.units
                  .filter((u) => u.item_id === i.id)
                  .map((u) => [
                    u.code,
                    {
                      AVAILABLE: "대여 가능",
                      OUT: "대여 중",
                      DISABLED: "사용 불가",
                    }[u.state],
                  ]),
              })
            }
          >
            고유번호 보기
          </button>
        </Record>
      ))}
    </div>
  );
}
