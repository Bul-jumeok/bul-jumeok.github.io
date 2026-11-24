import { initializeApp } from "firebase/app";
import {
  getAuth, connectAuthEmulator, onAuthStateChanged, signInAnonymously,
  GoogleAuthProvider, signInWithPopup, signOut, signInWithCredential
} from "firebase/auth";
import {
  getFirestore, connectFirestoreEmulator, collection, doc, onSnapshot, query, orderBy, limit, limitToLast, where,
  setDoc, addDoc, updateDoc, deleteDoc, writeBatch, runTransaction, serverTimestamp,
  arrayUnion, arrayRemove, Timestamp, deleteField
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
  flipped: {}, importing: false, sketchNames: null, sketchKnown: false, migrated: false
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
function append(el) {
  for (let i = 1; i < arguments.length; i++) {
    const c = arguments[i];
    if (c == null || c === false) continue;
    if (Array.isArray(c)) c.forEach(function (x) { append(el, x); });
    else el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
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


/* ---------- sound effects: generated with Web Audio, no audio files ---------- */
const SND = { ctx: null, on: true, buf: null, breath: null, lastSec: null, lastKey: "", lastPop: 0 };
try { SND.on = localStorage.getItem("bf-sound") !== "off"; } catch (e) {}
function ac() {
  if (!SND.on) return null;
  if (!SND.ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { SND.ctx = new C(); } catch (e) { return null; }
  }
  if (SND.ctx.state === "suspended") SND.ctx.resume().catch(function () {});
  return SND.ctx;
}
/* phones only allow sound after the viewer touches the page */
["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
  document.addEventListener(ev, function () { if (SND.on) ac(); }, { passive: true });
});
function noiseBuf(c) {
  if (!SND.buf) {
    const b = c.createBuffer(1, Math.floor(c.sampleRate * 1.5), c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    SND.buf = b;
  }
  return SND.buf;
}
function tone(f, dur, o) {
  o = o || {};
  const c = ac(); if (!c) return;
  const t = c.currentTime + (o.at || 0), os = c.createOscillator(), g = c.createGain();
  os.type = o.type || "sine";
  os.frequency.setValueAtTime(f, t);
  if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + dur);
  const v = o.gain == null ? 0.15 : o.gain;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(v, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  os.connect(g); g.connect(c.destination);
  os.start(t); os.stop(t + dur + 0.05);
}
function hiss(dur, o) {
  o = o || {};
  const c = ac(); if (!c) return null;
  const t = c.currentTime + (o.at || 0), src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = noiseBuf(c); src.loop = true;
  f.type = o.filter || "bandpass";
  f.frequency.setValueAtTime(o.f || 1000, t);
  if (o.fTo) f.frequency.linearRampToValueAtTime(o.fTo, t + dur);
  f.Q.value = o.q || 0.8;
  const v = o.gain == null ? 0.2 : o.gain;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(v, t + (o.attack || 0.01));
  if (!o.hold) g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f); f.connect(g); g.connect(c.destination);
  src.start(t);
  if (!o.hold) src.stop(t + dur + 0.05);
  return { src: src, g: g, c: c };
}
const SFX = {
  tick: function () { tone(1500, 0.04, { type: "square", gain: 0.04 }); },
  beep: function () { tone(660, 0.14, { type: "square", gain: 0.07 }); },
  go: function () { tone(990, 0.35, { type: "square", gain: 0.08 }); },
  ding: function () { tone(988, 0.25, { gain: 0.12 }); tone(1480, 0.35, { gain: 0.08, at: 0.08 }); },
  correct: function () { tone(1047, 0.18, { type: "triangle", gain: 0.14 }); tone(784, 0.35, { type: "triangle", gain: 0.14, at: 0.16 }); },
  timeup: function () { tone(440, 0.45, { type: "square", gain: 0.06 }); },
  pop: function () { tone(620, 0.06, { gain: 0.05, to: 900 }); },
  bang: function () {
    hiss(0.35, { filter: "highpass", f: 900, gain: 0.5, q: 0.5 });
    tone(110, 0.4, { gain: 0.4, to: 40 });
    hiss(0.9, { filter: "lowpass", f: 600, gain: 0.12, at: 0.05 });
  },
  cough: function () {
    /* 콜록… 콜록… 콜록… for the whole cough */
    [0, 0.2, 0.75, 0.95, 1.55, 1.75, 2.45, 2.65].forEach(function (a, i) {
      hiss(0.16, { filter: "bandpass", f: i % 2 ? 620 : 760, q: 1.2, gain: 0.35, at: a });
      tone(i % 2 ? 140 : 170, 0.12, { type: "sawtooth", gain: 0.07, to: 85, at: a });
    });
  },
  exhale: function () { hiss(0.8, { filter: "bandpass", f: 900, fTo: 400, q: 0.7, gain: 0.12, attack: 0.05 }); },
  night: function () { tone(392, 0.5, { type: "triangle", gain: 0.1 }); tone(311, 0.6, { type: "triangle", gain: 0.1, at: 0.35 }); tone(233, 0.9, { type: "triangle", gain: 0.1, at: 0.7 }); },
  morning: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.3, { type: "triangle", gain: 0.1, at: i * 0.11 }); }); },
  fanfare: function () { [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { tone(f, i === 5 ? 0.7 : 0.18, { type: "square", gain: 0.07, at: i * 0.15 }); }); }
};
function sfx(name) {
  if (EMU) (window.__sfxLog = window.__sfxLog || []).push(name);
  if (!SND.on) return;
  try { SFX[name](); } catch (e) {}
}
function breathStart(L) {
  if (EMU) (window.__sfxLog = window.__sfxLog || []).push("inhale");
  if (!SND.on) return;
  breathStop();
  L = L || 0;
  const toFull = Math.max(0.05, (1 - L) / SM.fill);
  /* start where the lungs are now */
  try {
    const b = hiss(toFull, { filter: "bandpass", f: 420 + 900 * L, fTo: 1350, q: 0.7, gain: 0.11, attack: 0.12, hold: true });
    if (!b) return;
    const c = b.c, now = c.currentTime, t = now + Math.max(0, (0.85 - L) / SM.fill);
    const os = c.createOscillator(), og = c.createGain();
    os.type = "triangle";
    os.frequency.setValueAtTime(1700, t);
    os.frequency.linearRampToValueAtTime(2500, t + 0.15 / SM.fill);
    og.gain.setValueAtTime(0.0001, now);
    og.gain.setValueAtTime(0.0001, t);
    og.gain.linearRampToValueAtTime(0.03, t + 0.2);
    os.connect(og); og.connect(c.destination);
    os.start(now);
    b.os = os; b.og = og;
    SND.breath = b;
  } catch (e) {}
}
function breathStop() {
  const b = SND.breath; if (!b) return;
  SND.breath = null;
  try {
    const t = b.c.currentTime;
    [b.g, b.og].forEach(function (g) {
      if (!g) return;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t);
      g.gain.linearRampToValueAtTime(0.0001, t + 0.08);
    });
    b.src.stop(t + 0.1);
    if (b.os) b.os.stop(t + 0.1);
  } catch (e) {}
}
function exhaleSound(L) {
  if (EMU) (window.__sfxLog = window.__sfxLog || []).push("exhale");
  if (!SND.on) return;
  /* "후~" lasts until the lungs are empty enough to inhale safely */
  const dur = Math.max(0.35, ((L || 0) - SM.safe) / SM.drain);
  try {
    hiss(dur, { filter: "bandpass", f: 760, fTo: 330, q: 0.5, gain: 0.26, attack: 0.04 });
    hiss(dur * 0.8, { filter: "highpass", f: 2400, gain: 0.05, attack: 0.04 });
  } catch (e) {}
}
/* sounds for what changed in a game room */
function sfxRoom(a, b) {
  if (!a || !b || a.id !== b.id) return;
  const me = meMember(), my = me && me.id, st = a.status !== b.status;
  const fewer = (b.alive || []).length < (a.alive || []).length;
  if (st && b.status === "result") { if (b.type === "smoke") { sfx("bang"); setTimeout(function () { sfx("fanfare"); }, 700); } else sfx("fanfare"); return; }
  if (b.type === "mafia") {
    if (st && a.status === "verdict" && fewer) sfx("bang");
    if (st && b.status === "night") setTimeout(function () { sfx("night"); }, fewer ? 600 : 0);
    else if (st && b.status === "day") sfx(fewer ? "bang" : "morning");
    else if (st && (b.status === "vote" || b.status === "defense" || b.status === "verdict")) sfx("ding");
  } else if (b.type === "sketch") {
    if ((b.guessed || []).length > (a.guessed || []).length) sfx("correct");
    else if (st && b.status === "reveal") sfx("timeup");
    if (b.status === "draw" && (st || a.turn !== b.turn) && b.order && b.order[b.turn % b.order.length] === my) setTimeout(function () { sfx("ding"); }, 300);
  } else if (b.type === "smoke") {
    if (st && b.status === "play") sfx("go");
    else if (st && b.status === "shot") sfx("bang");
  } else {
    if (b.status === "hint" && (st || a.turn !== b.turn) && b.order && b.order[b.turn % b.order.length] === my) sfx("ding");
    else if (st && (b.status === "discuss" || b.status === "vote")) sfx("ding");
    else if (st && b.status === "guess") sfx("correct");
  }
}
function sfxMsgs(snap) {
  const me = meMember(), my = me && me.id;
  const fresh = snap.docChanges().some(function (ch) {
    if (ch.type !== "added" || ch.doc.metadata.hasPendingWrites) return false;
    const m = ch.doc.data();
    return m.kind !== "sys" && m.kind !== "skip" && m.memberId !== my;
  });
  if (fresh && Date.now() - SND.lastPop > 300) { SND.lastPop = Date.now(); sfx("pop"); }
}
/* countdown ticks in the last seconds of a timed phase */
const TICK_PHASES = { hint: 1, discuss: 1, vote: 1, guess: 1, night: 1, day: 1, defense: 1, verdict: 1, draw: 1, play: 1 };
function sfxTimer(r, sec) {
  const key = r.id + ":" + r.phase;
  if (SND.lastKey !== key) { SND.lastKey = key; SND.lastSec = null; }
  if (sec === SND.lastSec) return;
  SND.lastSec = sec;
  if (r.type === "smoke" && r.status === "ready") { if (sec >= 1 && sec <= 3) sfx("beep"); return; }
  if (TICK_PHASES[r.status] && sec >= 1 && sec <= 5) sfx("tick");
}

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
  onSnapshot(doc(db, "config", "sketch"), function (snap) {
    S.sketchNames = snap.exists() && Array.isArray(snap.data().names) ? snap.data().names : null;
    S.sketchKnown = true; render();
  }, function () { S.sketchKnown = true; });
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
/* ---------- room presence: a room with nobody looking at it disappears from the lists ---------- */
const ALIVE_MS = 60000, PRESENT_MS = 45000;
let beatT = null;
function tsMs(t) { return t && t.toMillis ? t.toMillis() : 0; }
function roomAlive(r) {
  if (!r || !r.status || r.status === "closed") return false;
  const now = Date.now();
  if (now - tsMs(r.createdAt) < ALIVE_MS) return true;
  const seen = r.seen || {};
  return Object.keys(seen).some(function (k) { return now - tsMs(seen[k] && seen[k].t) < ALIVE_MS; });
}
/* players who are actually in the room right now (falls back to everyone if presence is unknown) */
function presentPlayers(r) {
  const seen = r.seen || {}, now = Date.now(), here = {};
  let known = false;
  Object.keys(seen).forEach(function (k) { const v = seen[k]; if (v && v.m) { known = true; if (now - tsMs(v.t) < PRESENT_MS) here[v.m] = true; } });
  return (r.players || []).filter(function (p) { return !!findMember(p) && (!known || here[p]); });
}
function beat(id) {
  const uid = myUid(); if (!uid || !id) return;
  const me = meMember();
  updateDoc(doc(db, "rooms", id), { ["seen." + uid]: { t: serverTimestamp(), m: me ? me.id : null } }).catch(function () {});
}
function unbeat(id) {
  const uid = myUid(); if (!uid || !id) return;
  updateDoc(doc(db, "rooms", id), { ["seen." + uid]: deleteField() }).catch(function () {});
}
document.addEventListener("visibilitychange", function () {
  if (!S.roomId) return;
  if (document.visibilityState === "visible") beat(S.roomId); else unbeat(S.roomId);
});
window.addEventListener("pagehide", function () { if (S.roomId) unbeat(S.roomId); });
/* lists drop rooms that went quiet even when nothing else changes */
setInterval(function () { const r = currentRoute(); if (r === "hq" || r.indexOf("game-") === 0) render(); }, 5000);

