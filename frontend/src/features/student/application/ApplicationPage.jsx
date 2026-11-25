import { Fragment, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { readProfile } from "./readProfile";
import { GuidelinesStep } from "./GuidelinesStep";
import { ApplicantFormStep } from "./ApplicantFormStep";
import { ReviewStep } from "./ReviewStep";
import { validateApplication } from "./validation";
export function ApplicationPage() {
  const { home, notify } = useOutletContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile] = useState(readProfile);
  const saved = Boolean(profile);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => ({
    ...profile,
    item: state?.itemId ?? "",
  }));
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
  function clearProfile() {
    try {
      localStorage.removeItem("loan.profile");
    } catch {
      notify("저장 정보를 삭제하지 못했습니다.");
      return;
    }
    setRemember(false);
    setForm({ item: form.item });
  }
  if (step === 4)
    return (
      <section className="panel receipt">
        <h1>신청서 확인을 마쳤어요</h1>
        <p>서버 연결 전으로 신청서는 접수되지 않았습니다.</p>
        <Link to="/" className="btn primary wide">
          홈으로
        </Link>
      </section>
    );
  const arrow = image(
    step === 3 ? "DashiconsArrowRightAlt3" : "DashiconsArrowRightAlt2",
  );
  return (
    <>
      <div className="wizard-bar">
        <button
          aria-label="이전"
          onClick={() => (step === 1 ? navigate("/") : move(step - 1))}
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
          <GuidelinesStep image={image} arrow={arrow} onNext={() => move(2)} />
        )}
        {step === 2 && (
          <ApplicantFormStep
            home={home}
            form={form}
            change={change}
            remember={remember}
            setRemember={setRemember}
            onClear={clearProfile}
            advance={advance}
            arrow={arrow}
          />
        )}
        {step === 3 && item && (
          <ReviewStep
            item={item}
            form={form}
            image={image}
            arrow={arrow}
            onEdit={() => move(2)}
            advance={advance}
          />
        )}
      </section>
    </>
  );
}
