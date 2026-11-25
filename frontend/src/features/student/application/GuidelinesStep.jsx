import { rules } from "./rules";
const titles = [
  "현금 보증금 10,000원 이상 필요",
  "신분증 지참 필요",
  "총학생회실에서 직접 수령",
  "부재 시 당직자에게 전화",
];

export function GuidelinesStep({ image, arrow, onNext }) {
  return (
    <>
      <h2>
        이용 전에
        <br />꼭 확인해 주세요!
      </h2>
      <p className="hint">원활한 대여를 위해 아래 안내 사항을 확인해 주세요.</p>
      <div className="rule-cards">
        {titles.map((t, i) => (
          <article key={t}>
            {image("Frame" + (8 + i))}
            <div>
              <strong>{t}</strong>
              <p>{rules[i]}</p>
            </div>
          </article>
        ))}
      </div>
      <button className="primary advance" onClick={onNext}>
        다음으로{arrow}
      </button>
    </>
  );
}