let roomUnsubs = [];
function watchRoom(id) {
  if (S.roomId === id) return;
  roomUnsubs.forEach(function (u) { u(); }); roomUnsubs = [];
  clearInterval(beatT); beatT = null;
  if (S.roomId) unbeat(S.roomId);
  S.roomId = id; S.room = null; S.roomMissing = false; S.msgs = [];
  if (!id) return;
  beat(id);
  beatT = setInterval(function () { if (document.visibilityState !== "hidden") beat(id); }, 15000);
  let msgsLoaded = false;
  roomUnsubs.push(onSnapshot(doc(db, "rooms", id), function (snap) {
    const prev = S.room;
    S.room = snap.exists() ? Object.assign({ id: snap.id }, snap.data({ serverTimestamps: "estimate" })) : null;
    sfxRoom(prev, S.room);
    S.roomMissing = !snap.exists(); render();
  }));
  roomUnsubs.push(onSnapshot(query(collection(db, "rooms", id, "msgs"), orderBy("createdAt"), limitToLast(400)), function (snap) {
    if (msgsLoaded) sfxMsgs(snap);
    msgsLoaded = true;
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
  const openRooms = S.rooms.filter(roomAlive).length;
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
  { id: "mafia", code: "G-02", name: "마피아", desc: "조직 안에 조직이 있다. 밤마다 한 명씩.", ready: true },
  { id: "yut", code: "G-03", name: "윷놀이", desc: "도·개·걸·윷·모로 가리는 본부 서열.", ready: false },
  { id: "liar", code: "G-04", name: "라이어", desc: "혼자만 제시어를 모르는 사람을 찾아라.", ready: true },
  { id: "sketch", code: "G-05", name: "드로잉퀴즈", desc: "한 명은 그리고, 나머지는 맞혀라.", ready: true },
  { id: "smoke", code: "G-06", name: "빨리 담배피기", desc: "들숨 날숨 타이밍 싸움. 꼴찌는 킬러가 처리한다.", ready: true }
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
const FAST = EMU && new URLSearchParams(location.search).has("fast") ? (parseFloat(new URLSearchParams(location.search).get("fast")) || 10) : 0;
const DUR = { hint: 20, discuss: 120, vote: 20, guess: 20 };
if (FAST) Object.keys(DUR).forEach(function (k) { DUR[k] = Math.max(2, Math.round(DUR[k] / FAST)); });
function screenLiarLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return roomAlive(r) && (!r.type || r.type === "liar"); });
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
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("liar"); } },
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
        h("li", { text: "랜덤 순서로 한 명씩 제시어를 한 마디로 설명해요. 한 사람당 20초, 시간이 지나면 다음 사람으로 넘어가요." }),
        h("li", { text: "설명이 끝나면 2분 동안 대화창에서 토론해요. 절반 이상이 ‘바로 투표하기’를 누르면 일찍 끝나요." }),
        h("li", { text: "20초 안에 라이어로 의심되는 사람에게 투표해요." }),
        h("li", { text: "라이어를 맞히면 라이어에게 20초의 마지막 기회가 있어요. 제시어를 맞히면 라이어 승리, 못 맞히면 조직원 승리. 동점이거나 엉뚱한 사람을 지목하면 라이어 승리예요." })),
      h("p", { class: "note", text: "바보 모드에서는 라이어도 같은 주제의 다른 단어를 받아서, 자기가 라이어인지 모른 채 설명해요." })));
}
async function createRoom(type) {
  const me = meMember();
  if (!me || !S.user) return;
  try {
    const ref = await addDoc(collection(db, "rooms"), {
      type: type === "mafia" || type === "sketch" || type === "smoke" ? type : "liar",
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
      const lineup = presentPlayers(r).slice().sort();
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
function durOf(r) { return (r && r.type === "mafia" ? MDUR : r && r.type === "sketch" ? SDUR : r && r.type === "smoke" ? SMDUR : DUR)[r && r.status]; }
function phaseEnd(r) {
  if (!r || !durOf(r) || !r.phaseAt || !r.phaseAt.toMillis) return null;
  return r.phaseAt.toMillis() + durOf(r) * 1000;
}
function fmtSec(s) { return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function timerEl(r, label) {
  const end = phaseEnd(r), total = (durOf(r) || 1) * 1000;
  const left = end == null ? total : end - Date.now();
  const sec = Math.max(0, Math.ceil(left / 1000));
  const bar = h("i"); bar.style.width = Math.max(0, Math.min(100, left / total * 100)) + "%";
  return h("div", { class: "timer" + (sec <= 10 ? " low" : ""), role: "timer" },
    h("span", { class: "t-label", text: label }), h("b", { class: "t-num", text: fmtSec(sec) }), h("span", { class: "t-bar" }, bar));
}
async function onTimeout(r) {
  if (r.type === "mafia") return mafiaTimeout(r);
  if (r.type === "sketch") return sketchTimeout(r);
  if (r.type === "smoke") return smokeTimeout(r);
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
  const left = end - Date.now(), total = durOf(r) * 1000;
  const sec = Math.max(0, Math.ceil(left / 1000));
  sfxTimer(r, sec);
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
  await roomUpdate({ status: "lobby", votes: {}, accused: null, guess: null, winner: null, reason: null, turn: 0, order: [], lineup: [], topic: null, readyVote: [], phaseAt: null, alive: [], night: {}, checks: [], verdict: {}, day: 0, word: null, guessed: [], used: [], scores: {}, skipUsed: false, board: [], shot: null, round: 0, rk: 0, out: [] });
}

function screenRoom(id) {
  watchRoom(id);
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-liar"); }, text: "라이어 방 목록" });
  if (S.roomMissing) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "이 방은 닫혔거나 없어요." }));
  const r = S.room;
  if (!r) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "방에 들어가는 중…" }));
  if (r.status === "closed") return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "이 방은 닫혔어요. 새 방을 만들어 주세요." }));
  if (r.type === "mafia") return screenMafiaRoom(r);
  if (r.type === "sketch") return screenSketchRoom(r);
  if (r.type === "smoke") return screenSmokeRoom(r);

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
    h("option", { value: "-1", text: "랜덤" }),
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


