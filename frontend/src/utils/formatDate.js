export const formatDate = (value) =>
  String(value || "")
    .replace("T", " ")
    .slice(0, 16);
