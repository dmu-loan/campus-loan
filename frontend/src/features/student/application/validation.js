export function normalizeApplication(values) {
  return {
    department: String(values.department ?? "").trim(),
    studentNo: String(values.studentNo ?? "").trim(),
    name: String(values.name ?? "").trim(),
    phone: String(values.phone ?? "")
      .trim()
      .replace(/[\s-]/g, ""),
    itemId: String(values.itemId ?? ""),
  };
}

export function validateApplication(values, items) {
  const data = normalizeApplication(values);
  const errors = {};
  if (!data.department || data.department.length > 80)
    errors.department = "학과를 80자 이내로 입력해 주세요.";
  if (!/^[0-9]{8}$/.test(data.studentNo))
    errors.studentNo = "학번은 숫자 8자리로 입력해 주세요.";
  if (!data.name || data.name.length > 50)
    errors.name = "이름을 50자 이내로 입력해 주세요.";
  if (!/^01[016789][0-9]{7,8}$/.test(data.phone))
    errors.phone = "휴대전화 번호 형식을 확인해 주세요.";
  const item = items.find((item) => item.id === data.itemId);
  if (!item) errors.itemId = "신청할 물품을 선택해 주세요.";
  else if (item.available <= 0)
    errors.itemId = "대여 가능한 물품을 선택해 주세요.";
  return { data, errors };
}
