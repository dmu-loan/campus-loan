"use strict";
let home,
  duty,
  tab = 0,
  draft = {},
  selected = "",
  token = "",
  remember = false;
const imgs = [
  "soccer",
  "basketball",
  "ball",
  "umbrella",
  "battery",
  "battery",
  "glove",
  "racket",
];
const icon = (i) =>
  i.photo
    ? '<img class="catalog-photo" alt="" src="/api/items/' +
      i.id +
      "/photo?v=" +
      esc(i.photo) +
      '">'
    : !imgs[i.id - 1]
      ? '<span class="item-initial" aria-hidden="true">' +
        esc(i.title.slice(0, 1)) +
        "</span>"
      : '<img alt="" src="/img/' + imgs[i.id - 1] + '.svg">';
const itemById = (id) => home.items.find((i) => i.id == id);
const route = () => location.hash.slice(1) || "home";
const time = (v) => String(v).slice(0, 5);
const hours = () => time(home.policy.opens) + " – " + time(home.policy.closes);
const dueLabel = (i) => (i.next_day ? "다음 날 반납" : "당일 반납");
const docs = ["이용 절차", "물품 안내", "유의사항", "FAQ"];
const rules = [
  "현금 보증금 10,000원 이상을 준비해 주세요.",
  "학생증 등 실물 신분증을 지참해 주세요.",
  "신청 후 3호관 1층 112호 총학생회실에서 직접 수령해 주세요.",
  "관계자 부재 시 오늘의 당직자에게 전화해 주세요.",
  "우산은 다음 날, 그 외 물품은 당일 마감까지 반납해 주세요.",
];
function contacts() {
  if (!duty) return "<small>당직표 확인 중…</small>";
  if (duty.failed)
    return "<small>당직표를 읽지 못했습니다. 잠시 후 다시 확인해 주세요.</small>";
  if (!duty.contacts.length)
    return "<small>오늘 등록된 당직자가 없습니다.</small>";
  return duty.contacts
    .map((c) =>
      /^01[016789]\d{7,8}$/.test(c.phone)
        ? '<a class="btn" aria-label="' +
          c.label +
          ' 전화하기" href="tel:' +
          c.phone +
          '">' +
          c.label +
          " 전화</a>"
        : '<span class="badge">' + c.label + " · 연락처 미등록</span>",
    )
    .join(" ");
}
function callbox() {
  return (
    '<section class="callbox"><img src="/img/call.svg" alt=""><div><h3>오늘의 당직자에게 전화하기</h3><p>총학생회실에 관계자가 없으면 연락해 주세요.</p><div class="chips duty">' +
    contacts() +
    "</div></div></section>"
  );
}
function detail(id) {
  const i = itemById(id);
  popup(
    icon(i) +
      "<h2>" +
      esc(i.title) +
      "</h2>" +
      pair("전체 수량", i.total + "개") +
      pair("대여 중", i.rented + "개") +
      pair("대여 가능", i.available + "개") +
      pair("반납 원칙", dueLabel(i)) +
      '<p class="pickup-note">' +
      esc(
        id === 7
          ? "글러브 고유번호를 배정하고 야구공 수량은 현장에서 기록합니다."
          : id === 8
            ? "라켓 고유번호를 배정하고 셔틀콕 수량은 현장에서 기록합니다."
            : "총학생회실에서 실물 상태와 고유번호를 확인한 뒤 수령하세요.",
      ) +
      "</p>" +
      btn("이 물품 대여하기", "begin(" + id + ")", "primary wide"),
  );
}
function begin(id) {
  if (!itemById(id)?.available) return notice("현재 대여 가능한 수량이 없습니다.");
  modal.close();
  selected = id;
  location.hash = "apply";
}
function guide() {
  const steps = [
    "홈에서 물품을 선택하고 신청서를 작성합니다.",
    "총학생회실을 방문합니다.",
    "현금 보증금 10,000원 이상과 실물 신분증을 제출합니다.",
    "담당자가 승인한 물품을 수령합니다.",
    "기한 내 반납하고 보증금과 신분증을 돌려받습니다.",
  ];
  let question = 0;
  const faq = faqSections
    .map(
      ([title, entries], i) =>
        '<section class="faq-group"><h3>' +
        String(i + 1).padStart(2, "0") +
        " · " +
        title +
        "</h3>" +
        entries
          .map(
            ([q, a]) =>
              "<details><summary><b>Q" +
              ++question +
              "</b><span>" +
              esc(q) +
              '</span></summary><div class="answer">' +
              a
                .split("\n")
                .map((p) => "<p>" + esc(p) + "</p>")
                .join("") +
              "</div></details>",
          )
          .join("") +
        "</section>",
    )
    .join("");
  const contents = [
    '<ol class="guide-list">' +
      steps.map((s) => "<li>" + s + "</li>").join("") +
      "</ol>",
    '<div class="guide-items">' +
      home.items
        .map(
          (i) =>
            "<div><b>" +
            esc(i.title) +
            "</b><small>" +
            dueLabel(i) +
            "</small></div>",
        )
        .join("") +
      "</div>",
    '<ul class="guide-list">' +
      [
        ...rules,
        "지각 누적 3회부터 신규 대여가 제한됩니다.",
        "파손·분실은 즉시 총학생회에 알려 주세요.",
      ]
        .map((s) => "<li>" + s + "</li>")
        .join("") +
      "</ul>",
    '<p class="faq-intro">빌려드립니다 서비스 이용과 관련하여 자주 문의하는 사항을 안내드립니다.</p>' +
      faq,
  ];
  return (
    '<div class="guide-head"><h1>빌려드립니다 이용 안내</h1></div><div class="tabbar">' +
    docs
      .map((s, i) => btn(s, "tab=" + i + ";render()", tab === i ? "on" : ""))
      .join("") +
    '</div><section class="panel guide-panel"><h2>' +
    (tab === 3 ? "자주 묻는 질문 (FAQ)" : docs[tab]) +
    "</h2>" +
    contents[tab] +
    "</section>"
  );
}
function operating() {
  return (
    '<div class="guide-head"><h1>운영 시간 안내</h1></div><section class="panel"><span class="pill">' +
    esc(home.closed || "운영 중") +
    "</span><h2>정기 운영 시간</h2>" +
    [..."월화수목금토일"]
      .map((day, i) =>
        pair(
          day + "요일",
          home.policy.weekdays.includes(i + 1) ? hours() : "휴무",
        ),
      )
      .join("") +
    '</section><section class="panel closure-list"><h2>대여 중단 기간</h2>' +
    (home.closures
      .map(
        (c) =>
          "<article><strong>" +
          esc(c.reason) +
          "</strong><small>" +
          esc(c.starts) +
          " – " +
          esc(c.ends) +
          "</small></article>",
      )
      .join("") ||
      '<p class="closure-empty">예정된 대여 중단 기간이 없습니다.</p>') +
    "</section>"
  );
}
function resetForm() {
  draft = {};
  remember = false;
  try {
    const saved = localStorage.getItem("loan.profile");
    if (saved) {
      const profile = JSON.parse(saved);
      if (profile && typeof profile === "object" && !Array.isArray(profile)) {
        draft = profile;
        remember = true;
      }
    }
  } catch {
    // 저장소가 차단됐거나 저장값이 손상된 경우 빈 신청서로 시작합니다.
    draft = {};
  }
  draft.item = selected;
  selected = "";
  // randomUUID is unavailable over plain HTTP on a phone connected by LAN.
  token = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}