/* ---------- Mafia ---------- */
const MDUR = { night: 30, day: 120, vote: 20, defense: 20, verdict: 15 };
if (FAST) Object.keys(MDUR).forEach(function (k) { MDUR[k] = Math.max(2, Math.round(MDUR[k] / FAST)); });
const M_STATUS = { lobby: "대기 중", night: "밤", day: "낮 토론", vote: "처형 투표", defense: "최후의 변론", verdict: "찬반 투표", result: "게임 끝" };
const ROLE = {
  mafia: { name: "마피아", desc: "밤마다 동료와 함께 한 명을 제거해요. 살아남은 시민 수만큼 남으면 승리예요." },
  doctor: { name: "의사", desc: "밤마다 한 명을 골라 마피아의 공격에서 살려요. 자기 자신도 고를 수 있어요." },
  police: { name: "경찰", desc: "밤마다 한 명을 조사해서 마피아인지 알아내요. 결과는 나만 봐요." },
  citizen: { name: "시민", desc: "낮 토론과 투표로 마피아를 모두 찾아내면 승리예요." }
};
function mafiaCount(n) { return n >= 9 ? 3 : n >= 6 ? 2 : 1; }
function dealRoles(lineup, seed) {
  const rnd = mulberry32((seed ^ 0x5bd1e995) >>> 0);
  const order = lineup.slice();
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
  const m = mafiaCount(order.length), roles = {};
  order.forEach(function (p, i) { roles[p] = i < m ? "mafia" : i === m ? "doctor" : i === m + 1 ? "police" : "citizen"; });
  return roles;
}
function mafiaWinner(roles, alive) {
  const mafia = alive.filter(function (p) { return roles[p] === "mafia"; }).length;
  if (!mafia) return "citizen";
  if (mafia >= alive.length - mafia) return "mafia";
  return null;
}
function sysMsg(tx, r, text) {
  tx.set(doc(collection(db, "rooms", S.roomId, "msgs")), {
    uid: myUid(), memberId: null, nick: "본부", text: text, kind: "sys", game: r.game || 0, createdAt: serverTimestamp()
  });
}
/* Check for a winner; otherwise continue with `cont` and announce `contMsg`. */
function mafiaAdvance(tx, r, roles, alive, cont, contMsg) {
  const w = mafiaWinner(roles, alive);
  if (w) {
    sysMsg(tx, r, w === "citizen" ? "🎉 마피아가 모두 잡혔어요. 시민 승리!" : "🩸 마피아가 시민 수만큼 남았어요. 마피아 승리!");
    tx.update(roomRef(), nextPhase(r, { status: "result", alive: alive, winner: w }));
  } else {
    if (contMsg) sysMsg(tx, r, contMsg);
    tx.update(roomRef(), nextPhase(r, Object.assign({ alive: alive }, cont)));
  }
}
function toNight(r) {
  return { status: "night", day: (r.day || 1) + 1, night: {}, votes: {}, verdict: {}, accused: null, readyVote: [] };
}
async function startMafia() {
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 4) throw { code: "few" };
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, "🌙 첫 번째 밤이 되었어요. 마피아는 조용히 움직이세요.");
      tx.update(roomRef(), nextPhase(r, {
        status: "night", lineup: lineup, seed: Math.floor(Math.random() * 2147483647), alive: lineup, day: 1,
        night: {}, checks: [], votes: {}, verdict: {}, accused: null, winner: null, readyVote: [],
        game: game, startedAt: serverTimestamp()
      }));
    });
  } catch (e) {
    if (e && e.code === "few") toast("4명 이상 모여야 시작할 수 있어요.");
    else if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else toast(errText(e));
  }
}
async function nightAct(role, target) {
  const me = meMember(); if (!me) return;
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "night") throw { code: "phase" };
      const roles = dealRoles(r.lineup, r.seed), alive = r.alive || [];
      if (roles[me.id] !== role || alive.indexOf(me.id) < 0 || alive.indexOf(target) < 0) throw { code: "role" };
      const night = Object.assign({}, r.night || {}), patch = {};
      if (role === "police") {
        if (night.police) throw { code: "done" };
        patch.checks = (r.checks || []).concat([{ day: r.day || 1, target: target }]);
      }
      night[role] = target; patch.night = night;
      tx.update(roomRef(), patch);
    });
    await resolveNight(false);
  } catch (e) {
    toast(e && e.code === "done" ? "오늘 밤 조사는 이미 했어요." : e && e.code === "phase" ? "밤이 끝났어요." : errText(e));
  }
}
async function resolveNight(force, expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "night") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const roles = dealRoles(r.lineup, r.seed), alive = r.alive || [], night = r.night || {};
    const has = function (role) { return alive.some(function (p) { return roles[p] === role; }); };
    if (!force && ((has("mafia") && !night.mafia) || (has("doctor") && !night.doctor) || (has("police") && !night.police))) return;
    let left = alive.slice(), text;
    if (night.mafia && night.mafia !== night.doctor) {
      left = left.filter(function (p) { return p !== night.mafia; });
      text = "☀️ " + (r.day || 1) + "일차 아침. 지난 밤 " + nickOf(night.mafia) + "님이 마피아에게 당했어요.";
    } else if (night.mafia) text = "☀️ " + (r.day || 1) + "일차 아침. 마피아가 누군가를 노렸지만 의사가 살려냈어요!";
    else text = "☀️ " + (r.day || 1) + "일차 아침. 조용한 밤이었어요.";
    sysMsg(tx, r, text);
    mafiaAdvance(tx, r, roles, left, { status: "day", readyVote: [] });
  });
}
async function mafiaToVote(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "day") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    tx.update(roomRef(), nextPhase(r, { status: "vote", votes: {} }));
  });
}
async function mafiaReady() {
  const me = meMember(); if (!me) return;
  try {
    await updateDoc(roomRef(), { readyVote: arrayUnion(me.id) });
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "day") return;
      const alive = r.alive || [];
      const ready = (r.readyVote || []).filter(function (p) { return alive.indexOf(p) >= 0; });
      if (ready.length >= Math.ceil(alive.length / 2)) tx.update(roomRef(), nextPhase(r, { status: "vote", votes: {} }));
    });
  } catch (e) { toast(errText(e)); }
}
async function mafiaVote(target) {
  const me = meMember(); if (!me) return;
  try { await updateDoc(roomRef(), { ["votes." + me.id]: target }); await finalizeMafiaVote(false); }
  catch (e) { toast(errText(e)); }
}
async function finalizeMafiaVote(force, expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "vote") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const alive = r.alive || [], votes = r.votes || {};
    const voted = alive.filter(function (p) { return votes[p]; });
    if (!force && voted.length < alive.length) return;
    const tally = {};
    voted.forEach(function (p) { const t = votes[p]; if (t !== "skip" && alive.indexOf(t) >= 0) tally[t] = (tally[t] || 0) + 1; });
    let max = 0; Object.keys(tally).forEach(function (k) { if (tally[k] > max) max = tally[k]; });
    const top = Object.keys(tally).filter(function (k) { return tally[k] === max; });
    const roles = dealRoles(r.lineup, r.seed);
    if (top.length !== 1) {
      sysMsg(tx, r, top.length ? "표가 똑같이 갈려서 아무도 처형되지 않았어요." : "아무도 지목되지 않았어요.");
      mafiaAdvance(tx, r, roles, alive, toNight(r), "🌙 " + ((r.day || 1) + 1) + "번째 밤이 되었어요.");
    } else {
      sysMsg(tx, r, nickOf(top[0]) + "님이 " + max + "표로 최다 득표! 최후의 변론을 들어보세요.");
      tx.update(roomRef(), nextPhase(r, { status: "defense", accused: top[0] }));
    }
  });
}
async function toVerdict(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "defense") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    tx.update(roomRef(), nextPhase(r, { status: "verdict", verdict: {} }));
  });
}
async function verdictVote(yes) {
  const me = meMember(); if (!me) return;
  try { await updateDoc(roomRef(), { ["verdict." + me.id]: yes ? "yes" : "no" }); await finalizeVerdict(false); }
  catch (e) { toast(errText(e)); }
}
async function finalizeVerdict(force, expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "verdict") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const alive = r.alive || [], v = r.verdict || {};
    const voters = alive.filter(function (p) { return p !== r.accused; });
    const done = voters.filter(function (p) { return v[p]; });
    if (!force && done.length < voters.length) return;
    const yes = done.filter(function (p) { return v[p] === "yes"; }).length, no = done.length - yes;
    const roles = dealRoles(r.lineup, r.seed), nextNight = "🌙 " + ((r.day || 1) + 1) + "번째 밤이 되었어요.";
    if (yes > no) {
      sysMsg(tx, r, "⚖️ " + nickOf(r.accused) + "님이 처형됐어요. (찬성 " + yes + " · 반대 " + no + ")");
      mafiaAdvance(tx, r, roles, alive.filter(function (p) { return p !== r.accused; }), toNight(r), nextNight);
    } else {
      sysMsg(tx, r, "⚖️ " + nickOf(r.accused) + "님이 살아남았어요. (찬성 " + yes + " · 반대 " + no + ")");
      mafiaAdvance(tx, r, roles, alive, toNight(r), nextNight);
    }
  });
}
function mafiaTimeout(r) {
  if (r.status === "night") return resolveNight(true, r.phase);
  if (r.status === "day") return mafiaToVote(r.phase);
  if (r.status === "vote") return finalizeMafiaVote(true, r.phase);
  if (r.status === "defense") return toVerdict(r.phase);
  if (r.status === "verdict") return finalizeVerdict(true, r.phase);
}

function screenMafiaLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return roomAlive(r) && r.type === "mafia"; });
  const list = rooms.length
    ? h("ul", { class: "room-list" }, rooms.map(function (r) {
        const mine = me && (r.players || []).indexOf(me.id) >= 0;
        const label = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중";
        return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
          h("span", { class: "ri-main" },
            h("b", { text: nickOf(r.createdBy) + "의 방" }),
            h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
          h("span", { class: "ri-side" },
            h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: label }),
            h("span", { class: "ri-sub", text: (r.players || []).length + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-02" }), h("h2", { text: "마피아" }),
        h("p", { text: "조직 안에 숨은 마피아를 찾아라. 4명부터 할 수 있어요." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("mafia"); } },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    mafiaRules());
}
function mafiaRules() {
  return h("details", { class: "guide" },
    h("summary", { text: "마피아 게임 규칙" }),
    h("div", { class: "guide-body" },
      h("p", { class: "note", text: "직업: 마피아, 의사, 경찰, 시민. 마피아는 4~5명이면 1명, 6~8명이면 2명, 9명 이상이면 3명이에요." }),
      h("ol", null,
        h("li", { text: "밤 (30초): 마피아는 제거할 사람을, 의사는 살릴 사람을, 경찰은 조사할 사람을 골라요. 밤에는 마피아끼리만 대화할 수 있어요." }),
        h("li", { text: "아침: 지난 밤 결과가 발표돼요. 의사가 마피아가 노린 사람을 고르면 살아나요." }),
        h("li", { text: "낮 토론 (2분): 살아 있는 사람 모두 대화해요. 절반 이상이 ‘바로 투표하기’를 누르면 일찍 끝나요." }),
        h("li", { text: "처형 투표 (20초): 마피아로 의심되는 사람에게 투표해요. 기권도 할 수 있어요." }),
        h("li", { text: "최후의 변론 (20초): 최다 득표자가 변론해요. 동점이면 아무도 처형되지 않고 밤이 돼요." }),
        h("li", { text: "찬반 투표 (15초): 찬성이 더 많으면 처형돼요. 처형된 사람의 직업은 게임이 끝날 때 공개돼요." })),
      h("p", { class: "note", text: "마피아를 모두 잡으면 시민 승리, 마피아가 나머지 사람 수만큼 남으면 마피아 승리예요. 죽은 사람은 관전하면서 죽은 사람끼리만 보이는 저승 채팅을 할 수 있어요." })));
}
function screenMafiaRoom(r) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-mafia"); }, text: "마피아 방 목록" });
  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  const lineup = playing ? (r.lineup || []) : players;
  const roles = playing && r.lineup && r.lineup.length ? dealRoles(r.lineup, r.seed) : null;
  if (playing && !roles) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "게임 정보를 읽지 못했어요." }),
    h("button", { type: "button", class: "ghost wide", onclick: backToLobby, text: "대기실로 돌리기" }));
  const alive = r.alive || [];
  const isPlayer = !!(me && lineup.indexOf(me.id) >= 0);
  const myRole = isPlayer && roles ? roles[me.id] : null;
  const iAlive = isPlayer && alive.indexOf(me.id) >= 0;
  const over = r.status === "result";
  const seeAll = over || (isPlayer && playing && !iAlive);
  const ctx = { me: me, roles: roles, isPlayer: isPlayer, iAlive: iAlive, myRole: myRole, over: over, seeAll: seeAll };

  const title = r.status === "night" ? (r.day || 1) + "번째 밤" : r.status === "day" ? (r.day || 1) + "일차 낮" : (M_STATUS[r.status] || "");
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "마피아 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    h("span", { class: "mode-chip", text: "마피아 " + mafiaCount(lineup.length || 4) + "명" }));

  const chips = h("div", { class: "chips" }, lineup.map(function (p) {
    const dead = playing && alive.indexOf(p) < 0;
    let tag = "";
    if (roles && (seeAll || (myRole === "mafia" && roles[p] === "mafia"))) tag = " · " + ROLE[roles[p]].name;
    let mark = "";
    if (r.status === "vote" && r.votes && r.votes[p]) mark = " ✓";
    if (r.status === "verdict" && r.verdict && r.verdict[p]) mark = " ✓";
    return h("span", { class: "chip static" + (me && p === me.id ? " me" : "") + (dead ? " dead" : "") + (mark ? " done" : "") },
      (dead ? "☠ " : "") + nickOf(p) + tag + mark);
  }));

  let phase;
  if (r.status === "lobby") phase = mLobbyPanel(r, me, inRoom, players);
  else if (r.status === "night") phase = mNightPanel(r, ctx);
  else if (r.status === "day") phase = mDayPanel(r, ctx);
  else if (r.status === "vote") phase = mVotePanel(r, ctx);
  else if (r.status === "defense") phase = mDefensePanel(r, ctx);
  else if (r.status === "verdict") phase = mVerdictPanel(r, ctx);
  else phase = mResultPanel(r, ctx);

  return h("section", { class: "screen room" + (r.status === "night" ? " is-night" : "") }, back, head,
    h("div", { class: "field" }, h("div", { class: "field-label", text: (playing ? "참가자 " + alive.length + "/" + lineup.length + "명 생존" : "모인 사람 " + lineup.length + "명") }), chips),
    playing && isPlayer && !over ? roleCard(r, ctx) : null,
    phase,
    mChat(r, ctx));
}
function roleCard(r, ctx) {
  const role = ctx.myRole, R = ROLE[role];
  const mates = role === "mafia" ? r.lineup.filter(function (p) { return p !== ctx.me.id && ctx.roles[p] === "mafia"; }).map(nickOf) : [];
  const checks = role === "police" ? (r.checks || []).map(function (c) {
    return c.day + "일차 밤 · " + nickOf(c.target) + (ctx.roles[c.target] === "mafia" ? " → 마피아!" : " → 마피아 아님");
  }) : [];
  return h("div", { class: "role-card " + role + (ctx.iAlive ? "" : " dead") },
    h("span", { class: "sc-eyebrow", text: ctx.iAlive ? "내 직업 · 나만 보여요" : "☠ 사망 · 관전 중" }),
    h("span", { class: "sc-big", text: R.name }),
    h("span", { class: "sc-hint", text: R.desc }),
    mates.length ? h("p", { class: "rc-extra", text: "동료 마피아: " + mates.join(", ") }) : null,
    checks.length ? h("ul", { class: "rc-checks" }, checks.map(function (t) { return h("li", { text: t }); })) : null);
}
function targetGrid(list, chosen, onPick) {
  return h("div", { class: "vote-grid" }, list.map(function (p) {
    return h("button", { type: "button", class: "vote-btn", "aria-pressed": chosen === p ? "true" : "false", onclick: function () { onPick(p); } },
      h("div", { class: "vp" }, photoBox(findMember(p) || {})), h("span", { text: nickOf(p) }));
  }));
}
function mLobbyPanel(r, me, inRoom, players) {
  const n = players.length, enough = n >= 4, m = mafiaCount(Math.max(n, 4));
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "직업 구성" }),
    h("p", { text: enough ? "마피아 " + m + " · 의사 1 · 경찰 1 · 시민 " + (n - m - 2) : "4명부터 시작할 수 있어요. 지금 " + n + "명이에요." }),
    !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
      : inRoom
        ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", disabled: !enough, onclick: startMafia, text: enough ? "게임 시작" : "4명부터 시작" }))
        : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
    h("p", { class: "hint", text: "단톡방에 ‘게임방 → 마피아에 방 열었어’라고 알려주세요." }));
}
function mNightPanel(r, ctx) {
  const night = r.night || {}, alive = r.alive || [], role = ctx.myRole;
  const box = h("div", { class: "panel turn night" }, h("div", { class: "field-label", text: (r.day || 1) + "번째 밤" }), timerEl(r, "밤 남은 시간"));
  if (!ctx.isPlayer) { append(box, h("p", { text: "밤이에요. 구경하며 아침을 기다려 주세요." })); return box; }
  if (!ctx.iAlive) { append(box, h("p", { text: "관전 중이에요. 아래 저승 채팅으로 죽은 사람끼리 이야기할 수 있어요." })); return box; }
  if (role === "citizen") { append(box, h("p", { text: "밤이에요. 시민은 아침이 올 때까지 조용히 기다려요." })); return box; }
  if (role === "mafia") {
    append(box, h("p", { text: "제거할 사람을 고르세요. 동료 마피아와 대화창에서 의논해요." }),
      targetGrid(alive.filter(function (p) { return ctx.roles[p] !== "mafia"; }), night.mafia, function (p) { nightAct("mafia", p); }),
      night.mafia ? h("p", { class: "hint", text: "지금 지목: " + nickOf(night.mafia) + " · 동료가 다른 사람을 누르면 바뀌어요." }) : null);
  } else if (role === "doctor") {
    append(box, h("p", { text: "오늘 밤 살릴 사람을 고르세요." }),
      targetGrid(alive, night.doctor, function (p) { nightAct("doctor", p); }),
      night.doctor ? h("p", { class: "hint", text: nickOf(night.doctor) + "님을 지키기로 했어요. 다른 사람을 누르면 바뀌어요." }) : null);
  } else if (role === "police") {
    if (night.police) {
      const bad = ctx.roles[night.police] === "mafia";
      append(box, h("div", { class: "check-result" + (bad ? " bad" : "") }, nickOf(night.police) + "님은 ", h("b", { text: bad ? "마피아예요!" : "마피아가 아니에요." })));
    } else {
      append(box, h("p", { text: "조사할 사람을 고르세요. 한 번 고르면 바꿀 수 없어요." }),
        targetGrid(alive.filter(function (p) { return p !== ctx.me.id; }), null, function (p) { nightAct("police", p); }));
    }
  }
  return box;
}
function mDayPanel(r, ctx) {
  const alive = r.alive || [], need = Math.ceil(alive.length / 2);
  const ready = (r.readyVote || []).filter(function (p) { return alive.indexOf(p) >= 0; });
  const mine = ctx.me && ready.indexOf(ctx.me.id) >= 0;
  return h("div", { class: "panel turn" },
    h("div", { class: "field-label", text: (r.day || 1) + "일차 낮 토론" }),
    timerEl(r, "토론 남은 시간"),
    h("p", { text: "누가 마피아인지 대화창에서 이야기해요." }),
    ctx.iAlive ? h("button", { type: "button", class: mine ? "ghost wide" : "save", disabled: mine, onclick: mafiaReady },
      (mine ? "바로 투표에 찬성했어요 " : "바로 투표하기 ") + "(" + ready.length + "/" + need + ")") : null,
    h("p", { class: "hint", text: "살아 있는 사람 절반 이상이 ‘바로 투표하기’를 누르면 토론이 일찍 끝나요." }));
}
function mVotePanel(r, ctx) {
  const alive = r.alive || [], votes = r.votes || {};
  const done = alive.filter(function (p) { return votes[p]; }).length;
  const mine = ctx.me ? votes[ctx.me.id] : null;
  const box = h("div", { class: "panel" },
    h("div", { class: "field-label", text: "처형 투표 · " + done + " / " + alive.length + "명 완료" }),
    timerEl(r, "투표 남은 시간"));
  if (ctx.iAlive) {
    append(box, targetGrid(alive.filter(function (p) { return p !== ctx.me.id; }), mine, mafiaVote),
      h("button", { type: "button", class: "ghost wide", "aria-pressed": mine === "skip" ? "true" : "false", onclick: function () { mafiaVote("skip"); } }, mine === "skip" ? "기권했어요" : "기권하기"),
      h("p", { class: "hint", text: mine ? (mine === "skip" ? "기권했어요." : "‘" + nickOf(mine) + "’에게 투표했어요.") + " 다른 걸 누르면 바뀌어요." : "마피아로 의심되는 사람을 누르세요." }));
  } else append(box, h("p", { class: "note", text: "살아 있는 사람들이 투표하고 있어요." }));
  return box;
}
function mDefensePanel(r, ctx) {
  const mine = ctx.me && ctx.me.id === r.accused;
  return h("div", { class: "panel turn" + (mine ? " mine" : "") },
    h("div", { class: "field-label", text: "최후의 변론" }),
    timerEl(r, nickOf(r.accused) + " 변론 남은 시간"),
    h("p", { text: mine ? "당신이 최다 득표자예요! 아래 대화창에 변론을 남기세요." : nickOf(r.accused) + "님의 최후의 변론을 들어보세요." }),
    mine ? h("button", { type: "button", class: "ghost wide", onclick: function () { toVerdict(null); }, text: "변론 마치기" }) : null);
}
function mVerdictPanel(r, ctx) {
  const alive = r.alive || [], v = r.verdict || {};
  const voters = alive.filter(function (p) { return p !== r.accused; });
  const done = voters.filter(function (p) { return v[p]; }).length;
  const can = ctx.iAlive && ctx.me.id !== r.accused;
  const mine = ctx.me ? v[ctx.me.id] : null;
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "찬반 투표 · " + done + " / " + voters.length + "명 완료" }),
    timerEl(r, "찬반 남은 시간"),
    h("p", null, h("b", { text: nickOf(r.accused) }), "님을 처형할까요?"),
    can ? h("div", { class: "op-row" },
      h("button", { type: "button", class: mine === "yes" ? "go" : "", "aria-pressed": mine === "yes" ? "true" : "false", onclick: function () { verdictVote(true); }, text: "찬성 (처형)" }),
      h("button", { type: "button", class: mine === "no" ? "go" : "", "aria-pressed": mine === "no" ? "true" : "false", onclick: function () { verdictVote(false); }, text: "반대 (살리기)" }))
      : h("p", { class: "note", text: ctx.me && ctx.me.id === r.accused ? "다른 사람들이 찬반 투표를 하고 있어요." : "살아 있는 사람들이 찬반 투표를 하고 있어요." }),
    can ? h("p", { class: "hint", text: "찬성이 반대보다 많으면 처형돼요. 시간이 끝나면 그때까지의 표로 정해요." }) : null);
}
function mResultPanel(r, ctx) {
  const win = r.winner === "citizen";
  const alive = r.alive || [];
  return h("div", { class: "answer" + (win ? " team" : "") },
    h("div", { class: "result-title", text: win ? "시민 승리" : "마피아 승리" }),
    h("ul", { class: "role-list" }, (r.lineup || []).map(function (p) {
      return h("li", { class: alive.indexOf(p) < 0 ? "dead" : "" },
        h("span", { text: (alive.indexOf(p) < 0 ? "☠ " : "") + nickOf(p) }), h("b", { text: ROLE[ctx.roles[p]].name }));
    })),
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { go("game-mafia"); }, text: "방 목록" }),
      h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
}
function mChat(r, ctx) {
  const game = r.game || 0;
  const showMafia = ctx.over || ctx.myRole === "mafia" || (ctx.isPlayer && !ctx.iAlive);
  const showDead = ctx.over || (ctx.isPlayer && !ctx.iAlive && r.status !== "lobby");
  const msgs = S.msgs.filter(function (m) {
    if ((m.game || 0) !== game) return false;
    if (m.kind === "mafia") return showMafia;
    if (m.kind === "dead") return showDead;
    return true;
  });
  let kind = null, ph;
  if (r.status === "lobby" || ctx.over) { kind = "chat"; ph = "대화 보내기"; }
  else if (!ctx.isPlayer) ph = "게임 중에는 참가자만 대화할 수 있어요";
  else if (!ctx.iAlive) { kind = "dead"; ph = "저승 채팅 (죽은 사람끼리만 보여요)"; }
  else if (r.status === "night") { if (ctx.myRole === "mafia") { kind = "mafia"; ph = "마피아끼리 대화"; } else ph = "밤에는 마피아만 대화할 수 있어요"; }
  else if (r.status === "defense") { if (ctx.me.id === r.accused) { kind = "defense"; ph = "최후의 변론 쓰기"; } else ph = "최후의 변론을 듣는 중이에요"; }
  else { kind = "chat"; ph = "대화 보내기"; }
  const label = { mafia: "마피아 대화", dead: "저승", defense: "최후의 변론" };
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "sys" || m.kind === "skip") return h("div", { class: "msg-sys strong", text: m.text });
      const mine = ctx.me && m.memberId === ctx.me.id;
      return h("div", { class: "bubble " + (m.kind || "chat") + (mine ? " mine" : "") },
        h("div", { class: "b-meta" }, h("b", { text: m.nick || "손님" }), label[m.kind] ? h("span", { class: "b-tag", text: label[m.kind] }) : null),
        h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "120", placeholder: ph, autocomplete: "off", disabled: !kind });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm", disabled: !kind, text: "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = inp.value.trim(); if (!t || !S.user || !kind) return;
    try { await sendMsg(kind, t); S.drafts["chat-text"] = ""; render(); } catch (e) { toast(errText(e)); }
  });
  return h("div", { class: "field" }, h("div", { class: "field-label", text: ctx.myRole === "mafia" && r.status === "night" && ctx.iAlive ? "대화 · 지금은 마피아끼리만 보여요" : "대화" }), log, f);
}


/* ---------- Sketch (드로잉퀴즈): drawing and guessing ---------- */
const SDUR = { draw: 60, reveal: 5 };
if (FAST) Object.keys(SDUR).forEach(function (k) { SDUR[k] = Math.max(2, Math.round(SDUR[k] / FAST)); });
const SK_WORDS = ["사과", "바나나", "수박", "포도", "당근", "버섯", "고양이", "강아지", "기린", "코끼리", "문어", "상어", "거북이", "토끼", "펭귄", "공룡",
  "자동차", "비행기", "자전거", "로켓", "우산", "안경", "시계", "피자", "햄버거", "아이스크림", "케이크", "눈사람", "해바라기", "선인장", "무지개",
  "화산", "등대", "성", "기타", "피아노", "축구공", "왕관", "칫솔", "냉장고", "텐트", "선풍기", "망원경", "다이아몬드", "열쇠", "촛불", "유령",
  "해적", "인어", "산타", "치킨", "라면", "삼겹살", "모자", "신발", "물고기", "달팽이", "나비", "번개", "눈사태"];
