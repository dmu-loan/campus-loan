import { useState } from "react";

export function Brand() {
  return (
    <a className="brand" href="/">
      <img src="/img/logo.png" alt="" />
      <span>
        빌려드립니다<small>한울타리 총학생회</small>
      </span>
    </a>
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
