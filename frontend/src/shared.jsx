import { useEffect, useRef, useState } from "react";

export function usePage(defaultPage) {
  const read = () => location.hash.slice(1) || defaultPage;
  const [page, setPage] = useState(read);
  useEffect(() => {
    const navigate = () => {
      setPage(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, [defaultPage]);
  return page;
}
export function Dialog({ id = "detail", onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.showModal();
    return () => el.close();
  }, []);
  return (
    <dialog
      ref={ref}
      id={id}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button className="close" aria-label="닫기" onClick={onClose}>
        ×
      </button>
      {children}
    </dialog>
  );
}
export function Pair({ label, value }) {
  return (
    <div className="pair">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
export const fmt = (value) =>
  String(value || "")
    .replace("T", " ")
    .slice(0, 16);