const PAPER = "#f3f1ec";
const INKS = ["#1b1b1d", "#d2382f", "#2f6fd2", "#2f9e57", "#e2a21b", "#8a4fc9", "#8b5a2b"];
const SK = { canvas: null, ctx: null, turnKey: null, unsub: null, strokes: [], drawing: false, pendingRender: false, cur: null, color: INKS[0], size: 8, eraser: false, flushT: null };

/* Surprise names: never announced in the UI. Default list until the boss saves one. */
const SK_DEFAULT_NAMES = ["주먹이", "연상퀴즈", "올라올라", "서바이벌꼬로록"];
const SK_SURPRISE = 0.1;
function skCrewWords() {
  const seen = {}, out = [];
  function add(w) { w = String(w || "").trim(); if (w && !seen[w]) { seen[w] = 1; out.push(w); } }
  S.members.forEach(function (m) { add(m.nick); });
  (S.sketchNames || SK_DEFAULT_NAMES).forEach(add);
  return out;
}
function skPickWord(mode, used) {
  const crew = skCrewWords(), general = SK_WORDS;
  /* rare: about one drawing in ten, and at most once per game */
  const already = (used || []).some(function (w) { return crew.indexOf(w) >= 0; });
  const pool = crew.length && !already && Math.random() < SK_SURPRISE ? crew : general;
  let fresh = pool.filter(function (w) { return (used || []).indexOf(w) < 0; });
  if (!fresh.length) fresh = pool;
  return fresh[Math.floor(Math.random() * fresh.length)];
}
function skAnswers(word) {
  const out = [word], m = /^(.*?)\((.*?)\)$/.exec(word || "");
  if (m) { out.push(m[1]); out.push(m[2]); }
  return out.map(normWord).filter(Boolean);
}
function skMatches(text, word) { return skAnswers(word).indexOf(normWord(text)) >= 0; }
const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
function skHint(word, showCho) {
  return Array.from(word || "").map(function (ch) {
    const c = ch.charCodeAt(0);
    if (ch === " ") return " ";
    if (c >= 0xAC00 && c <= 0xD7A3) return showCho ? CHO.charAt(Math.floor((c - 0xAC00) / 588)) : "○";
    if (/[()]/.test(ch)) return ch;
    return "○";
  }).join("");
}
function skDrawer(r) { return r.order[r.turn % r.order.length]; }
function skTotal(r) { return r.order.length * (r.rounds || 1); }
function skTurnKey(r) { return (r.game || 0) * 1000 + (r.turn || 0); }

async function startSketch() {
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 2) throw { code: "few" };
      const order = lineup.slice();
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
      const word = skPickWord(r.wordMode || "mix", []);
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, "🎨 드로잉퀴즈 시작! 첫 번째 화가는 " + nickOf(order[0]) + "님이에요.");
      tx.update(roomRef(), nextPhase(r, {
        status: "draw", lineup: lineup, order: order, turn: 0, word: word, used: [word], guessed: [], scores: {},
        skipUsed: false, game: game, startedAt: serverTimestamp()
      }));
    });
  } catch (e) {
    if (e && e.code === "few") toast("2명 이상 모여야 시작할 수 있어요.");
    else if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else toast(errText(e));
  }
}
async function skToReveal(expectPhase, why) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "draw") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    sysMsg(tx, r, (why || "⏰ 시간 끝!") + " 정답은 ‘" + r.word + "’");
    tx.update(roomRef(), nextPhase(r, { status: "reveal" }));
  });
}
async function skNextTurn(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "reveal") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const next = (r.turn || 0) + 1;
    if (next >= skTotal(r)) {
      sysMsg(tx, r, "🏁 드로잉퀴즈 끝! 점수를 확인하세요.");
      tx.update(roomRef(), nextPhase(r, { status: "result" }));
      return;
    }
    const word = skPickWord(r.wordMode || "mix", r.used || []);
    const drawer = r.order[next % r.order.length];
    sysMsg(tx, r, "🎨 " + (next + 1) + "번째 그림 · 화가는 " + nickOf(drawer) + "님");
    tx.update(roomRef(), nextPhase(r, { status: "draw", turn: next, word: word, used: (r.used || []).concat([word]), guessed: [], skipUsed: false }));
  });
}
function sketchTimeout(r) {
  if (r.status === "draw") return skToReveal(r.phase);
  if (r.status === "reveal") return skNextTurn(r.phase);
}
async function skSkipWord() {
  const me = meMember(); if (!me) return;
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "draw" || skDrawer(r) !== me.id || r.skipUsed || (r.guessed || []).length) throw { code: "no" };
      const word = skPickWord(r.wordMode || "mix", (r.used || []).concat([r.word]));
      tx.update(roomRef(), { word: word, used: (r.used || []).concat([word]), skipUsed: true });
    });
    await skClear();
  } catch (e) { toast(e && e.code === "no" ? "단어는 한 번만 바꿀 수 있어요." : errText(e)); }
}
async function skGuess(text) {
  const me = meMember(), r = S.room;
  if (!me || !r) return;
  const canGuess = r.status === "draw" && r.lineup.indexOf(me.id) >= 0 && skDrawer(r) !== me.id && (r.guessed || []).indexOf(me.id) < 0;
  if (canGuess && skMatches(text, r.word)) {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const rr = snap.data();
      if (!rr || rr.status !== "draw" || rr.turn !== r.turn || rr.game !== r.game) throw { code: "late" };
      const g = rr.guessed || [];
      if (g.indexOf(me.id) >= 0) return;
      const pts = g.length === 0 ? 3 : g.length === 1 ? 2 : 1;
      const dr = skDrawer(rr), scores = Object.assign({}, rr.scores || {});
      scores[me.id] = (scores[me.id] || 0) + pts;
      scores[dr] = (scores[dr] || 0) + 1;
      const ng = g.concat([me.id]);
      sysMsg(tx, rr, "🎯 " + me.nick + "님 정답! (+" + pts + "점)");
      if (ng.length >= rr.lineup.length - 1) {
        sysMsg(tx, rr, "모두 맞혔어요! 정답은 ‘" + rr.word + "’");
        tx.update(roomRef(), nextPhase(rr, { guessed: ng, scores: scores, status: "reveal" }));
      } else tx.update(roomRef(), { guessed: ng, scores: scores });
    });
  } else {
    await sendMsg("chat", text);
  }
}

/* canvas: one persistent element, strokes synced through rooms/{id}/strokes */
function skCanvas() {
  if (SK.canvas) return SK.canvas;
  const c = document.createElement("canvas");
  c.className = "sk-canvas";
  c.setAttribute("aria-label", "그림판");
  c.addEventListener("pointerdown", skDown);
  c.addEventListener("pointermove", skMove);
  ["pointerup", "pointercancel"].forEach(function (ev) { c.addEventListener(ev, skUp); });
  SK.canvas = c; SK.ctx = c.getContext("2d");
  if (window.ResizeObserver) new ResizeObserver(skResize).observe(c);
  return c;
}
function skResize() {
  const c = SK.canvas, w = c && c.clientWidth;
  if (!w) return;
  const px = Math.round(w * Math.min(2, window.devicePixelRatio || 1));
  if (c.width !== px) { c.width = px; c.height = px; skRedraw(); }
}
function skSeg(x, k, s) {
  const p = s.pts;
  if (!p || p.length < 2) return;
  x.strokeStyle = s.color; x.lineWidth = s.size * k;
  x.beginPath(); x.moveTo(p[0] * k, p[1] * k);
  if (p.length === 2) x.lineTo(p[0] * k + 0.1, p[1] * k + 0.1);
  for (let i = 2; i < p.length; i += 2) x.lineTo(p[i] * k, p[i + 1] * k);
  x.stroke();
}
function skRedraw() {
  const c = SK.canvas, x = SK.ctx;
  if (!c || !c.width) return;
  x.setTransform(1, 0, 0, 1, 0, 0);
  x.fillStyle = PAPER; x.fillRect(0, 0, c.width, c.height);
  x.lineCap = "round"; x.lineJoin = "round";
  const k = c.width / 1000;
  let start = 0;
  SK.strokes.forEach(function (st, i) { if (st.clear) start = i + 1; });
  SK.strokes.slice(start).forEach(function (st) { skSeg(x, k, st); });
  if (SK.cur) skSeg(x, k, SK.cur);
}
function skWatch(key) {
  if (SK.turnKey === key) return;
  if (SK.unsub) { SK.unsub(); SK.unsub = null; }
  SK.turnKey = key; SK.strokes = []; SK.cur = null;
  skRedraw();
  if (key == null || !S.roomId) return;
  SK.unsub = onSnapshot(query(collection(db, "rooms", S.roomId, "strokes"), where("turn", "==", key)), function (snap) {
    SK.strokes = snap.docs.map(function (d) { return d.data(); }).sort(function (a, b) { return (a.t || 0) - (b.t || 0); });
    skRedraw();
  });
}
function skCanDraw() {
  const r = S.room, me = meMember();
  return !!(r && r.type === "sketch" && r.status === "draw" && me && skDrawer(r) === me.id);
}
function skPoint(e) {
  const rect = SK.canvas.getBoundingClientRect();
  const nx = Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 1000);
  const ny = Math.round(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)) * 1000);
  return [nx, ny];
}
let skSeq = 0;
function skFlush(final) {
  const cur = SK.cur;
  if (!cur || cur.pts.length < 2) return;
  if (!final && cur.pts.length < 4) return;
  const chunk = { uid: myUid(), turn: SK.turnKey, color: cur.color, size: cur.size, pts: cur.pts.slice(0, 600), t: Date.now() * 1000 + (skSeq++ % 1000), createdAt: serverTimestamp() };
  SK.strokes.push(chunk);
  addDoc(collection(db, "rooms", S.roomId, "strokes"), chunk).catch(function (e) { toast(errText(e)); });
  const last = cur.pts.slice(-2);
  SK.cur = final ? null : { color: cur.color, size: cur.size, pts: last };
}
function skDown(e) {
  if (!skCanDraw()) return;
  e.preventDefault();
  try { SK.canvas.setPointerCapture(e.pointerId); } catch (err) {}
  SK.drawing = true;
  SK.cur = { color: SK.eraser ? PAPER : SK.color, size: SK.eraser ? 28 : SK.size, pts: skPoint(e) };
  skRedraw();
  clearInterval(SK.flushT);
  SK.flushT = setInterval(function () { skFlush(false); }, 250);
}
function skMove(e) {
  if (!SK.drawing || !SK.cur) return;
  e.preventDefault();
  const p = skPoint(e), pts = SK.cur.pts, lx = pts[pts.length - 2], ly = pts[pts.length - 1];
  if (Math.abs(p[0] - lx) + Math.abs(p[1] - ly) < 4) return;
  pts.push(p[0], p[1]);
  const x = SK.ctx, k = SK.canvas.width / 1000;
  x.lineCap = "round"; x.lineJoin = "round";
  x.strokeStyle = SK.cur.color; x.lineWidth = SK.cur.size * k;
  x.beginPath(); x.moveTo(lx * k, ly * k); x.lineTo(p[0] * k, p[1] * k); x.stroke();
}
function skUp() {
  if (!SK.drawing) return;
  clearInterval(SK.flushT);
  skFlush(true);
  SK.drawing = false; SK.cur = null;
  if (SK.pendingRender) { SK.pendingRender = false; render(); }
}
async function skClear() {
  try { await addDoc(collection(db, "rooms", S.roomId, "strokes"), { uid: myUid(), turn: SK.turnKey, clear: true, pts: [], t: Date.now() * 1000 + (skSeq++ % 1000), createdAt: serverTimestamp() }); }
  catch (e) { toast(errText(e)); }
}
function skTools() {
  const swatches = INKS.map(function (c) {
    return h("button", { type: "button", class: "sk-ink", style: "background:" + c, "aria-label": "색 " + c,
      "aria-pressed": !SK.eraser && SK.color === c ? "true" : "false", onclick: function () { SK.color = c; SK.eraser = false; render(); } });
  });
  return h("div", { class: "sk-tools" },
    h("div", { class: "sk-row" }, swatches),
    h("div", { class: "sk-row" },
      [["가늘게", 4], ["보통", 8], ["굵게", 16]].map(function (o) {
        return h("button", { type: "button", class: "sk-btn", "aria-pressed": !SK.eraser && SK.size === o[1] ? "true" : "false", onclick: function () { SK.size = o[1]; SK.eraser = false; render(); }, text: o[0] });
      }),
      h("button", { type: "button", class: "sk-btn", "aria-pressed": SK.eraser ? "true" : "false", onclick: function () { SK.eraser = true; render(); }, text: "지우개" }),
      h("button", { type: "button", class: "sk-btn danger", onclick: skClear, text: "전체 지우기" })));
}

function screenSketchLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return roomAlive(r) && r.type === "sketch"; });
  const list = rooms.length
    ? h("ul", { class: "room-list" }, rooms.map(function (r) {
        const mine = me && (r.players || []).indexOf(me.id) >= 0;
        const label = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중";
        return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
          h("span", { class: "ri-main" },
            h("b", { text: nickOf(r.createdBy) + "의 방" }),
            h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
          h("span", { class: "ri-side" },
            h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: label }),
            h("span", { class: "ri-sub", text: (r.players || []).length + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-05" }), h("h2", { text: "드로잉퀴즈" }),
        h("p", { text: "한 명이 그리고 나머지가 맞혀요. 먼저 맞힐수록 점수가 높아요." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("sketch"); } },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    h("details", { class: "guide" },
      h("summary", { text: "드로잉퀴즈 규칙" }),
      h("div", { class: "guide-body" },
        h("ol", null,
          h("li", { text: "참가자가 돌아가면서 한 번씩 화가가 돼요. 화가에게만 제시어가 보여요." }),
          h("li", { text: "화가는 60초 동안 그려요. 글자나 숫자를 쓰면 반칙이에요. 단어가 너무 어려우면 한 번 바꿀 수 있어요." }),
          h("li", { text: "나머지는 대화창에 정답을 입력해요. 틀린 답은 모두에게 보이고, 맞힌 답은 숨겨져요." }),
          h("li", { text: "먼저 맞힌 순서대로 3점, 2점, 1점. 화가는 맞힌 사람 한 명당 1점을 받아요." }),
          h("li", { text: "시간이 반쯤 지나면 정답의 초성 힌트가 나와요." })))),
    isBoss() ? skNamesPanel() : null);
}
function skNamesPanel() {
  const ta = draft("textarea", "sk-names", { class: "gb-in", placeholder: "한 줄에 하나씩, 또는 쉼표로 구분" });
  if (S.drafts["sk-names"] == null) ta.value = (S.sketchNames || SK_DEFAULT_NAMES).join("\n");
  return h("details", { class: "guide" },
    h("summary", { text: "깜짝 제시어 이름 · 두목만 보여요" }),
    h("div", { class: "guide-body" },
      h("p", { class: "note", text: "그림 열 번에 한 번꼴로, 한 판에 최대 한 번만 조직원 닉네임이나 아래 단어가 제시어로 나와요. 조직원 닉네임은 명부에서 자동으로 들어가요. 조직원들에게는 비밀이에요." }),
      h("p", { class: "sub-label", text: "추가로 넣을 단어 (우리끼리 아는 이름, 큐플레이 키워드 등)" }),
      ta,
      h("button", { type: "button", class: "save", onclick: async function () {
        const seen = {};
        const names = (S.drafts["sk-names"] != null ? S.drafts["sk-names"] : ta.value).split(/[\n,]/).map(function (w) { return w.trim(); })
          .filter(function (w) { if (!w || seen[w]) return false; seen[w] = 1; return true; }).slice(0, 80);
        try { await setDoc(doc(db, "config", "sketch"), { names: names }); delete S.drafts["sk-names"]; toast("깜짝 이름을 저장했어요."); }
        catch (e) { toast(errText(e)); }
      }, text: "저장" })));
}
/* The old liar topic of crew names is removed (once, on the boss's phone); names live only in the drawing quiz. */
async function migrateCrewTopic() {
  if (S.migrated || !isBoss() || !S.sketchKnown) return;
  const t = S.topics.find(function (x) { return x.name === "우리끼리 이름"; });
  if (!t) return;
  S.migrated = true;
  try {
    if (!S.sketchNames) await setDoc(doc(db, "config", "sketch"), { names: SK_DEFAULT_NAMES });
    await deleteDoc(doc(db, "liarTopics", t.id));
  } catch (e) { S.migrated = false; }
}
function screenSketchRoom(r) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-sketch"); }, text: "드로잉퀴즈 방 목록" });
  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  const lineup = playing ? (r.lineup || []) : players;
  if (playing && (!r.order || !r.order.length)) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "게임 정보를 읽지 못했어요." }),
    h("button", { type: "button", class: "ghost wide", onclick: backToLobby, text: "대기실로 돌리기" }));
  skWatch(r.status === "draw" || r.status === "reveal" ? skTurnKey(r) : null);
  const scores = r.scores || {};
  const drawer = playing && r.order ? skDrawer(r) : null;
  const iDraw = !!(me && drawer === me.id && r.status === "draw");
  const guessed = r.guessed || [];

  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : (r.turn + 1) + " / " + skTotal(r) + "번째 그림";
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "드로잉퀴즈 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    h("span", { class: "mode-chip", text: (r.rounds || 1) + "바퀴" }));
  const chips = h("div", { class: "chips" }, lineup.slice().sort(function (a, b) { return (scores[b] || 0) - (scores[a] || 0); }).map(function (p) {
    const ok = guessed.indexOf(p) >= 0;
    return h("span", { class: "chip static" + (me && p === me.id ? " me" : "") + (ok ? " done" : "") },
      (p === drawer && r.status !== "result" ? "🖌 " : "") + nickOf(p) + (playing ? " " + (scores[p] || 0) + "점" : "") + (ok ? " ✓" : ""));
  }));

  let body;
  if (r.status === "lobby") body = skLobbyPanel(r, me, inRoom, players);
  else if (r.status === "result") body = skResultPanel(r);
  else {
    const half = r.status === "draw" && phaseEnd(r) != null && phaseEnd(r) - Date.now() < SDUR.draw * 500;
    const info = r.status === "reveal"
      ? h("div", { class: "panel turn" }, h("div", { class: "field-label", text: "정답 공개" }), timerEl(r, "다음 그림까지"),
          h("p", { class: "sk-answer" }, "정답 ", h("b", { text: r.word })),
          h("p", { class: "note", text: guessed.length ? "맞힌 사람: " + guessed.map(nickOf).join(", ") : "아무도 못 맞혔어요." }))
      : iDraw
        ? h("div", { class: "panel turn mine" }, h("div", { class: "field-label", text: "내가 화가예요" }), timerEl(r, "그리기 남은 시간"),
            h("p", { class: "sk-answer" }, "그릴 것 ", h("b", { text: r.word })),
            !r.skipUsed && !guessed.length ? h("button", { type: "button", class: "link-btn", onclick: skSkipWord, text: "다른 단어로 바꾸기 (1번)" }) : null)
        : h("div", { class: "panel turn" }, h("div", { class: "field-label", text: "화가 " + nickOf(drawer) }), timerEl(r, "남은 시간"),
            h("p", { class: "sk-answer" }, "정답 힌트 ", h("b", { class: "sk-hint", text: skHint(r.word, half) })),
            h("p", { class: "note", text: me && guessed.indexOf(me.id) >= 0 ? "정답을 맞혔어요! 다른 사람을 기다려요." : half ? "초성 힌트가 열렸어요." : Array.from(r.word || "").length + "글자예요. 시간이 반쯤 지나면 초성이 보여요." }));
    body = [info, h("div", { class: "sk-stage" + (iDraw ? " drawing" : "") }, skCanvas(), iDraw ? skTools() : null)];
  }
  const res = h("section", { class: "screen room" }, back, head,
    h("div", { class: "field" }, h("div", { class: "field-label", text: playing ? "점수" : "모인 사람 " + lineup.length + "명" }), chips),
    body, skChat(r, me, iDraw));
  requestAnimationFrame(skResize);
  return res;
}
function skLobbyPanel(r, me, inRoom, players) {
  function seg(field, value, label, def) {
    return h("button", { type: "button", "aria-pressed": (r[field] || def) === value ? "true" : "false",
      onclick: function () { const p = {}; p[field] = value; roomUpdate(p); } }, label);
  }
  const n = players.length, enough = n >= 2;
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "게임 설정 · 참가자 누구나 바꿀 수 있어요" }),
    h("div", { class: "seg" }, seg("rounds", 1, "1바퀴", 1), seg("rounds", 2, "2바퀴", 1)),
    !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
      : inRoom
        ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", disabled: !enough, onclick: startSketch, text: enough ? "게임 시작" : "2명부터 시작" }))
        : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
    h("p", { class: "hint", text: "단톡방에 ‘게임방 → 드로잉퀴즈에 방 열었어’라고 알려주세요." }));
}
function skResultPanel(r) {
  const scores = r.scores || {};
  const rank = (r.lineup || []).slice().sort(function (a, b) { return (scores[b] || 0) - (scores[a] || 0); });
  const medal = ["🥇", "🥈", "🥉"];
  return h("div", { class: "answer team" },
    h("div", { class: "result-title", text: nickOf(rank[0]) + " 우승!" }),
    h("ul", { class: "role-list" }, rank.map(function (p, i) {
      return h("li", null, h("span", { text: (medal[i] || (i + 1) + "등") + " " + nickOf(p) }), h("b", { text: (scores[p] || 0) + "점" }));
    })),
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { go("game-sketch"); }, text: "방 목록" }),
      h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
}
function skChat(r, me, iDraw) {
  const game = r.game || 0;
  const msgs = S.msgs.filter(function (m) { return (m.game || 0) === game; });
  const isPlayer = me && (r.lineup || []).indexOf(me.id) >= 0;
  const done = me && (r.guessed || []).indexOf(me.id) >= 0;
  let ph = "대화 보내기", enabled = true;
  if (r.status === "draw") {
    if (iDraw) { ph = "화가는 그림으로만 말해요"; enabled = false; }
    else if (!isPlayer) { ph = "게임 중에는 참가자만 입력할 수 있어요"; enabled = false; }
    else if (done) { ph = "정답을 맞혔어요! 다음 그림을 기다려요"; enabled = false; }
    else ph = "정답 입력";
  }
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "sys" || m.kind === "skip") return h("div", { class: "msg-sys strong", text: m.text });
      const mine = me && m.memberId === me.id;
      return h("div", { class: "bubble chat" + (mine ? " mine" : "") },
        h("div", { class: "b-meta" }, h("b", { text: m.nick || "손님" })), h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "60", placeholder: ph, autocomplete: "off", disabled: !enabled });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm" + (r.status === "draw" && enabled ? " go" : ""), disabled: !enabled, text: r.status === "draw" ? "제출" : "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = inp.value.trim(); if (!t || !S.user || !enabled) return;
    S.drafts["chat-text"] = ""; inp.value = "";
    try { await skGuess(t); render(); } catch (e) { toast(e && e.code === "late" ? "아쉽게 시간이 지났어요." : errText(e)); }
  });
  return h("div", { class: "field" }, h("div", { class: "field-label", text: r.status === "draw" ? "정답 맞히기" : "대화" }), log, f);
}