function render() {
  if (!home) return;
  const page = route();
  document.body.classList.toggle("applying", page === "apply");
  app.className = page === "apply" ? "wizard" : page === "home" ? "" : "narrow";
  if (!["guide", "hours", "contact"].includes(page)) {
    window.studentContent.render(page, { home, icons: imgs, onDetail: detail, initial: draft, saved: remember, rules, notify: notice });
    return;
  }
  window.studentContent.clear();
  app.innerHTML = page === "guide" ? guide() : page === "hours" ? operating() :
    '<div class="guide-head"><h1>당직자에게 전화하기</h1></div><p>' + esc(home.now.slice(0,10)) + ' · 총학생회실</p>' + callbox();
}
$("#menu").onclick = () => $("#drawer").showModal();
$("#drawer").onclick = (e) => {
  if (e.target.closest("button,a") || e.target === $("#drawer"))
    $("#drawer").close();
};
window.addEventListener("hashchange", () => {
  if (route() === "apply") resetForm();
  render();
  scrollTo(0, 0);
});
async function refresh() {
  try {
    home = await api("home");
    if (route() === "apply" && !token) resetForm();
    if (["home", "hours"].includes(route()) || !app.querySelector("h1"))
      render();
  } catch (e) {
    report(e);
  }
}
let dutyStream;
function displayDuty(snapshot){
  duty=snapshot;
  document.querySelectorAll(".duty").forEach(el=>el.innerHTML=contacts());
}
function connectDuty(){
  const needed=!document.hidden && ["home","contact"].includes(route());
  if(!needed){dutyStream?.close();dutyStream=null;duty=null;return;}
  if(dutyStream)return;
  displayDuty({contacts: []});
}
refresh();
connectDuty();
setInterval(()=>{if(!document.hidden)refresh();},4000);
document.addEventListener("visibilitychange",connectDuty);
window.addEventListener("hashchange",connectDuty);
window.addEventListener("pagehide",()=>{dutyStream?.close();dutyStream=null;});
window.addEventListener("pageshow",connectDuty);
document.addEventListener("pointerdown",()=>document.body.classList.add("pointer-mode"),true);
document.addEventListener("keydown",()=>document.body.classList.remove("pointer-mode"),true);
