import { initializeApp } from "firebase/app";
import {
  getAuth, connectAuthEmulator, onAuthStateChanged, signInAnonymously,
  GoogleAuthProvider, signInWithPopup, signOut, signInWithCredential
} from "firebase/auth";
import {
  getFirestore, connectFirestoreEmulator, collection, doc, onSnapshot, query, orderBy, limit, where,
  setDoc, addDoc, updateDoc, deleteDoc, writeBatch, runTransaction, serverTimestamp,
  arrayUnion, arrayRemove, Timestamp
} from "firebase/firestore";
import LOGO from "./logo.txt";

/* ---------- Firebase ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyDvjnOLzYEHGV7ae_VWZ-LUeAJ8i4WTY9Q",
  authDomain: "bul-jumeok-e910b.firebaseapp.com",
  projectId: "bul-jumeok-e910b",
  storageBucket: "bul-jumeok-e910b.firebasestorage.app",
  messagingSenderId: "727813238723",
  appId: "1:727813238723:web:b308d312c3d34e7fb61776"
};
/* ?emu runs against local Firebase emulators with a throwaway project, for testing only. */
const EMU = new URLSearchParams(location.search).has("emu") && /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
const fbApp = initializeApp(EMU ? Object.assign({}, firebaseConfig, { projectId: "demo-bulfist" }) : firebaseConfig);
const auth = getAuth(fbApp);
const db = getFirestore(fbApp);
if (EMU) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  window.__bfTest = {
    signInGoogle: function (sub) {
      return signInWithCredential(auth, GoogleAuthProvider.credential(JSON.stringify({ sub: sub, email: sub + "@example.com", email_verified: true })));
    },
    tryWriteMember: function () { return setDoc(doc(db, "members", "hack"), { nick: "hack", no: 99 }); },
    tryDeleteGuest: function (id) { return deleteDoc(doc(db, "guestbook", id)); },
    state: function () { return S; }
  };
}

const APP_NAME = "불주먹조직 비밀본부";
const MOTTO = "불은 물로 끄면 되지만, 우린 못 꺼.";

/* ---------- state ---------- */
const S = {
  user: null,
  bossUid: null, bossKnown: false,
  members: [], membersReady: false,
  topics: [],
  guest: [], guestReady: false,
  rooms: [], roomsReady: false,
  roomId: null, room: null, roomMissing: false, msgs: [],
  drafts: {},
  pick: null, confirmDelete: false, gbConfirm: null,
  flipped: {}, importing: false
};
function isBoss() { return !!(S.user && !S.user.isAnonymous && S.bossUid && S.bossUid === S.user.uid); }
function myUid() { return S.user ? S.user.uid : null; }

/* ---------- helpers ---------- */
function h(tag, attrs) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
  }
  for (let i = 2; i < arguments.length; i++) append(el, arguments[i]);
  return el;
}
function append(el, c) {
  if (c == null || c === false) return;
  if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
  el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
}
function draft(tag, id, attrs) {
  const el = h(tag, Object.assign({ id: id }, attrs || {}));
  el.value = S.drafts[id] || "";
  el.addEventListener("input", function () { S.drafts[id] = el.value; });
  return el;
}
function safePhoto(src) {
  return typeof src === "string" && (/^data:image\/(jpeg|png|webp);base64,/.test(src) || /^https:\/\//.test(src)) ? src : "";
}
function byNo(a, b) { return (a.no || 0) - (b.no || 0); }
function caseNo(m) { return "BF-26-" + String(m.no || 0).padStart(3, "0"); }
function findMember(id) { return S.members.find(function (m) { return m.id === id; }) || null; }
function nickOf(id) { const m = findMember(id); return m ? m.nick : "탈퇴한 조직원"; }
function logo(cls) { return h("img", { class: cls, src: LOGO, alt: "", "aria-hidden": "true" }); }
function toast(text) {
  const t = h("div", { class: "toast", role: "status", text: text });
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2800);
}
function errText(e) {
  const code = (e && e.code) || "";
  if (code.indexOf("permission-denied") >= 0) return "권한이 없어요. 두목 계정으로 로그인했는지 확인해 주세요.";
  if (code.indexOf("unavailable") >= 0) return "인터넷 연결이 불안정해요. 잠시 뒤 다시 해 주세요.";
  return "처리하지 못했어요. 잠시 뒤 다시 해 주세요.";
}
function timeAgo(ts) {
  if (!ts || !ts.toDate) return "방금";
  const d = ts.toDate(), diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return Math.floor(diff / 60) + "분 전";
  if (diff < 86400) return Math.floor(diff / 3600) + "시간 전";
  return (d.getMonth() + 1) + "월 " + d.getDate() + "일";
}
function go(name) { if (location.hash.slice(1) === name) render(); else location.hash = name; }
function currentRoute() { return location.hash.slice(1) || "hq"; }

/* Photos: one fixed zoom, bottom edge anchored, so faces come out the same size. */
const PHOTO_ZOOM = 1.1;
function fitPhoto(img) {
  function run() {
    const W = img.naturalWidth, H = img.naturalHeight;
    if (!W || !H) return;
    const box = img.parentNode, fw = box ? box.clientWidth : 0, fh = box ? box.clientHeight : 0;
    const fa = fw && fh ? fw / fh : 0.8, ia = W / H;
    let k = PHOTO_ZOOM;
    if (k * ia / fa < 1) k = fa / ia;
    img.style.height = (k * 100) + "%";
    img.classList.add("fit");
  }
  function later() { requestAnimationFrame(run); }
  if (img.complete && img.naturalWidth) later(); else img.addEventListener("load", later);
}
function photoBox(m, label) {
  const src = safePhoto(m && m.photo);
  if (src) {
    const im = h("img", { class: "photo", src: src, alt: (m.nick || "") + " 사진" });
    fitPhoto(im);
    return h("div", { class: "ph" }, im);
  }
  return h("div", { class: "nophoto", role: "img", "aria-label": "사진 없음 · 수배중" },
    h("span", { class: "np-stamp", text: "수배중" }), h("em", { text: label || "사진 미확보" }));
}

/* ---------- identity: chosen once per phone ---------- */
const ME_KEY = "bf-me";
let memMe = null;
function getMe() { try { const v = localStorage.getItem(ME_KEY); if (v) return v; } catch (e) {} return memMe; }
function setMe(v) { memMe = v; try { if (v) localStorage.setItem(ME_KEY, v); else localStorage.removeItem(ME_KEY); } catch (e) {} }
function meMember() { const me = getMe(); return me && me !== "guest" ? findMember(me) : null; }
function needsGate() {
  if (!S.members.length) return false;
  const me = getMe();
  if (me === "guest") return false;
  return !me || !findMember(me);
}
function meLabel() {
  const me = getMe();
  if (me === "guest") return "손님 (명부 미등록)";
  const m = meMember();
  return m ? m.nick + " · " + caseNo(m) : "미확인";
}

