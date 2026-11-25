export const pages = {
  overview: "대시보드",
  requests: "신청 목록",
  loans: "대여·반납",
  stock: "물품·고유번호",
  people: "지각·대여 제한",
  stats: "이용 통계",
  settings: "운영 설정",
  staff: "임원 연락처",
  audit: "작업 이력",
};

export const adminPath = (key) =>
  key === "overview" ? "/admin" : "/admin/" + key;
