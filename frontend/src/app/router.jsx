import {
  createBrowserRouter,
  Navigate,
  Outlet,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { StudentLayout } from "../layouts/StudentLayout";
import { StudentHome } from "../features/student/catalog/StudentHome";
import { ApplicationPage } from "../features/student/application/ApplicationPage";
import { GuidePage } from "../features/student/guide/GuidePage";
import { ContactPage } from "../features/student/guide/ContactPage";
import { HoursPage } from "../features/student/guide/HoursPage";
import { LoginPage } from "../features/auth/LoginPage";
import { pages, adminPath } from "../features/admin/navigation";
import { DashboardPage } from "../features/admin/dashboard/DashboardPage";
import { RequestsPage } from "../features/admin/requests/RequestsPage";
import { LoansPage } from "../features/admin/loans/LoansPage";
import { StockPage } from "../features/admin/inventory/StockPage";
import { BorrowersPage } from "../features/admin/borrowers/BorrowersPage";
import { StatsPage } from "../features/admin/statistics/StatsPage";
import { SettingsPage } from "../features/admin/operations/SettingsPage";
import { StaffPage } from "../features/admin/operations/StaffPage";
import { AuditPage } from "../features/admin/operations/AuditPage";

function Root() {
  const { pathname, hash, search } = useLocation();
  const oldPage = hash.slice(1);
  let target;
  if (/^\/admin\/?$/.test(pathname) && Object.hasOwn(pages, oldPage))
    target = adminPath(oldPage);
  if (
    ["/", "/apply", "/apply/"].includes(pathname) &&
    ["home", "apply", "guide", "hours", "contact"].includes(oldPage)
  )
    target = oldPage === "home" ? "/" : "/" + oldPage;
  if (target) return <Navigate replace to={target + search} />;
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
function loadExample(file) {
  return async ({ request }) => {
    const response = await fetch(file, { signal: request.signal });
    if (!response.ok) throw new Error("예시 데이터를 불러오지 못했습니다.");
    return response.json();
  };
}
function LoadError() {
  return (
    <main>
      <p role="alert">화면을 불러오지 못했습니다. 새로고침해 주세요.</p>
    </main>
  );
}
function NotFound() {
  return (
    <main className="narrow">
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/">학생 홈으로</Link>
    </main>
  );
}
const adminPages = {
  overview: DashboardPage,
  requests: RequestsPage,
  loans: LoansPage,
  stock: StockPage,
  people: BorrowersPage,
  stats: StatsPage,
  settings: SettingsPage,
  staff: StaffPage,
  audit: AuditPage,
};
export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        Component: StudentLayout,
        loader: loadExample("/student-data.json"),
        ErrorBoundary: LoadError,
        children: [
          { index: true, Component: StudentHome },
          { path: "apply", Component: ApplicationPage },
          { path: "guide", Component: GuidePage },
          { path: "hours", Component: HoursPage },
          { path: "contact", Component: ContactPage },
        ],
      },
      { path: "login", Component: LoginPage },
      {
        path: "admin",
        Component: AdminLayout,
        loader: loadExample("/sample-data.json"),
        ErrorBoundary: LoadError,
        children: Object.entries(adminPages).map(([key, Component]) => ({
          ...(key === "overview" ? { index: true } : { path: key }),
          Component,
          handle: { title: pages[key] },
        })),
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