/* ---------- icons ---------- */
function icon(kind) {
  const paths = {
    hq: '<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    members: '<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.8.7 3 2.5 3 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    games: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor"/>',
    guestbook: '<path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  };
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
  s.innerHTML = paths[kind];
  return s;
}

/* ---------- Liar: topics and dealing ---------- */
const LIAR_DEFAULT_TOPICS = [
  { name: "음식", words: ["김치찌개", "떡볶이", "삼겹살", "치킨", "피자", "짜장면", "라면", "초밥", "비빔밥", "햄버거", "냉면", "순대", "마라탕", "탕후루", "김밥"] },
  { name: "동물", words: ["고양이", "강아지", "호랑이", "펭귄", "기린", "코끼리", "햄스터", "판다", "토끼", "상어", "부엉이", "너구리", "낙타", "문어"] },
  { name: "장소", words: ["학교", "병원", "공항", "찜질방", "놀이공원", "편의점", "도서관", "영화관", "노래방", "수영장", "캠핑장", "PC방", "결혼식장", "지하철"] },
  { name: "직업", words: ["의사", "소방관", "경찰", "요리사", "선생님", "유튜버", "미용사", "파일럿", "택배기사", "변호사", "아이돌", "마술사", "프로게이머", "바리스타"] },
  { name: "물건", words: ["우산", "냉장고", "칫솔", "안경", "리모컨", "휴대폰", "베개", "가위", "거울", "지갑", "이어폰", "선풍기", "손톱깎이", "드라이기"] },
  { name: "스포츠", words: ["축구", "야구", "농구", "배드민턴", "볼링", "수영", "태권도", "스키", "탁구", "골프", "마라톤", "클라이밍", "복싱", "당구"] },
  { name: "나라·도시", words: ["일본", "미국", "프랑스", "이탈리아", "베트남", "호주", "이집트", "브라질", "스위스", "제주도", "부산", "뉴욕", "파리", "하와이"] },
  { name: "영화·드라마", words: ["기생충", "오징어 게임", "타이타닉", "겨울왕국", "해리포터", "어벤져스", "범죄도시", "인사이드 아웃", "더 글로리", "응답하라 1988", "이상한 변호사 우영우", "아바타", "부산행", "극한직업"] }
];
function allTopics() {
  return LIAR_DEFAULT_TOPICS.concat(S.topics.filter(function (t) { return t.name && Array.isArray(t.words) && t.words.length >= 2; })
    .map(function (t) { return { name: t.name, words: t.words }; }));
}
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
/* Same seed + same lineup + same words => same liar, word and order on every phone. */
function dealFull(lineup, seed, words) {
  const rnd = mulberry32(seed);
  const liar = lineup[Math.floor(rnd() * lineup.length)];
  const wi = Math.floor(rnd() * words.length);
  let fi = Math.floor(rnd() * (words.length - 1)); if (fi >= wi) fi++;
  const order = lineup.slice();
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
  if (order[0] === liar) order.push(order.shift());
  return { liar: liar, word: words[wi], fool: words[fi], order: order };
}
function dealOf(room) {
  if (!room || !room.topic || !Array.isArray(room.lineup) || !room.lineup.length) return null;
  return dealFull(room.lineup, room.seed, room.topic.words);
}
function normWord(s) { return String(s || "").replace(/\s+/g, "").toLowerCase(); }

/* ---------- Firestore subscriptions ---------- */
function subscribeBase() {
  onSnapshot(doc(db, "config", "boss"), function (snap) {
    S.bossUid = snap.exists() ? snap.data().uid : null; S.bossKnown = true; render();
  }, function () { S.bossKnown = true; render(); });
  onSnapshot(collection(db, "members"), function (snap) {
    S.members = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); }).sort(byNo);
    S.membersReady = true; render();
  }, function () { S.membersReady = true; render(); });
  onSnapshot(collection(db, "liarTopics"), function (snap) {
    S.topics = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    render();
  });
  onSnapshot(query(collection(db, "guestbook"), orderBy("createdAt", "desc"), limit(150)), function (snap) {
    S.guest = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); });
    S.guestReady = true; render();
  }, function () { S.guestReady = true; render(); });
  const since = Timestamp.fromMillis(Date.now() - 12 * 3600 * 1000);
  onSnapshot(query(collection(db, "rooms"), where("createdAt", ">", since), orderBy("createdAt", "desc"), limit(20)), function (snap) {
    S.rooms = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
    S.roomsReady = true; render();
  }, function () { S.roomsReady = true; render(); });
}
let roomUnsubs = [];
function watchRoom(id) {
  if (S.roomId === id) return;
  roomUnsubs.forEach(function (u) { u(); }); roomUnsubs = [];
  S.roomId = id; S.room = null; S.roomMissing = false; S.msgs = [];
  if (!id) return;
  roomUnsubs.push(onSnapshot(doc(db, "rooms", id), function (snap) {
    S.room = snap.exists() ? Object.assign({ id: snap.id }, snap.data()) : null;
    S.roomMissing = !snap.exists(); render();
  }));
  roomUnsubs.push(onSnapshot(query(collection(db, "rooms", id, "msgs"), orderBy("createdAt"), limit(400)), function (snap) {
    S.msgs = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); });
    render();
  }));
}

/* ---------- auth ---------- */
onAuthStateChanged(auth, function (u) {
  S.user = u;
  if (!u) signInAnonymously(auth).catch(function () { toast("본부에 연결하지 못했어요. 새로고침해 주세요."); });
  render();
});
async function bossLogin() {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    toast("구글 계정으로 로그인했어요.");
  } catch (e) {
    const code = (e && e.code) || "";
    if (code.indexOf("popup-closed") >= 0 || code.indexOf("cancelled") >= 0) return;
    if (code.indexOf("popup-blocked") >= 0) toast("팝업이 막혔어요. 브라우저에서 팝업을 허용해 주세요.");
    else if (code.indexOf("unauthorized-domain") >= 0) toast("이 주소가 Firebase 승인된 도메인에 없어요.");
    else toast("로그인하지 못했어요. 잠시 뒤 다시 해 주세요.");
  }
}
async function bossLogout() { await signOut(auth); toast("로그아웃했어요."); }
async function claimBoss() {
  try { await setDoc(doc(db, "config", "boss"), { uid: myUid(), since: serverTimestamp() }); toast("이 계정이 두목으로 등록됐어요."); }
  catch (e) { toast(errText(e)); }
}
async function importSeed() {
  if (S.importing) return;
  S.importing = true; render();
  try {
    const res = await fetch("seed.json", { cache: "no-store" });
    const data = await res.json();
    const batch = writeBatch(db);
    (data.members || []).forEach(function (m) {
      const rec = Object.assign({}, m); delete rec.id;
      batch.set(doc(db, "members", m.id), rec);
    });
    (data.liarTopics || []).forEach(function (t, i) {
      batch.set(doc(collection(db, "liarTopics")), { name: t.name, words: t.words, order: i + 1 });
    });
    await batch.commit();
    toast("기존 본부 기록을 모두 가져왔어요.");
  } catch (e) { toast(errText(e)); }
  S.importing = false; render();
}

/* ---------- screens: HQ ---------- */
function screenHQ() {
  const n = S.members.length;
  const openRooms = S.rooms.filter(function (r) { return r.status && r.status !== "closed"; }).length;
  return h("section", { class: "screen" },
    n ? h("div", { class: "whoami" },
      h("div", null, h("span", { class: "eyebrow", text: "현재 신원" }), h("b", { text: meLabel() })),
      h("button", { class: "ghost", type: "button", onclick: function () { setMe(null); render(); }, text: "신원 변경" })) : null,
    h("div", { class: "cover" },
      h("div", { class: "cover-meta" },
        h("span", { class: "eyebrow", text: "문서번호 BF-HQ-001" }),
        h("span", { class: "eyebrow", text: "열람 제한 · 조직원 전용" })),
      h("div", { class: "stamp", "aria-hidden": "true", text: "극비" }),
      h("div", { class: "cover-title" }, logo("logo-l"), h("h1", null, h("span", { text: "불주먹조직" }), "비밀본부")),
      h("p", { class: "motto" }, h("q", { text: MOTTO }), h("small", { text: "조직 강령 제1조" }))),
    h("div", { class: "actions" },
      h("button", { class: "btn primary", type: "button", onclick: function () { go("members"); } },
        h("span", null, h("small", { text: "명부 열람" }), "조직원 보기"), h("span", { class: "arr", text: "→" })),
      h("button", { class: "btn", type: "button", onclick: function () { go("games"); } },
        h("span", null, h("small", { text: "휴게 구역" }), "게임방"), h("span", { class: "arr", text: "→" }))),
    h("div", { class: "ledger" },
      h("div", null, h("b", { text: String(n) }), h("span", { text: "등록 조직원" })),
      h("div", null, h("b", { text: String(openRooms) }), h("span", { text: "열린 게임방" })),
      h("div", null, h("b", { text: String(S.guest.length) }), h("span", { text: "방명록" }))),
    h("details", { class: "guide" },
      h("summary", { text: "본부를 홈 화면에 두는 법" }),
      h("div", { class: "guide-body" },
        h("div", null, h("h3", { text: "아이폰 (Safari)" }),
          h("ol", null, h("li", { text: "이 주소를 Safari로 엽니다." }), h("li", { text: "아래쪽 공유 버튼(네모에 화살표)을 누릅니다." }), h("li", { text: "‘홈 화면에 추가’를 누릅니다." }))),
        h("div", null, h("h3", { text: "안드로이드 (Chrome)" }),
          h("ol", null, h("li", { text: "이 주소를 Chrome으로 엽니다." }), h("li", { text: "오른쪽 위 ⋮ 메뉴를 누릅니다." }), h("li", { text: "‘홈 화면에 추가’ 또는 ‘앱 설치’를 누릅니다." }))))),
    bossPanel()
  );
}
function bossPanel() {
  const u = S.user;
  if (!u || u.isAnonymous) {
    return h("div", { class: "boss-row" }, h("button", { type: "button", class: "link-btn", onclick: bossLogin, text: "두목 로그인" }));
  }
  if (S.bossKnown && !S.bossUid) {
    return h("div", { class: "panel" },
      h("div", { class: "field-label", text: "두목 등록" }),
      h("p", { class: "note", text: "아직 두목이 정해지지 않았어요. 지금 로그인한 구글 계정을 두목으로 등록할까요? 한 번 등록하면 이 계정만 조직원과 주제를 고칠 수 있어요." }),
      h("button", { type: "button", class: "save", onclick: claimBoss, text: "이 계정을 두목으로 등록" }),
      h("button", { type: "button", class: "link-btn", onclick: bossLogout, text: "로그아웃" }));
  }
  if (!isBoss()) {
    return h("div", { class: "boss-row" }, h("span", { class: "note", text: "이 구글 계정은 두목이 아니에요." }),
      h("button", { type: "button", class: "link-btn", onclick: bossLogout, text: "로그아웃" }));
  }
  return h("div", { class: "boss-row" },
    S.members.length === 0 && S.membersReady
      ? h("button", { type: "button", class: "save", disabled: S.importing, onclick: importSeed, text: S.importing ? "가져오는 중…" : "기존 본부 기록 가져오기" })
      : null,
    h("span", { class: "note", text: "두목으로 로그인됨" }),
    h("button", { type: "button", class: "link-btn", onclick: bossLogout, text: "로그아웃" }));
}

