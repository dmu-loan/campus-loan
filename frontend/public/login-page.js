document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  let message = document.querySelector("[role=alert]");
  if (!message) { message = document.createElement("p"); message.setAttribute("role", "alert"); event.target.append(message); }
  message.textContent = "서버 연결 후 로그인할 수 있습니다.";
});
