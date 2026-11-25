import { useNavigate } from "react-router-dom";
import { Dialog } from "../../../components/Dialog";
import { Pair } from "../../../components/Pair";
import { ItemImage } from "./ItemImage";
import { dueLabel } from "./items";
export function ItemDetail({ item, onClose }) {
  const navigate = useNavigate();
  return (
    <Dialog onClose={onClose}>
      <ItemImage item={item} />
      <h2>{item.title}</h2>
      {[
        ["전체 수량", item.total + "개"],
        ["대여 중", item.rented + "개"],
        ["대여 가능", item.available + "개"],
        ["반납 원칙", dueLabel(item)],
      ].map(([k, v]) => (
        <Pair key={k} label={k} value={v} />
      ))}
      <p className="pickup-note">
        {item.id === 7
          ? "글러브 고유번호를 배정하고 야구공 수량은 현장에서 기록합니다."
          : item.id === 8
            ? "라켓 고유번호를 배정하고 셔틀콕 수량은 현장에서 기록합니다."
            : "총학생회실에서 실물 상태와 고유번호를 확인한 뒤 수령하세요."}
      </p>
      <button
        className="primary wide"
        disabled={!item.available}
        onClick={() => {
          navigate("/apply", { state: { itemId: item.id } });
        }}
      >
        이 물품 대여하기
      </button>
      <p id="modalError" className="error" role="alert" />
    </Dialog>
  );
}