/* ---------- screens: gate ---------- */
function screenGate() {
  const picked = S.pick && findMember(S.pick);
  return h("section", { class: "gate" },
    logo("logo-g"),
    h("div", null,
      h("span", { class: "eyebrow", text: "출입 통제 · 신원 확인" }),
      h("h1", null, "본부에 들어오려면", h("br"), h("em", { text: "신원" }), "을 밝혀라."),
      h("p", { text: "자기 카드를 한 번만 고르면 이 폰이 기억해요. 게임과 방명록에서 이 이름을 써요." })),
    h("div", { class: "pick", role: "group", "aria-label": "조직원 선택" }, S.members.map(function (m) {
      return h("button", { type: "button", "aria-pressed": S.pick === m.id ? "true" : "false", onclick: function () { S.pick = m.id; render(); } },
        h("div", { class: "pp" }, photoBox(m)), h("span", { class: "pn", text: m.nick }));
    })),
    h("button", { class: "save", type: "button", disabled: !picked, onclick: function () {
      if (!picked) return;
      setMe(picked.id); S.pick = null; render(); toast("‘" + picked.nick + "’ 신원으로 입장했어요.");
    } }, picked ? "‘" + picked.nick + "’ 신분으로 입장" : "위에서 자기 카드를 고르세요"),
    h("button", { class: "guest-btn", type: "button", onclick: function () { setMe("guest"); S.pick = null; render(); }, text: "명부에 아직 없어요 · 손님으로 입장" }));
}

/* ---------- screens: members ---------- */
function screenMembers() {
  const list = S.members;
  const grid = list.length
    ? h("div", { class: "roster" }, list.map(function (m) {
        return h("button", { class: "card", type: "button", "aria-label": m.nick + " 수배서 열기", onclick: function () { go("m-" + m.id); } },
          h("div", { class: "card-photo" }, photoBox(m), h("span", { class: "tag" + (m.rank ? " boss" : ""), text: m.rank || "수배중" }),
            getMe() === m.id ? h("span", { class: "me-tag", text: "본인" }) : null),
          h("div", { class: "card-body" },
            h("span", { class: "card-no", text: caseNo(m) }),
            h("span", { class: "card-name", text: m.nick }),
            m.alias ? h("span", { class: "card-alias", text: "일명 " + m.alias }) : null));
      }))
    : h("div", { class: "empty", text: S.membersReady ? "아직 등록된 조직원이 없습니다." : "명부를 불러오는 중…" });
  return h("section", { class: "screen" },
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "조직원 명부" }), h("h2", { text: "수배 대상 " + list.length + "명" }),
        h("p", { text: "카드를 누르면 수배서가 열립니다." })),
      isBoss() ? h("button", { class: "add-btn", type: "button", onclick: function () { openEditor(null); }, text: "조직원 등록" }) : null),
    grid);
}
function screenDetail(id) {
  const m = findMember(id);
  if (!m) {
    return h("section", { class: "screen" },
      h("button", { class: "back", type: "button", onclick: function () { go("members"); }, text: "명부로" }),
      h("div", { class: "empty", text: S.membersReady ? "이 수배서는 폐기되었거나 존재하지 않습니다." : "수배서를 불러오는 중…" }));
  }
  const charges = (m.charges || []).filter(function (c) { return c && String(c).trim(); });
  const ruler = h("div", { class: "ruler", "aria-hidden": "true" }, ["190", "180", "170", "160", "150", "140", "130", "120", "110", "100"].map(function (t) { return h("span", { text: t }); }));
  const poster = h("article", { class: "poster", "aria-label": m.nick + " 수배서" },
    h("header", { class: "poster-top" },
      h("div", { class: "w", text: "수배" }),
      h("div", { class: "sub", text: m.rank === "두목" ? "WANTED · 1급 수배 · 조직 두목" : "WANTED · 불주먹조직 내부 수배서" })),
    h("div", { class: "case" },
      h("span", null, "사건번호 ", h("b", { text: caseNo(m) })),
      h("span", null, "직위 ", h("b", { text: m.rank || "조직원" }))),
    h("div", { class: "mug" }, photoBox(m), ruler,
      h("i", { class: "corner tl" }), h("i", { class: "corner tr" }), h("i", { class: "corner bl" }), h("i", { class: "corner br" })),
    h("div", { class: "ident" },
      h("div", { class: "eyebrow", text: "닉네임" }),
      h("div", { class: "nick", text: m.nick }),
      m.alias ? h("div", { class: "alias" }, "일명 ", h("b", { text: "‘" + m.alias + "’" })) : null),
    h("div", { class: "field" },
      h("div", { class: "field-label", text: "본인 진술" }),
      h("p", { class: "statement", text: m.intro ? "“" + m.intro + "”" : "진술을 거부하고 있음." })),
    h("div", { class: "field" },
      h("div", { class: "field-label", text: "혐의 " + charges.length + "건" }),
      charges.length ? h("ol", { class: "charges" }, charges.map(function (c) { return h("li", { text: c }); }))
        : h("p", { class: "statement", text: "아직 드러난 혐의 없음. 수사 중." })),
    m.sample ? h("div", { class: "draft-note", text: "임시 기록 · 두목이 곧 채울 예정" }) : null,
    h("div", { class: "stamp", "aria-hidden": "true", text: "확인" }),
    h("footer", { class: "poster-foot" },
      h("span", { text: "제보처: 불주먹조직 비밀본부" }),
      h("span", { text: "본 문서는 조직원 외 열람을 금함" })));
  let ops = null;
  if (isBoss()) {
    ops = S.confirmDelete
      ? h("div", { class: "confirm" },
          h("p", { text: "‘" + m.nick + "’ 수배서를 폐기할까요? 모든 조직원 화면에서 사라집니다." }),
          h("div", { class: "op-row" },
            h("button", { type: "button", onclick: function () { S.confirmDelete = false; render(); }, text: "취소" }),
            h("button", { type: "button", class: "danger", onclick: async function () {
              try { await deleteDoc(doc(db, "members", m.id)); S.confirmDelete = false; go("members"); toast("수배서를 폐기했어요."); }
              catch (e) { toast(errText(e)); }
            }, text: "폐기하기" })))
      : h("div", { class: "op-row" },
          h("button", { type: "button", onclick: function () { openEditor(m); }, text: "수배서 수정" }),
          h("button", { type: "button", class: "danger", onclick: function () { S.confirmDelete = true; render(); }, text: "폐기" }));
  }
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("members"); }, text: "명부로" }),
    poster, ops);
}

