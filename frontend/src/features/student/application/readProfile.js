export function readProfile() {
  try {
    const v = JSON.parse(localStorage.getItem("loan.profile"));
    return v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v).filter(
            ([k, val]) =>
              ["name", "phone", "faculty", "department", "studentNo"].includes(
                k,
              ) && typeof val === "string",
          ),
        )
      : null;
  } catch {
    return null;
  }
}
