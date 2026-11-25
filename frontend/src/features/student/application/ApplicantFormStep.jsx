export function ApplicantFormStep({
  home,
  form,
  change,
  remember,
  setRemember,
  onClear,
  advance,
  arrow,
}) {
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
  return (
    <>
      <h2>신청 정보를 입력해 주세요.</h2>
      <p className="hint">정확한 정보 입력은 원활한 대여에 도움이 됩니다.</p>
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
          <button type="button" onClick={onClear}>
            저장 정보 삭제
          </button>
        )}
        <button className="primary advance">다음으로{arrow}</button>
      </form>
    </>
  );
}