/* ---------- screens: games ---------- */
const GAMES = [
  { id: "assoc", code: "G-01", name: "연상퀴즈", desc: "단어 하나로 떠올리는 조직원들의 머릿속.", ready: false },
  { id: "mafia", code: "G-02", name: "마피아", desc: "조직 안에 조직이 있다. 밤마다 한 명씩.", ready: false },
  { id: "yut", code: "G-03", name: "윷놀이", desc: "도·개·걸·윷·모로 가리는 본부 서열.", ready: false },
  { id: "liar", code: "G-04", name: "라이어", desc: "혼자만 제시어를 모르는 사람을 찾아라.", ready: true }
];
function screenGames() {
  return h("section", { class: "screen" },
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "휴게 구역" }), h("h2", { text: "게임방" }),
        h("p", { text: "게임은 하나씩 순서대로 열립니다." }))),
    h("div", { class: "games" }, GAMES.map(function (g) {
      return h("button", { class: "game" + (g.ready ? " ready" : ""), type: "button", disabled: !g.ready,
          "aria-label": g.name + (g.ready ? " 열기" : " 준비 중"), onclick: g.ready ? function () { go("game-" + g.id); } : null },
        h("span", { class: "code", text: g.code }), h("h3", { text: g.name }), h("p", { text: g.desc }),
        h("span", { class: "status", text: g.ready ? "입장 가능" : "준비 중" }));
    })));
}

/* ---------- Liar: lobby list ---------- */
const STATUS_LABEL = { lobby: "대기 중", hint: "설명 중", discuss: "토론 중", vote: "투표 중", guess: "라이어 반격", result: "결과 발표" };
/* Seconds per phase. ?emu&fast shortens them for local tests. */
const FAST = EMU && new URLSearchParams(location.search).has("fast");
const DUR = { hint: 30, discuss: 120, vote: 30, guess: 20 };
if (FAST) Object.keys(DUR).forEach(function (k) { DUR[k] = Math.max(2, Math.round(DUR[k] / 10)); });
function screenLiarLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return r.status && r.status !== "closed"; });
  const list = rooms.length
    ? h("ul", { class: "room-list" }, rooms.map(function (r) {
        const mine = me && (r.players || []).indexOf(me.id) >= 0;
        return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
          h("span", { class: "ri-main" },
            h("b", { text: nickOf(r.createdBy) + "의 방" }),
            h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
          h("span", { class: "ri-side" },
            h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: STATUS_LABEL[r.status] || r.status }),
            h("span", { class: "ri-sub", text: (r.players || []).length + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-04" }), h("h2", { text: "라이어" }),
        h("p", { text: "방을 만들거나 열린 방에 들어가세요. 설명과 투표는 모두 게임 안에서 해요." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: createRoom },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    liarRules(),
    isBoss() ? topicManager() : null);
}
function liarRules() {
  return h("details", { class: "guide" },
    h("summary", { text: "라이어 게임 규칙" }),
    h("div", { class: "guide-body" },
      h("ol", null,
        h("li", { text: "방을 만들고 단톡방에 알려요. 다들 게임방 → 라이어에서 그 방을 눌러 참가해요." }),
        h("li", { text: "3명 이상 모이면 아무나 ‘게임 시작’을 눌러요. 만든 사람도 라이어가 누군지 몰라요." }),
        h("li", { text: "각자 카드를 몰래 확인해요. 라이어에게는 주제만 보여요." }),
        h("li", { text: "랜덤 순서로 한 명씩 제시어를 한 마디로 설명해요. 한 사람당 30초, 시간이 지나면 다음 사람으로 넘어가요." }),
        h("li", { text: "설명이 끝나면 2분 동안 대화창에서 토론해요. 절반 이상이 ‘바로 투표하기’를 누르면 일찍 끝나요." }),
        h("li", { text: "30초 안에 라이어로 의심되는 사람에게 투표해요." }),
        h("li", { text: "라이어를 맞히면 라이어에게 20초의 마지막 기회가 있어요. 제시어를 맞히면 라이어 승리, 못 맞히면 조직원 승리. 동점이거나 엉뚱한 사람을 지목하면 라이어 승리예요." })),
      h("p", { class: "note", text: "바보 모드에서는 라이어도 같은 주제의 다른 단어를 받아서, 자기가 라이어인지 모른 채 설명해요." })));
}
async function createRoom() {
  const me = meMember();
  if (!me || !S.user) return;
  try {
    const ref = await addDoc(collection(db, "rooms"), {
      status: "lobby", createdAt: serverTimestamp(), createdBy: me.id, players: [me.id],
      mode: 0, topicChoice: -1, rounds: 1, game: 0, votes: {}, turn: 0
    });
    go("room-" + ref.id);
  } catch (e) { toast(errText(e)); }
}

/* ---------- Liar: room ---------- */
function roomRef() { return doc(db, "rooms", S.roomId); }
async function roomUpdate(patch) { try { await updateDoc(roomRef(), patch); } catch (e) { toast(errText(e)); } }
async function joinRoom() { const me = meMember(); if (me) await roomUpdate({ players: arrayUnion(me.id) }); }
async function leaveRoom() {
  const me = meMember(); const r = S.room;
  if (!me || !r) return;
  const left = (r.players || []).filter(function (p) { return p !== me.id; });
  await roomUpdate(left.length ? { players: arrayRemove(me.id) } : { players: arrayRemove(me.id), status: "closed" });
  go("game-liar");
}
async function startGame() {
  const custom = allTopics();
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = (r.players || []).filter(function (p) { return !!findMember(p); }).slice().sort();
      if (lineup.length < 3) throw { code: "few" };
      const topic = r.topicChoice >= 0 && LIAR_DEFAULT_TOPICS[r.topicChoice] ? LIAR_DEFAULT_TOPICS[r.topicChoice] : custom[Math.floor(Math.random() * custom.length)];
      const seed = Math.floor(Math.random() * 2147483647);
      const d = dealFull(lineup, seed, topic.words);
      tx.update(roomRef(), {
        status: "hint", lineup: lineup, seed: seed, topic: { name: topic.name, words: topic.words },
        order: d.order, turn: 0, votes: {}, accused: null, guess: null, winner: null, reason: null,
        game: (r.game || 0) + 1, startedAt: serverTimestamp(),
        phase: (r.phase || 0) + 1, phaseAt: serverTimestamp(), readyVote: []
      });
    });
    S.flipped = {};
  } catch (e) {
    if (e && e.code === "few") toast("3명 이상 모여야 시작할 수 있어요.");
    else if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else toast(errText(e));
  }
}
async function sendMsg(kind, text) {
  const me = meMember(); const r = S.room;
  const nick = me ? me.nick : "손님";
  return addDoc(collection(db, "rooms", S.roomId, "msgs"), {
    uid: myUid(), memberId: me ? me.id : null, nick: nick, text: text, kind: kind,
    game: r ? (r.game || 0) : 0, createdAt: serverTimestamp()
  });
}
function nextPhase(r, patch) {
  return Object.assign({ phase: (r.phase || 0) + 1, phaseAt: serverTimestamp() }, patch);
}
async function advanceTurn(kind, text, expectPhase) {
  const me = meMember();
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "hint") throw { code: "phase" };
    if (expectPhase != null && r.phase !== expectPhase) throw { code: "phase" };
    const n = r.order.length, speaker = r.order[r.turn % n];
    if (kind === "hint" && speaker !== (me && me.id)) throw { code: "turn" };
    const mref = doc(collection(db, "rooms", S.roomId, "msgs"));
    tx.set(mref, {
      uid: myUid(), memberId: me ? me.id : null, nick: me ? me.nick : "손님",
      text: kind === "hint" ? text : kind === "timeout" ? nickOf(speaker) + " 시간 초과! 다음 사람 차례예요." : nickOf(speaker) + " 차례를 넘겼어요.",
      kind: kind === "hint" ? "hint" : "skip", game: r.game || 0, round: Math.floor(r.turn / n) + 1, speaker: speaker, createdAt: serverTimestamp()
    });
    const next = r.turn + 1;
    tx.update(roomRef(), nextPhase(r, next >= n * (r.rounds || 1) ? { turn: next, status: "discuss", readyVote: [] } : { turn: next }));
  });
}
async function toVote(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "discuss") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    tx.update(roomRef(), nextPhase(r, { status: "vote" }));
  });
}
async function readyToVote() {
  const me = meMember(); if (!me) return;
  try {
    await updateDoc(roomRef(), { readyVote: arrayUnion(me.id) });
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "discuss") return;
      const need = Math.ceil((r.lineup || []).length / 2);
      if ((r.readyVote || []).length >= need) tx.update(roomRef(), nextPhase(r, { status: "vote" }));
    });
  } catch (e) { toast(errText(e)); }
}
async function castVote(target) {
  const me = meMember(); if (!me) return;
  try {
    await updateDoc(roomRef(), { ["votes." + me.id]: target });
    await finalizeVotes(false);
  } catch (e) { toast(errText(e)); }
}
async function finalizeVotes(force, expectPhase) {
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "vote") return;
      if (expectPhase != null && r.phase !== expectPhase) return;
      const votes = r.votes || {}, lineup = r.lineup || [];
      const voted = lineup.filter(function (p) { return votes[p]; });
      if (!force && voted.length < lineup.length) return;
      const d = dealFull(lineup, r.seed, r.topic.words);
      const tally = {};
      voted.forEach(function (p) { tally[votes[p]] = (tally[votes[p]] || 0) + 1; });
      let max = 0; Object.keys(tally).forEach(function (k) { if (tally[k] > max) max = tally[k]; });
      const top = Object.keys(tally).filter(function (k) { return tally[k] === max; });
      if (!voted.length) tx.update(roomRef(), nextPhase(r, { status: "result", winner: "liar", accused: null, reason: "아무도 투표하지 않았어요." }));
      else if (top.length > 1) tx.update(roomRef(), nextPhase(r, { status: "result", winner: "liar", accused: null, reason: "표가 똑같이 갈려서 라이어를 잡지 못했어요." }));
      else if (top[0] !== d.liar) tx.update(roomRef(), nextPhase(r, { status: "result", winner: "liar", accused: top[0], reason: "엉뚱한 사람을 지목했어요." }));
      else tx.update(roomRef(), nextPhase(r, { status: "guess", accused: top[0] }));
    });
  } catch (e) { toast(errText(e)); }
}
async function submitGuess(text, timedOut, expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "guess") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const d = dealFull(r.lineup, r.seed, r.topic.words);
    const ok = text && normWord(text) === normWord(d.word);
    tx.update(roomRef(), nextPhase(r, {
      status: "result", guess: text || "", winner: ok ? "liar" : "team",
      reason: ok ? "라이어가 제시어를 맞혔어요." : timedOut ? "라이어가 20초 안에 제시어를 맞히지 못했어요." : (text ? "라이어가 제시어를 맞히지 못했어요." : "라이어가 맞히기를 포기했어요.")
    }));
  });
}

