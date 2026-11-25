import { useEffect, useRef } from "react";
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
