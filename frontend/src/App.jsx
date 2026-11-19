import StudentLayout from './layouts/StudentLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import './styles/layout.css';

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/') return <StudentLayout />;
  if (pathname === '/admin') return <AdminLayout />;

  return (
    <main className="not-found">
      <h1>페이지를 찾을 수 없어요</h1>
      <p className="muted">주소를 확인하거나 첫 화면으로 이동해 주세요.</p>
      <a href="/">학생 홈으로 이동</a>
    </main>
  );
}
