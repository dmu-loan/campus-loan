import { Duty } from "./Duty";
import { useOutletContext } from "react-router-dom";
export function ContactPage() {
  const { home } = useOutletContext();
  return (
    <>
      <div className="guide-head">
        <h1>당직자에게 전화하기</h1>
      </div>
      <p>{home.now.slice(0, 10)} · 총학생회실</p>
      <Duty />
    </>
  );
}
