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
