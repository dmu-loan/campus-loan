import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { Brand } from "../components/Brand";
import { Dialog } from "../components/Dialog";
import { Rows } from "../features/admin/components/Rows";
import { adminPath, pages } from "../features/admin/navigation";
import { formatDate as fmt } from "../utils/formatDate";
export function AdminLayout() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = useMatches().at(-1).handle?.title;
  const [detail, setDetail] = useState(null);
  useEffect(() => setDetail(null), [pathname]);
  return (
    <>
      {" "}
      <header>
        <div className="bar">
          <Brand />
          <div className="inline">
            <span>관리자</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              <button>로그아웃</button>
            </form>
          </div>
        </div>
      </header>
      <div className="desk">
        <aside data-master="true">
          <b>운영 관리</b>
          <nav id="tabs">
            {Object.entries(pages).map(([k, v]) => (
              <NavLink
                end
                to={adminPath(k)}
                key={k}
                className={({ isActive }) => (isActive ? "on" : "")}
              >
                {v}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main id="app">
          <div className="sectiontitle">
            <h1>{title}</h1>
            <small>{fmt(data.home.now)} 기준</small>
          </div>
          <Outlet context={{ data, setDetail }} />
        </main>
      </div>
      {detail && (
        <Dialog onClose={() => setDetail(null)}>
          <h2>{detail.title}</h2>
          <Rows rows={detail.rows} />
        </Dialog>
      )}
    </>
  );
}
