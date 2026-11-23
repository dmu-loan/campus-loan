import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { StudentPage, AdminPage, LoginPage } from "./Pages.jsx";
import { StudentHome, Application } from "./Student.jsx";

const path = location.pathname.replace(/\/+$/, "");
const Page =
  path === "/admin" ? AdminPage : path === "/login" ? LoginPage : StudentPage;
flushSync(() => createRoot(document.querySelector("#root")).render(<Page />));

let contentRoot;
window.studentContent = {
  render(page, props) {
    contentRoot ??= createRoot(document.querySelector("#app"));
    contentRoot.render(
      page === "apply" ? (
        <Application {...props} />
      ) : (
        <StudentHome {...props} />
      ),
    );
  },
  clear() {
    contentRoot?.unmount();
    contentRoot = undefined;
  },
};

// 기존 화면 스크립트는 마크업이 렌더링된 뒤 순서대로 연결한다.
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
}
async function initialize() {
  if (Page === LoginPage) return;
  if (path === "/apply" && !location.hash)
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#apply",
    );
  const scripts =
    Page === AdminPage
      ? ["/vendor/chart.umd.js", "/common.js", "/admin.js"]
      : ["/common.js", "/faq.js", "/student.js"];
  for (const url of scripts) await loadScript(url);
}
initialize().catch(() => {
  document.querySelector("#app").textContent =
    "화면을 불러오지 못했습니다. 새로고침해 주세요.";
});
