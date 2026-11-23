import { useState } from "react";

function Brand() {
  return (
    <a className="brand" href="/">
      <img src="/img/logo.png" alt="" />
      <span>
        빌려드립니다<small>한울타리 총학생회</small>
      </span>
    </a>
  );
}

export function StudentPage() {
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
          <button className="menu" aria-label="메뉴 열기" id="menu">
            ☰
          </button>
        </div>
      </header>
      <main id="app" tabIndex="-1">
        <p>물품 현황을 불러오는 중입니다.</p>
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
      <dialog id="drawer">
        <button className="close" aria-label="메뉴 닫기">
          ×
        </button>
        <Brand />
        <nav>
          <a href="#home">홈</a>
          <a href="#apply">대여 신청하기</a>
          <a href="#guide">이용 안내</a>
          <a href="#hours">운영 시간 안내</a>
          <a href="#contact">당직자에게 전화하기</a>
        </nav>
      </dialog>
      <dialog id="detail"></dialog>
      <div id="notice" role="status"></div>
    </>
  );
}

export function AdminPage() {
  return (
    <>
      <header>
        <div className="bar">
          <Brand />
          <div className="inline">
            <span>관리자</span>
            <form action="/login/" method="get">
              <input type="hidden" name="_csrf" value="" />
              <button>로그아웃</button>
            </form>
          </div>
        </div>
      </header>
      <div className="desk">
        <aside data-master="true">
          <b>운영 관리</b>
          <nav id="tabs"></nav>
        </aside>
        <main id="app">
          <p>운영 현황을 불러오는 중입니다.</p>
        </main>
      </div>
      <dialog id="detail"></dialog>
      <div id="notice" role="status"></div>
    </>
  );
}

export function LoginPage() {
  const [attempted, setAttempted] = useState(false);
  return (
    <>
      <header>
        <div className="bar">
          <Brand />
        </div>
      </header>
      <main className="narrow">
        <section className="panel">
          <h1>관리자 로그인</h1>
          <p>총학생회 물품 대여 관리</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setAttempted(true);
            }}
          >
            <input type="hidden" name="_csrf" value="" />
            <label>
              아이디
              <input
                name="username"
                required
                autoComplete="username"
                autoFocus
              />
            </label>
            <label>
              비밀번호
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="primary wide">로그인</button>
            {attempted && (
              <p role="alert">서버 연결 후 로그인할 수 있습니다.</p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
