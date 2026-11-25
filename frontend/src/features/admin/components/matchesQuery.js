export const matchesQuery = (r, query) =>
  [r.name, r.student_no, r.phone, r.title, r.codes, r.officer].some((v) =>
    String(v ?? "").includes(query),
  );
