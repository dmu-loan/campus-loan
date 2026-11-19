import Brand from '../components/Brand.jsx';

export default function StudentLayout() {
  return (
    <div className="student-shell">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <header className="student-header"><Brand /></header>
      <main id="main-content" className="student-main" tabIndex={-1}>
        <section className="student-intro" aria-labelledby="student-title">
          <p className="eyebrow">CAMPUS LOAN</p>
          <h1 id="student-title">필요할 때,<br />빌려드립니다.</h1>
          <p className="muted">학교생활에 필요한 물품을<br />한울타리 총학생회에서 만나보세요.</p>
        </section>
        <section className="panel" aria-labelledby="items-title">
          <h2 id="items-title">대여 물품</h2>
          <div className="empty-state">
            <span className="empty-symbol" aria-hidden="true">＋</span>
            <p>대여 서비스를 준비하고 있어요.</p>
            <p className="muted">물품 목록과 신청 기능이 곧 제공됩니다.</p>
          </div>
        </section>
      </main>
      <footer className="student-footer">동양미래대학교 한울타리 총학생회</footer>
    </div>
  );
}
