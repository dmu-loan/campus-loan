import { formatDate as fmt } from "../../../utils/formatDate";

export function requestDetail(r, units) {
  return {
    title: "신청 상세",
    rows: [
      ["물품", r.title],
      ["이름 · 학번", r.name + " · " + r.student_no],
      ["소속", r.faculty + " / " + r.department],
      ["전화번호", r.phone],
      ["신청 시각", fmt(r.created)],
      [
        "배정 가능 고유번호",
        units
          .filter((u) => u.item_id === r.item_id && u.state === "AVAILABLE")
          .map((u) => u.code)
          .join(", ") || "없음",
      ],
    ],
  };
}
