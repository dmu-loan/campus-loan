import { Fragment, useState } from "react";
import { validateApplication } from "./validation.mjs";

export function StudentHome({ home, icons, onDetail }) {
  return (
    <div className="homegrid">
      <div>
        <section className="hero">
          <span className="pill">{home.closed || "운영 중"}</span>
          <small>필요할 때, 언제든지</small>
          <h1>빌려드립니다</h1>
          <p>한울타리 총학생회 물품 대여 서비스</p>
        </section>
        <a href="#apply" className="btn primary cta wide">
          <img src="/img/box.svg" alt="" />
          대여하기<span>→</span>
        </a>
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
      </div>
      <section>
        <div className="sectiontitle">
          <h2>현재 대여 가능한 물품</h2>
          <small>{home.now.replace("T", " ").slice(5, 16)} 기준</small>
        </div>
        <div className="items">
          {home.items.map((item) => (
            <button
              key={item.id}
              className="item"
              onClick={() => onDetail(item.id)}
            >
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
                <span className="item-initial" aria-hidden="true">
                  {item.title.slice(0, 1)}
                </span>
              )}
              <span>
                {item.title}
                <small>{`총 ${item.total}개 · 대여 중 ${item.rented}개`}</small>
              </span>
              <span className="num">
                {item.available}개<small>대여 가능</small>
              </span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

const titles = [
  "현금 보증금 10,000원 이상 필요",
  "신분증 지참 필요",
  "총학생회실에서 직접 수령",
  "부재 시 당직자에게 전화",
];
export function Application({ home, initial, saved, rules, notify }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [remember, setRemember] = useState(saved);
  const item = home.items.find((i) => String(i.id) === String(form.item));
  const image = (name) => (
    <img alt="" src={"/img/apply/" + step + "-" + name + ".svg"} />
  );
  const move = (n) => {
    setStep(n);
    window.scrollTo(0, 0);
  };
  function change(e) {
    const { name, value } = e.target;
    setForm((old) => ({
      ...old,
      ...(name === "faculty" ? { department: "" } : {}),
      [name]: value,
    }));
  }
  function advance(e) {
    e.preventDefault();
    const result = validateApplication(
      { ...form, itemId: String(form.item ?? "") },
      home.items.map((i) => ({ ...i, id: String(i.id) })),
    );
    if (Object.keys(result.errors).length) {
      notify(Object.values(result.errors)[0]);
      move(2);
      return;
    }
    if (step === 2) {
      move(3);
      return;
    }
    try {
      if (remember) {
        const { faculty, department, name, phone, studentNo } = form;
        localStorage.setItem(
          "loan.profile",
          JSON.stringify({ faculty, department, name, phone, studentNo }),
        );
      } else localStorage.removeItem("loan.profile");
    } catch {
      notify("이 기기에 신청 정보를 저장할 수 없습니다.");
    }
    setForm({});
    move(4);
  }
  function select(name, label, options) {
    return (
      <label>
        {label}
        <select name={name} required value={form[name] || ""} onChange={change}>
          <option value="">
            {label}
            {name === "item" ? "을" : "를"} 선택해 주세요.
          </option>
          {options.map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
    );
  }
  function field(name, label, props) {
    return (
      <label>
        {label}
        <input
          name={name}
          required
          value={form[name] || ""}
          onChange={change}
          {...props}
        />
      </label>
    );
  }
  if (step === 4)
    return (
      <section className="panel receipt">
        <h1>신청서 확인을 마쳤어요</h1>
        <p>서버 연결 전으로 신청서는 접수되지 않았습니다.</p>
        <a href="#home" className="btn primary wide">
          홈으로
        </a>
      </section>
    );
  const arrow = image(
    step === 3 ? "DashiconsArrowRightAlt3" : "DashiconsArrowRightAlt2",
  );
  const due = item?.due?.slice(11, 16).split(":").map(Number);
  return (
    <>
      <div className="wizard-bar">
        <button
          aria-label="이전"
          onClick={() =>
            step === 1 ? (location.hash = "home") : move(step - 1)
          }
        >
          {image(
            step === 3 ? "DashiconsArrowRightAlt2" : "DashiconsArrowRightAlt3",
          )}
        </button>
        <h1>대여하기</h1>
      </div>
      <div
        className="progress-dots"
        aria-label={"총 3단계 중 " + step + "단계"}
      >
        {[1, 2, 3].map((n) => (
          <Fragment key={n}>
            {n > 1 && image("Line" + (step === 2 && n === 3 ? 2 : 1))}
            <span className={n <= step ? "done" : ""}>
              {image(
                "Ellipse" +
                  (step === 3
                    ? 3
                    : step === 2
                      ? n <= 2
                        ? 2
                        : 3
                      : n === 1
                        ? 1
                        : 2),
              )}
              <b>{n}</b>
            </span>
          </Fragment>
        ))}
      </div>
      <section className="wizard-body">
        {step === 1 && (
          <>
            <h2>
              이용 전에
              <br />꼭 확인해 주세요!
            </h2>
            <p className="hint">
              원활한 대여를 위해 아래 안내 사항을 확인해 주세요.
            </p>
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
            <button className="primary advance" onClick={() => move(2)}>
              다음으로{arrow}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>신청 정보를 입력해 주세요.</h2>
            <p className="hint">
              정확한 정보 입력은 원활한 대여에 도움이 됩니다.
            </p>
            <form id="requestForm" onSubmit={advance}>
              {select(
                "faculty",
                "학부",
                Object.keys(home.departments).map((n) => [n, n]),
              )}
              {select(
                "department",
                "학과",
                (home.departments[form.faculty] || []).map((n) => [n, n]),
              )}
              {field("studentNo", "학번", {
                type: "text",
                inputMode: "numeric",
                pattern: "[0-9]{8}",
                maxLength: 8,
                placeholder: "학번을 입력해 주세요.",
              })}
              {field("phone", "휴대전화 번호", {
                type: "tel",
                placeholder: "전화번호를 입력해 주세요.",
              })}
              {field("name", "이름", {
                type: "text",
                maxLength: 50,
                placeholder: "이름을 입력해 주세요.",
              })}
              {select(
                "item",
                "신청 물품",
                home.items.map((i) => [i.id, i.title]),
              )}
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                이 기기에 신청 정보 저장
              </label>
              {remember && (
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem("loan.profile");
                    } catch {
                      notify("저장 정보를 삭제하지 못했습니다.");
                      return;
                    }
                    setRemember(false);
                    setForm({ item: form.item });
                  }}
                >
                  저장 정보 삭제
                </button>
              )}
              <button className="primary advance">다음으로{arrow}</button>
            </form>
          </>
        )}
        {step === 3 && item && (
          <>
            <h2>반납 기한을 확인해 주세요.</h2>
            <p className="hint">
              지정된 기한까지 반납해 주세요. 기한을 넘기면 지각으로 기록됩니다.
            </p>
            <section className="due-card">
              {image("Group")}
              <div>
                <b>반납 기한</b>
                <strong>
                  {item.next_day ? "내일 " : "오늘 "}
                  {due[0]}시{due[1] ? " " + due[1] + "분" : ""}까지
                </strong>
                <small>{item.due.replace("T", " ")}까지 반납 예정입니다.</small>
              </div>
            </section>
            <section className="confirm-card">
              <div className="confirm-title">
                <b>신청 정보 확인</b>
                <button onClick={() => move(2)}>
                  수정하기 {image("PhBracketsAngle")}
                </button>
              </div>
              {[
                ["학부", form.faculty],
                ["학과", form.department],
                ["학번", form.studentNo],
                ["전화번호", form.phone],
                ["이름", form.name],
                ["신청 물품", item.title],
              ].map(([k, v]) => (
                <div className="pair" key={k}>
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </section>
            <form id="consent-form" onSubmit={advance}>
              <div className="consent-note">
                <strong>개인정보 수집·이용</strong>
                <p>
                  총학생회는 대여 신청, 본인 확인, 반납 안내와 대여 이력 관리를
                  위해 학부·학과·학번·이름·전화번호를 수집합니다. 동의를
                  거부하면 온라인 신청이 제한됩니다.
                </p>
                <label className="check">
                  <input type="checkbox" name="consent" required />
                  개인정보 수집·이용에 동의합니다 (필수)
                </label>
              </div>
              <button className="primary advance">신청하기{arrow}</button>
            </form>
          </>
        )}
      </section>
    </>
  );
}