/* ---------- Smoke race (빨리 담배피기): hold to inhale, release to exhale ---------- */
const SMDUR = { ready: 3, play: 40, shot: 5 };
if (FAST) Object.keys(SMDUR).forEach(function (k) { SMDUR[k] = Math.max(2, Math.round(SMDUR[k] / FAST)); });
const SM = {
  fill: 0.75,     /* lungs per second while inhaling: full (and coughing) after ~1.3 s */
  drain: 0.7,     /* lungs per second while exhaling */
  burn: 5,        /* % of the cigarette per second while inhaling */
  deep: 0.6,      /* from here inhaling burns faster */
  deepMult: 1.6,
  safe: 0.1,      /* breathing out below this makes the next inhale safe */
  riskSpan: 0.35, /* above `safe`, cough chance grows to 100% over this much air */
  coughMs: 3500,
  coughLoss: 5
};
const KILLER_LINES = ["꼴찌는 용서 못 해.", "담배 하나 제대로 못 피우나?", "본부에 꼴찌 자리는 없다.", "다음 생엔 폐활량부터 키워라.", "연기만 뿜다 가는구나."];
const SMK = { rk: null, unsub: null, live: {}, holding: false, L: 0, prog: 0, coughUntil: 0, coughWhy: "", done: false, fin: null,
  lastSend: 0, lastT: 0, raf: 0, stage: null, stageKey: null };

function smLiveId(rk, m) { return rk + "_" + m; }
function smWatch(rk) {
  if (SMK.rk === rk) return;
  if (SMK.unsub) { SMK.unsub(); SMK.unsub = null; }
  SMK.rk = rk; SMK.live = {};
  if (rk == null || !S.roomId) return;
  SMK.unsub = onSnapshot(query(collection(db, "rooms", S.roomId, "live"), where("rk", "==", rk)), function (snap) {
    const live = {};
    snap.docs.forEach(function (d) { const v = d.data(); live[v.m] = v; });
    SMK.live = live;
    smUpdateLanes();
    const r = S.room;
    if (r && r.type === "smoke" && r.status === "play" && (r.alive || []).every(function (m) { return live[m] && live[m].done; })) smEndRound(false, r.phase).catch(function () {});
  });
}
async function smStart() {
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 2) throw { code: "few" };
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, "🚬 빨리 담배피기 시작! 꼴찌는 킬러가 처리합니다.");
      tx.update(roomRef(), nextPhase(r, { status: "ready", lineup: lineup, alive: lineup, out: [], round: 1, rk: game * 100 + 1, board: [], shot: null, winner: null, game: game, startedAt: serverTimestamp() }));
    });
  } catch (e) {
    if (e && e.code === "few") toast("2명 이상 모여야 시작할 수 있어요.");
    else if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else toast(errText(e));
  }
}
async function smToPlay(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "ready" || (expectPhase != null && r.phase !== expectPhase)) return;
    tx.update(roomRef(), nextPhase(r, { status: "play" }));
  });
}
async function smEndRound(force, expectPhase) {
  const roomId = S.roomId;
  await runTransaction(db, async function (tx) {
    const ref = doc(db, "rooms", roomId);
    const snap = await tx.get(ref); const r = snap.data();
    if (!r || r.status !== "play" || (expectPhase != null && r.phase !== expectPhase)) return;
    const alive = r.alive || [];
    const docs = await Promise.all(alive.map(function (m) { return tx.get(doc(db, "rooms", roomId, "live", smLiveId(r.rk, m))); }));
    const st = alive.map(function (m, i) {
      const d = docs[i].exists() ? docs[i].data() : {};
      return { m: m, done: !!d.done, fin: d.done ? (d.fin || 0) : null, prog: Math.min(100, Math.round(d.prog || 0)) };
    });
    if (!force && st.some(function (x) { return !x.done; })) return;
    st.sort(function (a, b) {
      if (a.done !== b.done) return a.done ? -1 : 1;
      if (a.done) return a.fin - b.fin;
      return b.prog - a.prog || (a.m < b.m ? -1 : 1);
    });
    const loser = st[st.length - 1].m;
    const left = alive.filter(function (m) { return m !== loser; });
    const out = (r.out || []).concat([loser]);
    sysMsg(tx, r, "💥 탕! " + r.round + "라운드 꼴찌 " + nickOf(loser) + "님 탈락.");
    if (left.length <= 1) {
      sysMsg(tx, r, "👑 최후의 1인 " + nickOf(left[0]) + "! 모두 무릎 꿇어라.");
      tx.update(ref, nextPhase(r, { status: "result", alive: left, out: out, board: st, shot: loser, winner: left[0] || null }));
    } else {
      tx.update(ref, nextPhase(r, { status: "shot", alive: left, out: out, board: st, shot: loser, line: KILLER_LINES[Math.floor(Math.random() * KILLER_LINES.length)] }));
    }
  });
}
async function smNextRound(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "shot" || (expectPhase != null && r.phase !== expectPhase)) return;
    const round = (r.round || 1) + 1;
    sysMsg(tx, r, "🚬 " + round + "라운드! 남은 사람 " + (r.alive || []).length + "명.");
    tx.update(roomRef(), nextPhase(r, { status: "ready", round: round, rk: (r.game || 0) * 100 + round, board: [], shot: null }));
  });
}
function smokeTimeout(r) {
  if (r.status === "ready") return smToPlay(r.phase);
  if (r.status === "play") return smEndRound(true, r.phase);
  if (r.status === "shot") return smNextRound(r.phase);
}

/* local breathing simulation; only progress is shared */
function smMe() { const r = S.room, me = meMember(); return r && me && r.status === "play" && (r.alive || []).indexOf(me.id) >= 0 ? me : null; }
function smReset() { SMK.L = 0; SMK.prog = 0; SMK.coughUntil = 0; SMK.done = false; SMK.fin = null; SMK.holding = false; SMK.lastSend = 0; }
function smSend(force) {
  const me = smMe(), r = S.room;
  if (!me) return;
  const now = Date.now();
  if (!force && now - SMK.lastSend < 450) return;
  SMK.lastSend = now;
  setDoc(doc(db, "rooms", S.roomId, "live", smLiveId(r.rk, me.id)), {
    uid: myUid(), rk: r.rk, m: me.id, prog: Math.round(SMK.prog * 10) / 10, cough: now < SMK.coughUntil, done: SMK.done, fin: SMK.fin
  }).catch(function () {});
}
function smCough(why) {
  SMK.coughUntil = Date.now() + SM.coughMs; SMK.coughWhy = why; SMK.L = 0; SMK.holding = false;
  SMK.prog = Math.max(0, SMK.prog - SM.coughLoss);
  breathStop(); sfx("cough");
  try { if (navigator.vibrate) navigator.vibrate(180); } catch (e) {}
  smSend(true);
  if (SK.pendingRender) { SK.pendingRender = false; render(); }
}
function smTick(t) {
  SMK.raf = 0;
  const me = smMe();
  if (!me) return;
  const dt = Math.min(0.1, SMK.lastT ? (t - SMK.lastT) / 1000 : 0); SMK.lastT = t;
  const now = Date.now();
  if (!SMK.done) {
    if (now < SMK.coughUntil) SMK.L = Math.max(0, SMK.L - SM.drain * dt);
    else if (SMK.holding) {
      SMK.L += SM.fill * dt;
      SMK.prog = Math.min(100, SMK.prog + SM.burn * (SMK.L >= SM.deep ? SM.deepMult : 1) * dt);
      if (SMK.L >= 1) smCough("너무 오래 들이마셨어요!");
    } else SMK.L = Math.max(0, SMK.L - SM.drain * dt);
    if (SMK.prog >= 100 && !SMK.done) {
      SMK.done = true; SMK.holding = false;
      breathStop(); sfx("correct");
      const r = S.room;
      SMK.fin = r.phaseAt && r.phaseAt.toMillis ? now - r.phaseAt.toMillis() : 0;
      smSend(true);
      if (SK.pendingRender) { SK.pendingRender = false; render(); }
    }
  }
  smSend(false);
  smPaint();
  SMK.raf = requestAnimationFrame(smTick);
}
function smLoop() { if (!SMK.raf && smMe()) { SMK.lastT = 0; SMK.raf = requestAnimationFrame(smTick); } }
function smPress(e) {
  if (e) e.preventDefault();
  if (!smMe() || SMK.done) return;
  if (Date.now() < SMK.coughUntil) return;
  if (SMK.L > SM.safe && Math.random() < Math.min(1, (SMK.L - SM.safe) / SM.riskSpan)) { smCough("덜 내쉬고 또 들이마셨어요!"); return; }
  SMK.holding = true;
  breathStart(SMK.L);
  smLoop();
}
function smRelease() {
  if (!SMK.holding) return;
  SMK.holding = false;
  breathStop(); exhaleSound(SMK.L);
  smPuff();
  if (SK.pendingRender) { SK.pendingRender = false; render(); }
}
function smPuff() {
  const host = SMK.stage && SMK.stage.querySelector(".sm-smoke");
  if (!host || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  for (let i = 0; i < 3; i++) {
    const p = h("i", { class: "puff" });
    p.style.left = (10 + Math.random() * 30) + "px"; p.style.animationDelay = (i * 0.12) + "s";
    host.appendChild(p);
    setTimeout(function () { p.remove(); }, 1800);
  }
}
function smPaint() {
  const st = SMK.stage;
  if (!st) return;
  const now = Date.now(), coughing = now < SMK.coughUntil;
  const cig = st.querySelector(".sm-cig"), big = st.querySelector(".bc"), msg = st.querySelector(".sm-msg"), btn = st.querySelector(".sm-btn");
  const left = Math.max(0, 100 - SMK.prog);
  if (cig) { cig.style.setProperty("--left", left + "%"); cig.classList.toggle("lit", SMK.holding); }
  if (big) { big.style.setProperty("--left", left); big.classList.toggle("lit", SMK.holding); big.classList.toggle("done", SMK.done); }
  const pct = st.querySelector(".sm-pct"); if (pct) pct.textContent = Math.floor(SMK.prog) + "% 피움";
  if (msg) {
    msg.textContent = SMK.done ? "다 피웠다! 다른 사람을 기다려요." : coughing ? "콜록콜록콜록! " + SMK.coughWhy : SMK.holding ? "스으읍…" : "소리를 듣고 감으로 피우세요";
    msg.className = "sm-msg" + (coughing ? " bad" : SMK.done ? " good" : "");
  }
  if (btn) { btn.disabled = SMK.done || coughing; btn.classList.toggle("on", SMK.holding); btn.textContent = SMK.done ? "완료" : coughing ? "콜록…" : SMK.holding ? "스으읍… (떼면 날숨)" : "꾹 눌러 들이마시기"; }
}
function smUpdateLanes() {
  const host = SMK.stage && SMK.stage.querySelector(".sm-lanes");
  const r = S.room;
  if (!host || !r) return;
  const me = meMember();
  host.replaceChildren.apply(host, (r.lineup || []).map(function (m) {
    const out = (r.alive || []).indexOf(m) < 0;
    const v = SMK.live[m] || {};
    const isMe = me && m === me.id && !out;
    const prog = isMe ? SMK.prog : (v.prog || 0);
    const cough = isMe ? Date.now() < SMK.coughUntil : v.cough;
    const done = isMe ? SMK.done : v.done;
    const bar = h("span", { class: "sl-cig" }, h("i")); bar.firstChild.style.width = (100 - Math.min(100, prog)) + "%";
    return h("div", { class: "sm-lane" + (out ? " out" : "") + (isMe ? " me" : "") },
      h("div", { class: "sl-photo" }, photoBox(findMember(m) || {})),
      h("div", { class: "sl-body" },
        h("div", { class: "sl-top" }, h("b", { text: (out ? "☠ " : "") + nickOf(m) }),
          h("span", { class: "sl-state" + (cough ? " bad" : done ? " good" : ""), text: out ? "탈락" : done ? "완료" : cough ? "콜록!" : Math.floor(prog) + "%" })),
        bar));
  }));
}
function smStageFor(r) {
  const key = r.rk + ":" + r.status;
  if (SMK.stage && SMK.stageKey === key) return SMK.stage;
  SMK.stageKey = key;
  const me = meMember();
  const playing = me && (r.alive || []).indexOf(me.id) >= 0;
  const btn = h("button", { type: "button", class: "sm-btn", disabled: r.status !== "play" });
  btn.addEventListener("pointerdown", function (e) { try { btn.setPointerCapture(e.pointerId); } catch (err) {} smPress(e); });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (ev) { btn.addEventListener(ev, smRelease); });
  btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  const mine = playing ? h("div", { class: "sm-me" },
    h("div", { class: "sm-char" }, h("div", { class: "sm-face" }, photoBox(me)),
      h("div", { class: "sm-cig" }, h("span", { class: "ash" }), h("span", { class: "body" }), h("span", { class: "filter" })),
      h("div", { class: "sm-smoke" })),
    h("div", { class: "sm-big", "aria-label": "내 담배" },
      h("div", { class: "bc" }, h("span", { class: "bc-filter" }), h("span", { class: "bc-body" }), h("span", { class: "bc-ember" }), h("span", { class: "bc-ash" })),
      h("span", { class: "sm-pct", text: "0% 피움" }))) : null;
  SMK.stage = h("div", { class: "sm-stage" },
    mine,
    playing ? h("p", { class: "sm-msg", text: r.status === "ready" ? "곧 시작해요. 준비!" : "꾹 눌러서 들이마시세요" }) : null,
    playing ? btn : null,
    h("div", { class: "sm-lanes" }));
  if (r.status === "play" || r.status === "ready") { if (SMK.lastRk !== r.rk) { SMK.lastRk = r.rk; smReset(); } }
  smUpdateLanes(); smPaint();
  return SMK.stage;
}
document.addEventListener("keydown", function (e) { if (e.code === "Space" && smMe() && !e.repeat && !/INPUT|TEXTAREA/.test((e.target && e.target.tagName) || "")) { e.preventDefault(); smPress(); } });
document.addEventListener("keyup", function (e) { if (e.code === "Space") smRelease(); });

function screenSmokeLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return roomAlive(r) && r.type === "smoke"; });
  const list = rooms.length
    ? h("ul", { class: "room-list" }, rooms.map(function (r) {
        const mine = me && (r.players || []).indexOf(me.id) >= 0;
        const label = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중";
        return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
          h("span", { class: "ri-main" }, h("b", { text: nickOf(r.createdBy) + "의 방" }),
            h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
          h("span", { class: "ri-side" }, h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: label }),
            h("span", { class: "ri-sub", text: (r.players || []).length + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-06" }), h("h2", { text: "빨리 담배피기" }),
        h("p", { text: "들숨 날숨 타이밍 싸움. 라운드마다 꼴찌는 킬러가 처리하고, 최후의 1인이 형님이 된다." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("smoke"); } },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    h("details", { class: "guide" },
      h("summary", { text: "빨리 담배피기 규칙" }),
      h("div", { class: "guide-body" },
        h("ol", null,
          h("li", { text: "버튼을 꾹 누르고 있으면 들숨, 떼면 날숨이에요. 들이마시는 동안만 담배가 타요." }),
          h("li", { text: "숨이 얼마나 찼는지는 화면에 안 나와요. 들이마시는 소리가 높아질수록 꽉 찬 거예요. 깊게 마실수록 더 빨리 타지만, 너무 오래 마시면 콜록콜록! 3.5초 동안 못 피우고 담배도 조금 날아가요." }),
          h("li", { text: "떼면 ‘후~’ 하고 내쉬어요. 그 소리가 끝나기 전에 또 누르면 덜 내쉰 만큼 기침할 확률이 커져요. 소리를 잘 듣고 감으로 리듬을 타세요." }),
          h("li", { text: "한 개비를 먼저 다 피운 순서대로 순위가 정해져요. 40초 안에 못 피우면 많이 피운 순서예요." }),
          h("li", { text: "라운드마다 꼴찌는 킬러에게 탕! 마지막 1인이 남을 때까지 계속해요." })))));
}
function screenSmokeRoom(r) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-smoke"); }, text: "빨리 담배피기 방 목록" });
  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  smWatch(playing ? r.rk : null);
  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? "최후의 1인" : r.round + "라운드" + (r.status === "ready" ? " 준비" : r.status === "shot" ? " 처형" : "");
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "빨리 담배피기 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    playing ? h("span", { class: "mode-chip", text: "생존 " + (r.alive || []).length + "명" }) : null);
  let body;
  if (r.status === "lobby") {
    const n = players.length;
    body = h("div", { class: "panel" },
      h("div", { class: "field-label", text: "모인 사람 " + n + "명" }),
      h("div", { class: "chips" }, players.map(function (p) { return h("span", { class: "chip static" + (me && p === me.id ? " me" : ""), text: nickOf(p) }); })),
      h("p", { class: "note", text: "라운드마다 꼴찌 한 명이 탈락해요. " + Math.max(1, n - 1) + "라운드면 최후의 1인이 나와요." }),
      !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
        : inRoom
          ? h("div", { class: "op-row" },
              h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
              h("button", { type: "button", class: "go", disabled: n < 2, onclick: smStart, text: n >= 2 ? "게임 시작" : "2명부터 시작" }))
          : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
      h("p", { class: "hint", text: "단톡방에 ‘게임방 → 빨리 담배피기 방 열었어’라고 알려주세요." }));
  } else if (r.status === "ready" || r.status === "play") {
    body = [h("div", { class: "panel turn" + (r.status === "play" ? " mine" : "") },
      timerEl(r, r.status === "ready" ? "시작까지" : "남은 시간")), smStageFor(r)];
    if (r.status === "play") smLoop();
  } else if (r.status === "shot") {
    const loser = findMember(r.shot) || { nick: nickOf(r.shot) };
    body = h("div", { class: "panel shot" },
      h("div", { class: "shot-scene" },
        h("div", { class: "killer", "aria-hidden": "true", text: "🕴️🔫" }),
        h("div", { class: "victim" }, h("div", { class: "v-photo" }, photoBox(loser)), h("span", { class: "bang", text: "탕!" }))),
      h("p", { class: "shot-line" }, "킬러: “" + (r.line || KILLER_LINES[0]) + "”"),
      h("p", null, h("b", { text: loser.nick }), "님 탈락."),
      smBoard(r), timerEl(r, "다음 라운드까지"));
  } else {
    const w = findMember(r.winner) || { nick: nickOf(r.winner) };
    body = h("div", { class: "panel result-smoke" },
      h("div", { class: "winner" }, h("span", { class: "crown", "aria-hidden": "true", text: "👑" }), h("div", { class: "w-photo" }, photoBox(w)),
        h("div", { class: "w-name", text: w.nick }), h("div", { class: "eyebrow", text: "최후의 1인 · 오늘의 형님" })),
      h("div", { class: "kneel" }, (r.out || []).slice().reverse().map(function (m) {
        const mm = findMember(m) || { nick: nickOf(m) };
        return h("div", { class: "kn" }, h("span", { class: "kn-say", text: "형님…" }), h("div", { class: "kn-photo" }, photoBox(mm)),
          h("span", { class: "kn-name", text: "🙇 " + mm.nick }));
      })),
      h("div", { class: "op-row" },
        h("button", { type: "button", onclick: function () { go("game-smoke"); }, text: "방 목록" }),
        h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
  }
  return h("section", { class: "screen room" }, back, head, body, smChat(r, me));
}
function smBoard(r) {
  return h("ol", { class: "sm-board" }, (r.board || []).map(function (x) {
    return h("li", { class: x.m === r.shot ? "dead" : "" }, h("span", { text: nickOf(x.m) }),
      h("b", { text: x.done ? (x.fin / 1000).toFixed(1) + "초" : x.prog + "%" }));
  }));
}
function smChat(r, me) {
  const game = r.game || 0;
  const msgs = S.msgs.filter(function (m) { return (m.game || 0) === game; }).slice(-60);
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "sys") return h("div", { class: "msg-sys strong", text: m.text });
      return h("div", { class: "bubble chat" + (me && m.memberId === me.id ? " mine" : "") },
        h("div", { class: "b-meta" }, h("b", { text: m.nick || "손님" })), h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "80", placeholder: "응원·도발 보내기", autocomplete: "off" });
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
const soundBtn = h("button", { type: "button", class: "snd-btn", "aria-label": SND.on ? "소리 끄기" : "소리 켜기", text: SND.on ? "🔊" : "🔇",
  onclick: function () { setSound(!SND.on); } });
function setSound(on) {
  SND.on = on;
  try { localStorage.setItem("bf-sound", on ? "on" : "off"); } catch (e) {}
  if (!on) breathStop(); else { ac(); sfx("pop"); }
  soundBtn.textContent = on ? "🔊" : "🔇";
  soundBtn.setAttribute("aria-label", on ? "소리 끄기" : "소리 켜기");
  toast(on ? "효과음을 켰어요." : "효과음을 껐어요.");
}
const header = h("div", { class: "filebar wrap" },
  h("span", { class: "brand" }, logo("logo-s"), h("span", null, h("b", { text: "불주먹조직" }), " · 비밀본부")),
  h("span", { class: "fb-right" }, soundBtn, opChip, h("span", { class: "lvl", text: "기밀 등급 A" })));
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
  if (SK.drawing || SMK.holding) { SK.pendingRender = true; return; }
  migrateCrewTopic();
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
  else if (r === "game-mafia") { tab = "games"; view = screenMafiaLobby(); }
  else if (r === "game-sketch") { tab = "games"; view = screenSketchLobby(); }
  else if (r === "game-smoke") { tab = "games"; view = screenSmokeLobby(); }
  else if (r.indexOf("room-") === 0) { tab = "games"; view = screenRoom(r.slice(5)); }
  else if (r === "guestbook") { tab = "guestbook"; view = screenGuestbook(); }
  else view = screenHQ();
  if (r.indexOf("room-") !== 0) { watchRoom(null); skWatch(null); smWatch(null); }
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
