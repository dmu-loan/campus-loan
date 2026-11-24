import { useEffect, useState } from "react";
import { StudentHome, Application } from "./Student.jsx";
import { Brand } from "./Pages.jsx";
import { Dialog, Pair, usePage } from "./shared.jsx";
import { faqSections } from "./faq.js";

const icons = [
  "soccer",
  "basketball",
  "ball",
  "umbrella",
  "battery",
  "battery",
  "glove",
  "racket",
];
const rules = [
  "현금 보증금 10,000원 이상을 준비해 주세요.",
  "학생증 등 실물 신분증을 지참해 주세요.",
  "신청 후 3호관 1층 112호 총학생회실에서 직접 수령해 주세요.",
  "관계자 부재 시 오늘의 당직자에게 전화해 주세요.",
  "우산은 다음 날, 그 외 물품은 당일 마감까지 반납해 주세요.",
];
const dueLabel = (i) => (i.next_day ? "다음 날 반납" : "당일 반납");
function Guide({ home }) {
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
function Operating({ home }) {
  return (
    <>
      <div className="guide-head">
        <h1>운영 시간 안내</h1>
      </div>
      <section className="panel">
        <span className="pill">{home.closed || "운영 중"}</span>
        <h2>정기 운영 시간</h2>
        {[..."월화수목금토일"].map((day, i) => (
          <Pair
            key={day}
            label={day + "요일"}
            value={
              home.policy.weekdays.includes(i + 1)
                ? home.policy.opens.slice(0, 5) +
                  " – " +
                  home.policy.closes.slice(0, 5)
                : "휴무"
            }
          />
        ))}
      </section>
      <section className="panel closure-list">
        <h2>대여 중단 기간</h2>
        {home.closures.length ? (
          home.closures.map((c) => (
            <article key={c.id}>
              <strong>{c.reason}</strong>
              <small>
                {c.starts} – {c.ends}
              </small>
            </article>
          ))
        ) : (
          <p className="closure-empty">예정된 대여 중단 기간이 없습니다.</p>
        )}
      </section>
    </>
  );
}
function readProfile() {
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
export function StudentScreen({ home }) {
  const page = usePage("home");
  const [selected, setSelected] = useState("");
  const [item, setItem] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    document.body.classList.toggle("applying", page === "apply");
    return () => document.body.classList.remove("applying");
  }, [page]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(id);
  }, [notice]);
  useEffect(() => {
    setItem(null);
    setDrawer(false);
    if (page !== "apply") setSelected("");
  }, [page]);
  const profile = page === "apply" ? readProfile() : null;
  return (
    <>
      <header>
        <div className="bar">
          <Brand />
          <nav className="desktop">
            <a href="#guide">이용 안내</a>
            <a href="#hours">운영 시간</a>
            <a href="#contact">당직자 연락</a>
          </nav>
          <button
            className="menu"
            aria-label="메뉴 열기"
            onClick={() => setDrawer(true)}
          >
            ☰
          </button>
        </div>
      </header>
      <main
        id="app"
        tabIndex={-1}
        className={
          page === "apply"
            ? "wizard"
            : ["guide", "hours", "contact"].includes(page)
              ? "narrow"
              : ""
        }
      >
        {page === "apply" ? (
          <Application
            home={home}
            initial={{ ...profile, item: selected }}
            saved={Boolean(profile)}
            rules={rules}
            notify={setNotice}
          />
        ) : page === "guide" ? (
          <Guide home={home} />
        ) : page === "hours" ? (
          <Operating home={home} />
        ) : page === "contact" ? (
          <>
            <div className="guide-head">
              <h1>당직자에게 전화하기</h1>
            </div>
            <p>{home.now.slice(0, 10)} · 총학생회실</p>
            <Duty />
          </>
        ) : (
          <StudentHome
            home={home}
            icons={icons}
            onDetail={(id) => setItem(home.items.find((i) => i.id === id))}
          />
        )}
      </main>
      <footer>
        동양미래대학교 제58대 한울타리 총학생회{" "}
        <a
          className="instagram"
          href="https://www.instagram.com/dmu_hanultari/"
          target="_blank"
          rel="noopener noreferrer"
        >
          인스타그램 문의 · @dmu_hanultari
        </a>
      </footer>
      {drawer && (
        <Dialog id="drawer" onClose={() => setDrawer(false)}>
          <Brand />
          <nav>
            {Object.entries({
              home: "홈",
              apply: "대여 신청하기",
              guide: "이용 안내",
              hours: "운영 시간 안내",
              contact: "당직자에게 전화하기",
            }).map(([k, t]) => (
              <a key={k} href={"#" + k} onClick={() => setDrawer(false)}>
                {t}
              </a>
            ))}
          </nav>
        </Dialog>
      )}
      {item && (
        <Dialog onClose={() => setItem(null)}>
          {item.photo ? (
            <img
              className="catalog-photo"
              alt=""
              src={
                "/api/items/" +
                item.id +
                "/photo?v=" +
                encodeURIComponent(item.photo)
              }
            />
          ) : icons[item.id - 1] ? (
            <img src={"/img/" + icons[item.id - 1] + ".svg"} alt="" />
          ) : (
            <span className="item-initial">{item.title.slice(0, 1)}</span>
          )}
          <h2>{item.title}</h2>
          {[
            ["전체 수량", item.total + "개"],
            ["대여 중", item.rented + "개"],
            ["대여 가능", item.available + "개"],
            ["반납 원칙", dueLabel(item)],
          ].map(([k, v]) => (
            <Pair key={k} label={k} value={v} />
          ))}
          <p className="pickup-note">
            {item.id === 7
              ? "글러브 고유번호를 배정하고 야구공 수량은 현장에서 기록합니다."
              : item.id === 8
                ? "라켓 고유번호를 배정하고 셔틀콕 수량은 현장에서 기록합니다."
                : "총학생회실에서 실물 상태와 고유번호를 확인한 뒤 수령하세요."}
          </p>
          <button
            className="primary wide"
            disabled={!item.available}
            onClick={() => {
              setSelected(item.id);
              setItem(null);
              location.hash = "apply";
            }}
          >
            이 물품 대여하기
          </button>
          <p id="modalError" className="error" role="alert" />
        </Dialog>
      )}
      <div id="notice" role="status">
        {notice}
      </div>
    </>
  );
}
export function Duty() {
  return (
    <section className="callbox">
      <img src="/img/call.svg" alt="" />
      <div>
        <h3>오늘의 당직자에게 전화하기</h3>
        <p>총학생회실에 관계자가 없으면 연락해 주세요.</p>
        <div className="chips duty">
          <small>오늘 등록된 당직자가 없습니다.</small>
        </div>
      </div>
    </section>
  );
}
