import Brand from '../components/Brand.jsx';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <aside className="admin-sidebar">
        <Brand admin />
        <nav className="admin-nav" aria-label="관리자 메뉴">
          <a href="/admin" aria-current="page">대시보드</a>
        </nav>
        <a className="student-link" href="/">학생 페이지 보기 ↗</a>
      </aside>
      <div className="admin-body">
        <header className="admin-header">
          <span>물품 대여 관리</span>
          <span className="preview-badge">화면 미리보기</span>
        </header>
        <main id="main-content" className="admin-main" tabIndex={-1}>
          <div className="page-heading">
            <p className="eyebrow">OVERVIEW</p>
            <h1>대시보드</h1>
            <p className="muted">대여 신청부터 반납까지 한곳에서 관리하세요.</p>
          </div>
          <section className="panel" aria-labelledby="admin-status-title">
            <h2 id="admin-status-title">대여 현황</h2>
            <div className="empty-state">
              <span className="empty-symbol" aria-hidden="true">≡</span>
              <p>관리 서비스를 준비하고 있습니다.</p>
              <p className="muted">신청 내역과 대여 현황이 이곳에 표시됩니다.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