/* ---------- Liar: phase timers ---------- */
const GRACE_MS = 1500;
let lastTimeoutKey = "";
function phaseEnd(r) {
  if (!r || !DUR[r.status] || !r.phaseAt || !r.phaseAt.toMillis) return null;
  return r.phaseAt.toMillis() + DUR[r.status] * 1000;
}
function fmtSec(s) { return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function timerEl(r, label) {
  const end = phaseEnd(r), total = (DUR[r.status] || 1) * 1000;
  const left = end == null ? total : end - Date.now();
  const sec = Math.max(0, Math.ceil(left / 1000));
  const bar = h("i"); bar.style.width = Math.max(0, Math.min(100, left / total * 100)) + "%";
  return h("div", { class: "timer" + (sec <= 10 ? " low" : ""), role: "timer" },
    h("span", { class: "t-label", text: label }), h("b", { class: "t-num", text: fmtSec(sec) }), h("span", { class: "t-bar" }, bar));
}
async function onTimeout(r) {
  if (r.status === "hint") return advanceTurn("timeout", null, r.phase);
  if (r.status === "discuss") return toVote(r.phase);
  if (r.status === "vote") return finalizeVotes(true, r.phase);
  if (r.status === "guess") return submitGuess("", true, r.phase);
}
setInterval(function () {
  const r = S.room;
  if (!r || currentRoute().indexOf("room-") !== 0) return;
  const end = phaseEnd(r);
  if (end == null) return;
  const left = end - Date.now(), total = DUR[r.status] * 1000;
  const sec = Math.max(0, Math.ceil(left / 1000));
  document.querySelectorAll(".timer").forEach(function (el) {
    el.querySelector(".t-num").textContent = fmtSec(sec);
    el.querySelector(".t-bar i").style.width = Math.max(0, Math.min(100, left / total * 100)) + "%";
    el.classList.toggle("low", sec <= 10);
  });
  const key = r.id + ":" + r.phase;
  if (left < -GRACE_MS && lastTimeoutKey !== key && S.user) {
    lastTimeoutKey = key;
    onTimeout(r).catch(function () {});
  }
}, 500);
async function backToLobby() {
  await roomUpdate({ status: "lobby", votes: {}, accused: null, guess: null, winner: null, reason: null, turn: 0, order: [], lineup: [], topic: null, readyVote: [], phaseAt: null });
}

function screenRoom(id) {
  watchRoom(id);
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-liar"); }, text: "라이어 방 목록" });
  if (S.roomMissing) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "이 방은 닫혔거나 없어요." }));
  const r = S.room;
  if (!r) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "방에 들어가는 중…" }));
  if (r.status === "closed") return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "이 방은 닫혔어요. 새 방을 만들어 주세요." }));

  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  const lineup = playing ? (r.lineup || []) : players;
  const isPlayer = me && lineup.indexOf(me.id) >= 0;
  const d = playing ? dealOf(r) : null;
  if (playing && !d) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "게임 정보를 읽지 못했어요. ‘같은 방에서 한 판 더’로 다시 시작해 주세요." }),
    h("button", { type: "button", class: "ghost wide", onclick: backToLobby, text: "대기실로 돌리기" }));

  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "라이어 · " + nickOf(r.createdBy) + "의 방" }),
      h("h2", { text: STATUS_LABEL[r.status] || "" })),
    h("span", { class: "mode-chip", text: (r.mode === 1 ? "바보 모드" : "일반 모드") + " · " + (r.rounds || 1) + "바퀴" }));

  const chips = h("div", { class: "chips" }, lineup.map(function (p) {
    const voted = r.status === "vote" && r.votes && r.votes[p];
    return h("span", { class: "chip static" + (me && p === me.id ? " me" : "") + (voted ? " done" : "") },
      nickOf(p) + (voted ? " ✓" : ""));
  }));

  let phase;
  if (r.status === "lobby") phase = lobbyPanel(r, me, inRoom, players);
  else if (r.status === "hint") phase = hintPanel(r, me, isPlayer, d);
  else if (r.status === "discuss") phase = discussPanel(r, me, isPlayer);
  else if (r.status === "vote") phase = votePanel(r, me, isPlayer);
  else if (r.status === "guess") phase = guessPanel(r, me, d);
  else phase = resultPanel(r, d, me, isPlayer);

  const card = playing && isPlayer && r.status !== "result" ? myCard(r, me, d) : null;
  const showLog = playing || S.msgs.length;

  return h("section", { class: "screen room" }, back, head,
    h("div", { class: "field" }, h("div", { class: "field-label", text: (playing ? "참가자 " : "모인 사람 ") + lineup.length + "명" }), chips),
    card, phase,
    showLog ? chatBox(r, me) : null);
}
function lobbyPanel(r, me, inRoom, players) {
  function seg(field, value, label, sub) {
    return h("button", { type: "button", "aria-pressed": (r[field] || (field === "rounds" ? 1 : 0)) === value ? "true" : "false",
      onclick: function () { const p = {}; p[field] = value; roomUpdate(p); } }, label, sub ? h("small", { text: sub }) : null);
  }
  const topicSel = h("select", { id: "room-topic", class: "select" },
    h("option", { value: "-1", text: "랜덤 (우리끼리 주제 포함)" }),
    LIAR_DEFAULT_TOPICS.map(function (t, i) { return h("option", { value: String(i), text: t.name }); }));
  topicSel.value = String(r.topicChoice == null ? -1 : r.topicChoice);
  topicSel.addEventListener("change", function () { roomUpdate({ topicChoice: parseInt(topicSel.value, 10) }); });
  const enough = players.length >= 3;
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "게임 설정 · 참가자 누구나 바꿀 수 있어요" }),
    h("div", { class: "seg" }, seg("mode", 0, "일반", "라이어는 자기가 라이어인 걸 알아요"), seg("mode", 1, "바보", "라이어도 비슷한 단어를 받아요")),
    h("div", { class: "seg" }, seg("rounds", 1, "설명 1바퀴"), seg("rounds", 2, "설명 2바퀴")),
    h("label", { class: "sub-label", for: "room-topic", text: "주제" }), topicSel,
    !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요. 손님은 구경과 채팅만 할 수 있어요." })
      : inRoom
        ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", disabled: !enough, onclick: startGame, text: enough ? "게임 시작" : "3명부터 시작" }))
        : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
    h("p", { class: "hint", text: "단톡방에 ‘게임방 → 라이어에 방 열었어요’라고 알려주세요." }));
}
function myCard(r, me, d) {
  const isLiar = d.liar === me.id, showLiar = isLiar && r.mode === 0;
  return h("div", { class: "secret-card front compact" + (showLiar ? " liar" : "") },
    h("span", { class: "sc-eyebrow", text: "내 카드 · 주제 " + r.topic.name }),
    h("span", { class: "sc-big", text: showLiar ? "당신은 라이어" : (isLiar ? d.fool : d.word) }),
    h("span", { class: "sc-hint", text: showLiar ? "제시어를 몰라요. 다른 사람 설명을 듣고 들키지 않게 둘러대세요." : "단어를 그대로 쓰지 말고 설명하세요." }));
}
function hintPanel(r, me, isPlayer, d) {
  const n = r.order.length, speaker = r.order[r.turn % n], round = Math.floor(r.turn / n) + 1;
  const myTurn = me && speaker === me.id;
  const total = n * (r.rounds || 1);
  const box = h("div", { class: "panel turn" + (myTurn ? " mine" : "") },
    h("div", { class: "field-label", text: round + "바퀴 · " + (r.turn + 1) + " / " + total + "번째 설명" }),
    h("div", { class: "turn-now" }, h("span", { class: "eyebrow", text: "지금 차례" }), h("b", { text: myTurn ? "내 차례예요!" : nickOf(speaker) })),
    timerEl(r, myTurn ? "내 설명 남은 시간" : nickOf(speaker) + " 남은 시간"),
    h("ol", { class: "order mini" }, r.order.map(function (p, i) {
      return h("li", { class: (i === r.turn % n ? "now" : "") + (me && p === me.id ? " me" : "") }, h("span", { text: nickOf(p) }));
    })));
  if (myTurn) {
    const inp = draft("input", "hint-text", { type: "text", class: "text-in", maxlength: "60", placeholder: "제시어를 한 마디로 설명하세요", autocomplete: "off" });
    const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: "설명 올리기" }));
    f.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const t = inp.value.trim();
      if (!t) return;
      if (d && normWord(t).indexOf(normWord(d.word)) >= 0 && d.liar !== me.id) { toast("제시어를 그대로 쓰면 안 돼요."); return; }
      try { await advanceTurn("hint", t); S.drafts["hint-text"] = ""; render(); }
      catch (e) { toast(e && (e.code === "turn" || e.code === "phase") ? "시간이 지나서 차례가 넘어갔어요." : errText(e)); }
    });
    append(box, f);
  } else {
    append(box, h("button", { type: "button", class: "link-btn", onclick: async function () {
      try { await advanceTurn("skip"); } catch (e) { toast(errText(e)); }
    }, text: nickOf(speaker) + " 차례 넘기기 (자리 비웠을 때)" }));
  }
  return box;
}
function discussPanel(r, me, isPlayer) {
  const need = Math.ceil((r.lineup || []).length / 2), ready = r.readyVote || [];
  const mine = me && ready.indexOf(me.id) >= 0;
  return h("div", { class: "panel turn" },
    h("div", { class: "field-label", text: "토론 시간" }),
    timerEl(r, "토론 남은 시간"),
    h("p", { text: "설명이 끝났어요. 아래 대화창에서 누가 라이어인지 이야기해 보세요." }),
    isPlayer
      ? h("button", { type: "button", class: mine ? "ghost wide" : "save", disabled: mine, onclick: readyToVote },
          (mine ? "바로 투표에 찬성했어요 " : "바로 투표하기 ") + "(" + ready.length + "/" + need + ")")
      : null,
    h("p", { class: "hint", text: "참가자 절반 이상이 ‘바로 투표하기’를 누르면 2분이 지나기 전에 투표로 넘어가요." }));
}
function votePanel(r, me, isPlayer) {
  const votes = r.votes || {}, lineup = r.lineup || [];
  const doneCount = lineup.filter(function (p) { return votes[p]; }).length;
  const mine = me ? votes[me.id] : null;
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "투표 · " + doneCount + " / " + lineup.length + "명 완료" }),
    timerEl(r, "투표 남은 시간"),
    isPlayer
      ? h("div", { class: "vote-grid" }, lineup.filter(function (p) { return p !== me.id; }).map(function (p) {
          return h("button", { type: "button", class: "vote-btn", "aria-pressed": mine === p ? "true" : "false", onclick: function () { castVote(p); } },
            h("div", { class: "vp" }, photoBox(findMember(p) || {})), h("span", { text: nickOf(p) }));
        }))
      : h("p", { class: "note", text: "참가자들이 투표하고 있어요." }),
    isPlayer ? h("p", { class: "hint", text: mine ? "‘" + nickOf(mine) + "’에게 투표했어요. 다른 사람을 누르면 바꿀 수 있어요." : "라이어라고 생각하는 사람을 누르세요. 시간이 끝나면 그때까지 받은 표로 집계해요." }) : null);
}
function guessPanel(r, me, d) {
  const accused = r.accused;
  if (me && me.id === accused) {
    const inp = draft("input", "guess-text", { type: "text", class: "text-in", maxlength: "30", placeholder: "제시어는 무엇일까요?", autocomplete: "off" });
    const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: "정답 제출" }));
    f.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      try { await submitGuess(inp.value.trim()); S.drafts["guess-text"] = ""; } catch (e) { toast(errText(e)); }
    });
    return h("div", { class: "panel turn mine" },
      h("div", { class: "field-label", text: "라이어의 마지막 기회" }),
      timerEl(r, "정답 남은 시간"),
      h("p", { text: r.mode === 1 ? "들켰어요! 당신이 라이어였어요. 진짜 제시어를 맞히면 역전승이에요." : "들켰어요! 제시어를 맞히면 역전승이에요." }),
      h("p", { class: "note", text: "주제: " + r.topic.name }),
      f,
      h("button", { type: "button", class: "link-btn", onclick: function () { submitGuess(""); }, text: "포기하기" }));
  }
  return h("div", { class: "panel turn" },
    h("div", { class: "field-label", text: "라이어 검거" }),
    timerEl(r, "라이어 남은 시간"),
    h("p", null, h("b", { text: nickOf(accused) }), "님이 라이어로 지목됐어요. 제시어를 맞히는 중이에요…"));
}
function resultPanel(r, d, me, isPlayer) {
  const teamWin = r.winner === "team";
  const liarM = findMember(d.liar) || { nick: nickOf(d.liar) };
  const votes = r.votes || {};
  return h("div", { class: "answer" + (teamWin ? " team" : "") },
    h("div", { class: "result-title", text: teamWin ? "조직원 승리" : "라이어 승리" }),
    h("p", { class: "note", text: r.reason || "" }),
    h("div", { class: "ans-liar" }, h("div", { class: "ans-photo" }, photoBox(liarM)),
      h("div", null, h("span", { class: "eyebrow", text: "라이어" }), h("b", { text: liarM.nick }))),
    h("p", null, "제시어: ", h("b", { text: d.word }), "  ·  주제: " + r.topic.name),
    r.mode === 1 ? h("p", null, "라이어가 받은 단어: ", h("b", { text: d.fool })) : null,
    r.guess ? h("p", null, "라이어의 답: ", h("b", { text: r.guess })) : null,
    Object.keys(votes).length ? h("ul", { class: "vote-list" }, (r.lineup || []).filter(function (p) { return votes[p]; }).map(function (p) {
      return h("li", { text: nickOf(p) + " → " + nickOf(votes[p]) });
    })) : null,
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { go("game-liar"); }, text: "방 목록" }),
      h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
}
function chatBox(r, me) {
  const game = r.game || 0;
  const msgs = S.msgs.filter(function (m) { return (m.game || 0) === game; });
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "skip") return h("div", { class: "msg-sys", text: m.text });
      const mine = me && m.memberId === me.id;
      return h("div", { class: "bubble " + (m.kind === "hint" ? "hint" : "chat") + (mine ? " mine" : "") },
        h("div", { class: "b-meta" },
          h("b", { text: m.nick || "손님" }),
          m.kind === "hint" ? h("span", { class: "b-tag", text: (m.round || 1) + "바퀴 설명" }) : null),
        h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "120", placeholder: r.status === "discuss" ? "토론 메시지 보내기" : "잡담 보내기", autocomplete: "off" });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm", text: "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = inp.value.trim(); if (!t || !S.user) return;
    try { await sendMsg("chat", t); S.drafts["chat-text"] = ""; render(); } catch (e) { toast(errText(e)); }
  });
  return h("div", { class: "field" }, h("div", { class: "field-label", text: "대화" }), log, f);
}

