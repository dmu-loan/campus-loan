import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { faqSections } from "./faq";
import { rules } from "../application/rules";
import { dueLabel } from "../catalog/items";
export function GuidePage() {
  const { home } = useOutletContext();
  const [tab, setTab] = useState(0);
  const tabs = ["이용 절차", "물품 안내", "유의사항", "FAQ"];
  let question = 0;
  return (
    <>
      <div className="guide-head">
        <h1>빌려드립니다 이용 안내</h1>
      </div>
      <div className="tabbar">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={i === tab ? "on" : ""}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <section className="panel guide-panel">
        <h2>{tab === 3 ? "자주 묻는 질문 (FAQ)" : tabs[tab]}</h2>
        {tab === 0 && (
          <ol className="guide-list">
            {[
              "홈에서 물품을 선택하고 신청서를 작성합니다.",
              "총학생회실을 방문합니다.",
              "현금 보증금 10,000원 이상과 실물 신분증을 제출합니다.",
              "담당자가 승인한 물품을 수령합니다.",
              "기한 내 반납하고 보증금과 신분증을 돌려받습니다.",
            ].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        )}
        {tab === 1 && (
          <div className="guide-items">
            {home.items.map((i) => (
              <div key={i.id}>
                <b>{i.title}</b>
                <small>{dueLabel(i)}</small>
              </div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <ul className="guide-list">
            {[
              ...rules,
              "지각 누적 3회부터 신규 대여가 제한됩니다.",
              "파손·분실은 즉시 총학생회에 알려 주세요.",
            ].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {tab === 3 && (
          <>
            <p className="faq-intro">
              빌려드립니다 서비스 이용과 관련하여 자주 문의하는 사항을
              안내드립니다.
            </p>
            {faqSections.map(([title, entries], i) => (
              <section className="faq-group" key={title}>
                <h3>
                  {String(i + 1).padStart(2, "0")} · {title}
                </h3>
                {entries.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      <b>Q{++question}</b>
                      <span>{q}</span>
                    </summary>
                    <div className="answer">
                      {a.split("\n").map((line, k) => (
                        <p key={k}>{line}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </section>
            ))}
          </>
        )}
      </section>
    </>
  );
}
