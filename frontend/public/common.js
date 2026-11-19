"use strict";
const $ = (s) => document.querySelector(s);
const app = $("#app"),
  modal = $("#detail");
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const fmt = (v) =>
  String(v || "")
    .replace("T", " ")
    .slice(0, 16);
const pair = (k, v) =>
  '<div class="pair"><span>' +
  esc(k) +
  "</span><strong>" +
  esc(v) +
  "</strong></div>";
const btn = (text, fn, cl = "") =>
  '<button type="button" class="' +
  cl +
  '" onclick="' +
  fn +
  '">' +
  esc(text) +
  "</button>";
const check = (n, text, checked = false, required = false) =>
  '<label class="check"><input type="checkbox" name="' +
  n +
  '" ' +
  (checked ? "checked " : "") +
  (required ? "required" : "") +
  ">" +
  esc(text) +
  "</label>";
const opt = (v, t, selected = false) =>
  '<option value="' +
  esc(v) +
  '" ' +
  (selected ? "selected" : "") +
  ">" +
  esc(t) +
  "</option>";
function popup(html) {
  modal.innerHTML =
    '<button class="close" aria-label="닫기" onclick="modal.close()">×</button>' +
    html +
    '<p class="error" role="alert" id="modalError"></p>';
  if (!modal.open) modal.showModal();
}
function notice(msg) {
  $("#notice").textContent = msg;
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => ($("#notice").textContent = ""), 4500);
}
// 읽기 전용 예시 데이터. 서버 연결 전에는 변경 요청을 보내지 않습니다.
let sampleData;
async function api(path, body) {
  if (body) throw Error("서버 연결 후 이용할 수 있습니다.");
  sampleData ??= fetch("/sample-data.json").then(response => {
    if (!response.ok) throw Error("물품 정보를 불러올 수 없습니다.");
    return response.json();
  }).catch(error => { sampleData = null; throw error; });
  const data = await sampleData;
  if (path === "home") return data.home;
  if (path === "admin/desk") return data;
  if (path.endsWith("/history")) return [];
  throw Error("서버 연결 후 이용할 수 있습니다.");
}
function report(e) {
  if (modal?.open && $("#modalError")) $("#modalError").textContent = e.message;
  else notice(e.message);
}
const field = (name, label, value = "", type = "text", extra = "") =>
  "<label>" +
  esc(label) +
  '<input type="' +
  type +
  '" name="' +
  name +
  '" value="' +
  esc(value) +
  '" ' +
  extra +
  "></label>";
const select = (name, label, options) =>
  "<label>" +
  esc(label) +
  '<select required name="' +
  name +
  '">' +
  options +
  "</select></label>";
