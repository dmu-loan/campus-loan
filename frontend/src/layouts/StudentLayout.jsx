import { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useLoaderData,
  useMatch,
} from "react-router-dom";
import { Brand } from "../components/Brand";
import { Dialog } from "../components/Dialog";
export function StudentLayout() {
  const home = useLoaderData();
  const { pathname } = useLocation();
  const applying = Boolean(useMatch("/apply"));
  const [drawer, setDrawer] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    document.body.classList.toggle("applying", applying);
    return () => document.body.classList.remove("applying");
  }, [applying]);
  useEffect(() => {
    setDrawer(false);
  }, [pathname]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(id);
  }, [notice]);
  return (
    <div
      onPointerDownCapture={() => document.body.classList.add("pointer-mode")}
      onKeyDownCapture={() => document.body.classList.remove("pointer-mode")}
    >
      {" "}
      <header>
        <div className="bar">
          <Brand />
          <nav className="desktop">
            <Link to="/guide">이용 안내</Link>
            <Link to="/hours">운영 시간</Link>
            <Link to="/contact">당직자 연락</Link>
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
        className={applying ? "wizard" : pathname !== "/" ? "narrow" : ""}
      >
        <Outlet context={{ home, notify: setNotice }} />
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
              <Link
                key={k}
                to={k === "home" ? "/" : "/" + k}
                onClick={() => setDrawer(false)}
              >
                {t}
              </Link>
            ))}
          </nav>
        </Dialog>
      )}
      <div id="notice" role="status">
        {notice}
      </div>
    </div>
  );
}