/* ---------- Liar: custom topics (boss) ---------- */
function topicManager() {
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "우리끼리 주제 · 두목 전용" }),
    S.topics.length
      ? h("ul", { class: "topic-list" }, S.topics.map(function (t) {
          return h("li", null, h("span", null, h("b", { text: t.name }), " · " + (t.words || []).length + "개"),
            h("button", { type: "button", class: "btn-sm", onclick: function () { openTopicEditor(t); }, text: "수정" }));
        }))
      : h("p", { class: "note", text: "아직 없어요. 우리끼리만 아는 단어로 주제를 만들어 보세요." }),
    h("button", { type: "button", class: "add-btn", onclick: function () { openTopicEditor(null); }, text: "주제 추가" }),
    h("p", { class: "hint", text: "우리끼리 주제는 방 설정에서 ‘랜덤’일 때 다른 주제들 사이에 섞여 나와요." }));
}

/* ---------- guestbook ---------- */
function screenGuestbook() {
  const me = meMember();
  const who = me ? me.nick : "손님";
  const ta = draft("textarea", "gb-text", { class: "gb-in", maxlength: "300", placeholder: "본부에 한마디 남기기" });
  const f = h("form", { class: "panel", novalidate: true },
    h("div", { class: "field-label", text: who + "(으)로 남기기" }), ta,
    h("button", { type: "submit", class: "save", disabled: !S.user, text: "남기기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = ta.value.trim();
    if (!t) { toast("내용을 적어주세요."); return; }
    try {
      await addDoc(collection(db, "guestbook"), { uid: myUid(), memberId: me ? me.id : null, nick: who, text: t, createdAt: serverTimestamp() });
      S.drafts["gb-text"] = ""; render(); toast("방명록에 남겼어요.");
    } catch (e) { toast(errText(e)); }
  });
  const list = S.guest.length
    ? h("ul", { class: "gb-list" }, S.guest.map(function (g) {
        const m = g.memberId ? findMember(g.memberId) : null;
        const canDel = isBoss() || (S.user && g.uid === S.user.uid);
        return h("li", { class: "gb-item" },
          h("div", { class: "gb-photo" }, photoBox(m || { nick: g.nick })),
          h("div", { class: "gb-body" },
            h("div", { class: "gb-meta" }, h("b", { text: m ? m.nick : (g.nick || "손님") }), m && m.rank ? h("span", { class: "gb-rank", text: m.rank }) : null,
              h("span", { class: "gb-time", text: timeAgo(g.createdAt) })),
            h("p", { class: "gb-text", text: g.text }),
            canDel ? (S.gbConfirm === g.id
              ? h("div", { class: "gb-del" }, h("span", { text: "지울까요?" }),
                  h("button", { type: "button", class: "link-btn", onclick: function () { S.gbConfirm = null; render(); }, text: "취소" }),
                  h("button", { type: "button", class: "link-btn danger", onclick: async function () {
                    try { await deleteDoc(doc(db, "guestbook", g.id)); S.gbConfirm = null; } catch (e) { toast(errText(e)); }
                  }, text: "지우기" }))
              : h("button", { type: "button", class: "link-btn quiet", onclick: function () { S.gbConfirm = g.id; render(); }, text: "지우기" })) : null));
      }))
    : h("div", { class: "empty", text: S.guestReady ? "첫 방명록을 남겨 주세요." : "방명록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "본부 출입 기록" }), h("h2", { text: "방명록" }),
        h("p", { text: "조직원 누구나 남길 수 있어요. 내가 쓴 글은 내가 지울 수 있어요." }))),
    f, list);
}

