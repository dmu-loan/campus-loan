export function ReviewStep({ item, form, image, arrow, onEdit, advance }) {
  const due = item.due.slice(11, 16).split(":").map(Number);
  return (
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
          <button onClick={onEdit}>수정하기 {image("PhBracketsAngle")}</button>
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
            총학생회는 대여 신청, 본인 확인, 반납 안내와 대여 이력 관리를 위해
            학부·학과·학번·이름·전화번호를 수집합니다. 동의를 거부하면 온라인
            신청이 제한됩니다.
          </p>
          <label className="check">
            <input type="checkbox" name="consent" required />
            개인정보 수집·이용에 동의합니다 (필수)
          </label>
        </div>
        <button className="primary advance">신청하기{arrow}</button>
      </form>
    </>
  );
}
