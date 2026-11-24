import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { LoginPage } from "./Pages.jsx";
import { StudentScreen } from "./StudentScreen.jsx";
import { AdminScreen } from "./Admin.jsx";

const path = location.pathname.replace(/\/+$/, "");
if (path === "/apply" && !location.hash)
  history.replaceState(
    null,
    "",
    location.pathname + location.search + "#apply",
  );
function App() {
  const [data, setData] = useState(null),
    [error, setError] = useState(false);
  useEffect(() => {
    if (path === "/login") return;
    const controller = new AbortController();
    fetch(path === "/admin" ? "/sample-data.json" : "/student-data.json", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw Error();
        return response.json();
      })
      .then(setData)
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, []);
  if (path === "/login") return <LoginPage />;
  if (error)
    return (
      <main>
        <p role="alert">화면을 불러오지 못했습니다. 새로고침해 주세요.</p>
      </main>
    );
  if (!data)
    return (
      <main>
        <p role="status">불러오는 중입니다.</p>
      </main>
    );
  return path === "/admin" ? (
    <AdminScreen data={data} />
  ) : (
    <div
      onPointerDownCapture={() => document.body.classList.add("pointer-mode")}
      onKeyDownCapture={() => document.body.classList.remove("pointer-mode")}
    >
      <StudentScreen home={data} />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