/* ---------- editors (boss) ---------- */
function resizeImage(file) {
  return new Promise(function (resolve, reject) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function () {
      const max = 640, w = img.naturalWidth, hgt = img.naturalHeight;
      const s = Math.min(1, max / Math.max(w, hgt));
      const c = document.createElement("canvas");
      c.width = Math.round(w * s); c.height = Math.round(hgt * s);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1c1d20"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}
let sheetEl = null;
function closeEditor() { if (sheetEl) { sheetEl.remove(); sheetEl = null; document.body.style.overflow = ""; } }
function openSheet(eyebrow, title, form) {
  closeEditor();
  sheetEl = h("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": title,
      onclick: function (ev) { if (ev.target === sheetEl) closeEditor(); } },
    h("div", { class: "sheet-panel" },
      h("div", { class: "sheet-head" },
        h("div", null, h("span", { class: "eyebrow", text: eyebrow }), h("h2", { text: title })),
        h("button", { type: "button", class: "x", "aria-label": "닫기", onclick: closeEditor, text: "✕" })),
      form));
  document.body.appendChild(sheetEl);
  document.body.style.overflow = "hidden";
}
function openEditor(m) {
  const isNew = !m;
  const dr = { photo: m ? safePhoto(m.photo) : "" };
  const nick = h("input", { type: "text", id: "f-nick", maxlength: "20", value: m ? m.nick : "", autocomplete: "off" });
  const rank = h("input", { type: "text", id: "f-rank", maxlength: "10", value: m ? (m.rank || "") : "", autocomplete: "off", placeholder: "비워두면 일반 조직원 (예: 두목, 부두목)" });
  const alias = h("input", { type: "text", id: "f-alias", maxlength: "30", value: m ? (m.alias || "") : "", autocomplete: "off", placeholder: "예: 볼주머니 금고" });
  const intro = h("input", { type: "text", id: "f-intro", maxlength: "80", value: m ? (m.intro || "") : "", autocomplete: "off", placeholder: "본인 진술 한 줄" });
  const charges = h("textarea", { id: "f-charges", placeholder: "한 줄에 혐의 하나씩\n예: 회의 중 몰래 간식 먹은 혐의" });
  charges.value = m ? (m.charges || []).join("\n") : "";
  const thumb = h("div", { class: "thumb" });
  const msg = h("p", { class: "msg", role: "status" });
  const removeBtn = h("button", { type: "button", class: "ghost", onclick: function () { dr.photo = ""; drawThumb(); }, text: "사진 빼기" });
  function drawThumb() { thumb.replaceChildren(photoBox({ nick: nick.value || "?", photo: dr.photo })); removeBtn.hidden = !dr.photo; }
  const fileIn = h("input", { type: "file", id: "f-photo", accept: "image/*" });
  fileIn.addEventListener("change", function () {
    const f = fileIn.files && fileIn.files[0];
    if (!f) return;
    msg.className = "msg"; msg.textContent = "사진 정리 중…";
    resizeImage(f).then(function (d) { dr.photo = d; drawThumb(); msg.textContent = "사진을 붙였어요. 저장하면 모두에게 보입니다."; },
      function () { msg.className = "msg err"; msg.textContent = "이 사진은 열 수 없어요. 다른 사진(JPG, PNG)을 골라주세요."; });
    fileIn.value = "";
  });
  const saveBtn = h("button", { type: "submit", class: "save", text: isNew ? "수배서 등록" : "수정 내용 저장" });
  const form = h("form", { class: "form", novalidate: true },
    h("div", { class: "photo-edit" }, thumb,
      h("div", { class: "photo-btns" }, h("label", { class: "file-btn" }, "사진 고르기", fileIn), removeBtn,
        h("span", { class: "hint", text: "자동으로 작게 줄여서 저장돼요." }))),
    h("label", null, h("b", { text: "닉네임 (필수)" }), nick),
    h("label", null, h("b", { text: "직위" }), rank),
    h("label", null, h("b", { text: "별명" }), alias),
    h("label", null, h("b", { text: "한 줄 소개" }), intro),
    h("label", null, h("b", { text: "혐의" }), charges),
    msg, saveBtn);
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const n = nick.value.trim();
    if (!n) { msg.className = "msg err"; msg.textContent = "닉네임을 적어주세요."; nick.focus(); return; }
    const rec = {
      nick: n, rank: rank.value.trim(), alias: alias.value.trim(), intro: intro.value.trim(),
      charges: charges.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 8),
      photo: dr.photo, sample: false
    };
    const id = isNew ? "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) : m.id;
    rec.no = isNew ? S.members.reduce(function (a, x) { return Math.max(a, x.no || 0); }, 0) + 1 : m.no;
    saveBtn.disabled = true; saveBtn.textContent = "저장 중…";
    try {
      await setDoc(doc(db, "members", id), rec);
      closeEditor(); go("m-" + id); toast(isNew ? "새 수배서를 등록했어요." : "수배서를 저장했어요.");
    } catch (e) {
      saveBtn.disabled = false; saveBtn.textContent = isNew ? "수배서 등록" : "수정 내용 저장";
      msg.className = "msg err"; msg.textContent = errText(e);
    }
  });
  nick.addEventListener("input", function () { if (!dr.photo) drawThumb(); });
  openSheet(isNew ? "신규 등록" : caseNo(m), isNew ? "조직원 등록" : "수배서 수정", form);
  drawThumb();
}
function openTopicEditor(t) {
  const name = h("input", { type: "text", id: "t-name", maxlength: "16", value: t ? t.name : "", autocomplete: "off", placeholder: "예: 게임 아이템" });
  const words = h("textarea", { id: "t-words", placeholder: "한 줄에 하나씩, 또는 쉼표로 구분\n예: 빨간 포션, 귀환 주문서, 엘릭서, 순간이동 스크롤" });
  words.value = t ? (t.words || []).join("\n") : "";
  const msg = h("p", { class: "msg", role: "status" });
  const saveBtn = h("button", { type: "submit", class: "save", text: t ? "주제 저장" : "주제 추가" });
  const delArea = h("div");
  function fail(text) { saveBtn.disabled = false; saveBtn.textContent = t ? "주제 저장" : "주제 추가"; msg.className = "msg err"; msg.textContent = text; }
  function drawDel(confirming) {
    if (!t) return;
    delArea.replaceChildren(confirming
      ? h("div", { class: "confirm" }, h("p", { text: "‘" + t.name + "’ 주제를 지울까요?" }),
          h("div", { class: "op-row" },
            h("button", { type: "button", onclick: function () { drawDel(false); }, text: "취소" }),
            h("button", { type: "button", class: "danger", onclick: async function () {
              try { await deleteDoc(doc(db, "liarTopics", t.id)); closeEditor(); toast("주제를 지웠어요."); } catch (e) { fail(errText(e)); }
            }, text: "지우기" })))
      : h("button", { type: "button", class: "ghost", onclick: function () { drawDel(true); }, text: "이 주제 지우기" }));
  }
  const form = h("form", { class: "form", novalidate: true },
    h("label", null, h("b", { text: "주제 이름" }), name),
    h("label", null, h("b", { text: "단어 (4개 이상)" }), words),
    msg, saveBtn, delArea);
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const nm = name.value.trim();
    const seen = {};
    const ws = words.value.split(/[\n,]/).map(function (w) { return w.trim(); })
      .filter(function (w) { if (!w || seen[w]) return false; seen[w] = true; return true; }).slice(0, 60);
    if (!nm) { fail("주제 이름을 적어주세요."); return; }
    if (ws.length < 4) { fail("단어를 4개 이상 적어주세요. 지금 " + ws.length + "개예요."); return; }
    saveBtn.disabled = true; saveBtn.textContent = "저장 중…";
    try {
      if (t) await setDoc(doc(db, "liarTopics", t.id), { name: nm, words: ws, order: t.order || 0 });
      else await addDoc(collection(db, "liarTopics"), { name: nm, words: ws, order: Date.now() });
      closeEditor(); toast(t ? "주제를 저장했어요." : "주제를 추가했어요.");
    } catch (e) { fail(errText(e)); }
  });
  openSheet("라이어 · 우리끼리 주제", t ? "주제 수정" : "주제 추가", form);
  drawDel(false);
}
document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEditor(); });

/* ---------- shell ---------- */
const root = document.getElementById("bf-root");
const main = h("main", { class: "wrap" });
const opChip = h("span", { class: "op-chip", text: "두목", hidden: true });
const header = h("div", { class: "filebar wrap" },
  h("span", { class: "brand" }, logo("logo-s"), h("span", null, h("b", { text: "불주먹조직" }), " · 비밀본부")),
  h("span", { class: "fb-right" }, opChip, h("span", { class: "lvl", text: "기밀 등급 A" })));
const TABS = [["hq", "본부"], ["members", "조직원"], ["games", "게임방"], ["guestbook", "방명록"]];
const tabEls = {};
const tabbar = h("nav", { class: "tabbar", "aria-label": "주 메뉴" },
  h("div", { class: "tabbar-in" }, TABS.map(function (t) {
    const b = h("button", { class: "tab", type: "button", onclick: function () { go(t[0]); } }, icon(t[0]), h("span", { text: t[1] }));
    tabEls[t[0]] = b;
    return b;
  })));
root.replaceChildren(header, main, tabbar);

let lastRoute = null, queued = false, lastMsgCount = 0;
function render() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(function () { queued = false; draw(); });
}
function draw() {
  const active = document.activeElement;
  const aid = active && active.id && main.contains(active) ? active.id : null;
  const sel = aid && typeof active.selectionStart === "number" ? [active.selectionStart, active.selectionEnd] : null;
  const oldLog = main.querySelector(".log");
  const logState = oldLog ? { top: oldLog.scrollTop, pinned: oldLog.scrollHeight - oldLog.scrollTop - oldLog.clientHeight < 60 } : null;

  const r = currentRoute();
  let tab = "hq", view;
  if (!S.membersReady) {
    view = h("section", { class: "screen" }, h("div", { class: "empty", text: "본부 문을 여는 중…" }));
  } else if (needsGate()) {
    view = screenGate();
  } else if (r === "members") { tab = "members"; view = screenMembers(); }
  else if (r.indexOf("m-") === 0) { tab = "members"; view = screenDetail(r.slice(2)); }
  else if (r === "games") { tab = "games"; view = screenGames(); }
  else if (r === "game-liar") { tab = "games"; view = screenLiarLobby(); }
  else if (r.indexOf("room-") === 0) { tab = "games"; view = screenRoom(r.slice(5)); }
  else if (r === "guestbook") { tab = "guestbook"; view = screenGuestbook(); }
  else view = screenHQ();
  if (r.indexOf("room-") !== 0) watchRoom(null);
  if (r !== lastRoute) S.confirmDelete = false;

  const gate = S.membersReady && needsGate();
  tabbar.hidden = gate;
  main.replaceChildren(view);
  Object.keys(tabEls).forEach(function (k) { if (k === tab && !gate) tabEls[k].setAttribute("aria-current", "page"); else tabEls[k].removeAttribute("aria-current"); });
  opChip.hidden = !isBoss();

  if (aid) {
    const el = document.getElementById(aid);
    if (el) { el.focus({ preventScroll: true }); if (sel && el.setSelectionRange) try { el.setSelectionRange(sel[0], sel[1]); } catch (e) {} }
  }
  const log = main.querySelector(".log");
  if (log) {
    const grew = S.msgs.length !== lastMsgCount;
    if (!logState || logState.pinned || grew) log.scrollTop = log.scrollHeight; else log.scrollTop = logState.top;
  }
  lastMsgCount = S.msgs.length;
  if (r !== lastRoute) window.scrollTo(0, 0);
  lastRoute = r;
}
window.addEventListener("hashchange", render);
subscribeBase();
render();
