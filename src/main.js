import { initializeApp } from "firebase/app";
import {
  getAuth, connectAuthEmulator, onAuthStateChanged, signInAnonymously,
  GoogleAuthProvider, signInWithPopup, signOut, signInWithCredential,
  EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore, connectFirestoreEmulator, collection, doc, onSnapshot, query, orderBy, limit, limitToLast, where,
  setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, writeBatch, runTransaction, serverTimestamp,
  arrayUnion, arrayRemove, Timestamp, deleteField
} from "firebase/firestore";
import LOGO from "./logo.txt";
import { AQ_BANK } from "./assoc_bank.js";
import { SK_MORE, SK_HARD } from "./sketch_words.js";
import { CAROLS, songBars, chordNotes } from "./carols.js";
import { OX_Q, CHOSUNG_Q, TRIVIA_Q, PROVERB_Q, MOVIE_Q, MELODY_Q } from "./quiz_bank.js";

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
    tryGet: function (path) { return getDoc(doc(db, path)).then(function (d) { return d.exists() ? "READ" : "MISSING"; }, function (e) { return e.code; }); },
    tryList: function (coll) { return getDocs(collection(db, coll)).then(function (q) { return "LISTED " + q.size; }, function (e) { return e.code; }); },
    tryWrite: function (path, data) { return setDoc(doc(db, path), data).then(function () { return "WROTE"; }, function (e) { return e.code; }); },
    mt: function () { return MT; },
    state: function () { return S; }
  };
}

const APP_NAME = "불주먹조직 비밀본부";
const MOTTO = "불은 물로 끄면 되지만, 우린 못 꺼.";

/* ---------- state ---------- */
const S = {
  cfg: {},
  user: null,
  bossUid: null, bossKnown: false,
  members: [], membersReady: false,
  topics: [],
  guest: [], guestReady: false,
  rooms: [], roomsReady: false,
  roomId: null, room: null, roomMissing: false, msgs: [],
  drafts: {},
  pick: null, confirmDelete: false, gbConfirm: null,
  flipped: {}, importing: false,
  incidents: [], incidentsReady: false, gatherings: [], tips: [], tipsReady: false, shots: {}, caseConfirm: null, gatherConfirm: null, sketchNames: null, sketchKnown: false, migrated: false
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
  if (tag === "details") keepOpenState(el);
  return el;
}
/* 화면이 다시 그려져도 펼친 접기 상자가 닫히지 않게 기억 */
const DETAILS_OPEN = new Map();
function keepOpenState(el) {
  const sm = el.querySelector("summary");
  const key = (location.hash || "#hq") + "|" + (sm ? sm.textContent : "");
  if (DETAILS_OPEN.has(key)) el.open = DETAILS_OPEN.get(key);
  el.addEventListener("toggle", function () { DETAILS_OPEN.set(key, el.open); });
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
/* volume sliders (0~100). 지금의 60 = 바로 전 버전의 100 */
const VOL = { bgm: 60, sfx: 60 };
if (EMU) window.__snd = SND;
try { const v = JSON.parse(localStorage.getItem("bf-vol") || "{}"); if (v.bgm >= 0 && v.bgm <= 100) VOL.bgm = v.bgm; if (v.sfx >= 0 && v.sfx <= 100) VOL.sfx = v.sfx; } catch (e) {}
function sfxGain() { return VOL.sfx / 60 * 1.375; }
/* loud settings: a limiter in front of the speakers keeps big volumes from crackling */
function limiter(c) {
  if (!SND.lim || SND.lim.context !== c) {
    const k = c.createDynamicsCompressor();
    k.threshold.value = -8; k.knee.value = 6; k.ratio.value = 12; k.attack.value = 0.003; k.release.value = 0.25;
    k.connect(c.destination); SND.lim = k;
  }
  return SND.lim;
}
function sfxOut(c) {
  if (!SND.sfxOut || SND.sfxOut.context !== c) { SND.sfxOut = c.createGain(); SND.sfxOut.gain.value = sfxGain(); SND.sfxOut.connect(limiter(c)); }
  return SND.sfxOut;
}
function ac() {
  if (!SND.on) return null;
  /* iPhone: treat our sounds as media so the silent switch doesn't mute them (iOS 16.4+) */
  try { if (navigator.audioSession && navigator.audioSession.type !== "playback") navigator.audioSession.type = "playback"; } catch (e) {}
  if (!SND.ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { SND.ctx = new C(); } catch (e) { return null; }
  }
  /* "suspended" before the first touch, "interrupted" on iPhone after a call or switching apps */
  if (SND.ctx.state !== "running") { try { SND.ctx.resume().catch(function () {}); } catch (e) {} }
  return SND.ctx;
}
/* phones only allow sound after the viewer touches the page; iPhone also wants a sound played during that touch */
/* iPhone: while a (silent) <audio> element plays, Safari treats the page as media playback, so the
   ring/silent switch no longer mutes our Web Audio sounds. Works on older iOS and in home-screen apps too. */
const IOS_AUDIO = /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
function silentWavUrl() {
  const rate = 8000, n = rate * 2, buf = new ArrayBuffer(44 + n), v = new DataView(buf);
  function str(o, t) { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); }
  str(0, "RIFF"); v.setUint32(4, 36 + n, true); str(8, "WAVE"); str(12, "fmt "); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true); v.setUint32(28, rate, true);
  v.setUint16(32, 1, true); v.setUint16(34, 8, true); str(36, "data"); v.setUint32(40, n, true);
  for (let i = 0; i < n; i++) v.setUint8(44 + i, 128);
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}
function mediaKeepAlive(play) {
  if (!IOS_AUDIO) return;
  try {
    if (!SND.tag) {
      if (!play) return;
      const a = document.createElement("audio");
      a.src = silentWavUrl(); a.loop = true; a.preload = "auto";
      a.setAttribute("playsinline", ""); a.setAttribute("webkit-playsinline", ""); a.setAttribute("x-webkit-airplay", "deny");
      a.disableRemotePlayback = true;
      SND.tag = a;
    }
    if (play) { if (SND.tag.paused) { const pr = SND.tag.play(); if (pr && pr.catch) pr.catch(function () {}); } }
    else if (!SND.tag.paused) SND.tag.pause();
  } catch (e) {}
}
function unlockAudio() {
  if (!SND.on) return;
  mediaKeepAlive(true);
  const c = ac(); if (!c) return;
  if (SND.unlocked && c.state === "running") return;
  try {
    const b = c.createBuffer(1, 1, 22050), src = c.createBufferSource();
    src.buffer = b; src.connect(c.destination); src.start(0);
    SND.unlocked = true;
  } catch (e) {}
}
["pointerdown", "touchstart", "touchend", "click", "keydown"].forEach(function (ev) {
  document.addEventListener(ev, unlockAudio, { passive: true, capture: true });
});
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") { if (SND.ctx && SND.on) { ac(); mediaKeepAlive(true); } bgmSet(bgmMoodFor()); }
  else { mediaKeepAlive(false); bgmSet(null); }
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
  os.connect(g); g.connect(sfxOut(c));
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
  src.connect(f); f.connect(g); g.connect(sfxOut(c));
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
  /* "탕!": sharp crack + punchy body + low thump + a short echo */
  bang: function () {
    hiss(0.05, { filter: "highpass", f: 3000, gain: 0.9, q: 0.7, attack: 0.001 });
    hiss(0.18, { filter: "bandpass", f: 1500, q: 0.6, gain: 0.55, attack: 0.001 });
    hiss(0.3, { filter: "lowpass", f: 900, gain: 0.45, attack: 0.002 });
    tone(140, 0.28, { gain: 0.55, to: 38 });
    hiss(0.7, { filter: "bandpass", f: 650, fTo: 300, q: 0.8, gain: 0.09, at: 0.12, attack: 0.02 });
    hiss(0.5, { filter: "bandpass", f: 500, fTo: 250, q: 0.8, gain: 0.05, at: 0.32, attack: 0.02 });
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
  fanfare: function () { [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { tone(f, i === 5 ? 0.7 : 0.18, { type: "square", gain: 0.07, at: i * 0.15 }); }); },
  /* clock: wooden tick/tock, sharper when time is almost up */
  tickA: function () { hiss(0.03, { filter: "bandpass", f: 3200, q: 4, gain: 0.25 }); tone(1250, 0.05, { type: "triangle", gain: 0.08 }); },
  tickB: function () { hiss(0.03, { filter: "bandpass", f: 2400, q: 4, gain: 0.22 }); tone(940, 0.05, { type: "triangle", gain: 0.08 }); },
  tickHot: function () { hiss(0.03, { filter: "bandpass", f: 4200, q: 5, gain: 0.32 }); tone(1760, 0.06, { type: "square", gain: 0.06 }); },
  click: function () { hiss(0.025, { filter: "highpass", f: 3000, gain: 0.3 }); tone(2200, 0.03, { type: "square", gain: 0.04 }); },
  cock: function () {
    hiss(0.05, { filter: "bandpass", f: 1800, q: 3, gain: 0.4 }); tone(300, 0.05, { type: "square", gain: 0.06 });
    hiss(0.06, { filter: "bandpass", f: 2600, q: 3, gain: 0.45, at: 0.16 }); tone(420, 0.06, { type: "square", gain: 0.07, at: 0.16 });
  },
  dun: function () { tone(98, 0.35, { type: "sawtooth", gain: 0.18 }); tone(92, 0.9, { type: "sawtooth", gain: 0.2, at: 0.38 }); tone(46, 0.9, { gain: 0.25, at: 0.38 }); },
  sad: function () { [392, 370, 349, 330].forEach(function (f, i) { tone(f, i === 3 ? 1.0 : 0.32, { type: "sawtooth", gain: 0.07, at: i * 0.34, to: i === 3 ? 300 : null }); }); },
  heal: function () { [784, 988, 1175, 1568].forEach(function (f, i) { tone(f, 0.4, { gain: 0.08, at: i * 0.09 }); }); },
  relief: function () { hiss(0.9, { filter: "lowpass", f: 900, fTo: 300, gain: 0.12, attack: 0.08 }); tone(523, 0.5, { type: "triangle", gain: 0.07, at: 0.35 }); tone(659, 0.7, { type: "triangle", gain: 0.07, at: 0.6 }); },
  flip: function () { hiss(0.12, { filter: "bandpass", f: 1800, fTo: 4200, q: 1, gain: 0.25 }); },
  ominous: function () { [110, 131, 156].forEach(function (f) { tone(f, 2.0, { type: "sawtooth", gain: 0.06 }); }); tone(55, 2.2, { gain: 0.2 }); },
  /* "음하하하하": falling square-wave bursts */
  laugh: function () {
    tone(196, 0.32, { type: "sawtooth", gain: 0.07, to: 175 });
    [0, 1, 2, 3, 4].forEach(function (i) {
      const a = 0.36 + i * 0.17, f = 330 - i * 18;
      tone(f, 0.12, { type: "square", gain: 0.08, at: a, to: f * 0.82 });
      hiss(0.08, { filter: "bandpass", f: 1400, q: 1, gain: 0.08, at: a });
    });
  },
  /* "엉엉": wobbly sliding sobs */
  cry: function () {
    [0, 0.55, 1.15].forEach(function (a, i) {
      tone(i % 2 ? 392 : 440, 0.45, { type: "triangle", gain: 0.07, at: a, to: i % 2 ? 300 : 330 });
      tone(i % 2 ? 398 : 446, 0.45, { type: "sine", gain: 0.04, at: a + 0.02, to: i % 2 ? 296 : 326 });
    });
  },
  sly: function () { [659, 587, 659, 523].forEach(function (f, i) { tone(f, 0.18, { type: "square", gain: 0.06, at: i * 0.16 }); }); },
  eerie: function () {
    const c = ac(); if (!c) return;
    const t = c.currentTime, os = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain(), g = c.createGain();
    os.type = "sine"; os.frequency.setValueAtTime(110, t); os.frequency.linearRampToValueAtTime(82, t + 2.2);
    lfo.frequency.value = 5; lg.gain.value = 6; lfo.connect(lg); lg.connect(os.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.16, t + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    os.connect(g); g.connect(sfxOut(c));
    os.start(t); lfo.start(t); os.stop(t + 2.5); lfo.stop(t + 2.5);
    tone(392, 0.5, { type: "triangle", gain: 0.06, at: 0.2 }); tone(311, 0.8, { type: "triangle", gain: 0.06, at: 0.6 });
  }
};
function sfx(name) {
  if (EMU) (window.__sfxLog = window.__sfxLog || []).push(name);
  if (!SND.on) return;
  try { SFX[name](); } catch (e) {}
}
/* ---------- 배경음악: 직접 합성한 잔잔한 루프 (저작권 걱정 없음) ---------- */
const BGM = { on: true, mood: null, master: null, timer: null, next: 0, bar: 0 };
try { BGM.on = localStorage.getItem("bf-bgm") !== "off"; } catch (e) {}
const BGM_VOL = 0.77;   /* 슬라이더 100일 때 */
function bgmLevel(M) { return Math.max(0.0001, BGM_VOL * (VOL.bgm / 100) * (M ? M.vol : 1)); }
if (EMU) window.__bgm = BGM;
/* 8-bit game music: drums, a bouncing bass and a lead melody. bpm per mood, 4 chords (MIDI roots + chord tones) */
const MOODS = {
  lounge: { bpm: 124, swing: 0.12, vol: 1, cut: 5200, lead: "square", chords: [[45, 57, 60, 64], [41, 57, 60, 65], [48, 60, 64, 67], [43, 59, 62, 67]], mel: [0, 2, 1, 3, 2, 1, 0, 1] },
  calm:   { bpm: 132, swing: 0, vol: 0.95, cut: 5600, lead: "square", chords: [[41, 57, 60, 65], [43, 59, 62, 67], [40, 55, 59, 64], [45, 57, 60, 64]], mel: [0, 1, 2, 3, 2, 3, 1, 2] },
  play:   { bpm: 146, swing: 0, vol: 0.95, cut: 6500, lead: "square", chords: [[48, 60, 64, 67], [43, 59, 62, 67], [45, 57, 60, 64], [41, 57, 60, 65]], mel: [0, 2, 3, 2, 1, 2, 3, 1] },
  mafia:  { bpm: 112, swing: 0, vol: 0.9, cut: 4200, lead: "triangle", chords: [[45, 57, 60, 64], [45, 57, 60, 64], [41, 57, 60, 65], [40, 56, 59, 64]], mel: [0, 0, 2, 1, 3, 2, 1, 0] },
  night:  { bpm: 96, swing: 0, vol: 0.85, cut: 2600, lead: "triangle", chords: [[38, 50, 53, 57], [38, 50, 53, 57], [46, 50, 53, 58], [45, 49, 52, 57]], mel: [0, 2, 1, 0, 3, 2, 1, 2], dark: true }
};
function midiHz(n) { return 440 * Math.pow(2, (n - 69) / 12); }
const CAROL_SEASON = [10, 11, 0, 1].indexOf(new Date().getMonth()) >= 0;   /* 11월~2월 */
const CAROL_FOR = { lounge: "wish", calm: "jingle", play: "deck", mafia: "bells", night: "silent" };
function bgmMoodFor() {
  if (currentRoute() === "game-manito") return "carol:jingle";
  const m = bgmRoomMood();
  return m && CAROL_SEASON && CAROL_FOR[m] ? "carol:" + CAROL_FOR[m] : m;
}
function bgmRoomMood() {
  if (currentRoute().indexOf("room-") !== 0) return null;
  const R = S.room;
  if (!R || R.status === "closed") return null;
  if (R.type === "mafia") return R.status === "night" ? "night" : "mafia";
  if (R.type === "smoke") return R.status === "play" || R.status === "ready" ? null : "lounge";  /* 숨소리를 들어야 하는 동안은 조용히 */
  if (R.type === "sketch") return "play";
  if (R.type === "assoc") return "calm";
  if ((R.type === "tensec" || R.type === "music") && R.status === "q") return null;   /* 박자로 세면 반칙이니까 조용히 */
  if (PARTY[R.type]) return ["hearing", "balance", "sync"].indexOf(R.type) >= 0 ? "lounge" : "play";
  return "lounge";
}
function bgmSet(mood) {
  if (!BGM.on || !SND.on || document.visibilityState === "hidden") mood = null;
  if (mood === BGM.mood) return;
  if (BGM.master && SND.ctx) {
    const old = BGM.master, t = SND.ctx.currentTime;
    try { old.gain.cancelScheduledValues(t); old.gain.setValueAtTime(old.gain.value, t); old.gain.linearRampToValueAtTime(0.0001, t + 1.5); } catch (e) {}
    setTimeout(function () { try { old.disconnect(); } catch (e) {} }, 2500);
  }
  BGM.master = null; BGM.mood = mood;
  clearInterval(BGM.timer); BGM.timer = null;
  if (mood) { BGM.timer = setInterval(bgmTick, 250); bgmTick(); }
}
function bgmTick() {
  const carol = BGM.mood && BGM.mood.indexOf("carol:") === 0 ? CAROLS[BGM.mood.slice(6)] : null;
  const M = carol ? { vol: carol.soft ? 0.8 : 0.95, cut: carol.soft ? 3200 : 6000, bpm: carol.bpm } : MOODS[BGM.mood]; if (!M) return;
  const c = ac(); if (!c || c.state !== "running") return;
  if (!BGM.master) {
    const g = c.createGain(), f = c.createBiquadFilter();
    f.type = "lowpass"; f.frequency.value = M.cut; f.Q.value = 0.4;
    g.gain.setValueAtTime(0.0001, c.currentTime); g.gain.linearRampToValueAtTime(bgmLevel(M), c.currentTime + 2.5); BGM.vol = M.vol;
    g.connect(f); f.connect(limiter(c));
    BGM.master = g; BGM.next = c.currentTime + 0.15; BGM.bar = 0;
  }
  if (BGM.next < c.currentTime) BGM.next = c.currentTime + 0.05;
  while (BGM.next < c.currentTime + 1.5) {
    if (carol) { carolBar(c, carol, BGM.next); BGM.next += carol.beats * 60 / carol.bpm; }
    else { bgmBar(c, M, BGM.next); BGM.next += 240 / M.bpm; }
    BGM.bar++;
  }
}
function bgmVoice(c, out, hz, t, dur, o) {
  const os = c.createOscillator(), g = c.createGain();
  os.type = o.type || "square"; os.frequency.setValueAtTime(hz, t);
  if (o.slide) os.frequency.exponentialRampToValueAtTime(o.slide, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(o.gain, t + (o.attack || 0.005));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  os.connect(g); g.connect(out);
  os.start(t); os.stop(t + dur + 0.02);
}
function bgmNoise(c, out, t, dur, f, gain, type) {
  const src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = noiseBuf(c); fl.type = type || "highpass"; fl.frequency.value = f;
  g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(fl); fl.connect(g); g.connect(out);
  src.start(t, Math.random()); src.stop(t + dur + 0.02);
}
/* carols: melody + chord accompaniment + soft drums and sleigh bells */
const CAROL_BARS = {};
function carolBar(c, song, t) {
  const bars = CAROL_BARS[song.name] || (CAROL_BARS[song.name] = songBars(song));
  const out = BGM.master, bar = bars[BGM.bar % bars.length], beat = 60 / song.bpm, B = song.beats;
  const half = bar.chords.length > 1 ? B / 2 : B;
  bar.chords.forEach(function (name, ci) {
    const cn = chordNotes(name), t0 = t + ci * half * beat;
    /* bass on beat 1 (and the middle beat in 4/4) */
    bgmVoice(c, out, midiHz(cn[0] - 12), t0, half * beat * 0.9, { type: "triangle", gain: song.soft ? 0.16 : 0.22 });
    if (!song.soft && half >= 2) bgmVoice(c, out, midiHz(cn[0] - 5), t0 + 2 * beat, beat * 0.9, { type: "triangle", gain: 0.16 });
    /* off-beat chord stabs, or soft held chords for slow songs */
    if (song.soft) cn.slice(1).forEach(function (n) { bgmVoice(c, out, midiHz(n + 12), t0, half * beat, { type: "sine", gain: 0.035, attack: 0.25 }); });
    else for (let b = 0; b < half; b++) cn.forEach(function (n, k) { if (k) bgmVoice(c, out, midiHz(n + 12), t0 + (b + 0.5) * beat, beat * 0.35, { type: "square", gain: 0.012 }); });
  });
  /* melody */
  bar.notes.forEach(function (x) {
    if (x[0] == null) return;
    const len = x[2] * beat;
    bgmVoice(c, out, midiHz(x[0] + 12), t + x[1] * beat, Math.max(0.12, len * 0.92), { type: song.soft ? "triangle" : "square", gain: song.soft ? 0.11 : 0.05, attack: song.soft ? 0.03 : 0.005 });
  });
  /* drums + sleigh bells */
  for (let i = 0; i < B * 2; i++) {
    const tt = t + i * beat / 2;
    if (!song.soft && i % (B * 2) === 0) bgmVoice(c, out, 140, tt, 0.15, { type: "sine", gain: 0.42, slide: 45 });
    if (!song.soft && B === 4 && i === 4) bgmNoise(c, out, tt, 0.1, 1800, 0.12);
    if (song.minor && i % 2 === 0) bgmNoise(c, out, tt, 0.03, 8000, 0.03);
    if (song.bells) { bgmNoise(c, out, tt, 0.09, 6500, i % 2 ? 0.05 : 0.09, "highpass"); bgmVoice(c, out, 2637, tt, 0.06, { type: "sine", gain: 0.012 }); }
  }
}
/* one bar = 16 sixteenth notes */
function bgmBar(c, M, t) {
  const out = BGM.master, bar = BGM.bar, chord = M.chords[bar % M.chords.length];
  const st = 60 / M.bpm / 4;
  function at(i) { return t + i * st + (i % 2 ? M.swing * st : 0); }
  for (let i = 0; i < 16; i++) {
    const tt = at(i);
    /* drums */
    if (i === 0 || i === 8 || (!M.dark && i === 10 && bar % 2)) bgmVoice(c, out, 150, tt, 0.16, { type: "sine", gain: 0.5, slide: 42 });
    if (!M.dark && (i === 4 || i === 12)) { bgmNoise(c, out, tt, 0.12, 1800, 0.18); bgmVoice(c, out, 210, tt, 0.07, { type: "triangle", gain: 0.12, slide: 120 }); }
    if (M.dark && i === 12) bgmNoise(c, out, tt, 0.25, 900, 0.08, "bandpass");
    if (i % 2 === 0) bgmNoise(c, out, tt, 0.035, 7500, i % 4 === 2 ? 0.07 : 0.035);
    /* bass: root, octave bounce */
    if ([0, 3, 6, 8, 11, 14].indexOf(i) >= 0) bgmVoice(c, out, midiHz(chord[0] - 12 + (i === 6 || i === 14 ? 12 : 0)), tt, st * 1.6, { type: "triangle", gain: 0.22 });
    /* arpeggio sparkle */
    if (!M.dark || i % 4 === 0) bgmVoice(c, out, midiHz(chord[1 + (i % 3)] + 12), tt, st * 0.9, { type: "square", gain: 0.018 });
  }
  /* lead melody: 8th notes from the chord, varied every other bar, resting on some steps */
  const vary = (bar >> 1) % 2;
  for (let k = 0; k < 8; k++) {
    if ((k === 7 && bar % 4 === 3) || (vary && k === 3)) continue;
    const idx = (M.mel[(k + vary * 3) % 8] + (bar % 4 === 2 && k > 4 ? 1 : 0)) % 4;
    const n = chord[idx] + (idx === 0 ? 12 : 0) + 12;
    bgmVoice(c, out, midiHz(n), at(k * 2), st * 1.7, { type: M.lead, gain: M.lead === "square" ? 0.045 : 0.09 });
  }
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
    os.connect(og); og.connect(sfxOut(c));
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
  function later(name, ms) { setTimeout(function () { sfx(name); }, ms); }
  if (b.type === "mafia") {
    if (!st) return;
    if (b.status === "night") { if (a.status === "verdict" && fewer) { sfx("bang"); later("eerie", 900); } else if (a.status === "verdict") { sfx("relief"); later("eerie", 900); } else sfx("eerie"); }
    else if (b.status === "day") { if (fewer) sfx("bang"); else if (b.night && b.night.mafia) sfx("heal"); else sfx("morning"); }
    else if (b.status === "vote" || b.status === "verdict") sfx("ding");
    else if (b.status === "defense") sfx("dun");
    else if (b.status === "result") {
      if (a.status === "verdict" && fewer) { sfx("bang"); later(b.winner === "citizen" ? "fanfare" : "ominous", 800); }
      else if (fewer) { sfx("bang"); later(b.winner === "citizen" ? "fanfare" : "ominous", 800); }
      else sfx(b.winner === "citizen" ? "fanfare" : "ominous");
    }
  } else if (b.type === "sketch") {
    if ((b.guessed || []).length > (a.guessed || []).length) sfx("correct");
    else if (st && b.status === "reveal") sfx("timeup");
    if (b.status === "draw" && (st || a.turn !== b.turn) && b.order && b.order[b.turn % b.order.length] === my) later("ding", 300);
    if (st && b.status === "result") { later("fanfare", 400); later("laugh", 1700); later("cry", 2700); }
  } else if (PARTY[b.type]) {
    if (st && b.status === "q") sfx(a.status === "lobby" ? "go" : "ding");
    else if (st && b.status === "v") sfx("flip");
    else if (st && b.status === "rr") sfx(b.type === "croc" ? "bang" : "flip");
    else if (st && b.status === "result") { later("fanfare", 300); if (!PARTY[b.type].noScore) { later("laugh", 1600); later("cry", 2600); } }
    if (b.type === "croc" && b.status === "q" && b.q && a.q && b.q.turn !== a.q.turn && b.q.order[b.q.turn % b.q.order.length] === my) later("ding", 200);
  } else if (b.type === "assoc") {
    if ((b.solved || []).length > (a.solved || []).length) sfx("correct");
    else if (st && b.status === "reveal") sfx("timeup");
    if (b.status === "clue" && (st || a.qn !== b.qn)) later("ding", 250);
    if (st && b.status === "result") { later("fanfare", 400); later("laugh", 1700); later("cry", 2700); }
  } else if (b.type === "smoke") {
    if (st && b.status === "play") sfx("go");
    else if (st && b.status === "shot") { sfx("cock"); (b.shots && b.shots.length ? b.shots : [1]).forEach(function (_, i) { later("bang", 320 + i * 350); }); }
    else if (st && b.status === "result") {
      const n = (b.shots && b.shots.length) || 1;
      for (let i = 0; i < n; i++) later("bang", i * 350);
      const t = n * 350;
      later(b.winner ? "fanfare" : "ominous", t + 400); later("laugh", t + 1700); later("cry", t + 2700);
    }
  } else {
    if (b.status === "hint" && (a.status === "lobby" || a.status === "result")) sfx("flip");
    if (b.status === "hint" && (st || a.turn !== b.turn) && b.order && b.order[b.turn % b.order.length] === my) later("ding", st ? 350 : 0);
    else if (st && (b.status === "discuss" || b.status === "vote")) sfx("ding");
    else if (st && b.status === "guess") sfx("dun");
    else if (st && b.status === "result") {
      if (a.status === "vote") { sfx("sad"); later("sly", 1500); }
      else sfx(b.winner === "team" ? "fanfare" : "sly");
      if ((b.setTotal || 1) > 1 && (b.setNo || 1) >= b.setTotal) { later("laugh", 2600); later("cry", 3600); }
    }
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
/* clock sounds while a phase runs: "clock" ticks the whole time (twice a second at the end), a number ticks only the last N seconds */
const TICKS = {
  mafia: { vote: "clock", defense: "clock", verdict: "clock", night: 10, day: 10 },
  liar: { vote: "clock", guess: "clock", hint: 5, discuss: 10 },
  sketch: { draw: 10 },
  smoke: { play: 3 },
  assoc: { clue: 5 }
};
function sfxTimer(r, sec, leftMs) {
  const key = r.id + ":" + r.phase;
  if (SND.lastKey !== key) { SND.lastKey = key; SND.lastSec = null; SND.tickN = 0; }
  if (r.type === "smoke" && r.status === "ready") {
    if (sec !== SND.lastSec) { SND.lastSec = sec; if (sec >= 1 && sec <= 3) sfx("beep"); }
    return;
  }
  const mode = PARTY[r.type] ? ((r.status === "q" || r.status === "v") && ["reflex", "tensec", "typing", "hotbomb", "balloon"].indexOf(r.type) < 0 ? 5 : null) : (TICKS[r.type || "liar"] || {})[r.status];
  if (!mode || leftMs <= 0) return;
  const hot = leftMs <= 5000;
  const unit = mode === "clock" && hot ? Math.ceil(leftMs / 500) * -1 : sec;   /* half seconds near the end */
  if (unit === SND.lastSec) return;
  SND.lastSec = unit;
  if (mode === "clock") { SND.tickN = (SND.tickN || 0) + 1; sfx(hot ? "tickHot" : SND.tickN % 2 ? "tickA" : "tickB"); }
  else if (sec >= 1 && sec <= mode) sfx(hot ? "tickHot" : "tickA");
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
  onSnapshot(doc(db, "config", "prices"), function (snap) { S.cfg.prices = snap.exists() ? snap.data() : null; render(); }, function () {});
  onSnapshot(doc(db, "config", "quotes"), function (snap) { S.cfg.quotes = snap.exists() ? snap.data() : null; render(); }, function () {});
  onSnapshot(doc(db, "config", "sketch"), function (snap) {
    S.sketchNames = snap.exists() && Array.isArray(snap.data().names) ? snap.data().names : null;
    S.sketchKnown = true; render();
  }, function () { S.sketchKnown = true; });
  onSnapshot(collection(db, "incidents"), function (snap) {
    S.incidents = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); }).sort(byCaseDate);
    S.incidentsReady = true; render();
  }, function () { S.incidentsReady = true; render(); });
  onSnapshot(collection(db, "gatherings"), function (snap) {
    S.gatherings = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
    render();
  });
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
const ALIVE_MS = 60000, PRESENT_MS = 90000;
let beatT = null;
function tsMs(t) { return t && t.toMillis ? t.toMillis() : 0; }
/* Phone/PC clocks can be off by many seconds. Timers compare the server's phase start with this device's clock,
   so a device that runs ahead would end every turn early for everyone. Measure the gap against server time
   (from our own room heartbeat) and read every phase start in this device's clock. off = server - local. */
const CLK = { off: 0, sentAt: 0, best: Infinity };
function phMs(r) { return r.phaseAt.toMillis() - (S.roomPending ? 0 : CLK.off); }
function clockSample(r) {
  if (!CLK.sentAt || !r || !r.seen) return;
  const mine = r.seen[myUid()], t = mine && mine.t && mine.t.toMillis ? mine.t.toMillis() : 0;
  if (!t) return;
  const now = Date.now(), rtt = now - CLK.sentAt;
  CLK.sentAt = 0;
  if (rtt < 0 || rtt > 5000) return;
  /* keep the sample with the shortest round trip (most precise), but let a much newer reading replace a stale one */
  if (rtt <= CLK.best + 300) { CLK.best = Math.min(CLK.best, rtt); CLK.off = t - (now - rtt / 2); }
  if (EMU) window.__clk = CLK;
}
function roomAlive(r) {
  if (!r || !r.status || r.status === "closed") return false;
  const now = Date.now();
  if (now - tsMs(r.createdAt) < ALIVE_MS) return true;
  const seen = r.seen || {};
  return Object.keys(seen).some(function (k) { return now - tsMs(seen[k] && seen[k].t) < ALIVE_MS; });
}
/* players who are actually in the room right now (falls back to everyone if presence is unknown) */
/* members whose own heartbeat for this room is recent (they really have the room open) */
function hereCount(r) {
  const seen = r.seen || {}, here = {}, now = Date.now();
  Object.keys(seen).forEach(function (k) { const v = seen[k]; if (v && v.m && v.t && v.t.toMillis && now - (v.t.toMillis() - CLK.off) < PRESENT_MS) here[v.m] = 1; });
  return (r.players || []).filter(function (p) { return here[p]; }).length;
}
function presentPlayers(r) {
  const seen = r.seen || {}, here = {};
  let known = false, ref = 0;
  /* compare heartbeats with the newest one (all server time), so a phone with a wrong clock can't drop people */
  Object.keys(seen).forEach(function (k) { const v = seen[k]; if (v && v.m) ref = Math.max(ref, tsMs(v.t)); });
  Object.keys(seen).forEach(function (k) { const v = seen[k]; if (v && v.m) { known = true; if (ref - tsMs(v.t) < PRESENT_MS) here[v.m] = true; } });
  return (r.players || []).filter(function (p) { return !!findMember(p) && (!known || here[p]); });
}
function beat(id) {
  const uid = myUid(); if (!uid || !id) return;
  const me = meMember();
  CLK.sentAt = Date.now();
  updateDoc(doc(db, "rooms", id), { ["seen." + uid]: { t: serverTimestamp(), m: me ? me.id : null } }).catch(function () {});
}
function unbeat(id) {
  const uid = myUid(); if (!uid || !id) return;
  updateDoc(doc(db, "rooms", id), { ["seen." + uid]: deleteField() }).catch(function () {});
}
document.addEventListener("visibilitychange", function () {
  if (!S.roomId) return;
  /* switching to KakaoTalk for a moment must not drop you from the next game: only beat again when back */
  if (document.visibilityState === "visible") beat(S.roomId);
});
window.addEventListener("pagehide", function () { if (S.roomId) unbeat(S.roomId); });
/* lists drop rooms that went quiet even when nothing else changes */
setInterval(function () { const r = currentRoute(); if (r === "hq" || r === "games" || r.indexOf("game-") === 0 || r.indexOf("cat-") === 0) render(); }, 5000);

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
    S.roomPending = snap.metadata.hasPendingWrites;
    if (!S.roomPending) clockSample(S.room);
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


/* ---------- 조직 사건일지 · 오늘의 소집 · 익명 제보함 ---------- */
function pad2(n) { return String(n).padStart(2, "0"); }
function todayStr() { const d = new Date(); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
function fmtDate(ds) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ds || "");
  if (!m) return ds || "";
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return (+m[1] !== new Date().getFullYear() ? m[1] + "년 " : "") + (+m[2]) + "월 " + (+m[3]) + "일 (" + WEEK[d.getDay()] + ")";
}
function fmtTime(t) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t || "");
  if (!m) return t || "";
  const hh = +m[1], ap = hh < 12 ? "오전" : "오후", h12 = hh % 12 === 0 ? 12 : hh % 12;
  return ap + " " + h12 + ":" + m[2];
}
function byCaseDate(a, b) { return (b.date || "").localeCompare(a.date || "") || tsMs(b.createdAt) - tsMs(a.createdAt); }
function chargeKey(mid, text) { return mid + "|" + text; }
function casesForCharge(mid, text) { const k = chargeKey(mid, text); return S.incidents.filter(function (x) { return (x.charges || []).indexOf(k) >= 0; }); }
function firstLine(t) { const l = String(t || "").split("\n")[0]; return l.length > 60 ? l.slice(0, 60) + "…" : l; }
function loadShot(id) {
  if (S.shots[id] !== undefined) return;
  S.shots[id] = null;
  getDoc(doc(db, "incidentShots", id)).then(function (snap) {
    S.shots[id] = snap.exists() ? snap.data().data || "" : ""; render();
  }, function () { S.shots[id] = ""; render(); });
}

/* full screen image viewer: double tap to zoom, tap outside or ✕ to close */
function openLightbox(src) {
  if (!safePhoto(src)) return;
  const img = h("img", { src: src, alt: "스크린샷 크게 보기" });
  const scroller = h("div", { class: "lb-scroll" }, img);
  const wrap = h("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "스크린샷 크게 보기" },
    scroller,
    h("button", { type: "button", class: "lb-x", "aria-label": "닫기", text: "✕", onclick: close }),
    h("p", { class: "lb-hint", text: "두 번 탭하면 확대 · 바깥을 누르면 닫혀요" }));
  function close() { wrap.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); }
  function onKey(e) { if (e.key === "Escape") close(); }
  let lastTap = 0;
  img.addEventListener("click", function (e) {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTap < 320) { img.classList.toggle("zoom"); lastTap = 0; } else lastTap = now;
  });
  img.addEventListener("dblclick", function (e) { e.preventDefault(); });
  scroller.addEventListener("click", function (e) { if (e.target === scroller) close(); });
  wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(wrap);
  document.body.style.overflow = "hidden";
}

/* screenshots are stored as compressed images in Firestore, one document each */
function resizeShot(file) {
  return new Promise(function (resolve, reject) {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = function () {
      let max = 1280, q = 0.72, out = "";
      for (let tries = 0; tries < 6; tries++) {
        const sc = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement("canvas");
        c.width = Math.round(img.naturalWidth * sc); c.height = Math.round(img.naturalHeight * sc);
        const x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
        out = c.toDataURL("image/jpeg", q);
        if (out.length < 900000) break;
        max = Math.round(max * 0.8); q = Math.max(0.5, q - 0.06);
      }
      URL.revokeObjectURL(url); resolve(out);
    };
    img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}

/* tips: everyone sees published ones, the boss sees all */
let tipsUnsub = null, tipsMode = null;
function ensureTipsSub() {
  const mode = isBoss() ? "all" : "public";
  if (mode === tipsMode) return;
  if (tipsUnsub) tipsUnsub();
  tipsMode = mode; S.tipsReady = false;
  const q = mode === "all" ? collection(db, "tips") : query(collection(db, "tips"), where("public", "==", true));
  tipsUnsub = onSnapshot(q, function (snap) {
    S.tips = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); })
      .sort(function (a, b) { return tsMs(b.createdAt) - tsMs(a.createdAt); });
    S.tipsReady = true; render();
  }, function () {
    /* refused (e.g. boss status not saved on the server yet): try again shortly */
    S.tipsReady = true; render();
    setTimeout(function () { if (tipsMode === mode) { tipsMode = null; render(); } }, 2000);
  });
}

/* HQ briefing: today's gathering, latest public tip, latest case */
function briefing() {
  const today = todayStr();
  const tg = S.gatherings.filter(function (g) { return g.date === today; }).sort(function (a, b) { return (a.time || "").localeCompare(b.time || ""); })[0];
  const tip = S.tips.filter(function (t) { return t.public; })[0];
  const inc = S.incidents[0];
  function card(label, main, sub, onclick, muted) {
    return h("button", { type: "button", class: "brief-card" + (muted ? " muted" : ""), onclick: onclick },
      h("span", { class: "brief-label", text: label }),
      h("b", { class: "brief-main", text: main }),
      sub ? h("span", { class: "brief-sub", text: sub }) : null,
      h("span", { class: "brief-arr", "aria-hidden": "true", text: "→" }));
  }
  return h("div", { class: "brief" },
    card("오늘의 소집", tg ? tg.title : "오늘은 소집 없음", tg ? fmtTime(tg.time) + " 시작" : "소집 일정 보기", function () { go(tg ? "gather-" + tg.id : "gather"); }, !tg),
    card("최신 익명 제보", tip ? firstLine(tip.text) : "아직 공개된 제보가 없어요", tip ? timeAgo(tip.createdAt) : "제보하러 가기", function () { go("tips"); }, !tip),
    h("div", { class: "brief-row" },
      card("최근 사건", inc ? inc.title : "아직 기록된 사건이 없어요", inc ? fmtDate(inc.date) : "", function () { go(inc ? "case-" + inc.id : "cases"); }, !inc),
      h("button", { type: "button", class: "brief-all", onclick: function () { go("cases"); } }, "사건일지", h("br"), "전체 보기")));
}

/* ----- case list / detail ----- */
function canEditCase(x) { return isBoss() || !!(x && S.user && x.authorUid && x.authorUid === S.user.uid); }
function canWriteCase() { return isBoss() || !!(meMember() && S.user); }
function caseItem(x) {
  return h("li", null, h("button", { type: "button", class: "case-item", onclick: function () { go("case-" + x.id); } },
    h("span", { class: "ci-date", text: fmtDate(x.date) }),
    h("b", { class: "ci-title", text: x.title }),
    x.desc ? h("span", { class: "ci-desc", text: x.desc }) : null,
    h("span", { class: "ci-meta", text: ((x.members || []).map(nickOf).join(", ") || "관련 조직원 없음") + (x.hasShot ? " · 📷 스크린샷" : "") + (x.authorId ? " · ✍️ " + nickOf(x.authorId) : "") })));
}
function screenCases(mid, idx) {
  let list = S.incidents, sub = "발생일 최신순이에요. 사건을 누르면 자세히 볼 수 있어요.", eyebrow = "조직 사건일지", title = "사건 " + S.incidents.length + "건";
  let back = h("button", { class: "back", type: "button", onclick: function () { go("hq"); }, text: "본부로" });
  if (mid) {
    const m = findMember(mid), text = m && (m.charges || [])[idx];
    list = text ? casesForCharge(mid, text) : [];
    eyebrow = (m ? m.nick : "조직원") + " 수배서 · 혐의 관련 사건";
    title = "관련 사건 " + list.length + "건"; sub = text ? "‘" + text + "’" : "혐의를 찾을 수 없어요.";
    back = h("button", { class: "back", type: "button", onclick: function () { go("m-" + mid); }, text: "수배서로" });
  }
  return h("section", { class: "screen" }, back,
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: eyebrow }), h("h2", { text: title }), h("p", { text: sub })),
      !mid && canWriteCase() ? h("button", { class: "add-btn", type: "button", onclick: function () { openCaseEditor(null); }, text: "사건 등록" }) : null),
    list.length ? h("ul", { class: "case-list" }, list.map(caseItem))
      : h("div", { class: "empty", text: S.incidentsReady ? (canWriteCase() ? "아직 기록된 사건이 없어요. ‘사건 등록’으로 첫 사건을 남겨 보세요." : "아직 기록된 사건이 없어요. 본부에서 신원을 고르면 사건을 등록할 수 있어요.") : "사건일지를 불러오는 중…" }),
    mid ? h("button", { type: "button", class: "ghost wide", onclick: function () { go("cases"); }, text: "사건일지 전체 보기" }) : null);
}
/* comments (사건일지, 익명 제보): written under each member's own name. One live list per post on screen. */
const CMTS = {};            /* path -> { unsub, list, ready, denied, confirm } */
let CMT_WANT = {};
function cmtStore(path) {
  CMT_WANT[path] = 1;
  let c = CMTS[path];
  if (c) return c;
  c = CMTS[path] = { unsub: null, list: [], ready: false, denied: false, confirm: null };
  const parts = path.split("/");
  c.unsub = onSnapshot(query(collection(db, parts[0], parts[1], "comments"), orderBy("createdAt"), limitToLast(300)), function (snap) {
    c.list = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); });
    c.ready = true; c.denied = false; render();
  }, function () { c.ready = true; c.denied = true; render(); });
  return c;
}
/* after each screen is drawn: stop listening to posts that are no longer on screen */
function cmtSweep() {
  Object.keys(CMTS).forEach(function (k) { if (!CMT_WANT[k]) { try { CMTS[k].unsub(); } catch (e) {} delete CMTS[k]; } });
  CMT_WANT = {};
}
/* anonymous comments keep no name or account; this phone only remembers which ones it wrote */
function myAnon() { try { return JSON.parse(localStorage.getItem("bf-myanon") || "[]"); } catch (e) { return []; } }
function addMyAnon(id) { try { const a = myAnon(); a.push(id); localStorage.setItem("bf-myanon", JSON.stringify(a.slice(-300))); } catch (e) {} }
function commentsBox(path, opts) {
  opts = opts || {};
  const c = cmtStore(path), me = meMember(), key = "cmt-" + path.replace("/", "-"), anon = !!opts.anon, mineAnon = anon ? myAnon() : [];
  const list = c.list.length
    ? h("ul", { class: "gb-list cmt-list" }, c.list.map(function (x, i) {
        if (anon) {
          return h("li", { class: "gb-item anon" },
            h("div", { class: "gb-photo anon-face", text: "🕵️" }),
            h("div", { class: "gb-body" },
              h("div", { class: "gb-meta" }, h("b", { text: "익명 " + (i + 1) }), mineAnon.indexOf(x.id) >= 0 ? h("span", { class: "gb-rank", text: "내 댓글" }) : null,
                h("span", { class: "gb-time", text: timeAgo(x.createdAt) })),
              h("p", { class: "gb-text", text: x.text }),
              isBoss() ? (c.confirm === x.id
                ? h("div", { class: "gb-del" }, h("span", { text: "지울까요?" }),
                    h("button", { type: "button", class: "link-btn", onclick: function () { c.confirm = null; render(); }, text: "취소" }),
                    h("button", { type: "button", class: "link-btn danger", onclick: async function () {
                      const parts = path.split("/");
                      try { await deleteDoc(doc(db, parts[0], parts[1], "comments", x.id)); c.confirm = null; } catch (e) { toast(errText(e)); }
                    }, text: "지우기" }))
                : h("button", { type: "button", class: "link-btn quiet", onclick: function () { c.confirm = x.id; render(); }, text: "지우기" })) : null));
        }
        const m = findMember(x.memberId);
        const mine = S.user && x.uid === S.user.uid;
        return h("li", { class: "gb-item" },
          h("div", { class: "gb-photo" }, photoBox(m || { nick: x.nick })),
          h("div", { class: "gb-body" },
            h("div", { class: "gb-meta" }, h("b", { text: m ? m.nick : (x.nick || "손님") }), m && m.rank ? h("span", { class: "gb-rank", text: m.rank }) : null,
              h("span", { class: "gb-time", text: timeAgo(x.createdAt) })),
            h("p", { class: "gb-text", text: x.text }),
            mine || isBoss() ? (c.confirm === x.id
              ? h("div", { class: "gb-del" }, h("span", { text: "지울까요?" }),
                  h("button", { type: "button", class: "link-btn", onclick: function () { c.confirm = null; render(); }, text: "취소" }),
                  h("button", { type: "button", class: "link-btn danger", onclick: async function () {
                    const parts = path.split("/");
                    try { await deleteDoc(doc(db, parts[0], parts[1], "comments", x.id)); c.confirm = null; } catch (e) { toast(errText(e)); }
                  }, text: "지우기" }))
              : h("button", { type: "button", class: "link-btn quiet", onclick: function () { c.confirm = x.id; render(); }, text: "지우기" })) : null));
      }))
    : h("p", { class: "note", text: !c.ready ? "댓글을 불러오는 중…" : c.denied ? "댓글 기능을 준비 중이에요. 두목이 보안 규칙을 업데이트하면 열려요." : (opts.empty || "아직 댓글이 없어요.") });
  let form = null;
  if (!c.denied && anon) {
    const ta = draft("textarea", key, { class: "gb-in cmt-in", maxlength: "300", placeholder: opts.placeholder || "익명으로 댓글 달기" });
    form = h("form", { class: "cmt-form", novalidate: true },
      h("div", { class: "field-label", text: "🕵️ 익명으로 댓글 달기" }), ta,
      h("p", { class: "hint", text: "이름도 계정도 저장되지 않아요. 그래서 한 번 단 익명 댓글은 두목만 지울 수 있어요." }),
      h("button", { type: "submit", class: "save", disabled: !S.user, text: "익명 댓글 달기" }));
    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const t = (S.drafts[key] || ta.value || "").trim();
      if (!t || !S.user) return;
      const btn = form.querySelector("button[type=submit]"); btn.disabled = true;
      const parts = path.split("/");
      try {
        const ref = await addDoc(collection(db, parts[0], parts[1], "comments"), { text: t.slice(0, 300), createdAt: serverTimestamp() });
        addMyAnon(ref.id); S.drafts[key] = ""; sfx("pop"); render();
      } catch (e) { btn.disabled = false; toast(errText(e)); }
    });
  } else if (!c.denied) {
    if (!me) form = h("p", { class: "note", text: "댓글은 신원을 고른 조직원만 달 수 있어요. 본부에서 ‘신원 변경’으로 나를 골라 주세요." });
    else {
      const ta = draft("textarea", key, { class: "gb-in cmt-in", maxlength: "300", placeholder: opts.placeholder || "댓글 달기" });
      form = h("form", { class: "cmt-form", novalidate: true },
        h("div", { class: "field-label", text: me.nick + "(으)로 댓글 달기" }), ta,
        h("button", { type: "submit", class: "save", disabled: !S.user, text: "댓글 달기" }));
      form.addEventListener("submit", async function (ev) {
        ev.preventDefault();
        const t = (S.drafts[key] || ta.value || "").trim();
        if (!t || !S.user) return;
        const btn = form.querySelector("button[type=submit]"); btn.disabled = true;
        const parts = path.split("/");
        try {
          await addDoc(collection(db, parts[0], parts[1], "comments"), { uid: S.user.uid, memberId: me.id, nick: me.nick, text: t.slice(0, 300), createdAt: serverTimestamp() });
          S.drafts[key] = ""; sfx("pop"); render();
        } catch (e) { btn.disabled = false; toast(errText(e)); }
      });
    }
  }
  return h("div", { class: "field cmt" + (opts.compact ? " compact" : "") }, opts.compact ? null : h("div", { class: "field-label", text: "댓글 " + c.list.length }), list, form);
}
function cmtCount(path) { return cmtStore(path).list.length; }
function screenCase(id) {
  const back = h("button", { class: "back", type: "button", onclick: function () { history.length > 1 ? history.back() : go("cases"); }, text: "뒤로" });
  const x = S.incidents.find(function (i) { return i.id === id; });
  if (!x) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: S.incidentsReady ? "이 사건은 삭제됐거나 없어요." : "사건을 불러오는 중…" }));
  if (x.hasShot) loadShot(id);
  const shot = S.shots[id];
  const shotEl = !x.hasShot ? null
    : shot ? h("button", { type: "button", class: "case-shot", onclick: function () { openLightbox(shot); }, "aria-label": "스크린샷 크게 보기" },
        h("img", { src: safePhoto(shot), alt: x.title + " 스크린샷" }), h("span", { class: "zoom-hint", text: "🔍 눌러서 크게 보기" }))
      : h("div", { class: "case-shot loading", text: shot === "" ? "스크린샷을 불러오지 못했어요." : "스크린샷 불러오는 중…" });
  const charges = (x.charges || []).map(function (k) {
    const i = k.indexOf("|"), mid = k.slice(0, i), text = k.slice(i + 1);
    return h("li", null, h("button", { type: "button", class: "case-charge", onclick: function () { go("m-" + mid); } },
      h("span", { class: "cc-who", text: nickOf(mid) }), h("span", { class: "cc-text", text: text })));
  });
  const ops = canEditCase(x) ? (S.caseConfirm === id
    ? h("div", { class: "confirm" }, h("p", { text: "‘" + x.title + "’ 사건을 삭제할까요? 스크린샷도 같이 지워져요." }),
        h("div", { class: "op-row" },
          h("button", { type: "button", onclick: function () { S.caseConfirm = null; render(); }, text: "취소" }),
          h("button", { type: "button", class: "danger", onclick: async function () {
            try { const bt = writeBatch(db); bt.delete(doc(db, "incidents", id)); bt.delete(doc(db, "incidentShots", id)); await bt.commit(); S.caseConfirm = null; go("cases"); toast("사건을 삭제했어요."); }
            catch (e) { toast(errText(e)); }
          }, text: "삭제하기" })))
    : h("div", { class: "op-row" },
        h("button", { type: "button", onclick: function () { openCaseEditor(x); }, text: "사건 수정" }),
        h("button", { type: "button", class: "danger", onclick: function () { S.caseConfirm = id; render(); }, text: "삭제" }))) : null;
  return h("section", { class: "screen" }, back,
    h("article", { class: "case-file" },
      h("div", { class: "case" }, h("span", null, "사건번호 ", h("b", { text: "CASE-" + (x.date || "").replace(/-/g, "") })), h("span", { text: fmtDate(x.date) })),
      h("h2", { class: "case-title", text: x.title }),
      x.authorId ? h("p", { class: "case-author", text: "✍️ 기록: " + nickOf(x.authorId) }) : null,
      x.desc ? h("p", { class: "statement", text: x.desc }) : null,
      shotEl,
      h("div", { class: "field" }, h("div", { class: "field-label", text: "관련 조직원" }),
        (x.members || []).length
          ? h("div", { class: "case-members" }, x.members.map(function (mid) {
              const m = findMember(mid) || { nick: nickOf(mid) };
              return h("button", { type: "button", class: "case-member", onclick: function () { go("m-" + mid); } },
                h("div", { class: "cm-photo" }, photoBox(m)), h("span", { text: m.nick }), h("small", { text: "수배서 →" }));
            }))
          : h("p", { class: "note", text: "연결된 조직원이 없어요." })),
      charges.length ? h("div", { class: "field" }, h("div", { class: "field-label", text: "관련 혐의" }), h("ul", { class: "case-charges" }, charges)) : null,
      h("div", { class: "stamp", "aria-hidden": "true", text: "기록" })),
    ops,
    commentsBox("incidents/" + id, { placeholder: "이 사건에 대한 증언 · 변명 · 제보", empty: "아직 댓글이 없어요. 첫 증언을 남겨 주세요." }),
    h("button", { type: "button", class: "ghost wide", onclick: function () { go("cases"); }, text: "사건일지 전체 보기" }));
}
function openCaseEditor(x) {
  const isNew = !x;
  const dr = { shot: null, members: (x && x.members || []).slice(), charges: (x && x.charges || []).slice() };
  const title = h("input", { type: "text", id: "c-title", maxlength: "40", value: x ? x.title : "", autocomplete: "off", placeholder: "예: 쏘기 레이더 발동" });
  const date = h("input", { type: "date", id: "c-date", value: x ? x.date : todayStr() });
  const desc = h("input", { type: "text", id: "c-desc", maxlength: "100", value: x ? (x.desc || "") : "", autocomplete: "off", placeholder: "한 줄 설명" });
  const msg = h("p", { class: "msg", role: "status" });
  const shotBox = h("div", { class: "shot-edit" });
  function drawShot() {
    const cur = dr.shot !== null ? dr.shot : (x && x.hasShot ? S.shots[x.id] : "");
    shotBox.replaceChildren(
      cur ? h("img", { src: safePhoto(cur), alt: "스크린샷 미리보기" }) : h("div", { class: "shot-empty", text: x && x.hasShot && cur == null ? "불러오는 중…" : "스크린샷 없음 (선택)" }),
      h("div", { class: "photo-btns" }, h("label", { class: "file-btn" }, cur ? "스크린샷 바꾸기" : "스크린샷 고르기", fileIn),
        cur ? h("button", { type: "button", class: "ghost", onclick: function () { dr.shot = ""; drawShot(); }, text: "스크린샷 빼기" }) : null));
  }
  const fileIn = h("input", { type: "file", id: "c-shot", accept: "image/*" });
  fileIn.addEventListener("change", function () {
    const f = fileIn.files && fileIn.files[0]; if (!f) return;
    msg.className = "msg"; msg.textContent = "스크린샷 정리 중…";
    resizeShot(f).then(function (d) { dr.shot = d; drawShot(); msg.textContent = "스크린샷을 붙였어요."; },
      function () { msg.className = "msg err"; msg.textContent = "이 사진은 열 수 없어요. JPG나 PNG로 골라 주세요."; });
    fileIn.value = "";
  });
  if (x && x.hasShot && S.shots[x.id] === undefined) { loadShot(x.id); const t = setInterval(function () { if (S.shots[x.id] !== null) { clearInterval(t); if (sheetEl) drawShot(); } }, 200); }
  const pick = h("div", { class: "case-pick" });
  function drawPick() {
    pick.replaceChildren();
    append(pick,
      h("p", { class: "sub-label", text: "관련 조직원 (여러 명 고를 수 있어요)" }),
      h("div", { class: "chips" }, S.members.map(function (m) {
        const on = dr.members.indexOf(m.id) >= 0;
        return h("button", { type: "button", class: "chip", "aria-pressed": on ? "true" : "false", onclick: function () {
          if (on) { dr.members = dr.members.filter(function (v) { return v !== m.id; }); dr.charges = dr.charges.filter(function (k) { return k.indexOf(m.id + "|") !== 0; }); }
          else dr.members.push(m.id);
          drawPick();
        }, text: m.nick });
      })),
      dr.members.length ? h("p", { class: "sub-label", text: "관련 혐의 (선택)" }) : null,
      dr.members.map(function (mid) {
        const m = findMember(mid); if (!m) return null;
        const ch = (m.charges || []).filter(function (c) { return c && String(c).trim(); });
        return h("div", { class: "pick-charges" }, h("b", { text: m.nick }),
          ch.length ? ch.map(function (c) {
            const k = chargeKey(mid, c), on = dr.charges.indexOf(k) >= 0;
            return h("button", { type: "button", class: "chip charge", "aria-pressed": on ? "true" : "false", onclick: function () {
              if (on) dr.charges = dr.charges.filter(function (v) { return v !== k; }); else dr.charges.push(k);
              drawPick();
            }, text: c });
          }) : h("span", { class: "note", text: "등록된 혐의 없음" }));
      }));
  }
  const saveBtn = h("button", { type: "submit", class: "save", text: isNew ? "사건 등록" : "수정 내용 저장" });
  const form = h("form", { class: "form", novalidate: true },
    h("label", null, h("b", { text: "사건 제목 (필수)" }), title),
    h("label", null, h("b", { text: "발생일 (필수)" }), date),
    h("label", null, h("b", { text: "한 줄 설명" }), desc),
    h("div", { class: "field" }, h("b", { class: "sub-label", text: "게임 스크린샷" }), shotBox),
    pick, msg, saveBtn);
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = title.value.trim(), d = date.value;
    if (!t) { msg.className = "msg err"; msg.textContent = "사건 제목을 적어주세요."; title.focus(); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { msg.className = "msg err"; msg.textContent = "발생일을 골라주세요."; return; }
    const id = x ? x.id : doc(collection(db, "incidents")).id;
    const hasShot = dr.shot === null ? !!(x && x.hasShot) : !!dr.shot;
    const rec = { title: t, date: d, desc: desc.value.trim(), members: dr.members.slice(),
      charges: dr.charges.filter(function (k) { return dr.members.indexOf(k.slice(0, k.indexOf("|"))) >= 0; }),
      hasShot: hasShot, updatedAt: serverTimestamp(), createdAt: x && x.createdAt ? x.createdAt : serverTimestamp() };
    /* remember who wrote it, so they (and the boss) can edit it later */
    if (x && x.authorUid) { rec.authorUid = x.authorUid; rec.authorId = x.authorId || null; rec.authorNick = x.authorNick || ""; }
    else if (!x && meMember()) { rec.authorUid = S.user.uid; rec.authorId = meMember().id; rec.authorNick = meMember().nick; }
    saveBtn.disabled = true; saveBtn.textContent = "저장 중…";
    try {
      const bt = writeBatch(db);
      bt.set(doc(db, "incidents", id), rec);
      if (dr.shot) bt.set(doc(db, "incidentShots", id), { data: dr.shot });
      else if (dr.shot === "") bt.delete(doc(db, "incidentShots", id));
      await bt.commit();
      if (dr.shot !== null) S.shots[id] = dr.shot;
      closeEditor(); go("case-" + id); toast(isNew ? "사건을 등록했어요." : "사건을 저장했어요.");
    } catch (e) { saveBtn.disabled = false; saveBtn.textContent = isNew ? "사건 등록" : "수정 내용 저장"; msg.className = "msg err"; msg.textContent = errText(e); }
  });
  openSheet(isNew ? "조직 사건일지 · 새 사건" : "CASE-" + (x.date || "").replace(/-/g, ""), isNew ? "사건 등록" : "사건 수정", form);
  drawShot(); drawPick();
}

/* ----- gatherings ----- */
function gatherItem(g, today) {
  return h("li", null, h("button", { type: "button", class: "case-item" + (g.date === today ? " today" : ""), onclick: function () { go("gather-" + g.id); } },
    h("span", { class: "ci-date", text: (g.date === today ? "오늘 · " : "") + fmtDate(g.date) + " · " + fmtTime(g.time) }),
    h("b", { class: "ci-title", text: g.title }),
    g.memo ? h("span", { class: "ci-desc", text: g.memo }) : null));
}
function screenGathers() {
  const today = todayStr();
  const up = S.gatherings.filter(function (g) { return (g.date || "") >= today; }).sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
  const past = S.gatherings.filter(function (g) { return (g.date || "") < today; }).sort(function (a, b) { return (b.date + b.time).localeCompare(a.date + a.time); }).slice(0, 10);
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("hq"); }, text: "본부로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "조직 소집령" }), h("h2", { text: "소집 일정" }), h("p", { text: "두목이 정한 모임 일정이에요." })),
      isBoss() ? h("button", { class: "add-btn", type: "button", onclick: function () { openGatherEditor(null); }, text: "소집 등록" }) : null),
    up.length ? h("ul", { class: "case-list" }, up.map(function (g) { return gatherItem(g, today); })) : h("div", { class: "empty", text: "예정된 소집이 없어요." }),
    past.length ? h("details", { class: "guide" }, h("summary", { text: "지난 소집" }), h("div", { class: "guide-body" }, h("ul", { class: "case-list" }, past.map(function (g) { return gatherItem(g, today); })))) : null);
}
function screenGather(id) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("gather"); }, text: "소집 일정" });
  const g = S.gatherings.find(function (x) { return x.id === id; });
  if (!g) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "이 소집은 취소됐거나 없어요." }));
  const today = g.date === todayStr();
  const ops = isBoss() ? (S.gatherConfirm === id
    ? h("div", { class: "confirm" }, h("p", { text: "‘" + g.title + "’ 소집을 취소할까요?" }),
        h("div", { class: "op-row" },
          h("button", { type: "button", onclick: function () { S.gatherConfirm = null; render(); }, text: "아니요" }),
          h("button", { type: "button", class: "danger", onclick: async function () {
            try { await deleteDoc(doc(db, "gatherings", id)); S.gatherConfirm = null; go("gather"); toast("소집을 취소했어요."); } catch (e) { toast(errText(e)); }
          }, text: "소집 취소" })))
    : h("div", { class: "op-row" },
        h("button", { type: "button", onclick: function () { openGatherEditor(g); }, text: "소집 수정" }),
        h("button", { type: "button", class: "danger", onclick: function () { S.gatherConfirm = id; render(); }, text: "취소" }))) : null;
  return h("section", { class: "screen" }, back,
    h("article", { class: "case-file" },
      h("div", { class: "case" }, h("span", null, "소집령 ", h("b", { text: today ? "오늘" : fmtDate(g.date) })), h("span", { text: fmtTime(g.time) + " 시작" })),
      h("h2", { class: "case-title", text: g.title }),
      h("p", { class: "gather-when" }, h("b", { text: fmtDate(g.date) }), " " + fmtTime(g.time) + " 시작"),
      g.memo ? h("p", { class: "statement", text: g.memo }) : null,
      h("div", { class: "stamp", "aria-hidden": "true", text: "소집" })),
    ops);
}
function openGatherEditor(g) {
  const isNew = !g;
  const title = h("input", { type: "text", id: "g-title", maxlength: "40", value: g ? g.title : "", autocomplete: "off", placeholder: "예: 불주먹 정기 라이어 대회" });
  const date = h("input", { type: "date", id: "g-date", value: g ? g.date : todayStr() });
  const time = h("input", { type: "time", id: "g-time", value: g ? g.time : "21:00" });
  const memo = h("input", { type: "text", id: "g-memo", maxlength: "100", value: g ? (g.memo || "") : "", autocomplete: "off", placeholder: "메모 (선택) 예: 디스코드 2번 방" });
  const msg = h("p", { class: "msg", role: "status" });
  const saveBtn = h("button", { type: "submit", class: "save", text: isNew ? "소집 등록" : "수정 내용 저장" });
  const form = h("form", { class: "form", novalidate: true },
    h("label", null, h("b", { text: "제목 (필수)" }), title),
    h("label", null, h("b", { text: "날짜" }), date),
    h("label", null, h("b", { text: "시작 시간" }), time),
    h("label", null, h("b", { text: "메모" }), memo), msg, saveBtn);
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = title.value.trim();
    if (!t) { msg.className = "msg err"; msg.textContent = "제목을 적어주세요."; return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.value) || !/^\d{2}:\d{2}$/.test(time.value)) { msg.className = "msg err"; msg.textContent = "날짜와 시작 시간을 골라주세요."; return; }
    const id = g ? g.id : doc(collection(db, "gatherings")).id;
    saveBtn.disabled = true; saveBtn.textContent = "저장 중…";
    try {
      await setDoc(doc(db, "gatherings", id), { title: t, date: date.value, time: time.value, memo: memo.value.trim(), updatedAt: serverTimestamp() });
      closeEditor(); go("gather-" + id); toast(isNew ? "소집을 등록했어요." : "소집을 저장했어요.");
    } catch (e) { saveBtn.disabled = false; saveBtn.textContent = isNew ? "소집 등록" : "수정 내용 저장"; msg.className = "msg err"; msg.textContent = errText(e); }
  });
  openSheet("조직 소집령", isNew ? "소집 등록" : "소집 수정", form);
}

/* ----- anonymous tips ----- */
function screenTips() {
  const ta = draft("textarea", "tip-text", { class: "gb-in", maxlength: "300", placeholder: "본부에 알릴 소식이나 고발할 혐의를 이름 없이 적어주세요" });
  const f = h("form", { class: "panel", novalidate: true },
    h("div", { class: "field-label", text: "익명으로 제보하기" }), ta,
    h("p", { class: "hint", text: "보낸 사람 이름이나 계정은 저장되지 않아요. 두목이 확인하고 공개한 제보만 모두에게 보여요." }),
    h("button", { type: "submit", class: "save", disabled: !S.user, text: "제보 보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = ta.value.trim();
    if (!t) { toast("제보 내용을 적어주세요."); return; }
    try { await addDoc(collection(db, "tips"), { text: t, public: false, createdAt: serverTimestamp() }); S.drafts["tip-text"] = ""; render(); toast("제보를 보냈어요. 두목이 확인하면 공개돼요."); }
    catch (e) { toast(errText(e)); }
  });
  const boss = isBoss();
  const list = S.tips.filter(function (t) { return boss || t.public; });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("hq"); }, text: "본부로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "익명 제보함" }), h("h2", { text: "제보함" }),
        h("p", { text: boss ? "두목 화면이에요. 비공개 제보도 보여요." : "공개된 제보 " + list.length + "건" }))),
    f,
    list.length ? h("ul", { class: "gb-list" }, list.map(function (t) {
      return h("li", { class: "tip-item" + (t.public ? "" : " hidden-tip") },
        h("div", { class: "gb-meta" }, h("b", { text: "익명 제보" }), boss ? h("span", { class: "gb-rank", text: t.public ? "공개" : "비공개" }) : null,
          h("span", { class: "gb-time", text: timeAgo(t.createdAt) })),
        h("p", { class: "gb-text", text: t.text }),
        t.public ? h("button", { type: "button", class: "link-btn cmt-toggle", "aria-expanded": S.tipOpen && S.tipOpen[t.id] ? "true" : "false",
          onclick: function () { S.tipOpen = S.tipOpen || {}; S.tipOpen[t.id] = !S.tipOpen[t.id]; render(); },
          text: "💬 댓글 " + cmtCount("tips/" + t.id) + (S.tipOpen && S.tipOpen[t.id] ? " 접기" : "") }) : null,
        t.public && S.tipOpen && S.tipOpen[t.id] ? commentsBox("tips/" + t.id, { compact: true, anon: true, placeholder: "이 제보에 익명으로 한마디 (목격담, 해명, 반박…)", empty: "아직 댓글이 없어요." }) : null,
        boss ? h("div", { class: "gb-del" },
          h("button", { type: "button", class: "link-btn", onclick: async function () { try { await updateDoc(doc(db, "tips", t.id), { public: !t.public }); } catch (e) { toast(errText(e)); } }, text: t.public ? "숨기기" : "공개하기" }),
          h("button", { type: "button", class: "link-btn danger", onclick: async function () { try { await deleteDoc(doc(db, "tips", t.id)); } catch (e) { toast(errText(e)); } }, text: "삭제" })) : null);
    })) : h("div", { class: "empty", text: S.tipsReady ? (boss ? "아직 들어온 제보가 없어요." : "아직 공개된 제보가 없어요.") : "제보함을 여는 중…" }));
}


/* ---------- 크리스마스 마니또 + 몰래 칭찬 일지 ----------
   Identity: each participant links a hidden email account (made from their member id) with a 4-digit PIN,
   so the same Firebase uid follows them to any phone. Security rules key every secret on that uid:
   - manitoSecret/{member}: who I drew. Only I can read it until the reveal.
   - manitoPraise/{id}: my praise log. Only I can read, edit or delete it before the reveal;
     after the reveal only I and the person I praised can read it. Nobody else, the boss included.
   - manitoGuess/{member}: my guess. Mine until the reveal. */
const PRAISE_EXAMPLE = "오늘 마피아에서 추리 진짜 잘하더라!";
/* what you can log: a compliment, or something you did just for that person. No limit — the more the better. */
const PR_KIND = {
  praise: { icon: "💬", label: "칭찬", q: "어떤 말을 했나요?", ex: PRAISE_EXAMPLE },
  deed: { icon: "🎁", label: "챙겨주기", q: "그 사람만을 위해 무엇을 했나요?", ex: "드로잉퀴즈에서 일부러 쉬운 힌트 그려줌 / 좋아하는 간식 몰래 보내줌" }
};
function prKind(x) { return PR_KIND[x && x.kind] ? x.kind : "praise"; }
function prLine(x) { const k = PR_KIND[prKind(x)]; return k.icon + " " + (prKind(x) === "praise" ? "“" + x.text + "”" : x.text); }
const MT = { state: null, stateKnown: false, players: {}, secret: null, praise: [], guess: null,
  secrets: [], received: [], guesses: [], subKey: "", unsubs: [], busy: false, confirm: null, pinMode: null };
const MT_ANY_DATE = EMU && new URLSearchParams(location.search).has("anydate");

onSnapshot(doc(db, "config", "manito"), function (snap) { MT.state = snap.exists() ? snap.data() : null; MT.stateKnown = true; render(); },
  function () { MT.stateKnown = true; render(); });
onSnapshot(collection(db, "manitoPlayers"), function (snap) {
  const p = {}; snap.docs.forEach(function (d) { p[d.id] = d.data(); }); MT.players = p; render();
});

function mtEmail(m) {
  const n = (MT.state && MT.state.resets && MT.state.resets[m]) || 0;
  return (m + "-" + n + "@manito.bulfist.app").toLowerCase();
}
function mtPw(pin) { return "bfm-" + pin + "-pin"; }
function mtPhase() { return MT.state ? MT.state.phase : null; }
function mtMe() { const me = meMember(); return me && MT.players[me.id] ? me : null; }
/* this phone is signed in as the participant it claims to be */
function mtAuthed() { const me = mtMe(); return !!(me && S.user && MT.players[me.id].uid === S.user.uid); }
function mtRevealDay() { const d = new Date(); return MT_ANY_DATE || (d.getMonth() === 11 && d.getDate() >= 25) || d.getMonth() === 0; }

function mtEnsureSubs() {
  const me = meMember(), uid = myUid(), ph = mtPhase();
  const drawn = !!(me && MT.state && (MT.state.drawn || []).indexOf(me.id) >= 0);
  const key = [uid, me ? me.id : "", ph, mtAuthed(), drawn].join(":");
  if (key === MT.subKey) return;
  MT.subKey = key;
  MT.unsubs.forEach(function (u) { u(); }); MT.unsubs = [];
  MT.secret = null; MT.praise = []; MT.guess = null; MT.secrets = []; MT.received = []; MT.guesses = [];
  if (!uid || !me || !ph) return;
  function sub(ref, fn) { MT.unsubs.push(onSnapshot(ref, fn, function () {})); }
  if (mtAuthed()) {
    sub(doc(db, "manitoSecret", me.id), function (d) { MT.secret = d.exists() ? d.data() : null; render(); });
    sub(query(collection(db, "manitoPraise"), where("uid", "==", uid)), function (q) {
      MT.praise = q.docs.map(function (d) { return Object.assign({ id: d.id }, d.data({ serverTimestamps: "estimate" })); })
        .sort(function (a, b) { return a.date.localeCompare(b.date) || tsMs(a.createdAt) - tsMs(b.createdAt); });
      render();
    });
    sub(doc(db, "manitoGuess", me.id), function (d) { MT.guess = d.exists() ? d.data().guess : null; render(); });
  }
  if (ph === "revealed") {
    sub(collection(db, "manitoSecret"), function (q) { MT.secrets = q.docs.map(function (d) { return { id: d.id, target: d.data().target }; }); render(); });
    sub(collection(db, "manitoGuess"), function (q) { MT.guesses = q.docs.map(function (d) { return { id: d.id, guess: d.data().guess }; }); render(); });
    if (mtAuthed()) sub(query(collection(db, "manitoPraise"), where("toUid", "==", uid)), function (q) {
      MT.received = q.docs.map(function (d) { return d.data({ serverTimestamps: "estimate" }); })
        .sort(function (a, b) { return a.date.localeCompare(b.date) || tsMs(a.createdAt) - tsMs(b.createdAt); });
      render();
    });
  }
}

/* ----- joining, signing in, drawing ----- */
async function mtJoin(pin) {
  const me = meMember(); if (!me) return;
  const cred = EmailAuthProvider.credential(mtEmail(me.id), mtPw(pin));
  try { await linkWithCredential(auth.currentUser, cred); }
  catch (e) {
    const c = (e && e.code) || "";
    if (/email-already-in-use|credential-already-in-use|provider-already-linked/.test(c)) await signInWithEmailAndPassword(auth, mtEmail(me.id), mtPw(pin));
    else throw e;
  }
  await auth.currentUser.getIdToken(true);
  await setDoc(doc(db, "manitoPlayers", me.id), { uid: auth.currentUser.uid, joinedAt: serverTimestamp() });
}
async function mtLogin(pin) {
  const me = meMember(); if (!me) return;
  await signInWithEmailAndPassword(auth, mtEmail(me.id), mtPw(pin));
}
function mtAuthError(e) {
  const c = (e && e.code) || "";
  if (/wrong-password|invalid-credential|invalid-login|user-not-found/.test(c)) return "비밀번호가 맞지 않아요.";
  if (/too-many-requests/.test(c)) return "비밀번호를 너무 많이 틀렸어요. 잠시 뒤 다시 해 주세요.";
  if (/operation-not-allowed/.test(c)) return "두목이 Firebase에서 ‘이메일/비밀번호’ 로그인을 켜야 해요.";
  if (/permission-denied/.test(c)) return "이미 다른 폰에서 이 이름으로 참가했어요. 비밀번호로 들어가기를 눌러 주세요.";
  return errText(e);
}
async function mtDraw() {
  const me = mtMe(); if (!me || MT.busy) return;
  MT.busy = true; render();
  try {
    await runTransaction(db, async function (tx) {
      const ref = doc(db, "config", "manito"), st = (await tx.get(ref)).data();
      if (!st || st.phase !== "draw") throw { code: "phase" };
      const drawn = st.drawn || [], left = st.left || [];
      if (drawn.indexOf(me.id) >= 0) throw { code: "done" };
      const undrawn = (st.players || []).filter(function (p) { return drawn.indexOf(p) < 0; });
      let options = left.filter(function (t) { return t !== me.id; });
      /* never leave the last person with only themselves */
      if (undrawn.length === 2) { const other = undrawn.find(function (p) { return p !== me.id; }); if (left.indexOf(other) >= 0) options = [other]; }
      if (!options.length) throw { code: "stuck" };
      const target = options[Math.floor(Math.random() * options.length)];
      tx.set(doc(db, "manitoSecret", me.id), { uid: myUid(), target: target, drawnAt: serverTimestamp() });
      tx.update(ref, { left: left.filter(function (t) { return t !== target; }), drawn: drawn.concat([me.id]) });
    });
    sfx("flip");
  } catch (e) { toast(e && e.code === "done" ? "이미 뽑았어요." : errText(e)); }
  MT.busy = false; render();
}

/* ----- boss controls ----- */
async function mtBoss(patch, msg) { try { await setDoc(doc(db, "config", "manito"), patch, { merge: true }); if (msg) toast(msg); } catch (e) { toast(errText(e)); } }
function mtOpen() { return mtBoss({ phase: "signup", season: String(new Date().getFullYear()), resets: (MT.state && MT.state.resets) || {}, players: [], drawn: [], left: [], openedAt: serverTimestamp() }, "마니또 참가 신청을 열었어요."); }
function mtCloseSignup() {
  const list = Object.keys(MT.players).filter(function (m) { return !!findMember(m); }).sort();
  if (list.length < 3) { toast("3명 이상 참가해야 뽑기를 시작할 수 있어요."); return; }
  return mtBoss({ phase: "draw", players: list, left: list.slice(), drawn: [] }, "참가 마감! 이제 각자 마니또를 뽑아요.");
}
function mtReveal() { return mtBoss({ phase: "revealed", revealedAt: serverTimestamp() }, "정체를 공개했어요! 🎄"); }
async function mtResetPlayer(m) {
  try {
    const resets = Object.assign({}, (MT.state && MT.state.resets) || {}); resets[m] = (resets[m] || 0) + 1;
    await deleteDoc(doc(db, "manitoPlayers", m));
    await setDoc(doc(db, "config", "manito"), { resets: resets }, { merge: true });
    toast(nickOf(m) + "님 참가를 취소했어요. 다시 참가 신청하면 새 비밀번호를 정할 수 있어요.");
  } catch (e) { toast(errText(e)); }
}

/* ----- praise log ----- */
function openPraiseEditor(pr) {
  const me = mtMe(), target = MT.secret && MT.secret.target;
  if (!me || !target) return;
  const date = h("input", { type: "date", id: "pr-date", value: pr ? pr.date : todayStr(), max: todayStr() });
  let kind = pr ? prKind(pr) : "praise";
  const text = h("textarea", { id: "pr-text", maxlength: "200", placeholder: "예: " + PR_KIND[kind].ex });
  text.value = pr ? pr.text : "";
  const qLabel = h("b", { text: PR_KIND[kind].q });
  const kindRow = pr
    ? h("p", { class: "mt-kind-fixed", text: PR_KIND[kind].icon + " " + PR_KIND[kind].label + " 기록" })
    : h("div", { class: "seg" }, Object.keys(PR_KIND).map(function (k) {
        const b = h("button", { type: "button", "aria-pressed": k === kind ? "true" : "false", text: PR_KIND[k].icon + " " + PR_KIND[k].label });
        b.addEventListener("click", function () {
          kind = k; qLabel.textContent = PR_KIND[k].q; text.placeholder = "예: " + PR_KIND[k].ex;
          Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        });
        return b;
      }));
  const msg = h("p", { class: "msg", role: "status" });
  const saveBtn = h("button", { type: "submit", class: "save", text: pr ? "수정 내용 저장" : "기록 저장" });
  const del = h("div");
  function drawDel(c) {
    if (!pr) return;
    del.replaceChildren(c
      ? h("div", { class: "confirm" }, h("p", { text: "이 기록을 지울까요?" }), h("div", { class: "op-row" },
          h("button", { type: "button", onclick: function () { drawDel(false); }, text: "취소" }),
          h("button", { type: "button", class: "danger", onclick: async function () {
            try { await deleteDoc(doc(db, "manitoPraise", pr.id)); closeEditor(); toast("기록을 지웠어요."); } catch (e) { msg.className = "msg err"; msg.textContent = errText(e); }
          }, text: "지우기" })))
      : h("button", { type: "button", class: "ghost", onclick: function () { drawDel(true); }, text: "이 기록 지우기" }));
  }
  const form = h("form", { class: "form", novalidate: true },
    h("p", { class: "note", text: "실제로 " + nickOf(target) + "님을 칭찬하거나 챙겨준 뒤에 기록하세요. 횟수 제한 없어요, 많을수록 좋아요! 이 기록은 크리스마스 정체 공개 전까지 나만 볼 수 있고, 상대에게 알림도 가지 않아요." }),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "무엇을 했나요?" }), kindRow),
    h("label", null, h("b", { text: "날짜" }), date),
    h("label", null, qLabel, text),
    msg, saveBtn, del);
  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = text.value.trim(), d = date.value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { msg.className = "msg err"; msg.textContent = "날짜를 골라주세요."; return; }
    if (d > todayStr()) { msg.className = "msg err"; msg.textContent = "아직 오지 않은 날짜예요."; return; }
    if (!t) { msg.className = "msg err"; msg.textContent = kind === "praise" ? "어떤 말을 했는지 적어주세요." : "무엇을 해줬는지 적어주세요."; return; }
    saveBtn.disabled = true; saveBtn.textContent = "저장 중…";
    try {
      if (pr) await updateDoc(doc(db, "manitoPraise", pr.id), { date: d, text: t, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, "manitoPraise"), { uid: myUid(), from: me.id, to: target, toUid: MT.players[target].uid, date: d, text: t, kind: kind, createdAt: serverTimestamp() });
      closeEditor();
      const days = {}; MT.praise.concat([{ date: d }]).forEach(function (x) { days[x.date] = 1; });
      toast(pr ? "기록을 고쳤어요." : PR_KIND[kind].icon + " 기록했어요! 지금까지 " + Object.keys(days).length + "일 동안 " + (MT.praise.length + 1) + "번 챙겼어요 🎄");
    } catch (e) { saveBtn.disabled = false; saveBtn.textContent = pr ? "수정 내용 저장" : "기록 저장"; msg.className = "msg err"; msg.textContent = errText(e); }
  });
  openSheet("몰래 챙김 일지 · 나만 보여요", pr ? "기록 수정" : "칭찬 · 챙겨주기 기록", form);
  drawDel(false);
}

/* ----- screens ----- */
function mtPinClear() { delete S.drafts["mt-pin"]; delete S.drafts["mt-pin2"]; MT.pinMsg = null; MT.pinBusy = false; }
function mtPinForm(mode) {
  // 화면이 새로 그려져도(다른 조직원 참가, 5초 갱신) 입력한 번호와 안내 문구가 지워지지 않게 저장해 둬요.
  const p1 = draft("input", "mt-pin", { type: "password", inputmode: "numeric", maxlength: "4", autocomplete: "off", placeholder: "숫자 4자리" });
  const p2 = mode === "join" ? draft("input", "mt-pin2", { type: "password", inputmode: "numeric", maxlength: "4", autocomplete: "off", placeholder: "한 번 더" }) : null;
  const pm = MT.pinMsg || { cls: "msg", text: "" };
  const msg = h("p", { class: pm.cls, role: "status", text: pm.text });
  const btn = h("button", { type: "submit", class: "save", disabled: !!MT.pinBusy, text: mode === "join" ? "비밀번호 정하고 참가하기" : "들어가기" });
  function say(cls, text) { MT.pinMsg = { cls: cls, text: text }; msg.className = cls; msg.textContent = text; }
  const f = h("form", { class: "panel", novalidate: true },
    h("div", { class: "field-label", text: mode === "join" ? "마니또 비밀번호 정하기" : "마니또 비밀번호" }),
    h("p", { class: "note", text: mode === "join" ? "내 마니또와 칭찬 일지를 지키는 번호예요. 다른 폰에서 들어올 때도 이 번호를 써요. 잊으면 두목에게 참가 취소를 부탁해야 해요." : "참가할 때 정한 숫자 4자리를 넣어 주세요." }),
    p1, p2, msg, btn,
    h("button", { type: "button", class: "link-btn", onclick: function () { mtPinClear(); MT.pinMode = null; render(); }, text: "취소" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    if (MT.pinBusy) return;
    const a = (S.drafts["mt-pin"] || p1.value || "").trim();
    const b = p2 ? (S.drafts["mt-pin2"] || p2.value || "").trim() : a;
    if (!/^\d{4}$/.test(a)) { say("msg err", "숫자 4자리로 넣어 주세요."); return; }
    if (b !== a) { say("msg err", "두 번 넣은 번호가 달라요."); return; }
    MT.pinBusy = true; btn.disabled = true; say("msg", "확인 중…");
    try {
      if (mode === "join") { await mtJoin(a); toast("마니또에 참가했어요! 🎄"); }
      else { await mtLogin(a); toast("들어왔어요."); }
      mtPinClear(); MT.pinMode = null; render();
    } catch (e) { MT.pinBusy = false; say("msg err", mtAuthError(e)); render(); }
  });
  return f;
}
function mtHeader(sub) {
  return h("div", { class: "sec-head" },
    h("div", null, h("span", { class: "eyebrow", text: "G-07 · 12월 25일 정체 공개" }), h("h2", { text: "🎄 크리스마스 마니또" }), h("p", { text: sub })));
}
function mtRules() {
  return h("details", { class: "guide" },
    h("summary", { text: "마니또 규칙" }),
    h("div", { class: "guide-body" },
      h("ol", null,
        h("li", { text: "참가 신청할 때 마니또 비밀번호(숫자 4자리)를 정해요." }),
        h("li", { text: "두목이 참가를 마감하면 각자 [마니또 뽑기]로 몰래 챙겨줄 사람을 뽑아요. 결과는 나만 봐요." }),
        h("li", { text: "몰래 챙기기 미션: 크리스마스 전까지 서로 다른 날에 내 마니또 상대를 칭찬하거나, 그 사람만을 위해 무언가를 해줘요. 횟수 제한 없어요, 많을수록 좋아요!" }),
        h("li", { text: "한 뒤에는 [칭찬 · 챙겨주기 기록하기]로 날짜와 내용을 적어요. 💬 칭찬은 한 말, 🎁 챙겨주기는 해준 일을 적으면 돼요." }),
        h("li", { text: "내 마니또가 누군지 추리해서 제출할 수 있어요. 안 해도 돼요." }),
        h("li", { text: "12월 25일 두목이 [정체 공개]를 누르면, 누가 누구의 마니또였는지와 내가 받은 칭찬이 공개돼요." })),
      h("p", { class: "note", text: "칭찬 · 챙김 기록은 공개 전에는 쓴 사람만, 공개 후에는 쓴 사람과 받은 사람만 볼 수 있어요. 두목도 볼 수 없어요." })));
}
function screenManito() {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" });
  const me = meMember(), ph = mtPhase(), boss = isBoss();
  if (!MT.stateKnown) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "마니또를 불러오는 중…" }));
  if (!ph) {
    return h("section", { class: "screen" }, back, mtHeader("아직 마니또가 열리지 않았어요."), mtRules(),
      boss ? h("button", { type: "button", class: "save", onclick: mtOpen, text: "마니또 참가 신청 열기 (두목)" }) : h("div", { class: "empty", text: "두목이 마니또를 열면 참가할 수 있어요." }));
  }
  const joined = me && MT.players[me.id];
  const authed = mtAuthed();
  const playerList = Object.keys(MT.players).filter(function (m) { return !!findMember(m); });
  const roster = h("div", { class: "chips" }, (ph === "signup" ? playerList : (MT.state.players || [])).map(function (m) {
    const drawn = ph === "draw" && (MT.state.drawn || []).indexOf(m) >= 0;
    return h("span", { class: "chip static" + (me && m === me.id ? " me" : "") + (drawn ? " done" : "") }, nickOf(m) + (drawn ? " ✓" : ""));
  }));
  const parts = [back];

  if (ph === "signup") {
    parts.push(mtHeader("참가 신청 중이에요. 참가 " + playerList.length + "명"), h("div", { class: "field" }, h("div", { class: "field-label", text: "참가자" }), playerList.length ? roster : h("p", { class: "note", text: "아직 아무도 없어요." })));
    if (!me) parts.push(h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." }));
    else if (MT.pinMode) parts.push(mtPinForm(MT.pinMode));
    else if (!joined) parts.push(h("button", { type: "button", class: "save", onclick: function () { mtPinClear(); MT.pinMode = "join"; render(); }, text: "🎁 참가 신청하기" }));
    else if (!authed) parts.push(h("button", { type: "button", class: "save", onclick: function () { mtPinClear(); MT.pinMode = "login"; render(); }, text: "비밀번호로 들어가기" }));
    else parts.push(h("div", { class: "panel" }, h("p", { text: "참가 완료! 두목이 마감하면 마니또를 뽑을 수 있어요." })));
    if (boss) parts.push(h("div", { class: "panel" }, h("div", { class: "field-label", text: "두목 전용" }),
      h("button", { type: "button", class: "save", onclick: mtCloseSignup, text: "참가 마감하고 뽑기 시작" }),
      playerList.length ? h("div", { class: "chips" }, playerList.map(function (m) {
        return h("button", { type: "button", class: "chip", onclick: function () { mtResetPlayer(m); }, text: nickOf(m) + " 참가 취소" });
      })) : null,
      h("p", { class: "hint", text: "비밀번호를 잊은 사람은 참가 취소 후 다시 신청하면 돼요." })));
    parts.push(mtRules());
    return h("section", { class: "screen" }, parts);
  }

  const isPlayer = me && (MT.state.players || []).indexOf(me.id) >= 0;
  if (ph === "draw") {
    const drawnN = (MT.state.drawn || []).length, total = (MT.state.players || []).length;
    parts.push(mtHeader("뽑기 " + drawnN + "/" + total + "명 완료 · 크리스마스까지 몰래 칭찬해요"), h("div", { class: "field" }, h("div", { class: "field-label", text: "참가자" }), roster));
    if (!isPlayer) parts.push(h("div", { class: "empty", text: "이번 마니또 참가자가 아니에요. 크리스마스에 공개되는 배정표를 기다려 주세요." }));
    else if (MT.pinMode) parts.push(mtPinForm(MT.pinMode));
    else if (!authed) parts.push(h("div", { class: "panel" }, h("p", { text: "내 마니또와 칭찬 일지를 보려면 비밀번호가 필요해요." }),
      h("button", { type: "button", class: "save", onclick: function () { mtPinClear(); MT.pinMode = "login"; render(); }, text: "비밀번호로 들어가기" })));
    else if (!MT.secret) parts.push(h("div", { class: "panel mt-draw" },
      h("p", { text: "몰래 챙겨줄 사람을 뽑아요. 결과는 나만 볼 수 있어요." }),
      h("button", { type: "button", class: "save", disabled: MT.busy, onclick: mtDraw, text: MT.busy ? "뽑는 중…" : "🎁 마니또 뽑기" })));
    else {
      const t = findMember(MT.secret.target) || { nick: nickOf(MT.secret.target) };
      const days = {}; MT.praise.forEach(function (x) { days[x.date] = (days[x.date] || 0) + 1; });
      const dayList = Object.keys(days).sort();
      const nPraise = MT.praise.filter(function (x) { return prKind(x) === "praise"; }).length, nDeed = MT.praise.length - nPraise;
      parts.push(
        h("div", { class: "mt-target" }, h("span", { class: "sc-eyebrow", text: "내가 몰래 챙길 사람 · 나만 보여요" }),
          h("div", { class: "mt-photo" }, photoBox(t)), h("b", { class: "mt-name", text: t.nick })),
        h("div", { class: "panel mt-mission" + (dayList.length ? " clear" : "") },
          h("div", { class: "field-label", text: "몰래 챙기기 미션 · 횟수 제한 없음" }),
          h("p", { class: "mt-progress" }, h("b", { text: dayList.length + "일 · " + MT.praise.length + "번" }),
            MT.praise.length ? " 챙겼어요 (💬 칭찬 " + nPraise + " · 🎁 챙겨주기 " + nDeed + ")" : " · 서로 다른 날, 많이 챙길수록 좋아요!"),
          dayList.length ? h("div", { class: "mt-days" }, dayList.map(function (d) {
            return h("span", { class: "mt-day on" }, "✓ " + fmtDate(d) + (days[d] > 1 ? " (" + days[d] + "건)" : ""));
          })) : null,
          h("p", { class: "hint", text: "칭찬한 말도, 그 사람만을 위해 해준 일도 모두 기록할 수 있어요. 서로 다른 날 꾸준히 챙길수록 크리스마스에 감동이 커져요." }),
          h("button", { type: "button", class: "save", onclick: function () { openPraiseEditor(null); }, text: "✍️ 칭찬 · 챙겨주기 기록하기" })),
        h("div", { class: "field" }, h("div", { class: "field-label", text: "몰래 챙김 일지 · 나만 보여요 " + MT.praise.length + "건" }),
          MT.praise.length ? h("ul", { class: "mt-log" }, MT.praise.map(function (x) {
            return h("li", null, h("button", { type: "button", class: "mt-entry", onclick: function () { openPraiseEditor(x); } },
              h("span", { class: "ci-date", text: fmtDate(x.date) }), h("span", { class: "mt-text", text: prLine(x) }), h("small", { text: "눌러서 수정·삭제" })));
          })) : h("p", { class: "note", text: "아직 기록이 없어요. 예: 💬 “" + PRAISE_EXAMPLE + "” · 🎁 " + PR_KIND.deed.ex.split(" / ")[1] })),
        h("div", { class: "panel" }, h("div", { class: "field-label", text: "내 마니또 추리 (선택)" }),
          h("p", { class: "note", text: "나를 몰래 챙겨주는 사람이 누구일까요? 공개 전까지 바꿀 수 있어요." }),
          h("div", { class: "chips" }, (MT.state.players || []).filter(function (m) { return m !== me.id; }).map(function (m) {
            return h("button", { type: "button", class: "chip", "aria-pressed": MT.guess === m ? "true" : "false", onclick: async function () {
              try { await setDoc(doc(db, "manitoGuess", me.id), { uid: myUid(), guess: m, updatedAt: serverTimestamp() }); sfx("click"); } catch (e) { toast(errText(e)); }
            }, text: nickOf(m) });
          })),
          h("p", { class: "hint", text: MT.guess ? "지금 추리: " + nickOf(MT.guess) : "아직 추리하지 않았어요." })));
    }
    if (boss) {
      const ok = mtRevealDay(), allDrawn = drawnN === total;
      parts.push(h("div", { class: "panel" }, h("div", { class: "field-label", text: "두목 전용" }),
        MT.confirm === "reveal"
          ? h("div", { class: "confirm" }, h("p", { text: "정체를 공개할까요? 배정표와 칭찬 · 챙김 기록이 공개되고, 그 뒤로는 기록을 고칠 수 없어요." }),
              h("div", { class: "op-row" }, h("button", { type: "button", onclick: function () { MT.confirm = null; render(); }, text: "취소" }),
                h("button", { type: "button", class: "go", onclick: function () { MT.confirm = null; mtReveal(); }, text: "🎄 정체 공개" })))
          : h("button", { type: "button", class: "save", disabled: !ok || !allDrawn, onclick: function () { MT.confirm = "reveal"; render(); },
              text: !allDrawn ? "모두 뽑아야 공개할 수 있어요 (" + drawnN + "/" + total + ")" : ok ? "🎄 정체 공개" : "정체 공개는 12월 25일부터 할 수 있어요" })));
    }
    parts.push(mtRules());
    return h("section", { class: "screen" }, parts);
  }

  /* revealed */
  const giverOf = {}; MT.secrets.forEach(function (x) { giverOf[x.target] = x.id; });
  const guessOf = {}; MT.guesses.forEach(function (x) { guessOf[x.id] = x.guess; });
  parts.push(mtHeader("정체 공개! 🎄 메리 크리스마스"));
  if (isPlayer && !authed && !MT.pinMode) parts.push(h("div", { class: "panel" }, h("p", { text: "내 마니또가 나를 위해 한 일을 보려면 비밀번호로 들어와 주세요." }),
    h("button", { type: "button", class: "save", onclick: function () { mtPinClear(); MT.pinMode = "login"; render(); }, text: "비밀번호로 들어가기" })));
  else if (isPlayer && MT.pinMode) parts.push(mtPinForm(MT.pinMode));
  if (isPlayer) {
    const giver = giverOf[me.id], gm = giver && (findMember(giver) || { nick: nickOf(giver) });
    const myGuess = guessOf[me.id];
    parts.push(h("div", { class: "mt-target reveal" },
      h("span", { class: "sc-eyebrow", text: "나의 마니또는…" }),
      gm ? h("div", { class: "mt-photo" }, photoBox(gm)) : null,
      h("b", { class: "mt-name", text: gm ? gm.nick : "확인 중…" }),
      h("span", { class: "mt-guess", text: myGuess ? (myGuess === giver ? "🎯 내 추리 적중! (" + nickOf(myGuess) + ")" : "내 추리: " + nickOf(myGuess) + " · 아쉽게 빗나갔어요") : "추리는 제출하지 않았어요" })));
    if (authed) parts.push(h("div", { class: "field" }, h("div", { class: "field-label", text: "내 마니또가 나를 위해 한 일 " + MT.received.length + "건" }),
      MT.received.length ? h("ul", { class: "mt-log" }, MT.received.map(function (x) {
        return h("li", null, h("div", { class: "mt-entry got" }, h("span", { class: "ci-date", text: fmtDate(x.date) }), h("span", { class: "mt-text", text: prLine(x) })));
      })) : h("p", { class: "note", text: "남겨진 기록이 없어요." })),
      h("div", { class: "field" }, h("div", { class: "field-label", text: "내가 챙긴 기록 " + MT.praise.length + "건" + (MT.secret ? " · " + nickOf(MT.secret.target) + "님에게" : "") }),
        MT.praise.length ? h("ul", { class: "mt-log" }, MT.praise.map(function (x) {
          return h("li", null, h("div", { class: "mt-entry" }, h("span", { class: "ci-date", text: fmtDate(x.date) }), h("span", { class: "mt-text", text: prLine(x) })));
        })) : h("p", { class: "note", text: "남긴 기록이 없어요." })));
  }
  parts.push(h("div", { class: "field" }, h("div", { class: "field-label", text: "전체 배정표 · 마니또 → 챙겨준 사람" }),
    h("ul", { class: "mt-table" }, (MT.state.players || []).map(function (m) {
      const t = MT.secrets.find(function (x) { return x.id === m; });
      return h("li", null, h("span", { text: nickOf(m) }), h("span", { class: "arrow", text: "→" }), h("b", { text: t ? nickOf(t.target) : "?" }));
    }))));
  return h("section", { class: "screen" }, parts);
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
    briefing(),
    h("div", { class: "actions" },
      h("button", { class: "btn primary", type: "button", onclick: function () { go("members"); } },
        h("span", null, h("small", { text: "명부 열람" }), "조직원 보기"), h("span", { class: "arr", text: "→" })),
      h("button", { class: "btn", type: "button", onclick: function () { go("games"); } },
        h("span", null, h("small", { text: "휴게 구역" }), "게임방"), h("span", { class: "arr", text: "→" }))),
    h("div", { class: "ledger" },
      h("button", { type: "button", class: "led", onclick: function () { go("members"); } }, h("b", { text: String(n) }), h("span", { text: "등록 조직원 →" })),
      h("button", { type: "button", class: "led", onclick: function () {
        const open = S.rooms.filter(roomAlive);
        go(open.length === 1 ? "room-" + open[0].id : open.length ? "rooms" : "games");
      } }, h("b", { text: String(openRooms) }), h("span", { text: "열린 게임방 →" })),
      h("button", { type: "button", class: "led", onclick: function () { go("guestbook"); } }, h("b", { text: String(S.guest.length) }), h("span", { text: "방명록 →" }))),
    installPanel(),
    bossPanel()
  );
}
/* ---------- 앱 설치 (컴퓨터 + 폰) ---------- */
const INSTALL = { evt: null, done: false };
const UA = navigator.userAgent || "";
const IS_IOS = /iPhone|iPad|iPod/.test(UA) || (/Macintosh/.test(UA) && navigator.maxTouchPoints > 1);
const IS_ANDROID = /Android/.test(UA);
const IS_MOBILE = IS_IOS || IS_ANDROID;
const IS_MAC = !IS_IOS && /Macintosh|Mac OS X/.test(UA);
const IS_SAFARI = /Safari/.test(UA) && !/Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser|Whale/.test(UA);
const IS_EDGE = /Edg\//.test(UA);
const IS_WHALE = /Whale/.test(UA);
function isStandalone() {
  try { return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: window-controls-overlay)").matches || navigator.standalone === true; } catch (e) { return false; }
}
window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); INSTALL.evt = e; render(); });
window.addEventListener("appinstalled", function () { INSTALL.evt = null; INSTALL.done = true; toast("비밀본부 앱을 설치했어요!"); render(); });
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
}
async function runInstall() {
  const e = INSTALL.evt; if (!e) return false;
  INSTALL.evt = null;
  try { e.prompt(); const r = await e.userChoice; if (r && r.outcome === "accepted") INSTALL.done = true; } catch (err) {}
  render();
  return true;
}
const IS_KAKAO = /KAKAOTALK/i.test(UA);
const IS_INAPP = IS_KAKAO || /Instagram|FBAN|FBAV|NAVER\(inapp|Line\/|DaumApps|everytimeApp|Band\//i.test(UA);
/* one button: install right away when the browser allows it, otherwise show only the one way that works here */
async function installClick() {
  if (await runInstall()) return;
  if (IS_KAKAO) { location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(location.origin + location.pathname); return; }
  let title, steps;
  if (IS_INAPP) { title = "브라우저에서 열어야 설치돼요"; steps = ["오른쪽 위(또는 아래) ⋮ · ⋯ 메뉴를 눌러요.", "‘다른 브라우저로 열기’ 또는 ‘Chrome/Safari로 열기’를 눌러요.", "열린 화면에서 이 버튼을 다시 눌러요."]; }
  else if (IS_IOS) { title = "아이폰은 두 번만 누르면 돼요"; steps = ["화면 아래(또는 주소창 옆) 공유 버튼 ⬆️ 을 눌러요.", "‘홈 화면에 추가’ → ‘추가’를 눌러요."]; }
  else if (IS_MAC && IS_SAFARI) { title = "Safari는 버튼 설치가 안 돼서, 메뉴로 한 번만 해 주세요"; steps = ["모니터 맨 위 왼쪽, 사과 로고()와 ‘Safari’ 글자가 있는 줄에서 ‘파일’을 눌러요.", "펼쳐진 목록에서 ‘Dock에 추가…’를 누르고, 뜨는 창에서 ‘추가’를 눌러요.", "끝! 화면 아래 Dock(앱 아이콘 줄)에 비밀본부 아이콘이 생겨요.", "‘Dock에 추가…’가 안 보이면 맥이 옛날 버전이에요. 이때는 Chrome으로 이 주소를 열고 설치 버튼을 누르면 바로 돼요."]; }
  else if (IS_ANDROID) { title = "Chrome 메뉴에서 바로 돼요"; steps = ["오른쪽 위 ⋮ 메뉴를 눌러요.", "‘앱 설치’ 또는 ‘홈 화면에 추가’를 눌러요."]; }
  else { title = "이미 설치돼 있거나, 주소창에서 바로 돼요"; steps = ["주소창 오른쪽 끝의 설치 아이콘(모니터에 ↓)을 눌러요.", "없으면 오른쪽 위 ⋮ 메뉴 → ‘전송, 저장, 공유’ 또는 ‘앱’ → ‘앱 설치’를 눌러요.", "이미 설치했다면 바탕화면 · 시작 메뉴의 ‘비밀본부’를 열면 돼요."]; }
  openSheet("앱 설치", title, h("div", { class: "install-help" },
    h("ol", null, steps.map(function (t) { return h("li", { text: t }); })),
    h("button", { type: "button", class: "save", onclick: closeEditor, text: "알겠어요" })));
}
function installPanel() {
  if (isStandalone() || INSTALL.done) {
    return h("div", { class: "install installed" },
      h("span", { class: "eyebrow", text: "앱 설치" }),
      h("p", { text: INSTALL.done && !isStandalone() ? "설치 완료! 이제 바탕화면 · 시작 메뉴(폰은 홈 화면)의 ‘비밀본부’로 바로 들어올 수 있어요." : "설치된 비밀본부 앱으로 접속 중이에요." }));
  }
  return h("div", { class: "install" },
    h("div", { class: "install-head" },
      h("img", { src: "icon-192.png", alt: "", class: "install-icon" }),
      h("div", null,
        h("span", { class: "eyebrow", text: "앱 설치 · 무료" }),
        h("b", { text: IS_MOBILE ? "비밀본부를 폰에 설치하기" : "비밀본부를 컴퓨터에 설치하기" }),
        h("small", { text: "버튼 하나로 끝. 아이콘 누르면 바로 열려요." }))),
    h("button", { type: "button", class: "save", onclick: installClick, text: IS_MOBILE ? "📥 앱 설치하기" : "💻 컴퓨터에 설치하기" }));
}
function isGoogleUser(u) { return !!(u && (u.providerData || []).some(function (p) { return p.providerId === "google.com"; })); }
function bossPanel() {
  const u = S.user;
  if (!u || u.isAnonymous || !isGoogleUser(u)) {
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
      charges.length ? h("ol", { class: "charges" }, charges.map(function (c) {
        const idx = (m.charges || []).indexOf(c), rel = casesForCharge(m.id, c);
        return h("li", null, h("div", { class: "ch-body" }, h("span", { text: c }),
          rel.length ? h("button", { type: "button", class: "case-link", onclick: function () { go(rel.length === 1 ? "case-" + rel[0].id : "cases-" + m.id + "-" + idx); } },
            "📁 관련 사건 보기" + (rel.length > 1 ? " (" + rel.length + "건)" : "")) : null));
      }))
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

/* ================= 게임센터: 카테고리와 게임 레지스트리 (화면은 모두 이 목록에서 자동으로 만들어져요) =================
   status: play(이용 가능) · new(신규) · beta(테스트 중) · soon(개발 예정, 실행 불가) · maint(점검 중) */
const CATEGORIES = [
  { id: "brain", name: "두뇌싸움", en: "BRAIN BATTLE", desc: "추리와 심리전", color: "#a974ff", icon: "🧠" },
  { id: "arcade", name: "오락실", en: "ARCADE", desc: "피지컬과 순발력", color: "#ff5468", icon: "🕹️" },
  { id: "quiz", name: "퀴즈방", en: "QUIZ ROOM", desc: "상식과 센스", color: "#ffc62e", icon: "❓" },
  { id: "art", name: "예술의 전당", en: "ART STUDIO", desc: "그림과 창의력", color: "#ff7fbf", icon: "🎨" },
  { id: "lucky", name: "운빨존", en: "LUCKY ZONE", desc: "운명에 맡기는 승부", color: "#4fcf7a", icon: "🍀" },
  { id: "social", name: "친목실", en: "SOCIAL ROOM", desc: "조직원들의 민낯", color: "#5aa9ff", icon: "💬" },
  { id: "strategy", name: "전략본부", en: "STRATEGY ROOM", desc: "전략과 수싸움", color: "#7d8fb3", icon: "♟️" },
  { id: "olympics", name: "조직원 운동회", en: "FIRE OLYMPICS", desc: "종합 미니게임 대전", color: "#ff9a3c", icon: "🏅" }
];
/* [id, 이름, 카테고리, 소개, 최소, 최대, 예상 분, 상태, 아이콘, 대표 여부] */
const GAME_ROWS = [
  ["liar", "라이어게임", "brain", "혼자만 제시어를 모르는 사람을 찾아라.", 3, 7, 15, "play", "🃏", 1],
  ["mafia", "마피아", "brain", "조직 안에 조직이 있다. 밤마다 한 명씩.", 4, 7, 15, "play", "🔫"],
  ["minority", "소수결", "brain", "둘 중 하나, 적게 고른 쪽이 이긴다.", 3, 7, 5, "new", "⚖️"],
  ["stash", "두목의 비자금", "brain", "다 같이 나눠 먹을까, 욕심내다 다 날릴까.", 3, 7, 6, "new", "💰"],
  ["beauty", "0과 100 사이", "brain", "평균의 2/3에 가장 가까운 숫자를 노려라.", 3, 7, 5, "new", "🎯"],
  ["loyalty", "의리 테스트", "brain", "협력이냐 배신이냐, 짝꿍과의 심리전.", 2, 7, 6, "new", "🤝"],
  ["bluffdice", "블러핑 주사위", "brain", "내 주사위만 보고 전체를 선언하는 허세 승부.", 3, 7, 15, "new", "🎲"],
  ["taboo", "금지어 게임", "brain", "남의 금지어는 보이고 내 건 안 보인다.", 3, 7, 10, "new", "🤐"],
  ["smoke", "빨리 담배피기", "arcade", "들숨 날숨 타이밍 싸움. 다 못 피우면 킬러가 처리한다.", 2, 7, 5, "play", "🚬", 1],
  ["reflex", "순발력 테스트", "arcade", "신호가 뜨는 순간 누구보다 빠르게.", 1, 7, 3, "new", "⚡"],
  ["tensec", "10초의 감각", "arcade", "시계 없이 정확히 10초에 멈춰라.", 1, 7, 3, "new", "⏱️"],
  ["typing", "타자왕", "arcade", "같은 문장, 누가 더 빠르고 정확하게 치나.", 1, 7, 5, "new", "⌨️"],
  ["assoc", "연상퀴즈", "quiz", "힌트 다섯 개, 먼저 맞힐수록 고득점.", 1, 7, 10, "play", "🧩", 1],
  ["chosung", "초성퀴즈", "quiz", "ㅂㅈㅁ → 불주먹. 초성만 보고 맞혀라.", 1, 7, 8, "new", "ㄱ"],
  ["ox", "OX 퀴즈", "quiz", "맞으면 O, 틀리면 X. 해설까지.", 1, 7, 8, "new", "⭕"],
  ["memory", "기억력 퀴즈", "quiz", "잠깐 보여준 배열을 순서대로.", 1, 7, 6, "new", "🧠"],
  ["proverb", "이어말하기", "quiz", "속담과 관용구의 뒷부분을 맞혀라.", 1, 7, 8, "new", "🗣️"],
  ["trivia", "상식퀴즈", "quiz", "역사·과학·문화·스포츠 상식.", 1, 7, 10, "new", "📚"],
  ["price", "가격 맞히기", "quiz", "두목이 등록한 상품 가격에 가장 가깝게.", 2, 7, 8, "beta", "🏷️"],
  ["zoom", "확대사진 퀴즈", "quiz", "확대된 조직원 사진 조각으로 주인을 맞혀라.", 1, 7, 8, "new", "🔍"],
  ["music", "음악퀴즈", "quiz", "저작권 끝난 동요·민요·클래식 멜로디를 듣고 제목 맞히기.", 1, 7, 8, "new", "🎵"],
  ["movie", "영화퀴즈", "quiz", "줄거리와 등장인물로 영화 맞히기.", 1, 7, 8, "new", "🎬"],
  ["sketch", "드로잉퀴즈", "art", "한 명은 그리고, 나머지는 맞혀라.", 2, 7, 15, "play", "🖌️", 1],
  ["telephone", "그림 전달 게임", "art", "문장 → 그림 → 문장… 전달될수록 엉망진창.", 3, 7, 12, "new", "📨"],
  ["meme", "짤 만들기", "art", "조직원 사진에 제일 웃긴 자막 달기.", 3, 7, 8, "new", "🖼️"],
  ["copy", "똑같이 그리기", "art", "같은 그림을 보고 누가 제일 똑같이.", 2, 7, 8, "new", "✏️"],
  ["recall", "기억으로 그리기", "art", "잠깐 본 그림을 기억으로 그리기.", 2, 7, 8, "new", "💭"],
  ["novel", "릴레이 소설", "art", "한 문장씩 이어 쓰는 막장 소설.", 3, 7, 10, "new", "📖"],
  ["montage", "몽타주", "art", "설명만 듣고 범인 얼굴 그리기.", 3, 7, 8, "new", "🕵️"],
  ["croc", "악어 이빨", "lucky", "하나는 꽝. 누르는 순간 꽉!", 2, 7, 5, "new", "🐊", 1],
  ["glass", "유리다리", "lucky", "둘 중 하나는 깨지는 유리.", 2, 7, 5, "new", "🪟"],
  ["balloon", "풍선 불기", "lucky", "욕심내면 펑, 멈추면 점수.", 2, 7, 5, "new", "🎈"],
  ["ladder", "사다리 타기", "lucky", "운명은 사다리가 정한다.", 2, 7, 3, "new", "🪜"],
  ["hotbomb", "폭탄 돌리기", "lucky", "터지기 전에 다음 사람에게!", 3, 7, 5, "new", "🧨"],
  ["chest", "보물상자", "lucky", "보물일까 함정일까.", 2, 7, 5, "new", "🎁"],
  ["pirate", "해적 룰렛", "lucky", "칼을 꽂다 해적이 튀어나오면 끝.", 2, 7, 5, "new", "🏴‍☠️"],
  ["race", "조직원 경주", "lucky", "누가 1등으로 들어올까, 응원 대결.", 2, 7, 3, "new", "🏇"],
  ["hearing", "불주먹 청문회", "social", "이 질문에 딱 맞는 조직원은? 익명 투표.", 3, 7, 6, "new", "🎤", 1],
  ["balance", "밸런스게임", "social", "둘 중 하나만 골라야 한다면.", 2, 7, 5, "new", "🍫"],
  ["sync", "일심동체", "social", "다 같이 같은 답을 쓰면 점수.", 3, 7, 6, "new", "💞"],
  ["drip", "드립왕", "social", "가장 웃긴 답변에 투표.", 3, 7, 8, "new", "😂"],
  ["fakeans", "가짜 정답", "social", "그럴듯한 가짜 답으로 속여라.", 3, 7, 10, "new", "🎭"],
  ["whosaid", "누가 한 말일까", "social", "단톡방 명대사의 주인을 맞혀라.", 3, 7, 8, "beta", "💬"],
  ["confess", "익명 고백", "social", "가벼운 TMI, 누가 썼을까?", 3, 7, 8, "new", "💌"],
  ["profile", "조직원 탐구생활", "social", "조직원 취향 퀴즈.", 3, 7, 8, "new", "🔎"],
  ["rankguess", "조직원 순위 맞히기", "social", "모두의 순위를 예상하라.", 3, 7, 8, "new", "📊"],
  ["manito", "크리스마스 마니또", "social", "몰래 챙기고 크리스마스에 정체 공개.", 3, 7, 0, "play", "🎄"],
  ["yacht", "야추", "strategy", "주사위 다섯 개로 족보 완성.", 2, 7, 15, "new", "🎲", 1],
  ["baseball", "숫자 야구", "strategy", "스트라이크와 볼로 비밀 숫자 추리.", 2, 7, 8, "new", "⚾"],
  ["onecard", "원카드", "strategy", "같은 숫자나 무늬를 내라.", 2, 7, 10, "new", "🂡"],
  ["auction", "비밀 경매", "strategy", "한정된 자금으로 비밀 입찰.", 3, 7, 10, "new", "🔨"],
  ["omok", "오목", "strategy", "다섯 알을 먼저 잇기 (2인).", 2, 2, 10, "new", "⚫"],
  ["connect4", "커넥트 포", "strategy", "네 개를 먼저 잇기 (2인).", 2, 2, 8, "new", "🔴"],
  ["battleship", "배틀쉽", "strategy", "숨은 함대를 찾아 격침 (2인).", 2, 2, 12, "new", "🚢"],
  ["numtile", "숫자 타일", "strategy", "숫자 타일 수싸움.", 2, 4, 12, "new", "🔢"],
  ["territory", "땅따먹기", "strategy", "가장 넓은 땅을 차지하라.", 2, 7, 8, "new", "🗺️"],
  ["pentathlon", "오종경기", "olympics", "미니게임 5종 누적 점수 대결.", 2, 7, 15, "new", "🏅", 1],
  ["triathlon", "삼종경기", "olympics", "미니게임 3종 누적 점수 대결.", 2, 7, 10, "new", "🥉"],
  ["solo", "불주먹 개인전", "olympics", "랜덤 미니게임 누적 점수.", 2, 7, 15, "new", "🏃"],
  ["team", "불주먹 팀전", "olympics", "팀별 합산 점수 대결.", 4, 7, 15, "new", "🚩"],
  ["survivor", "최후의 생존자", "olympics", "라운드마다 꼴찌 탈락.", 3, 7, 15, "new", "🔥"],
  ["cup", "두목배 챔피언십", "olympics", "두목이 여는 공식 대회.", 2, 7, 30, "new", "🏆"]
];
const REG = GAME_ROWS.map(function (g, i) {
  return { id: g[0], name: g[1], cat: g[2], desc: g[3], min: g[4], max: g[5], mins: g[6], status: g[7], icon: g[8], lead: !!g[9], order: i };
});
const REG_BY = {}; REG.forEach(function (g) { REG_BY[g.id] = g; });
const STATUS_TXT = { play: "PLAY", new: "NEW", beta: "BETA", soon: "COMING SOON", maint: "MAINTENANCE" };
function gameOpen(g) { return g && (g.status === "play" || g.status === "new" || g.status === "beta"); }
function GAME_NAME_OF(type) { const g = REG_BY[type || "liar"]; return g ? g.name : "게임"; }

/* ---------- 조직원 접속 현황 (presence/{memberId}) ---------- */
const PRES = { list: {}, unsub: null, lastBeat: 0, lastKey: "" };
const PRES_ONLINE_MS = 2 * 60 * 1000;
function inGameArea(rt) { rt = rt == null ? currentRoute() : rt; return rt === "games" || rt.indexOf("cat-") === 0 || rt.indexOf("game-") === 0 || rt.indexOf("room-") === 0; }
function presenceOff() {
  const me = meMember(); if (!me || !S.user || PRES.lastKey === me.id + "|off") return;
  PRES.lastKey = me.id + "|off"; PRES.lastBeat = Date.now();
  setDoc(doc(db, "presence", me.id), { uid: S.user.uid, m: me.id, t: Timestamp.fromMillis(0), room: null, game: null, playing: false }).catch(function () {});
}
function presenceBeat(force) {
  const me = meMember(); if (!me || !S.user) return;
  if (document.visibilityState === "hidden") { presenceOff(); return; }   /* 앱을 켜 두면 어디에 있든 온라인, 끄거나 내리면 바로 오프라인 */
  const r = S.room && currentRoute().indexOf("room-") === 0 ? S.room : null;
  const key = me.id + "|" + (r ? r.id + ":" + (r.status === "lobby" ? "w" : r.status === "result" ? "w" : "p") : "-");
  if (!force && key === PRES.lastKey && Date.now() - PRES.lastBeat < 50000) return;
  PRES.lastKey = key; PRES.lastBeat = Date.now();
  setDoc(doc(db, "presence", me.id), {
    uid: S.user.uid, m: me.id, t: serverTimestamp(),
    room: r ? r.id : null, game: r ? (r.type || "liar") : null, playing: !!(r && r.status !== "lobby" && r.status !== "result")
  }).catch(function () {});
}
setInterval(function () { presenceBeat(false); }, 30000);
document.addEventListener("visibilitychange", function () { presenceBeat(true); });
window.addEventListener("pagehide", function () { presenceOff(); });
function watchPresence(on) {
  if (on && !PRES.unsub) {
    PRES.unsub = onSnapshot(collection(db, "presence"), function (snap) {
      const l = {}; snap.docs.forEach(function (d) { l[d.id] = d.data({ serverTimestamps: "estimate" }); }); PRES.list = l; render();
    }, function () { PRES.denied = true; });
  } else if (!on && PRES.unsub) { PRES.unsub(); PRES.unsub = null; }
}
function presenceOf(mid) {
  const p = PRES.list[mid], me = meMember();
  if (me && me.id === mid && document.visibilityState !== "hidden") {
    const r = S.room && currentRoute().indexOf("room-") === 0 ? S.room : null;
    return { on: true, state: r ? (r.status !== "lobby" && r.status !== "result" ? "play" : "wait") : "on", game: r ? (r.type || "liar") : null };
  }
  if (!p || !p.t || !p.t.toMillis || Date.now() - (p.t.toMillis() - CLK.off) > PRES_ONLINE_MS) return { on: false, state: "off" };
  return { on: true, state: p.room ? (p.playing ? "play" : "wait") : "on", game: p.game };
}
function presencePanel() {
  const members = S.members;
  const st = members.map(function (m) { return presenceOf(m.id); });
  const n = st.filter(function (x) { return x.on; }).length;
  const label = { on: "온라인", wait: "대기 중", play: "게임 중", off: "오프라인" };
  return h("div", { class: "px-win presence" },
    h("div", { class: "px-bar" }, h("span", { text: "조직원 접속 현황" }), h("b", { class: "px-online", text: n + " / " + members.length + " ONLINE" })),
    h("div", { class: "pres-list" }, members.map(function (m, i) {
      const x = st[i];
      return h("div", { class: "pres " + x.state, title: m.nick + " · " + label[x.state] },
        h("div", { class: "pres-ph" }, photoBox(m), h("span", { class: "pres-dot" })),
        h("b", { text: m.nick }),
        h("small", { text: x.state === "play" && x.game ? GAME_NAME_OF(x.game) + " 중" : label[x.state] }));
    })),
    PRES.denied ? h("p", { class: "hint", text: "접속 현황은 두목이 보안 규칙을 업데이트하면 보여요." }) : null);
}

/* ---------- 내가 들어가 있는 방 (게임센터에서 바로 나가기) ---------- */
function myRooms() {
  const me = meMember(); if (!me) return [];
  return S.rooms.filter(function (r) { return roomAlive(r) && (r.players || []).indexOf(me.id) >= 0; });
}
function roomStateLabel(r) { return r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중"; }
async function leaveRoomById(r) {
  const me = meMember(); if (!me) return;
  const playing = r.status !== "lobby" && r.status !== "result" && r.status !== "closed";
  if (playing && !window.confirm("게임이 진행 중인 방이에요. 정말 나갈까요?")) return;
  const left = (r.players || []).filter(function (p) { return p !== me.id; });
  try {
    await updateDoc(doc(db, "rooms", r.id), left.length ? { players: arrayRemove(me.id) } : { players: arrayRemove(me.id), status: "closed" });
    toast(GAME_NAME_OF(r.type) + " 방에서 나왔어요.");
  } catch (e) { toast(errText(e)); }
}
function myRoomsPanel() {
  const list = myRooms(); if (!list.length) return null;
  return h("div", { class: "px-win my-rooms" },
    h("div", { class: "px-bar" }, h("span", { text: "내가 들어가 있는 방" }), h("b", { text: list.length + "개" })),
    h("ul", { class: "my-room-list" }, list.map(function (r) {
      const g = REG_BY[r.type || "liar"];
      return h("li", null,
        h("span", { class: "mr-name" }, h("b", { text: (g ? g.icon + " " : "") + GAME_NAME_OF(r.type) }), h("small", { text: nickOf(r.createdBy) + "의 방 · " + (r.players || []).length + "명 · " + roomStateLabel(r) })),
        h("button", { type: "button", class: "btn-sm", onclick: function () { go("room-" + r.id); }, text: "들어가기" }),
        h("button", { type: "button", class: "btn-sm danger", onclick: function () { leaveRoomById(r); }, text: "🚪 나가기" }));
    })));
}
/* ---------- 초대: 방 문서의 invites.<조직원> 에 기록, 받는 사람은 전체 방 목록 구독으로 알아챔 ---------- */
const INVITE_MS = 10 * 60 * 1000;
function inviteFresh(v) { return v && v.t && v.t.toMillis && Date.now() - (v.t.toMillis() - CLK.off) < INVITE_MS; }
async function sendInvite(r, mid) {
  const me = meMember(); if (!me) return;
  try {
    await updateDoc(doc(db, "rooms", r.id), { ["invites." + mid]: { by: me.id, t: serverTimestamp() } });
    sfx("ding"); toast(nickOf(mid) + "님에게 초대를 보냈어요.");
  } catch (e) { toast(errText(e)); }
}
function inviteButton(r) {
  return h("button", { type: "button", class: "invite-btn", onclick: function () { S.inviteOpen = !S.inviteOpen; render(); }, text: "📨 초대" });
}
function inviteSheet(r) {
  const me = meMember(); if (!me) return null;
  watchPresence(true);
  const inv = r.invites || {}, label = { on: "온라인", wait: "다른 방 대기 중", play: "게임 중", off: "오프라인" };
  const others = S.members.filter(function (m) { return m.id !== me.id && (r.players || []).indexOf(m.id) < 0; })
    .map(function (m) { return { m: m, p: presenceOf(m.id) }; })
    .sort(function (a, b) { const w = { on: 0, wait: 1, play: 2, off: 3 }; return w[a.p.state] - w[b.p.state]; });
  const close = function () { S.inviteOpen = false; render(); };
  const sheet = h("div", { class: "inv-sheet", role: "dialog", "aria-label": "초대하기" },
    h("div", { class: "inv-box px-win" },
      h("div", { class: "px-bar" }, h("span", { text: "📨 이 방으로 초대하기" }), h("button", { type: "button", class: "inv-x", onclick: close, "aria-label": "닫기", text: "✕" })),
      others.length ? h("ul", { class: "inv-list" }, others.map(function (x) {
        const sent = inviteFresh(inv[x.m.id]);
        return h("li", { class: x.p.state },
          h("div", { class: "inv-ph" }, photoBox(x.m)),
          h("span", { class: "inv-name" }, h("b", { text: x.m.nick }), h("small", { text: x.p.state === "play" && x.p.game ? GAME_NAME_OF(x.p.game) + " 중" : label[x.p.state] })),
          h("button", { type: "button", class: "btn-sm" + (sent ? "" : " go"), onclick: function () { sendInvite(r, x.m.id); }, text: sent ? "다시 보내기" : "초대" }));
      })) : h("p", { class: "note", text: "조직원이 모두 이 방에 있어요!" }),
      h("p", { class: "hint", text: "초대받은 사람은 본부 어디에 있든 바로 알림이 떠요. 앱을 열어 두고 있어야 받을 수 있어요." })));
  sheet.addEventListener("click", function (e) { if (e.target === sheet) close(); });
  return sheet;
}
const INV = { dismissed: {}, sounded: {} };
try { INV.dismissed = JSON.parse(localStorage.getItem("bf-inv-x") || "{}"); } catch (e) {}
function pendingInvite() {
  const me = meMember(); if (!me) return null;
  const here = currentRoute().indexOf("room-") === 0 ? currentRoute().slice(5) : null;
  let best = null;
  S.rooms.forEach(function (r) {
    const v = (r.invites || {})[me.id];
    if (!inviteFresh(v) || r.id === here || r.status === "closed" || (r.players || []).indexOf(me.id) >= 0) return;
    const key = r.id + ":" + v.t.toMillis();
    if (INV.dismissed[key]) return;
    if (!best || v.t.toMillis() > best.v.t.toMillis()) best = { r: r, v: v, key: key };
  });
  return best;
}
function dismissInvite(x) {
  INV.dismissed[x.key] = 1;
  try { localStorage.setItem("bf-inv-x", JSON.stringify(INV.dismissed)); } catch (e) {}
}
function inviteBanner() {
  const x = pendingInvite(); if (!x) return null;
  if (!INV.sounded[x.key]) { INV.sounded[x.key] = 1; sfx("ding"); }
  const g = REG_BY[x.r.type || "liar"], me = meMember();
  return h("div", { class: "inv-banner", role: "alert" },
    h("span", { class: "inv-ico", text: "📨" }),
    h("span", { class: "inv-txt" }, h("b", { text: nickOf(x.v.by) + "님의 초대" }), h("small", { text: (g ? g.icon + " " : "") + GAME_NAME_OF(x.r.type) + " 방 · " + (x.r.players || []).length + "명 · " + roomStateLabel(x.r) })),
    h("button", { type: "button", class: "btn-sm go", onclick: async function () {
      dismissInvite(x);
      try { await updateDoc(doc(db, "rooms", x.r.id), { players: arrayUnion(me.id), ["invites." + me.id]: deleteField() }); } catch (e) { toast(errText(e)); return; }
      go("room-" + x.r.id);
    }, text: "입장" }),
    h("button", { type: "button", class: "btn-sm", onclick: function () { dismissInvite(x); updateDoc(doc(db, "rooms", x.r.id), { ["invites." + me.id]: deleteField() }).catch(function () {}); render(); }, text: "다음에" }));
}
const invBar = h("div", { class: "inv-bar" });
document.body.appendChild(invBar);

/* ---------- 게임센터 메인 · 카테고리 화면 ---------- */
function roomsOf(type) { return S.rooms.filter(function (r) { return roomAlive(r) && (r.type || "liar") === type; }); }
function playingRoomsOf(type) { return roomsOf(type).filter(function (r) { return r.status !== "lobby" && r.status !== "result"; }).length; }
function screenGames() {
  watchPresence(true);
  return h("section", { class: "screen gc" },
    h("div", { class: "px-win gc-head" },
      h("div", { class: "px-bar" }, h("span", { text: "★ bulfist_gamecenter.exe" }), h("i", { class: "px-ctl", "aria-hidden": "true" })),
      h("div", { class: "gc-title" },
        logo("logo-l"),
        h("div", null, h("h1", { text: "불주먹 비밀본부" }), h("p", { class: "gc-en", text: "BULJUMEOK SECRET HEADQUARTERS" }), h("p", { class: "gc-motto", text: "불은 물로 끄면 되지만, 우린 못 꺼." })))),
    myRoomsPanel(),
    presencePanel(),
    MT.state && MT.state.phase !== "revealed" || mtRevealDay() ? h("button", { type: "button", class: "px-win gc-event", onclick: function () { go("game-manito"); } },
      h("span", { class: "gc-event-ico", text: "🎄" }), h("span", null, h("b", { text: "EVENT · 크리스마스 마니또" }), h("small", { text: "몰래 챙기고 12월 25일 정체 공개" })), h("span", { class: "arr", text: "▶" })) : null,
    h("div", { class: "cat-grid" }, CATEGORIES.map(function (c) {
      const games = REG.filter(function (g) { return g.cat === c.id; });
      const open = games.filter(gameOpen);
      const lead = games.find(function (g) { return g.lead; }) || games[0];
      const live = games.reduce(function (a, g) { return a + roomsOf(g.id).length; }, 0);
      const card = h("button", { type: "button", class: "cat-card", onclick: function () { go("cat-" + c.id); } },
        h("span", { class: "cat-ico", text: c.icon }),
        h("span", { class: "cat-name" }, h("b", { text: c.name }), h("small", { text: c.en })),
        h("span", { class: "cat-desc", text: c.desc }),
        h("span", { class: "cat-lead", text: "대표 게임 · " + (lead ? lead.name : "-") }),
        h("span", { class: "cat-meta" },
          h("span", { class: "px-tag", text: "이용 가능 " + open.length + "/" + games.length }),
          live ? h("span", { class: "px-tag live", text: "열린 방 " + live }) : null),
        h("span", { class: "cat-go", text: "입장하기 ▶" }));
      card.style.setProperty("--c", c.color);
      return card;
    })));
}
function screenCategory(cid) {
  watchPresence(true);
  const c = CATEGORIES.find(function (x) { return x.id === cid; });
  if (!c) return h("section", { class: "screen" }, h("div", { class: "empty", text: "없는 카테고리예요." }));
  const games = REG.filter(function (g) { return g.cat === cid; }).sort(function (a, b) {
    const w = function (g) { return gameOpen(g) ? 0 : 1; }; return w(a) - w(b) || a.order - b.order;
  });
  const sec = h("section", { class: "screen gc" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임센터로" }),
    h("div", { class: "px-win cat-head" },
      h("div", { class: "px-bar" }, h("span", { text: c.icon + " " + c.en }), h("i", { class: "px-ctl", "aria-hidden": "true" })),
      h("div", { class: "cat-head-in" }, h("h2", { text: c.name }), h("p", { text: c.desc + " · 게임 " + games.length + "개 (이용 가능 " + games.filter(gameOpen).length + "개)" }))),
    h("div", { class: "game-grid" }, games.map(function (g) {
      const open = gameOpen(g), rooms = roomsOf(g.id), playing = playingRoomsOf(g.id);
      const rulesOpen = S.rulesOpen === g.id;
      return h("div", { class: "g-card" + (open ? "" : " soon") },
        h("div", { class: "g-top" },
          h("span", { class: "g-ico", text: g.icon }),
          h("span", { class: "g-badge " + g.status, text: STATUS_TXT[g.status] })),
        h("b", { class: "g-name", text: g.name }),
        h("p", { class: "g-desc", text: g.desc }),
        h("div", { class: "g-meta" },
          h("span", { text: "👥 " + (g.min === g.max ? g.min : g.min + "~" + g.max) + "명" }),
          g.mins ? h("span", { text: "⏱ 약 " + g.mins + "분" }) : null,
          open && rooms.length ? h("span", { class: "live", text: "🟢 대기 " + (rooms.length - playing) + " · 🔴 게임 중 " + playing }) : null),
        rulesOpen ? h("div", { class: "g-rules" }, gameRules(g)) : null,
        h("div", { class: "g-btns" },
          h("button", { type: "button", class: "px-btn ghost-btn", onclick: function () { S.rulesOpen = rulesOpen ? null : g.id; render(); }, text: rulesOpen ? "규칙 닫기" : "규칙" }),
          h("button", { type: "button", class: "px-btn go-btn", disabled: !open, onclick: open ? function () { go("game-" + g.id); } : null, text: open ? "PLAY ▶" : "준비 중" })));
    })));
  sec.style.setProperty("--c", c.color);
  return sec;
}
function gameRules(g) {
  const p = PARTY[g.id];
  if (p && p.rules) return h("ol", null, p.rules.map(function (t) { return h("li", { text: t }); }));
  const old = {
    liar: ["한 명만 제시어를 몰라요(라이어).", "차례대로 한 마디씩 설명하고, 토론 후 라이어를 투표해요.", "단어 3·5·8·10개를 이어서 하고 점수를 합산해요."],
    mafia: ["마피아·경찰·의사·시민 중 하나를 몰래 받아요.", "밤에는 마피아가 처리, 낮에는 토론과 투표로 처형.", "마피아를 다 잡으면 시민 승리."],
    smoke: ["버튼을 누르면 들숨, 떼면 날숨. 들이마시는 동안만 담배가 타요.", "너무 오래 마시거나 덜 내쉬면 기침!", "50초 안에 못 피우면 킬러에게 처형."],
    assoc: ["힌트가 10초마다 하나씩 열려요.", "빨리 맞힐수록 고득점, 기회는 3번."],
    sketch: ["돌아가며 한 명이 그리고 나머지가 맞혀요.", "먼저 맞힐수록 고득점."],
    manito: ["몰래 뽑은 상대를 크리스마스까지 칭찬하고 챙겨요.", "12월 25일 정체 공개."]
  }[g.id];
  if (old) return h("ol", null, old.map(function (t) { return h("li", { text: t }); }));
  return h("p", { class: "note", text: gameOpen(g) ? g.desc : "아직 개발 중이에요. 소개: " + g.desc } );
}

function screenOpenRooms() {
  const me = meMember();
  const rooms = S.rooms.filter(roomAlive);
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("hq"); }, text: "본부로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "지금 열린 방" }), h("h2", { text: "열린 게임방 " + rooms.length + "개" }),
        h("p", { text: "누르면 바로 들어가요." }))),
    rooms.length
      ? h("ul", { class: "room-list" }, rooms.map(function (r) {
          const mine = me && (r.players || []).indexOf(me.id) >= 0;
          const label = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중";
          return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
            h("span", { class: "ri-main" },
              h("b", { text: GAME_NAME_OF(r.type) + " · " + nickOf(r.createdBy) + "의 방" }),
              h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
            h("span", { class: "ri-side" },
              h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: label }),
              h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
        }))
      : h("div", { class: "empty", text: "지금 열린 방이 없어요. 게임방에서 새 방을 만들어 보세요." }),
    h("button", { type: "button", class: "ghost wide", onclick: function () { go("games"); }, text: "게임방으로 가기" }));
}
/* how many rooms of this game are waiting / playing right now */

/* ---------- Liar: lobby list ---------- */
const STATUS_LABEL = { lobby: "대기 중", hint: "설명 중", discuss: "토론 중", vote: "투표 중", guess: "라이어 반격", result: "결과 발표" };
/* Seconds per phase. ?emu&fast shortens them for local tests. */
const FAST = EMU && new URLSearchParams(location.search).has("fast") ? (parseFloat(new URLSearchParams(location.search).get("fast")) || 10) : 0;
const DUR = { hint: 30, discuss: 120, vote: 20, guess: 20 };
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
            h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
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
        h("li", { text: "랜덤 순서로 한 명씩 제시어를 한 마디로 설명해요. 한 사람당 30초, 시간이 지나면 다음 사람으로 넘어가요." }),
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
      type: REG_BY[type] && gameOpen(REG_BY[type]) ? type : "liar",
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
  go("game-" + (r.type || "liar"));
}
function exitButton(r) {
  return h("button", { type: "button", class: "exit-btn", onclick: function () {
    const me = meMember(), inRoom = me && (r.players || []).indexOf(me.id) >= 0;
    const playing = r.status !== "lobby" && r.status !== "result" && r.status !== "closed";
    if (!inRoom) { go("game-" + (r.type || "liar")); return; }
    if (playing && !window.confirm("게임이 진행 중이에요. 정말 나갈까요?")) return;
    leaveRoom();
  }, text: "🚪 나가기" });
}
/* a liar game is a set of words (default 5); each word is a full round, points add up */
function liarSetSize(r) { return [3, 5, 8, 10].indexOf(r.setSize) >= 0 ? r.setSize : 5; }
function liarPick(r, lineup, custom, used) {
  let topic, seed, d;
  for (let i = 0; i < 25; i++) {
    topic = r.topicChoice >= 0 && LIAR_DEFAULT_TOPICS[r.topicChoice] ? LIAR_DEFAULT_TOPICS[r.topicChoice] : custom[Math.floor(Math.random() * custom.length)];
    seed = Math.floor(Math.random() * 2147483647);
    d = dealFull(lineup, seed, topic.words);
    if ((used || []).indexOf(d.word) < 0) break;
  }
  return { topic: topic, seed: seed, d: d };
}
/* points for one word: catching the liar gives every other player 2, a liar who escapes or guesses the word gets 3 */
function liarScore(r, winner) {
  const d = dealFull(r.lineup, r.seed, r.topic.words), sc = Object.assign({}, r.setScores || {});
  if (winner === "team") r.lineup.forEach(function (p) { if (p !== d.liar) sc[p] = (sc[p] || 0) + 2; });
  else sc[d.liar] = (sc[d.liar] || 0) + 3;
  return { setScores: sc, setLog: (r.setLog || []).concat([{ n: r.setNo || 1, liar: d.liar, word: d.word, winner: winner }]) };
}
async function liarNextRound(expectPhase) {
  const custom = allTopics();
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "result" || (r.setNo || 1) >= (r.setTotal || 1)) return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const pk = liarPick(r, r.lineup, custom, r.usedWords || []);
    const n = (r.setNo || 1) + 1;
    sysMsg(tx, r, "🃏 " + n + "번째 단어 시작! (" + n + " / " + r.setTotal + ")");
    tx.update(roomRef(), nextPhase(r, {
      status: "hint", seed: pk.seed, topic: { name: pk.topic.name, words: pk.topic.words }, order: pk.d.order, turn: 0,
      votes: {}, accused: null, guess: null, winner: null, reason: null, readyVote: [], setNo: n, usedWords: (r.usedWords || []).concat([pk.d.word])
    }));
  });
}
async function startGame() {
  const custom = allTopics();
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 3) throw { code: "few" };
      const pk = liarPick(r, lineup, custom, []);
      const topic = pk.topic, seed = pk.seed, d = pk.d, total = liarSetSize(r);
      if (total > 1) sysMsg(tx, { game: (r.game || 0) + 1 }, "🃏 라이어 게임 시작! 단어 " + total + "개를 차례로 해요. 1번째 단어!");
      tx.update(roomRef(), {
        status: "hint", lineup: lineup, seed: seed, topic: { name: topic.name, words: topic.words },
        order: d.order, turn: 0, votes: {}, accused: null, guess: null, winner: null, reason: null,
        game: (r.game || 0) + 1, startedAt: serverTimestamp(),
        phase: (r.phase || 0) + 1, phaseAt: serverTimestamp(), readyVote: [],
        setNo: 1, setTotal: total, setScores: {}, setLog: [], usedWords: [d.word]
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
      kind: kind === "hint" ? "hint" : "skip", game: r.game || 0, round: Math.floor(r.turn / n) + 1, sn: r.setNo || 1, speaker: speaker, createdAt: serverTimestamp()
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
  sfx("click");
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
      if (!voted.length) tx.update(roomRef(), nextPhase(r, Object.assign({ status: "result", winner: "liar", accused: null, reason: "아무도 투표하지 않았어요." }, liarScore(r, "liar"))));
      else if (top.length > 1) tx.update(roomRef(), nextPhase(r, Object.assign({ status: "result", winner: "liar", accused: null, reason: "표가 똑같이 갈려서 라이어를 잡지 못했어요." }, liarScore(r, "liar"))));
      else if (top[0] !== d.liar) tx.update(roomRef(), nextPhase(r, Object.assign({ status: "result", winner: "liar", accused: top[0], reason: "엉뚱한 사람을 지목했어요." }, liarScore(r, "liar"))));
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
    tx.update(roomRef(), nextPhase(r, Object.assign({
      status: "result", guess: text || "", winner: ok ? "liar" : "team",
      reason: ok ? "라이어가 제시어를 맞혔어요." : timedOut ? "라이어가 20초 안에 제시어를 맞히지 못했어요." : (text ? "라이어가 제시어를 맞히지 못했어요." : "라이어가 맞히기를 포기했어요.")
    }, liarScore(r, ok ? "liar" : "team"))));
  });
}

/* ---------- Liar: phase timers ---------- */
const GRACE_MS = 1500;
let lastTimeoutKey = "";
function durOf(r) {
  if (r && PARTY[r.type]) {
    if (r.status === "rr") return FAST ? 2 : (PARTY[r.type].rrSec || 8);
    if (r.status === "v") return FAST ? Math.max(3, Math.round((PARTY[r.type].vSec || 20) / FAST)) : (PARTY[r.type].vSec || 20);
    if (r.status !== "q") return undefined;
    if (r.type === "hotbomb" && r.q) return FAST ? Math.max(3, Math.round(r.q.fuse / FAST)) : r.q.fuse;
    const s = r.q && r.q.sec ? r.q.sec : r.type === "tensec" ? (r.target || 10) + 25 : PARTY[r.type].qSec;
    return FAST ? Math.max(3, Math.round(s / FAST)) : s;
  }
  if (r && (r.type || "liar") === "liar" && r.status === "result") return (r.setNo || 1) < (r.setTotal || 1) ? (FAST ? Math.max(2, Math.round(12 / FAST)) : 12) : undefined;
  return (r && r.type === "mafia" ? MDUR : r && r.type === "sketch" ? SDUR : r && r.type === "smoke" ? SMDUR : r && r.type === "assoc" ? AQDUR : DUR)[r && r.status]; }
function phaseEnd(r) {
  if (!r || !durOf(r) || !r.phaseAt || !r.phaseAt.toMillis) return null;
  return phMs(r) + durOf(r) * 1000;
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
  if (r.type === "assoc") return assocTimeout(r);
  if (PARTY[r.type]) return partyTimeout(r);
  if (r.status === "hint") return advanceTurn("timeout", null, r.phase);
  if (r.status === "discuss") return toVote(r.phase);
  if (r.status === "vote") return finalizeVotes(true, r.phase);
  if (r.status === "guess") return submitGuess("", true, r.phase);
  if (r.status === "result") return liarNextRound(r.phase);
}
setInterval(function () {
  const r = S.room;
  if (!r || currentRoute().indexOf("room-") !== 0) return;
  const end = phaseEnd(r);
  if (end == null) return;
  const left = end - Date.now(), total = durOf(r) * 1000;
  const sec = Math.max(0, Math.ceil(left / 1000));
  sfxTimer(r, sec, left);
  if (r.type === "assoc") aqTickHint(r);
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
  await roomUpdate({ status: "lobby", votes: {}, accused: null, guess: null, winner: null, reason: null, turn: 0, order: [], lineup: [], topic: null, readyVote: [], phaseAt: null, alive: [], night: {}, checks: [], verdict: {}, day: 0, word: null, guessed: [], used: [], scores: {}, skipUsed: false, board: [], shot: null, shots: [], q: null, subs: {}, hist: [], rn: 0, ext: {}, setNo: 0, setTotal: 0, setScores: {}, setLog: [], usedWords: [], round: 0, rk: 0, out: [], cur: null, qn: 0, solved: [], tries: {}, pts: {} });
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
  if (r.type === "assoc") return screenAssocRoom(r);
  if (PARTY[r.type]) return screenPartyRoom(r);
  if (r.type && r.type !== "liar" && !REG_BY[r.type]) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "없어진 게임의 방이에요. 게임방에서 다른 게임을 골라 주세요." }));

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
      h("h2", { text: (playing && (r.setTotal || 1) > 1 ? (r.setNo || 1) + "/" + r.setTotal + " 단어 · " : "") + (STATUS_LABEL[r.status] || "") })),
    h("span", { class: "mode-chip", text: (r.mode === 1 ? "바보 모드" : "일반 모드") + " · " + (r.rounds || 1) + "바퀴" + (playing ? "" : " · 단어 " + liarSetSize(r) + "개") }));

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

  const stage = playing ? crewStage(lineup, saidMap(r, ["chat", "hint"]), function (p) {
    const n = (r.order || []).length, speaker = n ? r.order[r.turn % n] : null;
    if (r.status === "hint" && p === speaker) return { cls: "now", badge: "🎤" };
    if (r.status === "vote" && r.votes && r.votes[p]) return { cls: "ok", badge: "✓", badgeCls: "ok", sub: "투표 완료" };
    if ((r.status === "guess" || r.status === "result") && r.accused === p) return { cls: "now", badge: "☝" };
    return null;
  }) : null;
  return h("section", { class: "screen room" }, back, head,
    playing ? stage : h("div", { class: "field" }, h("div", { class: "field-label", text: "모인 사람 " + lineup.length + "명" }), chips),
    card, playing ? hintBoard(r, me) : null, phase,
    showLog ? chatBox(r, me) : null);
}
/* every description for the current word stays pinned here, so nobody has to scroll the chat */
function hintBoard(r, me) {
  const sn = r.setNo || 1, game = r.game || 0;
  const said = {};
  S.msgs.forEach(function (m) {
    if (m.kind !== "hint" || (m.game || 0) !== game || (m.sn || 1) !== sn || !m.memberId) return;
    (said[m.memberId] = said[m.memberId] || []).push(m.text);
  });
  const n = (r.order || []).length, speaker = r.status === "hint" && n ? r.order[r.turn % n] : null;
  return h("div", { class: "hint-board" },
    h("div", { class: "field-label", text: "📌 설명 모음" + ((r.setTotal || 1) > 1 ? " · " + sn + "번째 단어" : "") }),
    h("ul", null, (r.order || []).map(function (p) {
      const list = said[p] || [];
      return h("li", { class: (p === speaker ? "now" : "") + (me && p === me.id ? " me" : "") },
        h("b", { text: nickOf(p) }),
        h("span", { class: list.length ? "" : "wait", text: list.length ? list.join(" · ") : p === speaker ? "설명하는 중…" : "아직" }));
    })));
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
    h("div", { class: "seg" }, [3, 5, 8, 10].map(function (n) {
      return h("button", { type: "button", "aria-pressed": liarSetSize(r) === n ? "true" : "false", onclick: function () { roomUpdate({ setSize: n }); } }, "단어 " + n + "개", n === 5 ? h("small", { text: "추천" }) : null);
    })),
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
    liarSetTail(r));
}
function liarSetTail(r) {
  const total = r.setTotal || 1, n = r.setNo || 1, sc = r.setScores || {};
  const rank = (r.lineup || []).slice().sort(function (a, b) { return (sc[b] || 0) - (sc[a] || 0); });
  const table = total > 1 ? h("div", { class: "field" }, h("div", { class: "field-label", text: "점수 · " + n + " / " + total + " 단어" }),
    h("ul", { class: "role-list" }, rank.map(function (p, i) {
      return h("li", null, h("span", { text: (["🥇", "🥈", "🥉"][i] || (i + 1) + "등") + " " + nickOf(p) }), h("b", { text: (sc[p] || 0) + "점" }));
    })),
    h("p", { class: "hint", text: "라이어를 잡으면 나머지 모두 +2점, 라이어가 살아남거나 제시어를 맞히면 라이어 +3점" })) : null;
  if (n < total) return h("div", { class: "liar-next" }, table, timerEl(r, "다음 단어까지"),
    h("button", { type: "button", class: "save", onclick: function () { liarNextRound(r.phase); }, text: "바로 다음 단어 ▶" }));
  return h("div", { class: "liar-final" },
    total > 1 ? ceremony(rank[0], rank.slice(1), "라이어 게임 " + total + "단어 우승 · " + (sc[rank[0]] || 0) + "점") : null,
    table,
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
  return h("div", { class: "field dock" }, h("div", { class: "field-label", text: "대화" }), log, f);
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
    if (role === "mafia") sfx("cock");
    else if (role === "doctor") sfx("ding");
    else if (role === "police") { const rr = S.room; sfx(rr && dealRoles(rr.lineup, rr.seed)[target] === "mafia" ? "dun" : "relief"); }
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
  sfx("click");
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
  sfx(yes ? "cock" : "click");
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
            h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
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

  const stage = playing ? crewStage(lineup, saidMap(r, ["chat", "defense"]), function (p) {
    const dead = alive.indexOf(p) < 0;
    let sub = null;
    if (roles && (seeAll || (myRole === "mafia" && roles[p] === "mafia"))) sub = ROLE[roles[p]].name;
    const voted = (r.status === "vote" && r.votes && r.votes[p]) || (r.status === "verdict" && r.verdict && r.verdict[p]);
    if (dead) return { cls: "dead", badge: "☠", sub: sub };
    if ((r.status === "defense" || r.status === "verdict") && r.accused === p) return { cls: "now", badge: "⚖", sub: sub };
    if (voted) return { cls: "ok", badge: "✓", badgeCls: "ok", sub: sub || "투표 완료" };
    return { sub: sub };
  }) : null;
  return h("section", { class: "screen room" + (r.status === "night" ? " is-night" : "") }, back, head,
    h("div", { class: "field" }, h("div", { class: "field-label", text: (playing ? "참가자 " + alive.length + "/" + lineup.length + "명 생존" : "모인 사람 " + lineup.length + "명") }), playing ? stage : chips),
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
  return h("div", { class: "field dock" }, h("div", { class: "field-label", text: ctx.myRole === "mafia" && r.status === "night" && ctx.iAlive ? "대화 · 지금은 마피아끼리만 보여요" : "대화" }), log, f);
}


/* ---------- 연상퀴즈: 힌트가 하나씩 열리고, 먼저 맞힐수록 고득점 ---------- */
const AQDUR = { clue: 60, reveal: 6 };
if (FAST) Object.keys(AQDUR).forEach(function (k) { AQDUR[k] = Math.max(2, Math.round(AQDUR[k] / FAST)); });
const AQ_HINTS = 5, AQ_TRIES = 3;
const AQ = { key: null, idx: -1 };
/* 오늘 나온 문제는 오늘 다시 안 나와요: 오늘 쓰인 방들의 기록을 모아서 빼요 */
function todayKey() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
async function usedToday(kind) {
  const out = [];
  try {
    const snap = await getDocs(query(collection(db, "rooms"), where("dayUsed.day", "==", todayKey())));
    snap.forEach(function (d) { ((d.data().dayUsed || {})[kind] || []).forEach(function (w) { out.push(w); }); });
  } catch (e) {}
  return out;
}
function dayPatch(r, kind, add) {
  const day = todayKey(), du = r.dayUsed && r.dayUsed.day === day ? r.dayUsed : { day: day };
  const o = Object.assign({ day: day }, du);
  o[kind] = (du[kind] || []).concat(add).slice(-800);
  return o;
}
function aqHintMs() { return FAST ? Math.max(1000, Math.round(10000 / FAST)) : 10000; }   /* 힌트는 10초마다, 다 열린 뒤 남은 시간은 마지막 고민 */
function aqHintIdx(r, now) {
  if (!r || r.status !== "clue") return AQ_HINTS - 1;
  if (!r.phaseAt || !r.phaseAt.toMillis) return 0;
  return Math.max(0, Math.min(AQ_HINTS - 1, Math.floor(((now || Date.now()) - phMs(r)) / aqHintMs())));
}
function aqPts(idx) { return [10, 8, 6, 4, 2][idx] || 2; }      /* 힌트 1개: 10점 … 5개: 2점 */
const AQ_RANK = [5, 3, 1];                                      /* 1등 +5, 2등 +3, 3등 +1 */
function aqRankBonus(n) { return AQ_RANK[n] || 0; }
function aqPick(roomUsed, today) {
  const all = AQ_BANK.map(function (_, i) { return i; });
  const notRoom = all.filter(function (i) { return (roomUsed || []).indexOf(AQ_BANK[i].a) < 0; });
  let pool = notRoom.filter(function (i) { return (today || []).indexOf(AQ_BANK[i].a) < 0; });
  if (!pool.length) pool = notRoom.length ? notRoom : all;
  return pool[Math.floor(Math.random() * pool.length)];
}
function aqCur(i) { const q = AQ_BANK[i]; return { i: i, a: q.a, alt: q.alt || [], h: q.h.slice(0, AQ_HINTS) }; }
function aqMatch(text, cur) {
  const t = normWord(text);
  return !!t && [cur.a].concat(cur.alt || []).some(function (w) { return normWord(w) === t; });
}
function aqLen(cur) { return Array.from(cur && cur.a || "").length; }
function aqDone(rr, solved, tries) {
  return (rr.lineup || []).every(function (p) { return solved.indexOf(p) >= 0 || (tries[p] || 0) >= AQ_TRIES; });
}
async function startAssoc() {
  try {
    const today = await usedToday("aq");
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 1) throw { code: "few" };
      const qi = aqPick([], today);
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, "🧠 연상퀴즈 시작! " + (r.qcount || 5) + "문제, 힌트가 " + Math.round(aqHintMs() / 1000) + "초마다 하나씩 열려요.");
      tx.update(roomRef(), nextPhase(r, {
        status: "clue", lineup: lineup, cur: aqCur(qi), usedQ: [AQ_BANK[qi].a], dayUsed: dayPatch(r, "aq", [AQ_BANK[qi].a]), qn: 0, total: r.qcount || 5,
        solved: [], tries: {}, pts: {}, scores: {}, game: game, startedAt: serverTimestamp()
      }));
    });
  } catch (e) {
    if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else if (e && e.code === "few") toast("방에 들어와 있는 사람이 없어요.");
    else toast(errText(e));
  }
}
async function aqToReveal(expectPhase, why) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "clue") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    sysMsg(tx, r, (why || "⏰ 시간 끝!") + " 정답은 ‘" + r.cur.a + "’");
    tx.update(roomRef(), nextPhase(r, { status: "reveal" }));
  });
}
async function aqNext(expectPhase) {
  const today = await usedToday("aq");
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "reveal") return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const next = (r.qn || 0) + 1;
    if (next >= (r.total || 5)) {
      sysMsg(tx, r, "🏁 연상퀴즈 끝! 점수를 확인하세요.");
      tx.update(roomRef(), nextPhase(r, { status: "result" }));
      return;
    }
    const qi = aqPick((r.usedQ || []).filter(function (x) { return typeof x === "string"; }), today);
    sysMsg(tx, r, "🧠 " + (next + 1) + "번째 문제!");
    tx.update(roomRef(), nextPhase(r, { status: "clue", qn: next, cur: aqCur(qi), usedQ: (r.usedQ || []).concat([AQ_BANK[qi].a]).slice(-80), dayUsed: dayPatch(r, "aq", [AQ_BANK[qi].a]), solved: [], tries: {}, pts: {} }));
  });
}
function assocTimeout(r) {
  if (r.status === "clue") return aqToReveal(r.phase);
  if (r.status === "reveal") return aqNext(r.phase);
}
async function aqGuess(text) {
  const me = meMember(), r = S.room;
  if (!me || !r) return;
  const canGuess = r.status === "clue" && (r.lineup || []).indexOf(me.id) >= 0 && (r.solved || []).indexOf(me.id) < 0 && ((r.tries || {})[me.id] || 0) < AQ_TRIES;
  if (!canGuess) { await sendMsg("chat", r.status === "clue" && r.cur ? maskAnswer(text, [r.cur.a].concat(r.cur.alt || [])) : text); return; }
  let result = null;
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const rr = snap.data();
    if (!rr || rr.status !== "clue" || rr.qn !== r.qn || rr.game !== r.game) throw { code: "late" };
    const solved = (rr.solved || []).slice(), tries = Object.assign({}, rr.tries || {});
    if (solved.indexOf(me.id) >= 0 || (tries[me.id] || 0) >= AQ_TRIES) throw { code: "used" };
    if (aqMatch(text, rr.cur)) {
      const idx = aqHintIdx(rr);
      const bonus = aqRankBonus(solved.length), pts = aqPts(idx) + bonus;
      const scores = Object.assign({}, rr.scores || {}), got = Object.assign({}, rr.pts || {});
      scores[me.id] = (scores[me.id] || 0) + pts; got[me.id] = pts;
      solved.push(me.id);
      sysMsg(tx, rr, "🎯 " + me.nick + "님 정답! 힌트 " + (idx + 1) + "개 보고 " + solved.length + "등으로 맞혔어요 (+" + pts + "점" + (bonus ? ", 순위 보너스 " + bonus + "점 포함" : "") + ")");
      const patch = { solved: solved, scores: scores, pts: got };
      if (aqDone(rr, solved, tries)) { sysMsg(tx, rr, "다 끝났어요! 정답은 ‘" + rr.cur.a + "’"); Object.assign(patch, nextPhase(rr, { status: "reveal" })); }
      tx.update(roomRef(), patch);
      result = { ok: true, pts: pts };
    } else {
      tries[me.id] = (tries[me.id] || 0) + 1;
      tx.set(doc(collection(db, "rooms", S.roomId, "msgs")), {
        uid: myUid(), memberId: me.id, nick: me.nick, text: text, kind: "guess", game: rr.game || 0, createdAt: serverTimestamp()
      });
      const patch = { tries: tries };
      if (aqDone(rr, solved, tries)) { sysMsg(tx, rr, "모두 기회를 다 썼어요. 정답은 ‘" + rr.cur.a + "’"); Object.assign(patch, nextPhase(rr, { status: "reveal" })); }
      tx.update(roomRef(), patch);
      result = { ok: false, left: AQ_TRIES - tries[me.id] };
    }
  });
  if (result && !result.ok) { sfx("sad"); toast(result.left ? "땡! 기회 " + result.left + "번 남았어요." : "땡! 이번 문제 기회를 다 썼어요."); }
}
/* a new hint opens: redraw and play a sound */
function aqTickHint(r) {
  if (r.status !== "clue") return;
  const key = r.id + ":" + r.phase, idx = aqHintIdx(r);
  if (AQ.key !== key) { AQ.key = key; AQ.idx = idx; return; }
  if (idx !== AQ.idx) { AQ.idx = idx; sfx("flip"); render(); return; }
  const w = document.querySelector(".aq-wait");
  if (w && r.phaseAt && r.phaseAt.toMillis) w.textContent = Math.max(1, Math.ceil((phMs(r) + (idx + 1) * aqHintMs() - Date.now()) / 1000)) + "초 뒤 공개";
}
function aqSlots(cur, show) {
  return h("div", { class: "aq-slots", "aria-label": "정답 " + aqLen(cur) + "글자" }, Array.from(cur.a).map(function (ch) {
    return h("span", { class: "aq-slot" + (show ? " open" : ""), text: show ? ch : "" });
  }));
}
function screenAssocLobby() {
  const me = meMember();
  const rooms = S.rooms.filter(function (r) { return roomAlive(r) && r.type === "assoc"; });
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
            h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  const sec = Math.round(aqHintMs() / 1000);
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-01" }), h("h2", { text: "연상퀴즈" }),
        h("p", { text: "힌트가 하나씩 열려요. 헷갈리는 힌트에서 먼저 맞힐수록 점수가 커요." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("assoc"); } },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    h("details", { class: "guide" },
      h("summary", { text: "연상퀴즈 규칙" }),
      h("div", { class: "guide-body" },
        h("ol", null,
          h("li", { text: "문제마다 정답 글자 수가 네모 칸으로 보여요." }),
          h("li", { text: "힌트는 " + sec + "초마다 하나씩, 모두 " + AQ_HINTS + "개 열려요. 앞쪽 힌트일수록 일부러 헷갈리게 만들었어요." }),
          h("li", { text: "대화창에 정답을 입력해요. 힌트 1개 보고 맞히면 10점, 2개 8점, 3개 6점, 4개 4점, 5개 2점이에요." }),
          h("li", { text: "맞힌 순서 보너스: 1등 +5점, 2등 +3점, 3등 +1점. 빨리 맞힐수록 점수 차이가 확 벌어져요!" }),
          h("li", { text: "한 문제에 기회는 " + AQ_TRIES + "번. 틀린 답은 말풍선으로 모두에게 보여요. 맞힌 답은 숨겨져요." }),
          h("li", { text: "모두 맞히거나 기회를 다 쓰면 바로 정답이 공개되고 다음 문제로 넘어가요." })))));
}
function aqLobbyPanel(r, me, inRoom, players) {
  function seg(value, label) {
    return h("button", { type: "button", "aria-pressed": (r.qcount || 5) === value ? "true" : "false",
      onclick: function () { roomUpdate({ qcount: value }); } }, label);
  }
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "게임 설정 · 참가자 누구나 바꿀 수 있어요" }),
    h("div", { class: "seg" }, seg(5, "5문제"), seg(10, "10문제"), seg(15, "15문제")),
    !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
      : inRoom
        ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", onclick: startAssoc, text: "게임 시작" }))
        : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
    h("p", { class: "hint", text: "혼자서도 할 수 있지만, 여럿이 하면 먼저 맞히기 싸움이 돼요. 단톡방에 ‘게임방 → 연상퀴즈에 방 열었어’라고 알려주세요." }));
}
function aqResultPanel(r) {
  const scores = r.scores || {};
  const rank = (r.lineup || []).slice().sort(function (a, b) { return (scores[b] || 0) - (scores[a] || 0); });
  const medal = ["🥇", "🥈", "🥉"];
  return h("div", { class: "answer team" },
    ceremony(rank[0], rank.slice(1), "연상퀴즈 우승 · " + (scores[rank[0]] || 0) + "점"),
    h("ul", { class: "role-list" }, rank.map(function (p, i) {
      return h("li", null, h("span", { text: (medal[i] || (i + 1) + "등") + " " + nickOf(p) }), h("b", { text: (scores[p] || 0) + "점" }));
    })),
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { go("game-assoc"); }, text: "방 목록" }),
      h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
}
function screenAssocRoom(r) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-assoc"); }, text: "연상퀴즈 방 목록" });
  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  const lineup = playing ? (r.lineup || []) : players;
  if (playing && r.status !== "result" && !r.cur) return h("section", { class: "screen" }, back, h("div", { class: "empty", text: "게임 정보를 읽지 못했어요." }),
    h("button", { type: "button", class: "ghost wide", onclick: backToLobby, text: "대기실로 돌리기" }));
  if (needsLateJoin(r)) lateJoin(r);
  const scores = r.scores || {}, solved = r.solved || [], tries = r.tries || {};
  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : ((r.qn || 0) + 1) + " / " + (r.total || 5) + "번째 문제";
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "연상퀴즈 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    h("span", { class: "mode-chip", text: ((playing ? r.total : r.qcount) || 5) + "문제" }));

  let body;
  if (r.status === "lobby") {
    body = [h("div", { class: "field" }, h("div", { class: "field-label", text: "모인 사람 " + lineup.length + "명" }),
      h("div", { class: "chips" }, lineup.map(function (p) { return h("span", { class: "chip static" + (me && p === me.id ? " me" : "") }, nickOf(p)); }))),
      aqLobbyPanel(r, me, inRoom, players)];
  } else if (r.status === "result") {
    body = [aqResultPanel(r)];
  } else {
    const cur = r.cur, idx = aqHintIdx(r), reveal = r.status === "reveal";
    const iSolved = me && solved.indexOf(me.id) >= 0;
    const myTries = me ? (tries[me.id] || 0) : 0;
    const isPlayer = me && lineup.indexOf(me.id) >= 0;
    let status = "";
    if (reveal) status = solved.length ? "맞힌 사람: " + solved.map(function (p) { return nickOf(p) + " +" + ((r.pts || {})[p] || 0); }).join(", ") : "아무도 못 맞혔어요.";
    else if (iSolved) status = "정답! +" + ((r.pts || {})[me.id] || 0) + "점 · 다른 사람을 기다리는 중";
    else if (isPlayer) status = myTries >= AQ_TRIES ? "기회를 다 썼어요. 다음 문제를 기다려요." : "남은 기회 " + "●".repeat(AQ_TRIES - myTries) + "○".repeat(myTries) + " · 지금 맞히면 " + (aqPts(idx) + aqRankBonus(solved.length)) + "점" + (aqRankBonus(solved.length) ? " (" + (solved.length + 1) + "등 보너스 포함)" : "");
    else status = "관전 중";
    const info = h("div", { class: "panel turn aq-info" + (reveal ? " reveal" : "") },
      timerEl(r, reveal ? "정답 공개 · 다음 문제까지" : "남은 시간"),
      h("div", { class: "aq-len" }, aqSlots(cur, reveal || iSolved), h("b", { text: aqLen(cur) + "글자" })),
      h("p", { class: "aq-status" + (iSolved ? " ok" : ""), text: status }));
    const hintMs = aqHintMs();
    const nextAt = !reveal && r.phaseAt && r.phaseAt.toMillis ? phMs(r) + (idx + 1) * hintMs : null;
    const hints = h("ol", { class: "aq-hints" }, cur.h.map(function (t, i) {
      const open = reveal || i <= idx;
      const wait = nextAt && i === idx + 1 ? Math.max(1, Math.ceil((nextAt - Date.now()) / 1000)) : null;
      return h("li", { class: (open ? "open" : "locked") + (!reveal && i === idx ? " new" : "") },
        h("span", { class: "aq-no", text: "힌트 " + (i + 1) }),
        h("span", { class: "aq-txt" + (wait ? " aq-wait" : ""), text: open ? t : wait ? wait + "초 뒤 공개" : "잠김" }),
        h("span", { class: "aq-pt", text: aqPts(i) + "점" }));
    }));
    const stage = crewStage(lineup, saidMap(r, ["chat", "guess"]), function (p) {
      const sub = (scores[p] || 0) + "점";
      if (solved.indexOf(p) >= 0) return { cls: "ok", badge: "✓", badgeCls: "ok", sub: sub };
      if ((tries[p] || 0) >= AQ_TRIES) return { cls: "out", badge: "✗", sub: sub };
      return { sub: sub };
    });
    body = [info, stage, hints];
  }
  return h("section", { class: "screen room aq" }, back, head, body, aqChat(r, me));
}
function aqChat(r, me) {
  const game = r.game || 0;
  const msgs = S.msgs.filter(function (m) { return (m.game || 0) === game; });
  const isPlayer = me && (r.lineup || []).indexOf(me.id) >= 0;
  const done = me && (r.solved || []).indexOf(me.id) >= 0;
  const used = me ? ((r.tries || {})[me.id] || 0) : 0;
  let ph = "대화 보내기", enabled = true;
  if (r.status === "clue") {
    if (!isPlayer) { ph = "게임 중에는 참가자만 입력할 수 있어요"; enabled = false; }
    else if (done) ph = "맞힌 사람도 수다 OK (정답은 자동으로 가려져요)";
    else if (used >= AQ_TRIES) ph = "기회는 다 썼지만 수다는 OK";
    else ph = "정답 입력 (기회 " + (AQ_TRIES - used) + "번)";
  }
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "sys" || m.kind === "skip") return h("div", { class: "msg-sys strong", text: m.text });
      const mine = me && m.memberId === me.id;
      return h("div", { class: "bubble chat" + (mine ? " mine" : "") + (m.kind === "guess" ? " wrong" : "") },
        h("div", { class: "b-meta" }, h("b", { text: m.nick || "손님" }), m.kind === "guess" ? h("span", { class: "b-tag", text: "오답" }) : null),
        h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "60", placeholder: ph, autocomplete: "off", disabled: !enabled });
  const guessing = r.status === "clue" && enabled && !done && used < AQ_TRIES;
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm" + (guessing ? " go" : ""), disabled: !enabled, text: guessing ? "제출" : "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = inp.value.trim(); if (!t || !S.user || !enabled) return;
    S.drafts["chat-text"] = ""; inp.value = "";
    try { await aqGuess(t); render(); }
    catch (e) { toast(e && e.code === "late" ? "아쉽게 시간이 지났어요." : e && e.code === "used" ? "이번 문제는 더 낼 수 없어요." : errText(e)); }
  });
  return h("div", { class: "field dock" }, h("div", { class: "field-label", text: r.status === "clue" ? "정답 맞히기 · 대화" : "대화" }), log, f);
}

/* ================= 신규 게임 공통 엔진: 라운드마다 모두 동시에 제출 → 결과 공개 → 다음 라운드 =================
   room: status lobby → q(제출) → rr(라운드 결과) → … → result.  r.q 문제, r.subs 제출, r.scores 누적, r.hist 기록 */
const RANKP = [100, 70, 50, 35, 25, 15, 10];
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffled(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function usedQs(r) { return (r.hist || []).map(function (x) { return x.q && x.q.key; }); }
function freshFrom(list, r, keyOf) { const used = usedQs(r); const f = list.filter(function (x) { return used.indexOf(keyOf(x)) < 0; }); return pick(f.length ? f : list); }
/* rank-based points for "faster / closer wins" games */
function rankPoints(entries, better) {
  /* ties share the same (higher) rank: two people with the same score get the same points */
  const ok = entries.slice().sort(better), pts = {};
  ok.forEach(function (e, i) { const tie = i > 0 && better(ok[i - 1], e) === 0; pts[e.m] = tie ? pts[ok[i - 1].m] : (RANKP[i] || 5); });
  return pts;
}
const MINORITY_Q = [
  ["짜장면", "짬뽕"], ["부먹", "찍먹"], ["여름", "겨울"], ["아침형 인간", "올빼미형 인간"], ["산", "바다"], ["강아지", "고양이"], ["치킨", "피자"],
  ["물냉", "비냉"], ["민초", "반민초"], ["카톡 바로 답장", "몰아서 답장"], ["라이어게임", "마피아"], ["두목한테 혼나기", "두목 몰래 땡땡이"],
  ["조직 회식 1차만", "끝까지 달리기"], ["단톡방 알림 ON", "알림 OFF"], ["드로잉퀴즈 화가", "드로잉퀴즈 맞히기"], ["순대 내장 O", "순대만"],
  ["팥붕어빵", "슈크림붕어빵"], ["엘리베이터 닫힘 버튼 누른다", "안 누른다"], ["영화관 팝콘 카라멜", "오리지널"], ["샤워 아침", "샤워 밤"],
  ["1억 받고 두목에게 반말 금지", "그냥 살기"], ["평생 라면 금지", "평생 치킨 금지"], ["투명인간 능력", "순간이동 능력"], ["과거로 가기", "미래로 가기"],
  ["깻잎 떼어주기 OK", "깻잎 떼어주기 NO"], ["양념치킨", "후라이드"], ["콜라", "사이다"], ["불주먹 조직 평생 막내", "다른 조직 두목"],
  ["월요일에 월급", "금요일에 월급"], ["택시", "지하철"], ["눈 오는 날 집콕", "눈 오는 날 외출"], ["노래방 탬버린 담당", "노래방 마이크 담당"]
];
const HEARING_Q = [
  ["두목 몰래 새로운 조직을 만들 것 같은 사람은?", "쿠데타 주동자"], ["조직 단톡방을 가장 자주 확인할 것 같은 사람은?", "단톡방 지박령"],
  ["무인도에서 가장 오래 살아남을 것 같은 사람은?", "무인도 생존왕"], ["게임에서 지면 가장 억울해할 것 같은 사람은?", "억울함 대표"],
  ["조직의 비밀을 실수로 말할 것 같은 사람은?", "1급 기밀 유출범"], ["몰래 혼자 게임 연습할 것 같은 사람은?", "비밀 특훈러"],
  ["회식 2차를 제일 먼저 외칠 것 같은 사람은?", "2차 선동꾼"], ["라이어게임에서 거짓말이 제일 자연스러운 사람은?", "구라의 신"],
  ["좀비 사태가 나면 제일 먼저 물릴 것 같은 사람은?", "1번 감염자"], ["갑자기 연락이 끊겨도 아무도 걱정 안 할 사람은?", "자유로운 영혼"],
  ["두목 자리를 노리고 있을 것 같은 사람은?", "차기 두목 후보"], ["돈이 생기면 제일 먼저 플렉스할 것 같은 사람은?", "플렉스 장인"],
  ["알람 5개 맞춰도 못 일어날 것 같은 사람은?", "잠꾸러기 대장"], ["조직원 생일을 제일 잘 챙길 것 같은 사람은?", "다정한 행동대장"],
  ["새벽 3시에 야식 먹자고 할 것 같은 사람은?", "야식 요정"], ["사진 찍을 때 제일 많이 찍어달라고 할 사람은?", "포토존 점령자"]
];
const SYNC_Q = [
  "야식 하면 가장 먼저 떠오르는 음식은?", "불주먹 하면 떠오르는 단어 하나", "겨울에 제일 먼저 생각나는 간식은?", "편의점에서 꼭 사는 것 하나",
  "조직원 중 가장 두목 같은 사람은?", "노래방 첫 곡으로 어울리는 가수는?", "가장 무서운 동물은?", "제일 좋아하는 라면 브랜드는?",
  "월요일 하면 떠오르는 감정은?", "크리스마스 하면 떠오르는 것 하나", "1부터 10 중 하나 (숫자로)", "빨간색 과일 하나",
  "여름 하면 떠오르는 것 하나", "치킨 하면 떠오르는 브랜드는?", "회식 장소 1순위 메뉴는?", "가장 웃긴 조직원은?"
];
const TYPING_TEXTS = [
  "불은 물로 끄면 되지만, 우린 못 꺼.", "가는 말이 고와야 오는 말이 곱다.", "티끌 모아 태산, 벼락치기 모아 재수.",
  "두목님 오늘도 무사히 퇴근하시길 바랍니다.", "낮말은 새가 듣고 밤말은 쥐가 듣고 단톡방은 모두가 본다.",
  "발 없는 말이 천 리 가고 카톡 캡처는 만 리 간다.", "드로잉퀴즈 화가는 그림으로만 말한다.", "원숭이도 나무에서 떨어질 때가 있다.",
  "빨리 담배피기 꼴찌는 킬러가 처리한다.", "고생 끝에 낙이 오고 월요일 끝에 화요일이 온다.", "백지장도 맞들면 낫다, 회식비는 나눠 내면 낫다.",
  "불주먹 조직원은 의리 하나로 버틴다.", "세 살 버릇 여든까지 간다는데 알람 끄는 버릇은 언제 고치나."
];
const PARTY = {
  minority: {
    rounds: 5, qSec: 15, input: "choice",
    rules: ["두 선택지 중 하나를 몰래 골라요. 15초 제한.", "더 적은 사람이 고른 쪽이 이겨요. 이긴 사람 +100점.", "양쪽이 같으면 무승부, 모두 같은 걸 고르면 전원 0점.", "5라운드 누적 점수로 우승. 탈락은 없어요."],
    makeQ: function (r) { const p = freshFrom(MINORITY_Q, r, function (x) { return x.join("|"); }); return { key: p.join("|"), text: "적게 고른 쪽이 이긴다!", opts: p }; },
    resolve: function (r) {
      const subs = r.subs || {}, a = [], b = [];
      r.lineup.forEach(function (m) { if (subs[m] === 0) a.push(m); else if (subs[m] === 1) b.push(m); });
      const pts = {}; let win = null;
      if (a.length && b.length && a.length !== b.length) { win = a.length < b.length ? 0 : 1; (win === 0 ? a : b).forEach(function (m) { pts[m] = 100; }); }
      return { pts: pts, info: { a: a, b: b, win: win } };
    },
    round: function (x) {
      const i = x.info;
      return [0, 1].map(function (k) {
        const who = k ? i.b : i.a;
        return h("div", { class: "pr-side" + (i.win === k ? " win" : "") }, h("b", { text: x.q.opts[k] + " · " + who.length + "명" + (i.win === k ? " 🏆" : "") }), h("span", { text: who.map(nickOf).join(", ") || "아무도 없음" }));
      }).concat([h("p", { class: "note", text: i.win == null ? (i.a.length && i.b.length ? "동점! 무승부예요." : "한쪽으로 몰렸어요. 전원 0점.") : "적게 고른 쪽 승리! +100점" })]);
    }
  },
  stash: {
    rounds: 5, qSec: 20, input: "number",
    rules: ["두목의 비자금을 몰래 나눠 가져요. 각자 원하는 금액을 비밀 입력.", "합계가 비자금 이하면 각자 쓴 만큼 점수, 넘으면 전원 0점!", "라운드마다 비자금 액수가 바뀌어요. 5라운드 누적."],
    makeQ: function (r) { const pot = pick([600, 1000, 1000, 1500, 2000, 3000, 777, 1234]); return { key: "pot" + (r.rn || 1), text: "두목의 비자금 " + pot.toLocaleString() + "코인", max: pot, unit: "코인" }; },
    resolve: function (r) {
      const subs = r.subs || {}, pot = r.q.max; let sum = 0;
      r.lineup.forEach(function (m) { sum += Math.max(0, Math.min(pot, +subs[m] || 0)); });
      const ok = sum <= pot, pts = {};
      if (ok) r.lineup.forEach(function (m) { pts[m] = Math.max(0, Math.min(pot, +subs[m] || 0)); });
      return { pts: pts, info: { sum: sum, ok: ok, pot: pot } };
    },
    round: function (x, r) {
      const i = x.info;
      return [h("p", { class: "pr-big " + (i.ok ? "ok" : "bad"), text: (i.ok ? "성공! " : "욕심이 과했다… 전원 0점! ") + "합계 " + i.sum.toLocaleString() + " / " + i.pot.toLocaleString() + "코인" }),
        h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { return h("li", null, h("span", { text: nickOf(m) }), h("b", { text: ((x.subs || {})[m] || 0).toLocaleString() + "코인" })); }))];
    }
  },
  beauty: {
    rounds: 5, qSec: 20, input: "number",
    rules: ["0~100 중 정수 하나를 몰래 골라요.", "모두의 평균 × 2/3에 가장 가까운 사람이 +100점.", "다들 어떻게 생각할지 한 수 앞을 읽어야 해요. 5라운드 누적."],
    makeQ: function (r) { return { key: "b" + (r.rn || 1), text: "0부터 100 사이, 평균의 2/3를 노려라", max: 100, unit: "" }; },
    resolve: function (r) {
      const subs = r.subs || {}, vals = r.lineup.filter(function (m) { return subs[m] != null && subs[m] !== ""; }).map(function (m) { return { m: m, v: Math.max(0, Math.min(100, Math.round(+subs[m]))) }; });
      if (!vals.length) return { pts: {}, info: { none: true } };
      const avg = vals.reduce(function (a, x) { return a + x.v; }, 0) / vals.length, target = avg * 2 / 3;
      let best = Infinity; vals.forEach(function (x) { x.d = Math.abs(x.v - target); best = Math.min(best, x.d); });
      const pts = {}; vals.forEach(function (x) { if (Math.abs(x.d - best) < 1e-9) pts[x.m] = 100; });
      return { pts: pts, info: { avg: avg, target: target, vals: vals } };
    },
    round: function (x) {
      const i = x.info; if (i.none) return [h("p", { class: "note", text: "아무도 숫자를 내지 않았어요." })];
      return [h("p", { class: "pr-big", text: "평균 " + i.avg.toFixed(2) + " × 2/3 = " + i.target.toFixed(2) }),
        h("ul", { class: "pr-list" }, i.vals.slice().sort(function (a, b) { return a.d - b.d; }).map(function (v) {
          return h("li", { class: x.pts[v.m] ? "win" : "" }, h("span", { text: nickOf(v.m) + " · " + v.v }), h("b", { text: "오차 " + v.d.toFixed(2) + (x.pts[v.m] ? " 🏆" : "") }));
        }))];
    }
  },
  loyalty: {
    rounds: 5, qSec: 15, input: "choice", pairs: true,
    rules: ["라운드마다 무작위 짝꿍이 정해져요. 홀수면 한 명씩 돌아가며 쉬어요.", "둘 다 협력: 각 100점 / 한 명만 배신: 배신자 200점, 협력자 0점 / 둘 다 배신: 0점.", "5라운드 뒤 점수와 협력률을 공개해요."],
    makeQ: function (r) {
      const sit = Object.assign({}, (r.ext || {}).sit || {});
      let order = shuffled(r.lineup), sitter = null;
      if (order.length % 2) {
        const min = Math.min.apply(null, order.map(function (m) { return sit[m] || 0; }));
        sitter = pick(order.filter(function (m) { return (sit[m] || 0) === min; }));
        order = order.filter(function (m) { return m !== sitter; });
      }
      const pairs = []; for (let i = 0; i + 1 < order.length; i += 2) pairs.push({ a: order[i], b: order[i + 1] });   /* Firestore can't hold nested arrays */
      return { key: "l" + (r.rn || 1), text: "짝꿍과 협력할까, 배신할까?", opts: ["🤝 협력", "🗡️ 배신"], pairs: pairs, sitter: sitter };
    },
    canSubmit: function (r, me) { return r.q.sitter !== me; },
    resolve: function (r) {
      const subs = r.subs || {}, pts = {}, ext = JSON.parse(JSON.stringify(r.ext || {}));
      ext.sit = ext.sit || {}; ext.c = ext.c || {}; ext.b = ext.b || {};
      if (r.q.sitter) ext.sit[r.q.sitter] = (ext.sit[r.q.sitter] || 0) + 1;
      r.q.pairs.forEach(function (pr) {
        const p = [pr.a, pr.b], a = subs[p[0]] === 1 ? 1 : 0, b = subs[p[1]] === 1 ? 1 : 0;   /* 안 낸 사람은 협력으로 쳐요 */
        [p[0], p[1]].forEach(function (m, k) { const v = k ? b : a; ext[v ? "b" : "c"][m] = (ext[v ? "b" : "c"][m] || 0) + 1; });
        if (!a && !b) { pts[p[0]] = 100; pts[p[1]] = 100; } else if (a && !b) pts[p[0]] = 200; else if (!a && b) pts[p[1]] = 200;
      });
      return { pts: pts, info: {}, ext: ext };
    },
    round: function (x) {
      const subs = x.subs || {};
      return x.q.pairs.map(function (pr) {
        return h("div", { class: "pr-pair" }, [pr.a, pr.b].map(function (m) {
          return h("span", { class: subs[m] === 1 ? "bad" : "ok" }, nickOf(m) + " " + (subs[m] === 1 ? "🗡️배신" : "🤝협력") + " +" + (x.pts[m] || 0));
        }));
      }).concat(x.q.sitter ? [h("p", { class: "note", text: nickOf(x.q.sitter) + "님은 이번 라운드 휴식" })] : []);
    },
    final: function (r) {
      const e = r.ext || {}, c = e.c || {}, b = e.b || {};
      return h("ul", { class: "pr-list" }, r.lineup.map(function (m) {
        const t = (c[m] || 0) + (b[m] || 0);
        return h("li", null, h("span", { text: nickOf(m) }), h("b", { text: "협력률 " + (t ? Math.round((c[m] || 0) / t * 100) : 0) + "% · 배신 " + (b[m] || 0) + "회" }));
      }));
    }
  },
  hearing: {
    rounds: 5, qSec: 20, input: "member", noScore: true,
    rules: ["질문에 가장 어울리는 조직원에게 익명으로 투표해요. 자기 자신은 못 골라요.", "득표수만 공개되고, 누가 누구를 찍었는지는 안 보여요.", "최다 득표자는 그 질문의 칭호를 받아요."],
    makeQ: function (r) { const q = freshFrom(HEARING_Q, r, function (x) { return x[0]; }); return { key: q[0], text: q[0], title: q[1] }; },
    resolve: function (r) {
      const subs = r.subs || {}, cnt = {};
      r.lineup.forEach(function (m) { const v = subs[m]; if (v && v !== m) cnt[v] = (cnt[v] || 0) + 1; });
      let max = 0; Object.keys(cnt).forEach(function (k) { max = Math.max(max, cnt[k]); });
      const top = max ? Object.keys(cnt).filter(function (k) { return cnt[k] === max; }) : [];
      return { pts: {}, info: { cnt: cnt, top: top }, hideSubs: true };
    },
    round: function (x, r) {
      const i = x.info, max = Math.max(1, Math.max.apply(null, [0].concat(Object.keys(i.cnt).map(function (k) { return i.cnt[k]; }))));
      return [i.top.length ? h("p", { class: "pr-big ok", text: "🏅 " + i.top.map(nickOf).join(", ") + " → ‘" + x.q.title + "’" }) : h("p", { class: "note", text: "표가 없었어요." }),
        h("ul", { class: "pr-bars" }, (r.lineup || []).slice().sort(function (a, b) { return (i.cnt[b] || 0) - (i.cnt[a] || 0); }).map(function (m) {
          const bar = h("i"); bar.style.width = ((i.cnt[m] || 0) / max * 100) + "%";
          return h("li", null, h("span", { text: nickOf(m) }), h("span", { class: "bar" }, bar), h("b", { text: (i.cnt[m] || 0) + "표" }));
        }))];
    },
    final: function (r) {
      return h("ul", { class: "pr-list" }, (r.hist || []).filter(function (x) { return x.info.top.length; }).map(function (x) {
        return h("li", null, h("span", { text: "🏅 " + x.q.title }), h("b", { text: x.info.top.map(nickOf).join(", ") }));
      }));
    }
  },
  balance: {
    rounds: 6, qSec: 15, input: "choice", noScore: true,
    rules: ["둘 중 하나를 골라요. 정답은 없어요!", "결과와 함께 누가 무엇을 골랐는지 공개돼요.", "끝나면 취향이 가장 잘 맞는 짝꿍을 알려줘요."],
    makeQ: function (r) { const p = freshFrom(MINORITY_Q, r, function (x) { return x.join("|"); }); return { key: p.join("|"), text: "당신의 선택은?", opts: p }; },
    resolve: function (r) {
      const subs = r.subs || {}, a = [], b = [];
      r.lineup.forEach(function (m) { if (subs[m] === 0) a.push(m); else if (subs[m] === 1) b.push(m); });
      return { pts: {}, info: { a: a, b: b, win: a.length === b.length ? null : a.length > b.length ? 0 : 1 } };
    },
    round: function (x) {
      const i = x.info;
      return [0, 1].map(function (k) {
        const who = k ? i.b : i.a;
        return h("div", { class: "pr-side" + (i.win === k ? " win" : "") }, h("b", { text: x.q.opts[k] + " · " + who.length + "명" }), h("span", { text: who.map(nickOf).join(", ") || "아무도 없음" }));
      });
    },
    final: function (r) {
      const L = r.lineup || [], same = {}; let best = null, bv = -1;
      for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
        let n = 0; (r.hist || []).forEach(function (x) { if (x.subs && x.subs[L[i]] != null && x.subs[L[i]] === x.subs[L[j]]) n++; });
        same[L[i] + "|" + L[j]] = n; if (n > bv) { bv = n; best = [L[i], L[j]]; }
      }
      return h("p", { class: "pr-big ok", text: best ? "💞 취향 일치 1위: " + nickOf(best[0]) + " & " + nickOf(best[1]) + " (" + bv + "/" + (r.hist || []).length + ")" : "" });
    }
  },
  sync: {
    rounds: 5, qSec: 25, input: "text",
    rules: ["같은 질문에 각자 몰래 답을 적어요.", "나와 같은 답을 쓴 사람이 있으면 점수! (같은 답 인원−1)×100점.", "띄어쓰기와 대소문자는 무시하고 비교해요."],
    makeQ: function (r) { const q = freshFrom(SYNC_Q, r, function (x) { return x; }); return { key: q, text: q }; },
    resolve: function (r) {
      const subs = r.subs || {}, groups = {};
      r.lineup.forEach(function (m) { const v = normWord(subs[m] || ""); if (v) (groups[v] = groups[v] || []).push(m); });
      const pts = {}; Object.keys(groups).forEach(function (k) { const g = groups[k]; if (g.length > 1) g.forEach(function (m) { pts[m] = (g.length - 1) * 100; }); });
      return { pts: pts, info: { groups: groups } };
    },
    round: function (x) {
      const g = x.info.groups, keys = Object.keys(g).sort(function (a, b) { return g[b].length - g[a].length; });
      return [h("ul", { class: "pr-list" }, keys.map(function (k) {
        const raw = (x.subs || {})[g[k][0]] || k;
        return h("li", { class: g[k].length > 1 ? "win" : "" }, h("span", { text: "“" + raw + "”" }), h("b", { text: g[k].map(nickOf).join(", ") + (g[k].length > 1 ? " +" + (g[k].length - 1) * 100 : "") }));
      }))];
    }
  },
  reflex: {
    rounds: 5, qSec: 12, input: "reflex",
    rules: ["화면이 ‘기다려…’에서 ‘지금!’으로 바뀌는 순간 화면(또는 스페이스바)을 눌러요.", "신호 전에 누르면 부정 출발로 0점.", "반응 시간은 각자 폰에서 재서 인터넷 속도와 상관없어요. 빠른 순서대로 100·70·50… 점."],
    makeQ: function (r) { return { key: "rf" + (r.rn || 1), text: "신호가 뜨면 바로 눌러!", delay: 1500 + Math.floor(Math.random() * 3500) }; },
    resolve: function (r) {
      const subs = r.subs || {}, ok = r.lineup.filter(function (m) { return typeof subs[m] === "number" && subs[m] > 0; }).map(function (m) { return { m: m, v: subs[m] }; });
      return { pts: rankPoints(ok, function (a, b) { return a.v - b.v; }), info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("ul", { class: "pr-list" }, (r.lineup || []).slice().sort(function (a, b) { const va = subs[a] > 0 ? subs[a] : 1e9, vb = subs[b] > 0 ? subs[b] : 1e9; return va - vb; }).map(function (m) {
        const v = subs[m];
        return h("li", { class: x.pts[m] === 100 ? "win" : "" }, h("span", { text: nickOf(m) }), h("b", { text: v > 0 ? v + "ms +" + (x.pts[m] || 0) : v === -1 ? "부정 출발 😵" : "미응답" }));
      }))];
    }
  },
  tensec: {
    rounds: 3, qSec: 40, input: "timer",
    rules: ["‘시작’을 누르고, 정확히 목표 시간이 됐다 싶을 때 ‘정지’를 눌러요.", "진행 시간은 안 보여요. 감으로만!", "오차가 작은 순서대로 100·70·50… 점."],
    makeQ: function (r) { return { key: "t" + (r.rn || 1), text: "정확히 " + (r.target || 10) + "초에 멈춰라", target: r.target || 10 }; },
    resolve: function (r) {
      const subs = r.subs || {}, T = (r.q.target || 10) * 1000;
      const ok = r.lineup.filter(function (m) { return typeof subs[m] === "number"; }).map(function (m) { return { m: m, v: Math.abs(subs[m] - T) }; });
      return { pts: rankPoints(ok, function (a, b) { return a.v - b.v; }), info: { T: T } };
    },
    round: function (x, r) {
      const subs = x.subs || {}, T = x.info.T;
      return [h("ul", { class: "pr-list" }, (r.lineup || []).slice().sort(function (a, b) { const da = typeof subs[a] === "number" ? Math.abs(subs[a] - T) : 1e12, db = typeof subs[b] === "number" ? Math.abs(subs[b] - T) : 1e12; return da - db; }).map(function (m) {
        const v = subs[m];
        return h("li", { class: x.pts[m] === 100 ? "win" : "" }, h("span", { text: nickOf(m) }), h("b", { text: typeof v === "number" ? (v / 1000).toFixed(3) + "초 (오차 " + (Math.abs(v - T) / 1000).toFixed(3) + ") +" + (x.pts[m] || 0) : "미응답" }));
      }))];
    }
  },
  typing: {
    rounds: 3, qSec: 60, input: "typing",
    rules: ["같은 문장이 나오면 똑같이 입력하고 Enter.", "속도(타/분)와 정확도를 함께 계산해요. 복사·붙여넣기는 안 돼요.", "점수가 높은 순서대로 100·70·50… 점."],
    makeQ: function (r) { const t = freshFrom(TYPING_TEXTS, r, function (x) { return x; }); return { key: t, text: t }; },
    resolve: function (r) {
      const subs = r.subs || {}, ok = r.lineup.filter(function (m) { return subs[m] && subs[m].score > 0; }).map(function (m) { return { m: m, v: subs[m].score }; });
      return { pts: rankPoints(ok, function (a, b) { return b.v - a.v; }), info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("ul", { class: "pr-list" }, (r.lineup || []).slice().sort(function (a, b) { return ((subs[b] || {}).score || 0) - ((subs[a] || {}).score || 0); }).map(function (m) {
        const v = subs[m];
        return h("li", { class: x.pts[m] === 100 ? "win" : "" }, h("span", { text: nickOf(m) }), h("b", { text: v ? v.cpm + "타 · 정확도 " + v.acc + "% · " + (v.ms / 1000).toFixed(1) + "초 +" + (x.pts[m] || 0) : "미완료" }));
      }))];
    }
  },
  croc: {
    rounds: 5, qSec: 12, input: "croc",
    rules: ["악어 이빨 중 하나가 꽝이에요. 차례대로 하나씩 눌러요 (차례당 12초).", "꽝을 누르면 악어 입이 꽉! 그 사람만 0점, 나머지는 +100점.", "5라운드 누적 점수로 우승."],
    makeQ: function (r) {
      const n = Math.max(8, Math.min(14, r.lineup.length * 2 + 2));
      return { key: "c" + (r.rn || 1), text: "꽝 이빨을 피해라!", teeth: n, bad: Math.floor(Math.random() * n), order: shuffled(r.lineup), turn: 0, picked: [] };
    },
    resolve: function (r) {
      const loser = r.q.loser || null, pts = {};
      r.lineup.forEach(function (m) { if (m !== loser) pts[m] = 100; });
      return { pts: pts, info: { loser: loser } };
    },
    round: function (x) {
      return [h("p", { class: "pr-big bad", text: x.info.loser ? "🐊 꽉! " + nickOf(x.info.loser) + " 당첨…" : "아무도 안 물렸어요." }), h("p", { class: "note", text: "살아남은 사람 +100점" })];
    }
  }
};

/* ================= 퀴즈방 ================= */
const CHO_LIST = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
function chosungOf(w) { return Array.from(w).map(function (ch) { const c = ch.charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3 ? CHO_LIST.charAt(Math.floor((c - 0xAC00) / 588)) : ch; }).join(""); }
function ansOk(v, a, alt) { const t = normWord(v); return !!t && [a].concat(alt || []).some(function (x) { return normWord(x) === t; }); }
/* correct answers: 50 + up to 50 for speed, +20 for the first correct one */
function quizPts(r, ok) {
  const subs = r.subs || {}, subT = r.subT || {}, lim = (PARTY[r.type].qSec || 20) * 1000, pts = {};
  const good = r.lineup.filter(function (m) { return subs[m] != null && ok(subs[m]); });
  good.sort(function (a, b) { return (subT[a] || 1e9) - (subT[b] || 1e9); });
  good.forEach(function (m, i) { pts[m] = 50 + Math.round(50 * Math.max(0, 1 - (subT[m] || lim) / lim)) + (i === 0 ? 20 : 0); });
  return { pts: pts, good: good };
}
function quizRound(x, r, answerText, extra) {
  const subs = x.subs || {};
  return [h("p", { class: "pr-big ok", text: "정답: " + answerText }), extra || null,
    h("ul", { class: "pr-list" }, (r.lineup || []).slice().sort(function (a, b) { return (x.pts[b] || 0) - (x.pts[a] || 0); }).map(function (m) {
      const v = subs[m], shown = v == null ? "미응답" : typeof v === "number" && x.q.opts ? x.q.opts[v] : String(v);
      return h("li", { class: x.pts[m] ? "win" : "" }, h("span", { text: nickOf(m) + " · " + shown }), h("b", { text: x.pts[m] ? "+" + x.pts[m] : "✗" }));
    }))];
}
/* schedule a redraw when the next timed hint should appear */
function hintStep(r, every, max) {
  if (!r.phaseAt || !r.phaseAt.toMillis) return 0;
  const el = Date.now() - phMs(r), k = Math.min(max, Math.floor(el / every));
  clearTimeout(S.hintT);
  if (k < max) S.hintT = setTimeout(render, every - (el % every) + 60);
  return k;
}
Object.assign(PARTY, {
  ox: {
    rounds: 7, qSec: 12, input: "choice", rules: ["문장이 맞으면 O, 틀리면 X. 12초 안에 골라요.", "맞히면 50점 + 빠를수록 최대 50점, 가장 먼저 맞히면 +20점.", "정답과 함께 해설이 나와요."],
    makeQ: function (r) { const x = freshFrom(OX_Q, r, function (q) { return q.q; }); return { key: x.q, text: x.q, opts: ["⭕  O", "❌  X"], ans: x.a ? 0 : 1, why: x.x }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return v === r.q.ans; }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.ans === 0 ? "O" : "X", h("p", { class: "note", text: "💡 " + x.q.why })); }
  },
  chosung: {
    rounds: 7, qSec: 25, input: "text", rules: ["초성과 주제를 보고 단어를 맞혀요. 25초.", "맞히면 50점 + 빠를수록 최대 50점, 1등은 +20점.", "10초가 지나면 첫 글자가 공개돼요. 답은 마감 전까지 고칠 수 있어요."],
    makeQ: function (r) { const x = freshFrom(CHOSUNG_Q, r, function (q) { return q.a; }); return { key: x.a, text: chosungOf(x.a), cat: x.c, ans: x.a }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return ansOk(v, r.q.ans); }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.ans); },
    extra: function (r) { const k = hintStep(r, 10000, 1); return h("p", { class: "pq-hint", text: "주제: " + r.q.cat + (k ? " · 첫 글자 ‘" + Array.from(r.q.ans)[0] + "’" : "") + " · " + Array.from(r.q.ans).length + "글자" }); }
  },
  trivia: {
    rounds: 7, qSec: 15, input: "choice", rules: ["보기 4개 중 정답을 골라요. 15초.", "맞히면 50점 + 빠를수록 최대 50점, 1등은 +20점."],
    makeQ: function (r) { const x = freshFrom(TRIVIA_Q, r, function (q) { return q.q; }); return { key: x.q, text: "[" + x.c + "] " + x.q, opts: x.o, ans: x.a }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return v === r.q.ans; }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.opts[x.q.ans]); }
  },
  proverb: {
    rounds: 7, qSec: 20, input: "text", rules: ["속담·관용구의 앞부분을 보고 뒷부분을 입력해요. 20초.", "띄어쓰기는 무시해요. 맞히면 50점 + 속도 보너스."],
    makeQ: function (r) { const x = freshFrom(PROVERB_Q, r, function (q) { return q.q; }); return { key: x.q, text: "“" + x.q + " ______”", ans: x.a, alt: x.alt || [] }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return ansOk(v, r.q.ans, r.q.alt); }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.ans); }
  },
  movie: {
    rounds: 5, qSec: 30, input: "text", rules: ["힌트가 10초마다 하나씩, 3개까지 열려요.", "영화 제목을 맞혀요(띄어쓰기 무시). 빨리 맞힐수록 고득점."],
    makeQ: function (r) { const x = freshFrom(MOVIE_Q, r, function (q) { return q.a; }); return { key: x.a, text: "이 영화는?", hints: x.h, ans: x.a, alt: x.alt || [] }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return ansOk(v, r.q.ans, r.q.alt); }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.ans); },
    extra: function (r) { const k = hintStep(r, 10000, 2); return h("ol", { class: "aq-hints" }, r.q.hints.map(function (t, i) { return h("li", { class: i <= k ? "open" : "locked" }, h("span", { class: "aq-no", text: "힌트 " + (i + 1) }), h("span", { class: "aq-txt", text: i <= k ? t : "잠김" }), h("span")); })); }
  },
  music: {
    rounds: 5, qSec: 30, input: "text", rules: ["멜로디를 듣고 곡 제목을 맞혀요. 🔊 소리를 켜 주세요.", "저작권이 끝난 동요·민요·클래식·캐롤을 직접 연주해요. 다시 듣기는 언제든.", "빨리 맞힐수록 고득점."],
    makeQ: function (r) { const x = freshFrom(MELODY_Q, r, function (q) { return q.a; }); return { key: x.a, text: "이 노래 제목은?", n: x.n, bpm: x.bpm, ans: x.a, alt: x.alt || [] }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return ansOk(v, r.q.ans, r.q.alt); }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, x.q.ans); },
    extra: function (r) {
      const key = r.id + ":" + r.phase;
      if (S.melKey !== key) { S.melKey = key; setTimeout(function () { playMelody(r.q); }, 400); }
      return h("button", { type: "button", class: "px-btn", onclick: function () { playMelody(r.q); }, text: "🔁 다시 듣기" });
    }
  },
  zoom: {
    rounds: 5, qSec: 20, input: "name", rules: ["조직원 사진을 크게 확대한 조각이 나와요. 시간이 갈수록 점점 멀어져요.", "누구인지 이름을 골라요. 빨리 맞힐수록 고득점."],
    makeQ: function (r) {
      const pool = S.members.filter(function (m) { return safePhoto(m.photo); });
      const m = freshFrom(pool.length ? pool : S.members, r, function (x) { return x.id; });
      return { key: m.id, text: "이 사진의 주인은?", who: m.id, fx: 20 + Math.floor(Math.random() * 60), fy: 15 + Math.floor(Math.random() * 55) };
    },
    resolve: function (r) { const q = quizPts(r, function (v) { return v === r.q.who; }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, nickOf(x.q.who)); },
    extra: function (r) {
      const m = findMember(r.q.who) || {}, box = h("div", { class: "zoom-box" }, photoBox(m));
      const left = phaseEnd(r) != null ? Math.max(0, phaseEnd(r) - Date.now()) : 0, total = (PARTY.zoom.qSec) * 1000;
      const scale = 1 + 7 * (left / total);
      box.style.setProperty("--fx", r.q.fx + "%"); box.style.setProperty("--fy", r.q.fy + "%");
      const inner = box.firstChild; inner.style.transformOrigin = r.q.fx + "% " + r.q.fy + "%"; inner.style.transform = "scale(" + scale.toFixed(2) + ")";
      requestAnimationFrame(function () { inner.style.transition = "transform " + Math.max(0, left / 1000).toFixed(1) + "s linear"; inner.style.transform = "scale(1)"; });
      return box;
    }
  },
  price: {
    rounds: 5, qSec: 25, input: "number", rules: ["두목이 등록한 상품의 가격을 맞혀요.", "실제 가격에 가까운 순서대로 100·70·50… 점. 딱 맞히면 +50점 보너스!", "가격은 두목이 적은 기준(날짜·장소)으로 판정해요."],
    canStart: function () { return priceList().length >= 3 ? null : "두목이 상품을 3개 이상 등록해야 시작할 수 있어요."; },
    makeQ: function (r) { const x = freshFrom(priceList(), r, function (q) { return q.name; }); return { key: x.name, text: x.name + " 의 가격은?", ans: x.price, basis: x.basis, max: 100000000, unit: "원" }; },
    resolve: function (r) {
      const subs = r.subs || {}, ok = r.lineup.filter(function (m) { return typeof subs[m] === "number"; }).map(function (m) { return { m: m, v: Math.abs(subs[m] - r.q.ans) }; });
      const pts = rankPoints(ok, function (a, b) { return a.v - b.v; });
      ok.forEach(function (e) { if (e.v === 0) pts[e.m] += 50; });
      return { pts: pts, info: {} };
    },
    round: function (x, r) {
      return quizRound(x, r, x.q.ans.toLocaleString() + "원", h("p", { class: "note", text: "기준: " + (x.q.basis || "두목 기준") }));
    }
  },
  memory: {
    rounds: 5, qSec: 30, input: "memory", rules: ["기호 배열이 잠깐 보였다가 사라져요. 순서대로 눌러서 맞혀요.", "라운드가 갈수록 배열이 길어져요. 다 맞히면 100점 + 속도 보너스, 틀리면 맞힌 칸까지 10점씩."],
    makeQ: function (r) {
      const sym = ["🔥", "👊", "💣", "🍗", "🎲", "⭐", "🐊", "💰"], n = 3 + (r.rn || 1) + (r.rn > 3 ? 1 : 0), seq = [];
      for (let i = 0; i < n; i++) seq.push(Math.floor(Math.random() * sym.length));
      return { key: "m" + r.rn, text: n + "개를 기억하세요!", sym: sym, seq: seq, show: 1500 + n * 450 };
    },
    resolve: function (r) {
      const subs = r.subs || {}, subT = r.subT || {}, lim = 30000, pts = {}, seq = r.q.seq;
      r.lineup.forEach(function (m) {
        const v = subs[m]; if (!Array.isArray(v)) return;
        let k = 0; while (k < seq.length && v[k] === seq[k]) k++;
        pts[m] = k === seq.length && v.length === seq.length ? 100 + Math.round(40 * Math.max(0, 1 - (subT[m] || lim) / lim)) : k * 10;
        if (!pts[m]) delete pts[m];
      });
      return { pts: pts, info: {} };
    },
    round: function (x, r) { return quizRound(x, r, x.q.seq.map(function (i) { return x.q.sym[i]; }).join(" ")); }
  }
});
/* boss-only list editors stored in config/{doc} as plain text lines */
function listEditor(docId, field, title, hint, placeholder) {
  const key = "ed-" + docId, cur = (S.cfg[docId] || {})[field] || "";
  if (S.drafts[key] == null) S.drafts[key] = cur;
  const ta = draft("textarea", key, { class: "gb-in", placeholder: placeholder });
  return h("div", { class: "panel" }, h("div", { class: "field-label", text: "두목 전용 · " + title }),
    h("p", { class: "hint", text: hint }), ta,
    h("button", { type: "button", class: "save", onclick: async function () {
      try { const o = {}; o[field] = S.drafts[key] || ""; o.updatedAt = serverTimestamp(); await setDoc(doc(db, "config", docId), o); toast("저장했어요."); } catch (e) { toast(errText(e)); }
    }, text: "저장" }));
}
PARTY.price.editor = function () {
  return listEditor("prices", "text", "가격 문제 등록", "한 줄에 하나씩 ‘상품|가격|기준’ 형식으로 적어요. 기준에는 날짜와 장소를 써 주세요.", "예: 편의점 참치마요 삼각김밥|1500|2025년 11월 ○○편의점");
};
function priceList() {
  return String((S.cfg.prices || {}).text || "").split("\n").map(function (l) {
    const p = l.split("|"); const price = parseInt(String(p[1] || "").replace(/[^0-9]/g, ""), 10);
    return p[0] && p[0].trim() && price > 0 ? { name: p[0].trim(), price: price, basis: (p[2] || "").trim() } : null;
  }).filter(Boolean);
}
/* synthesized melody for the music quiz (public-domain tunes) */
function playMelody(q) {
  const c = ac(); if (!c || !q || !q.n) return;
  const beat = 60 / (q.bpm || 110), t0 = c.currentTime + 0.05, t = q.n.trim().split(/\s+/);
  let at = 0;
  for (let i = 0; i + 1 < t.length; i += 2) {
    const len = parseFloat(t[i + 1]) * beat, m = /^([A-G])(#|b)?(\d)$/.exec(t[i]);
    if (m) {
      const midi = 12 * (+m[3] + 1) + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
      tone(midiHz(midi), Math.max(0.12, len * 0.9), { type: "triangle", gain: 0.16, at: t0 - c.currentTime + at });
      tone(midiHz(midi), Math.max(0.12, len * 0.9), { type: "square", gain: 0.025, at: t0 - c.currentTime + at });
    }
    at += len;
  }
}
/* memory game: show, hide, tap the sequence */
function memoryPanel(r, me) {
  const key = r.id + ":" + r.phase, q = r.q;
  if (lpReset(key)) { LP.state = "show"; LP.ans = []; LP.timer = setTimeout(function () { if (LP.key === key) { LP.state = "input"; LP.t0 = Date.now(); render(); } }, q.show); }
  const done = (r.subs || {})[me.id] != null;
  if (done) return h("div", { class: "rf-pad done", text: "제출 완료! 결과를 기다려요" });
  if (LP.state === "show") return h("div", { class: "mem-show" }, q.seq.map(function (i) { return h("span", { text: q.sym[i] }); }));
  return h("div", { class: "mem-in" },
    h("div", { class: "mem-ans" }, q.seq.map(function (_, k) { return h("span", { text: LP.ans[k] != null ? q.sym[LP.ans[k]] : "?" }); })),
    h("div", { class: "mem-pad" }, q.sym.map(function (s, i) {
      return h("button", { type: "button", class: "px-btn", text: s, onclick: function () { if (LP.ans.length < q.seq.length) { LP.ans.push(i); sfx("click"); render(); } } });
    })),
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { LP.ans.pop(); render(); }, text: "⌫ 지우기" }),
      h("button", { type: "button", class: "go", disabled: LP.ans.length !== q.seq.length, onclick: function () { if (!LP.sent) { LP.sent = true; pSubmit(LP.ans.slice()); } }, text: "제출" })));
}


/* ================= 친목실 · 운빨존 ================= */
const DRIP_Q = [
  "두목이 갑자기 단톡방에 '다들 잠깐 모여'라고 보냈다. 첫 번째 답장은?", "불주먹 조직 신입 면접 마지막 질문은?", "라이어게임에서 들켰을 때 할 수 있는 최고의 변명은?",
  "마피아인데 의사에게 살려달라고 부탁하는 한마디", "새벽 3시, 조직원이 '자?'라고 보냈다. 진짜 용건은?", "회식에서 부장님 건배사 차례가 나에게 왔다. 한마디!",
  "드로잉퀴즈 화가가 그림을 너무 못 그렸다. 화가의 변명은?", "불주먹 조직 공식 슬로건 2탄을 만든다면?", "택배 기사님께 남기는 가장 불주먹스러운 배송 메모",
  "두목 생일 선물로 절대 주면 안 되는 것", "타임머신을 타고 1년 전 나에게 한마디만 할 수 있다면?", "조직 비밀 아지트의 와이파이 비밀번호는?",
  "편의점 알바생에게 들은 가장 황당한 말", "좀비 사태가 터졌다. 불주먹 조직의 첫 번째 행동 강령은?", "AI가 조직원 한 명을 대신한다면 들킬 결정적 한마디는?",
  "게임에서 지고 '한 판 더'를 외치는 조직원의 진짜 속마음", "고양이가 불주먹 조직에 가입하려면 필요한 자격 요건은?"
];
const FAKE_Q = [
  { q: "‘사과’를 프랑스어로 직역하면 ‘pomme’. 그럼 감자(pomme de terre)를 직역하면?", a: "땅의 사과" },
  { q: "문어는 위험을 느끼면 무엇을 뿜을까?", a: "먹물" },
  { q: "‘홍어’를 오래 삭히면 나는 냄새의 주성분은?", a: "암모니아" },
  { q: "판다가 하루 대부분을 쓰는 활동은 먹기와 무엇?", a: "잠" },
  { q: "엘리베이터 ‘닫힘’ 버튼이 처음부터 없던 나라로 알려진 곳의 별명 버튼은? (질문이 이상하면 그럴듯하게!) 정답: 미국은 ‘닫힘’ 버튼이 OO 용으로만 작동하는 경우가 많다", a: "소방관" },
  { q: "토마토케첩은 원래 어떤 용도로 팔렸었다고 알려져 있을까?", a: "약" },
  { q: "샴푸의 어원이 된 말 ‘champo’는 원래 무슨 뜻?", a: "마사지" },
  { q: "고대 로마 병사들이 월급 일부로 받았다는 물건은?", a: "소금" },
  { q: "코알라가 하루에 자는 시간은 약 몇 시간?", a: "20시간" },
  { q: "달팽이는 최대 몇 년까지 잠을 잘 수 있다고 알려져 있을까?", a: "3년" },
  { q: "세계 최초의 컴퓨터 ‘버그’는 실제로 무엇이었을까?", a: "나방" },
  { q: "얼음이 물에 뜨는 이유는 얼면서 무엇이 커지기 때문?", a: "부피" },
  { q: "벌새가 1초에 날갯짓하는 횟수는 대략?", a: "80번" },
  { q: "오징어의 피는 무슨 색?", a: "파란색" },
  { q: "‘마요네즈’라는 이름은 어느 섬의 지명에서 왔다는 설이 유력할까?", a: "메노르카" },
  { q: "펭귄 수컷이 암컷에게 청혼할 때 선물한다는 것은?", a: "조약돌" },
  { q: "사람이 평생 먹는 거미 수에 대한 유명한 소문(사실은 거짓)의 숫자는?", a: "8마리" },
  { q: "초콜릿이 처음 유럽에 들어왔을 때의 형태는?", a: "음료" }
].filter(function (x) { return x.q.indexOf("질문이 이상하면") < 0; });
const MEME_Q = ["월요일 아침 출근길", "단톡방에 사진을 잘못 보냈을 때", "마피아로 지목당한 순간", "다이어트 첫날 밤 11시", "두목한테 들킨 순간", "게임에서 1등 했을 때", "월급날 통장을 확인하며", "라이어인데 제시어를 맞혔을 때", "회식 2차를 외치는 순간"];
const CONFESS_Q = ["아무도 모르는 나의 사소한 습관", "최근에 혼자 몰래 한 일", "나만 아는 이상한 취향", "어릴 때 진짜 믿었던 것", "가장 최근에 산 쓸데없는 물건", "남들은 모르는 나의 작은 자랑", "게임하다 몰래 했던 반칙(?)", "요즘 빠져 있는 것"];
const PROFILE_Q = ["내 최애 라면은?", "무인도에 가져갈 한 가지는?", "가장 좋아하는 계절과 이유", "노래방 18번 곡은?", "평생 한 가지 음식만 먹는다면?", "내가 동물이라면?", "로또 1등 되면 제일 먼저 할 일", "주말에 제일 많이 하는 것", "최애 게임은?", "가장 무서워하는 것"];
const NOVEL_START = ["어느 날 불주먹 조직의 아지트 문이 저절로 열렸다.", "두목의 비자금 금고가 텅 비어 있었다.", "단톡방에 정체불명의 사진 한 장이 올라왔다.", "크리스마스 이브, 조직원 한 명이 사라졌다."];
function guessWhoDef(bank, label, rules) {
  return {
    rounds: 5, qSec: 40, vSec: 25, input: "text", vote: true, voteInput: "member", rules: rules,
    makeQ: function (r) { const p = freshFrom(bank, r, function (x) { return x; }); return { key: p, text: p, long: true }; },
    cands: function (r) {
      const subs = r.subs || {}, own = r.lineup.filter(function (m) { return subs[m]; });
      const pick = own.length ? own[Math.floor(Math.random() * own.length)] : null;
      return pick ? [{ id: "c0", text: String(subs[pick]), owner: pick }] : [];
    },
    voters: function (r) { const c = (r.cands || [])[0]; return r.lineup.filter(function (m) { return !c || m !== c.owner; }); },
    resolve: function (r) {
      const c = (r.cands || [])[0], votes = r.votes || {}, pts = {};
      if (!c) return { pts: {}, info: { none: true } };
      let fooled = 0;
      Object.keys(votes).forEach(function (m) { if (votes[m] === c.owner) pts[m] = 100; else fooled++; });
      if (fooled) pts[c.owner] = 50 * fooled;
      return { pts: pts, info: { owner: c.owner, text: c.text } };
    },
    round: function (x, r) {
      if (x.info.none) return [h("p", { class: "note", text: "아무도 적지 않았어요." })];
      const votes = x.votes || {}, subs = x.subs || {};
      return [h("p", { class: "pr-quote", text: "“" + x.info.text + "”" }), h("p", { class: "pr-big ok", text: "작성자: " + nickOf(x.info.owner) }),
        h("ul", { class: "pr-list" }, Object.keys(votes).map(function (m) { return h("li", { class: votes[m] === x.info.owner ? "win" : "" }, h("span", { text: nickOf(m) + " → " + nickOf(votes[m]) }), h("b", { text: votes[m] === x.info.owner ? "+100" : "✗" })); })),
        x.pts[x.info.owner] ? h("p", { class: "note", text: nickOf(x.info.owner) + "님은 속인 사람 수만큼 +" + x.pts[x.info.owner] }) : null,
        h("details", { class: "guide" }, h("summary", { text: "다른 사람들의 " + label + " (작성자 비공개)" }), h("ul", { class: "guide-body" }, (r.lineup || []).filter(function (m) { return subs[m] && m !== x.info.owner; }).map(function (m) { return h("li", { text: "“" + subs[m] + "”" }); })))];
    }
  };
}
function voteWriteDef(o) {
  return Object.assign({
    rounds: 5, qSec: 45, vSec: 25, input: "text", vote: true,
    cands: function (r) {
      const subs = r.subs || {};
      return shuffled(r.lineup.filter(function (m) { return subs[m]; })).map(function (m, i) { return { id: "c" + i, text: String(subs[m]), owner: m }; });
    },
    resolve: function (r) {
      const votes = r.votes || {}, cands = r.cands || [], cnt = {}, pts = {};
      Object.keys(votes).forEach(function (m) { const c = cands.find(function (x) { return x.id === votes[m]; }); if (c && c.owner !== m) cnt[c.owner] = (cnt[c.owner] || 0) + 1; });
      Object.keys(cnt).forEach(function (m) { pts[m] = cnt[m] * 100; });
      return { pts: pts, info: { cnt: cnt } };
    },
    round: function (x) {
      const cnt = x.info.cnt || {};
      return [h("ul", { class: "pr-list" }, (x.cands || []).slice().sort(function (a, b) { return (cnt[b.owner] || 0) - (cnt[a.owner] || 0); }).map(function (c) {
        return h("li", { class: cnt[c.owner] ? "win" : "" }, h("span", { text: "“" + c.text + "” — " + nickOf(c.owner) }), h("b", { text: (cnt[c.owner] || 0) + "표" }));
      }))];
    }
  }, o);
}
Object.assign(PARTY, {
  drip: voteWriteDef({
    rules: ["상황이 나오면 가장 웃긴 답을 적어요(45초).", "모든 답이 익명으로 공개되면, 내 것 빼고 가장 웃긴 답에 투표해요.", "받은 표 1개당 100점."],
    makeQ: function (r) { const p = freshFrom(DRIP_Q, r, function (x) { return x; }); return { key: p, text: p, long: true }; }
  }),
  meme: voteWriteDef({
    rules: ["조직원 사진 한 장과 상황이 나와요. 가장 웃긴 자막을 달아요.", "익명 투표로 최고의 짤을 뽑아요. 표 1개당 100점."],
    makeQ: function (r) {
      const pool = S.members.filter(function (m) { return safePhoto(m.photo); }), m = pick(pool.length ? pool : S.members), sit = pick(MEME_Q);
      return { key: m.id + sit, text: "상황: " + sit, who: m.id, long: true };
    },
    extra: function (r) { return memePic(r.q.who); },
    round: function (x) {
      const cnt = x.info.cnt || {};
      return (x.cands || []).slice().sort(function (a, b) { return (cnt[b.owner] || 0) - (cnt[a.owner] || 0); }).map(function (c) {
        return h("div", { class: "meme-card" + (cnt[c.owner] ? " win" : "") }, memePic(x.q.who, c.text), h("p", { class: "note", text: nickOf(c.owner) + " · " + (cnt[c.owner] || 0) + "표" }));
      });
    }
  }),
  fakeans: Object.assign(voteWriteDef({
    rules: ["생소한 질문이 나와요. 정답처럼 보이는 가짜 답을 적어요.", "진짜 정답과 가짜 답이 섞여 나오면, 진짜를 찾아 투표해요.", "진짜를 고르면 +100, 내 가짜에 누가 속으면 1명당 +50."],
    makeQ: function (r) { const x = freshFrom(FAKE_Q, r, function (q) { return q.q; }); return { key: x.q, text: x.q, ans: x.a, long: true }; },
    cands: function (r) {
      const subs = r.subs || {}, list = r.lineup.filter(function (m) { return subs[m] && !ansOk(subs[m], r.q.ans); }).map(function (m) { return { text: String(subs[m]), owner: m }; });
      list.push({ text: r.q.ans, owner: "__real" });
      return shuffled(list).map(function (c, i) { return Object.assign({ id: "c" + i }, c); });
    },
    resolve: function (r) {
      const votes = r.votes || {}, cands = r.cands || [], pts = {}, subs = r.subs || {};
      r.lineup.forEach(function (m) { if (subs[m] && ansOk(subs[m], r.q.ans)) pts[m] = 100; });   /* 진짜를 알고 썼다면 */
      Object.keys(votes).forEach(function (m) {
        const c = cands.find(function (x) { return x.id === votes[m]; }); if (!c || c.owner === m) return;
        if (c.owner === "__real") pts[m] = (pts[m] || 0) + 100; else pts[c.owner] = (pts[c.owner] || 0) + 50;
      });
      return { pts: pts, info: {} };
    },
    round: function (x) {
      const votes = x.votes || {};
      return [h("p", { class: "pr-big ok", text: "진짜 정답: " + x.q.ans }), h("ul", { class: "pr-list" }, (x.cands || []).map(function (c) {
        const who = Object.keys(votes).filter(function (m) { return votes[m] === c.id; });
        return h("li", { class: c.owner === "__real" ? "win" : "" }, h("span", { text: "“" + c.text + "” — " + (c.owner === "__real" ? "진짜" : nickOf(c.owner) + "의 가짜") }), h("b", { text: who.map(nickOf).join(", ") || "-" }));
      }))];
    }
  })),
  confess: guessWhoDef(CONFESS_Q, "고백", ["주제에 맞는 가벼운 TMI를 적어요(민감한 이야기는 쓰지 마세요).", "그중 하나가 공개되면 작성자를 추리해요. 맞히면 +100.", "작성자는 속인 사람 1명당 +50."]),
  profile: guessWhoDef(PROFILE_Q, "답", ["나에 대한 질문에 솔직하게 답해요.", "누구의 답인지 맞히면 +100, 작성자는 속인 사람 1명당 +50.", "서로 몰랐던 취향을 알아가는 게임이에요."]),
  whosaid: {
    rounds: 5, qSec: 20, input: "name", rules: ["두목이 등록한 조직원 명언이 나와요. 누가 한 말인지 맞혀요.", "맞히면 50점 + 속도 보너스, 1등 +20."],
    canStart: function () { return quoteList().length >= 3 ? null : "두목이 명언을 3개 이상 등록해야 시작할 수 있어요."; },
    makeQ: function (r) { const x = freshFrom(quoteList(), r, function (q) { return q.text; }); return { key: x.text, text: "“" + x.text + "”", who: x.who, long: true }; },
    resolve: function (r) { const q = quizPts(r, function (v) { return v === r.q.who; }); return { pts: q.pts, info: {} }; },
    round: function (x, r) { return quizRound(x, r, nickOf(x.q.who)); },
    editor: function () { return listEditor("quotes", "text", "명언 등록", "한 줄에 하나씩 ‘닉네임|한 말’ 형식으로 적어요. 본인이 허락한 말만 올려 주세요.", "예: 효니|오늘은 진짜 일찍 잔다"); }
  },
  rankguess: {
    rounds: 5, qSec: 20, input: "member", selfOk: true, rules: ["질문에 어울리는 조직원을 한 명 골라요(나 자신도 가능).", "모두의 선택 중 1위가 된 사람을 골랐으면 +100!", "남들이 누구를 고를지 예측하는 눈치 싸움이에요."],
    makeQ: function (r) { const q = freshFrom(HEARING_Q, r, function (x) { return x[0]; }); return { key: q[0], text: q[0] }; },
    resolve: function (r) {
      const subs = r.subs || {}, cnt = {};
      r.lineup.forEach(function (m) { if (subs[m]) cnt[subs[m]] = (cnt[subs[m]] || 0) + 1; });
      let max = 0; Object.keys(cnt).forEach(function (k) { max = Math.max(max, cnt[k]); });
      const top = Object.keys(cnt).filter(function (k) { return cnt[k] === max; }), pts = {};
      r.lineup.forEach(function (m) { if (subs[m] && top.indexOf(subs[m]) >= 0) pts[m] = 100; });
      return { pts: pts, info: { cnt: cnt, top: top } };
    },
    round: function (x, r) { return PARTY.hearing.round(x, r).concat([h("p", { class: "note", text: "1위를 맞힌 사람 +100" })]); }
  },
  novel: {
    rounds: 5, qSec: 45, input: "text", noScore: true, rules: ["사람 수만큼 이야기가 동시에 이어져요. 매 라운드 다른 이야기를 받아 한 문장씩 써요.", "바로 앞 문장만 볼 수 있어요. 이야기가 어디로 갈지 아무도 몰라요!", "끝나면 완성된 막장 소설을 전부 공개해요."],
    makeQ: function (r) {
      /* chains are {lines: [...]} because Firestore can't store lists inside lists */
      const n = r.lineup.length, k = (r.rn || 1) - 1, chains = (r.ext || {}).chains || r.lineup.map(function () { return { lines: [pick(NOVEL_START)] }; }), give = {};
      r.lineup.forEach(function (m, i) { const c = (i + k) % n, L = chains[c].lines; give[m] = { c: c, prev: L[L.length - 1] }; });
      return { key: "n" + r.rn, text: "앞 문장에 이어서 한 문장!", give: give, long: true };
    },
    resolve: function (r) {
      const ext = JSON.parse(JSON.stringify(r.ext || {})), subs = r.subs || {};
      if (!ext.chains) { ext.chains = r.lineup.map(function () { return { lines: [] }; }); r.lineup.forEach(function (m) { const g = r.q.give[m]; if (g) ext.chains[g.c].lines = [g.prev]; }); }
      r.lineup.forEach(function (m) { const g = r.q.give[m]; if (g) ext.chains[g.c].lines = ext.chains[g.c].lines.concat([(subs[m] ? String(subs[m]) : "(…침묵…)") + " — " + nickOf(m)]); });
      return { pts: {}, info: {}, ext: ext, hideSubs: true };
    },
    round: function () { return [h("p", { class: "note", text: "이야기가 한 줄씩 자라고 있어요…" })]; },
    extra: function (r) { const me = meMember(), g = me && r.q.give[me.id]; return g ? h("p", { class: "pr-quote", text: "앞 문장: “" + g.prev.replace(/ — .*$/, "") + "”" }) : null; },
    final: function (r) {
      return h("div", { class: "novel" }, ((r.ext || {}).chains || []).map(function (c, i) {
        return h("div", { class: "pr-side" }, h("b", { text: "📖 이야기 " + (i + 1) }), h("span", { text: (c.lines || []).join(" ") }));
      }));
    }
  },
  glass: {
    rounds: 7, qSec: 10, input: "choice", rules: ["다리 7칸, 칸마다 왼쪽·오른쪽 중 하나만 튼튼한 유리예요. 10초 안에 골라요.", "깨진 유리를 밟으면 탈락(관전)! 살아남은 칸마다 +20점, 끝까지 건너면 +100점.", "남들이 어디로 갔는지는 결과 때 보여요. 눈치껏!"],
    makeQ: function (r) { return { key: "g" + r.rn, text: (r.rn || 1) + "번째 칸 · 어느 쪽이 튼튼할까?", opts: ["⬅️ 왼쪽 유리", "오른쪽 유리 ➡️"], safe: Math.floor(Math.random() * 2) }; },
    canSubmit: function (r, m) { return ((r.ext || {}).out || []).indexOf(m) < 0; },
    resolve: function (r) {
      const ext = JSON.parse(JSON.stringify(r.ext || {})), subs = r.subs || {}, pts = {}; ext.out = ext.out || [];
      const fell = [];
      r.lineup.forEach(function (m) { if (ext.out.indexOf(m) >= 0) return; if (subs[m] === r.q.safe) pts[m] = 20 + ((r.rn || 1) >= (r.total || 1) ? 100 : 0); else { ext.out.push(m); fell.push(m); } });
      return { pts: pts, info: { fell: fell, safe: r.q.safe }, ext: ext };
    },
    round: function (x) { return [h("p", { class: "pr-big " + (x.info.fell.length ? "bad" : "ok"), text: "튼튼한 쪽: " + (x.info.safe ? "오른쪽" : "왼쪽") + (x.info.fell.length ? " · 💥 " + x.info.fell.map(nickOf).join(", ") + " 추락!" : " · 모두 무사!") })]; }
  },
  balloon: {
    rounds: 5, qSec: 30, input: "balloon", rules: ["‘후~’를 누를 때마다 풍선이 커지고 점수가 올라가요.", "‘멈춤’을 누르면 점수 확정! 욕심내다 터지면 그 라운드 0점.", "터지는 지점은 라운드마다 달라요(모두 같은 풍선)."],
    makeQ: function (r) { return { key: "b" + r.rn, text: "터지기 전에 멈춰라!", burst: 6 + Math.floor(Math.random() * 22) }; },
    resolve: function (r) {
      const subs = r.subs || {}, pts = {};
      r.lineup.forEach(function (m) { const v = subs[m]; if (typeof v === "number" && v > 0 && v < r.q.burst) pts[m] = balloonPts(v); });
      return { pts: pts, info: { burst: r.q.burst } };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("p", { class: "pr-big", text: "이번 풍선은 " + x.info.burst + "번째에 펑!" }), h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) {
        const v = subs[m]; return h("li", { class: x.pts[m] ? "win" : "" }, h("span", { text: nickOf(m) + " · " + (v > 0 ? v + "번" : v === -1 ? "펑! 터짐" : "포기") }), h("b", { text: "+" + (x.pts[m] || 0) }));
      }))];
    }
  },
  chest: {
    rounds: 5, qSec: 15, input: "choice", rules: ["보물상자 8개 중 하나를 골라요. 보물·꽝·함정이 숨어 있어요.", "같은 상자를 여러 명이 고르면 보물을 나눠 가져요(함정도 똑같이!).", "결과 때 모든 상자를 열어 보여줘요."],
    makeQ: function (r) {
      const vals = shuffled([300, 200, 150, 100, 50, 0, -100, -50]);
      return { key: "c" + r.rn, text: "어느 상자를 열까?", opts: vals.map(function (_, i) { return "🎁 " + (i + 1); }), vals: vals };
    },
    resolve: function (r) {
      const subs = r.subs || {}, by = {}, pts = {};
      r.lineup.forEach(function (m) { if (typeof subs[m] === "number") (by[subs[m]] = by[subs[m]] || []).push(m); });
      Object.keys(by).forEach(function (k) { const v = r.q.vals[k], share = Math.round(v / by[k].length); by[k].forEach(function (m) { if (share) pts[m] = share; }); });
      return { pts: pts, info: { by: by } };
    },
    round: function (x) {
      return [h("div", { class: "chest-grid" }, x.q.vals.map(function (v, i) {
        const who = (x.info.by[i] || []).map(nickOf).join(", ");
        return h("div", { class: "chest" + (v > 0 ? " good" : v < 0 ? " bad" : "") }, h("b", { text: (v > 0 ? "💰 " : v < 0 ? "💀 " : "🕸️ ") + v }), h("small", { text: who || "-" }));
      }))];
    }
  },
  pirate: {
    rounds: 5, qSec: 12, input: "croc", rules: ["통에 난 구멍 중 하나에 칼을 꽂으면 해적이 튀어나와요! 차례대로 하나씩(12초).", "해적을 튀어나오게 한 사람만 0점, 나머지 +100점."],
    makeQ: function (r) { const n = Math.max(10, Math.min(16, r.lineup.length * 2 + 4)); return { key: "p" + r.rn, text: "해적이 튀어나오기 전에!", teeth: n, bad: Math.floor(Math.random() * n), order: shuffled(r.lineup), turn: 0, picked: [] }; },
    resolve: function (r) { const loser = r.q.loser || null, pts = {}; r.lineup.forEach(function (m) { if (m !== loser) pts[m] = 100; }); return { pts: pts, info: { loser: loser } }; },
    round: function (x) { return [h("p", { class: "pr-big bad", text: x.info.loser ? "🏴‍☠️ 펑! " + nickOf(x.info.loser) + " 해적에게 당첨" : "무사 통과" })]; }
  },
  race: {
    rounds: 5, qSec: 15, input: "member", selfOk: true, rules: ["조직원들이 달리기 시합을 해요. 1등할 것 같은 사람에게 걸어요(나도 가능).", "1등에 걸면 +100, 2등에 걸면 +40. 1등한 사람은 응원상 +30.", "경주는 매번 무작위예요."],
    makeQ: function (r) {
      const order = shuffled(r.lineup), times = {};
      order.forEach(function (m, i) { times[m] = 4 + i * 0.35 + Math.random() * 0.3; });
      return { key: "r" + r.rn, text: "누가 1등할까? 한 명에게 걸어요", order: order, times: times };
    },
    resolve: function (r) {
      const subs = r.subs || {}, pts = {}, o = r.q.order;
      r.lineup.forEach(function (m) { if (subs[m] === o[0]) pts[m] = 100; else if (subs[m] === o[1]) pts[m] = 40; });
      pts[o[0]] = (pts[o[0]] || 0) + 30;
      return { pts: pts, info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("div", { class: "race" }, x.q.order.slice().sort(function () { return 0; }).map(function (m) {
        const lane = h("div", { class: "lane" }, h("span", { class: "runner" }, photoBox(findMember(m) || {})), h("b", { text: nickOf(m) }));
        lane.style.setProperty("--t", x.q.times[m].toFixed(2) + "s");
        return lane;
      })), h("p", { class: "pr-big ok", text: "🏁 1등 " + nickOf(x.q.order[0]) + " · 2등 " + nickOf(x.q.order[1]) }),
        h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { return h("li", { class: x.pts[m] ? "win" : "" }, h("span", { text: nickOf(m) + " → " + (subs[m] ? nickOf(subs[m]) : "안 걺") }), h("b", { text: "+" + (x.pts[m] || 0) })); }))];
    }
  },
  ladder: {
    rounds: 3, qSec: 15, input: "choice", rules: ["출발점을 골라요. 같은 곳을 골라도 돼요.", "사다리를 따라 내려가 도착한 칸의 점수를 받아요(벌칙 칸도 있어요!).", "사다리는 라운드마다 새로 그려져요."],
    makeQ: function (r) {
      const n = Math.max(4, Math.min(7, r.lineup.length + 1)), rungs = [];
      for (let y = 0; y < 9; y++) { const x = Math.floor(Math.random() * (n - 1)); if (!rungs.some(function (q) { return q.y === y && Math.abs(q.x - x) < 2; })) rungs.push({ x: x, y: y }); if (Math.random() < 0.6) { const x2 = Math.floor(Math.random() * (n - 1)); if (Math.abs(x2 - x) > 1) rungs.push({ x: x2, y: y }); } }
      const prizes = shuffled([200, 100, 50, 30, 0, -50, -100].slice(0, n));
      return { key: "l" + r.rn, text: "출발점을 고르세요", opts: Array.from({ length: n }).map(function (_, i) { return String.fromCharCode(65 + i); }), n: n, rungs: rungs, prizes: prizes };
    },
    resolve: function (r) {
      const subs = r.subs || {}, pts = {};
      r.lineup.forEach(function (m) { if (typeof subs[m] === "number") { const p = r.q.prizes[ladderEnd(r.q, subs[m])]; if (p) pts[m] = p; } });
      return { pts: pts, info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [ladderSvg(x.q, subs, r.lineup), h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) {
        const s = subs[m]; return h("li", { class: x.pts[m] > 0 ? "win" : "" }, h("span", { text: nickOf(m) + (typeof s === "number" ? " · " + x.q.opts[s] + " → " + x.q.prizes[ladderEnd(x.q, s)] : " · 안 고름") }), h("b", { text: (x.pts[m] > 0 ? "+" : "") + (x.pts[m] || 0) }));
      }))];
    }
  },
  hotbomb: {
    rounds: 3, qSec: 30, input: "hotbomb", rules: ["폭탄을 받으면 주제에 맞는 단어를 입력해야 넘길 수 있어요(이미 나온 단어는 안 돼요).", "폭탄은 몰래 정해진 시간에 터져요. 시간은 안 보여요. 째깍째깍…", "터질 때 들고 있던 사람만 0점, 나머지 +100."],
    makeQ: function (r) {
      const topics = ["과일", "동물", "나라", "음식", "직업", "스포츠", "브랜드", "영화 제목", "가수", "과자", "채소", "지하철역", "색깔", "악기"];
      const order = shuffled(r.lineup);
      return { key: "h" + r.rn, text: "주제: " + pick(topics), holder: order[0], used: [], fuse: 15 + Math.floor(Math.random() * 25) };
    },
    resolve: function (r) { const pts = {}; r.lineup.forEach(function (m) { if (m !== r.q.holder) pts[m] = 100; }); return { pts: pts, info: { loser: r.q.holder, used: r.q.used } }; },
    round: function (x) { return [h("p", { class: "pr-big bad", text: "💥 펑! " + nickOf(x.info.loser) + " 폭탄 당첨" }), h("p", { class: "note", text: "나온 단어: " + (x.info.used.join(", ") || "없음") })]; }
  }
});
function quoteList() {
  return String((S.cfg.quotes || {}).text || "").split("\n").map(function (l) {
    const i = l.indexOf("|"); if (i < 0) return null;
    const nick = l.slice(0, i).trim(), text = l.slice(i + 1).trim(), m = S.members.find(function (x) { return x.nick === nick; });
    return m && text ? { who: m.id, text: text } : null;
  }).filter(Boolean);
}
function memePic(mid, caption) {
  const m = findMember(mid) || {};
  return h("div", { class: "meme" }, h("div", { class: "meme-ph" }, photoBox(m)), caption ? h("p", { class: "meme-cap", text: caption }) : null);
}
function balloonPts(n) { return Math.round(10 * n + n * n * 1.5); }
function balloonPanel(r, me) {
  const key = r.id + ":" + r.phase; if (lpReset(key)) { LP.n = 0; }
  const done = (r.subs || {})[me.id] != null;
  const size = 60 + LP.n * 9;
  const ball = h("div", { class: "balloon" + (done && r.subs[me.id] === -1 ? " pop" : "") }, h("span", { text: done && r.subs[me.id] === -1 ? "💥" : "🎈" }));
  ball.firstChild.style.fontSize = Math.min(220, size) + "px";
  if (done) return h("div", { class: "bl-wrap" }, ball, h("p", { class: "pr-big", text: r.subs[me.id] === -1 ? "펑! 이번 라운드 0점" : "확정! " + r.subs[me.id] + "번 · " + balloonPts(r.subs[me.id]) + "점 (결과 대기)" }));
  return h("div", { class: "bl-wrap" }, ball, h("p", { class: "pr-big", text: LP.n + "번 · 지금 멈추면 " + (LP.n ? balloonPts(LP.n) : 0) + "점" }),
    h("div", { class: "op-row" },
      h("button", { type: "button", class: "go", onclick: function () { if (LP.sent) return; LP.n++; sfx("pop"); if (LP.n >= r.q.burst) { LP.sent = true; sfx("bang"); pSubmit(-1); } else render(); }, text: "후~ 불기" }),
      h("button", { type: "button", disabled: !LP.n, onclick: function () { if (LP.sent || !LP.n) return; LP.sent = true; sfx("ding"); pSubmit(LP.n); }, text: "멈춤 ✋" })));
}
function ladderEnd(q, start) {
  let x = start;
  for (let y = 0; y < 9; y++) {
    if (q.rungs.some(function (g) { return g.y === y && g.x === x; })) x += 1;
    else if (q.rungs.some(function (g) { return g.y === y && g.x === x - 1; })) x -= 1;
  }
  return x;
}
function ladderSvg(q, subs, lineup) {
  const W = 300, H = 210, n = q.n, gx = function (i) { return 20 + i * (W - 40) / (n - 1); }, gy = function (y) { return 24 + y * 18 + 9; };
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="ladder-svg" xmlns="http://www.w3.org/2000/svg">';
  for (let i = 0; i < n; i++) s += '<line x1="' + gx(i) + '" y1="20" x2="' + gx(i) + '" y2="190" stroke="#5c5a57" stroke-width="2"/><text x="' + gx(i) + '" y="14" text-anchor="middle" fill="#e7e4df" font-size="11">' + q.opts[i] + '</text><text x="' + gx(i) + '" y="205" text-anchor="middle" fill="' + (q.prizes[i] > 0 ? "#6fd39a" : q.prizes[i] < 0 ? "#d2382f" : "#8e8b86") + '" font-size="10">' + q.prizes[i] + '</text>';
  q.rungs.forEach(function (g) { s += '<line x1="' + gx(g.x) + '" y1="' + gy(g.y) + '" x2="' + gx(g.x + 1) + '" y2="' + gy(g.y) + '" stroke="#5c5a57" stroke-width="2"/>'; });
  const colors = ["#d2382f", "#2f6fd2", "#e2a21b", "#2f9e57", "#8a4fc9", "#ff7eb6", "#6ec6f0"];
  lineup.forEach(function (m, k) {
    const st = subs[m]; if (typeof st !== "number") return;
    let x = st, d = "M" + gx(x) + " 20";
    for (let y = 0; y < 9; y++) {
      d += " L" + gx(x) + " " + gy(y);
      if (q.rungs.some(function (g) { return g.y === y && g.x === x; })) { x += 1; d += " L" + gx(x) + " " + gy(y); }
      else if (q.rungs.some(function (g) { return g.y === y && g.x === x - 1; })) { x -= 1; d += " L" + gx(x) + " " + gy(y); }
    }
    d += " L" + gx(x) + " 190";
    s += '<path d="' + d + '" fill="none" stroke="' + colors[k % 7] + '" stroke-width="3" stroke-linejoin="round" class="lpath" style="animation-delay:' + (k * 0.4) + 's"/>';
  });
  s += "</svg>";
  const box = h("div", { class: "ladder-box" }); box.innerHTML = s; return box;
}
async function bombPass(word) {
  const me = meMember(); if (!me) return;
  const w = String(word || "").trim();
  if (Array.from(w).length < 2) { toast("두 글자 이상 입력해요."); return; }
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "q" || r.type !== "hotbomb" || r.q.holder !== me.id) throw { code: "late" };
      if (r.q.used.some(function (u) { return normWord(u) === normWord(w); })) throw { code: "dup" };
      const others = r.lineup.filter(function (m) { return m !== me.id; });
      const q = Object.assign({}, r.q, { holder: pick(others), used: r.q.used.concat([w]) });
      tx.update(roomRef(), { q: q });
    });
    S.drafts["bomb-w"] = ""; sfx("click");
  } catch (e) { toast(e && e.code === "dup" ? "이미 나온 단어예요!" : e && e.code === "late" ? "폭탄이 이미 넘어갔어요." : errText(e)); }
}
function hotbombPanel(r, me) {
  const mine = me && r.q.holder === me.id;
  if (!mine) return h("div", { class: "rf-pad wait" }, h("span", { text: "💣 " + nickOf(r.q.holder) + "님이 들고 있어요… 째깍째깍" }));
  const inp = draft("input", "bomb-w", { type: "text", class: "text-in", maxlength: "20", placeholder: "주제에 맞는 단어 입력!", autocomplete: "off" });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: "넘기기 💣" }));
  f.addEventListener("submit", function (ev) { ev.preventDefault(); bombPass(S.drafts["bomb-w"] || inp.value); });
  return h("div", { class: "bomb-mine" }, h("p", { class: "pr-big bad", text: "💣 폭탄이 나한테 있어요! 빨리 넘겨요!" }), f);
}


/* ================= 전략본부 · 두뇌싸움(턴제) ================= */
/* turn games keep their whole state in r.q; an action runs fn(r, q, meId) inside a transaction and returns
   { q } to save, { q, end: true } to finish the round (def.resolve reads r.q), or null to ignore */
async function turnAct(fn, auto, expectPhase) {
  const me = meMember();
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "q" || !PARTY[r.type] || !PARTY[r.type].turn) return;
      if (expectPhase != null && r.phase !== expectPhase) return;
      const q = JSON.parse(JSON.stringify(r.q)), res = fn(r, q, auto ? null : (me && me.id));
      if (!res) return;
      if (res.msg) sysMsg(tx, r, res.msg);
      if (res.end) { pResolveTx(tx, Object.assign({}, r, { q: res.q })); tx.update(roomRef(), { q: res.q }); return; }
      tx.update(roomRef(), nextPhase(r, { q: res.q }));
    });
  } catch (e) { toast(errText(e)); }
}
function whoseTurn(q) { return q.order[q.turn % q.order.length]; }
function twoPlayers(r) { return (r.lineup || []).slice(0, 2); }
/* ---------- board helpers ---------- */
function lineWin(get, W, H, need) {
  const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const v = get(x, y); if (!v) continue;
    for (const d of dirs) { let k = 1; while (k < need && get(x + d[0] * k, y + d[1] * k) === v) k++; if (k >= need) return v; } }
  return null;
}
function boardGame(o) {
  return {
    rounds: 3, qSec: o.turnSec, turn: true, input: "board", rules: o.rules,
    makeQ: function (r) {
      const p = twoPlayers(r), first = (r.rn || 1) % 2 ? p : [p[1], p[0]];
      return { key: o.id + r.rn, text: nickOf(first[0]) + "(" + o.marks[0] + ") vs " + nickOf(first[1]) + "(" + o.marks[1] + ")", order: first, turn: 0, cells: ".".repeat(o.W * o.H), last: -1 };
    },
    act: function (r, q, me, i) {
      const who = whoseTurn(q); if (me && me !== who) return null;
      if (i == null) { const free = []; for (let k = 0; k < q.cells.length; k++) if (q.cells[k] === "." && o.legal(q, k)) free.push(k); free.sort(function (a, b) { return Math.abs(a - q.last) - Math.abs(b - q.last); }); i = free[Math.floor(Math.random() * Math.min(4, free.length))]; }
      if (i == null) return null;
      i = o.drop ? o.drop(q, i) : i; if (i == null || i < 0 || q.cells[i] !== "." || !o.legal(q, i)) return null;
      const mark = q.turn % 2 ? "W" : "B";
      q.cells = q.cells.slice(0, i) + mark + q.cells.slice(i + 1); q.last = i; q.turn++;
      const win = lineWin(function (x, y) { return x < 0 || y < 0 || x >= o.W || y >= o.H ? null : (q.cells[y * o.W + x] === "." ? null : q.cells[y * o.W + x]); }, o.W, o.H, o.need);
      if (win) { q.winner = win === "B" ? q.order[0] : q.order[1]; return { q: q, end: true }; }
      if (q.cells.indexOf(".") < 0) { q.winner = null; return { q: q, end: true }; }
      return { q: q };
    },
    resolve: function (r) { const pts = {}; if (r.q.winner) pts[r.q.winner] = 100; return { pts: pts, info: { winner: r.q.winner || null } }; },
    round: function (x) { return [h("p", { class: "pr-big ok", text: x.info.winner ? "🏆 " + nickOf(x.info.winner) + " 승리!" : "무승부" }), boardView(x.q, o, false)]; },
    view: o
  };
}
function boardView(q, o, playable) {
  const me = meMember(), myTurn = playable && me && whoseTurn(q) === me.id;
  const g = h("div", { class: "board " + o.cls }); g.style.gridTemplateColumns = "repeat(" + o.W + ", 1fr)";
  for (let k = 0; k < o.W * o.H; k++) {
    const v = q.cells[k];
    g.appendChild(h("button", { type: "button", class: "cell" + (v === "B" ? " b" : v === "W" ? " w" : "") + (k === q.last ? " last" : ""), disabled: !myTurn || v !== ".", onclick: function () { sfx("click"); turnAct(function (r, qq, m) { return PARTY[r.type].act(r, qq, m, k); }); } }));
  }
  return g;
}
const COLS = "ABCDEFGHIJKLMNO";
Object.assign(PARTY, {
  omok: boardGame({ id: "omok", W: 13, H: 13, need: 5, turnSec: 30, marks: ["⚫", "⚪"], cls: "omok", legal: function () { return true; },
    rules: ["2명이 흑·백을 번갈아 놓아요. 가로·세로·대각선으로 5개를 먼저 이으면 승리.", "한 수에 30초. 시간이 지나면 아무 데나 자동으로 둬요.", "3판을 하고, 판마다 흑백이 바뀌어요. 이기면 +100.", "3명 이상이 들어오면 앞의 2명이 두고 나머지는 관전해요."] }),
  connect4: boardGame({ id: "connect4", W: 7, H: 6, need: 4, turnSec: 20, marks: ["🔴", "🟡"], cls: "c4",
    legal: function () { return true; },
    drop: function (q, i) { const x = i % 7; for (let y = 5; y >= 0; y--) if (q.cells[y * 7 + x] === ".") return y * 7 + x; return null; },
    rules: ["칸을 누르면 그 줄 맨 아래로 떨어져요. 4개를 먼저 이으면 승리.", "한 수에 20초. 3판, 판마다 선공이 바뀌어요. 이기면 +100."] }),
  battleship: {
    rounds: 3, qSec: 25, turn: true, input: "battleship",
    rules: ["각자 8×8 바다에 함대(4·3·3·2칸)가 무작위로 배치돼요.", "번갈아 상대 바다를 쏴요. 맞히면 한 번 더! 25초 안에 안 쏘면 자동 발사.", "상대 함대를 먼저 모두 격침하면 +100. 3판."],
    makeQ: function (r) {
      const p = twoPlayers(r), first = (r.rn || 1) % 2 ? p : [p[1], p[0]], fleets = {};
      first.forEach(function (m) { fleets[m] = placeFleet(); });
      return { key: "bs" + r.rn, text: nickOf(first[0]) + " vs " + nickOf(first[1]), order: first, turn: 0, fleets: fleets, shots: { a: "", b: "" } };
    },
    act: function (r, q, me, i) {
      const who = whoseTurn(q); if (me && me !== who) return null;
      const side = q.turn % 2 ? "b" : "a", foe = q.order[q.turn % 2 ? 0 : 1], shots = q.shots[side].split(",").filter(Boolean).map(Number);
      if (i == null) { const free = []; for (let k = 0; k < 64; k++) if (shots.indexOf(k) < 0) free.push(k); i = free[Math.floor(Math.random() * free.length)]; }
      if (shots.indexOf(i) >= 0) return null;
      shots.push(i); q.shots[side] = shots.join(",");
      const hit = q.fleets[foe].indexOf(i) >= 0;
      if (q.fleets[foe].every(function (c) { return shots.indexOf(c) >= 0; })) { q.winner = who; return { q: q, end: true }; }
      if (!hit) q.turn++;
      return { q: q };
    },
    resolve: function (r) { const pts = {}; if (r.q.winner) pts[r.q.winner] = 100; return { pts: pts, info: { winner: r.q.winner } }; },
    round: function (x) { return [h("p", { class: "pr-big ok", text: "🚢 " + nickOf(x.info.winner) + " 함대 승리!" })]; }
  },
  numtile: {
    rounds: 3, qSec: 40, turn: true, input: "numtile",
    rules: ["0~11 숫자 타일(검정·흰색)을 받아 작은 수부터 늘어놓아요. 같은 숫자는 검정이 앞.", "내 차례: 타일 1장을 뽑고, 상대의 가려진 타일 하나를 골라 숫자를 추리해요.", "맞히면 그 타일이 공개되고 계속 추리하거나 멈출 수 있어요. 틀리면 내가 뽑은 타일이 공개돼요.", "타일이 모두 공개되면 탈락. 마지막까지 남으면 +100, 먼저 탈락한 순서로 점수가 적어요."],
    makeQ: function (r) {
      const pile = shuffled(Array.from({ length: 24 }).map(function (_, i) { return i; }));   /* tile id: num*2 + (white?1:0) */
      const players = r.lineup.slice(0, 4), per = players.length > 3 ? 3 : 4, hands = {};
      players.forEach(function (m) { hands[m] = pile.splice(0, per).sort(function (a, b) { return a - b; }).map(function (t) { return { t: t, open: false }; }); });
      return { key: "nt" + r.rn, text: "상대 타일의 숫자를 추리하라!", order: shuffled(players), turn: 0, hands: hands, pile: pile, drawn: null, streak: 0, out: [] };
    },
    act: function (r, q, me, a) {
      const who = whoseTurn(q); if (me && me !== who) return null;
      if (q.drawn == null && q.pile.length) q.drawn = q.pile.shift();
      if (!a) a = ntAuto(q, who);
      if (a.stop) { if (q.drawn != null) ntInsert(q, who, q.drawn, false); q.drawn = null; q.streak = 0; return ntNext(q); }
      const tile = q.hands[a.m] && q.hands[a.m][a.i]; if (!tile || tile.open || a.m === who) return null;
      if (Math.floor(tile.t / 2) === a.n) {
        tile.open = true; q.streak++;
        const msg = "🎯 " + nickOf(who) + " → " + nickOf(a.m) + "의 " + a.n + " 적중!";
        if (q.hands[a.m].every(function (x) { return x.open; })) { q.out.push(a.m); }
        const alive = q.order.filter(function (m) { return q.out.indexOf(m) < 0; });
        if (alive.length <= 1) { q.winner = alive[0]; return { q: q, end: true, msg: msg }; }
        return { q: q, msg: msg };
      }
      const msg2 = "❌ " + nickOf(who) + "가 " + nickOf(a.m) + "의 타일을 " + a.n + "(으)로 추리했지만 틀림";
      if (q.drawn != null) ntInsert(q, who, q.drawn, true); q.drawn = null; q.streak = 0;
      if (q.hands[who].every(function (x) { return x.open; })) q.out.push(who);
      const alive = q.order.filter(function (m) { return q.out.indexOf(m) < 0; });
      if (alive.length <= 1) { q.winner = alive[0]; return { q: q, end: true, msg: msg2 }; }
      const nx = ntNext(q); nx.msg = msg2; return nx;
    },
    resolve: function (r) {
      const pts = {}, q = r.q; if (q.winner) pts[q.winner] = 100;
      q.out.slice().reverse().forEach(function (m, i) { pts[m] = Math.max(10, 60 - i * 20); });
      return { pts: pts, info: { winner: q.winner } };
    },
    round: function (x) { return [h("p", { class: "pr-big ok", text: "🔢 " + nickOf(x.info.winner) + " 최후의 생존!" })]; }
  },
  yacht: {
    rounds: 12, fixedRounds: true, qSec: 50, input: "yacht",
    rules: ["12라운드 동안 모두 동시에 자기 주사위를 굴려요. 한 라운드에 최대 3번 굴리고, 남길 주사위를 눌러 고정해요.", "내 점수표에서 아직 안 쓴 칸 하나를 골라 점수를 적어요. 0점이라도 칸은 꼭 채워야 해요.", "1~6 칸 합이 63 이상이면 보너스 +35. 야추(5개 같은 눈)는 50점!"],
    makeQ: function (r) { return { key: "y" + r.rn, text: (r.rn || 1) + " / 12 라운드 · 굴리고 칸을 골라요", seed: Math.floor(Math.random() * 2147483647) }; },
    resolve: function (r) {
      const subs = r.subs || {}, ext = JSON.parse(JSON.stringify(r.ext || {})), pts = {}; ext.card = ext.card || {};
      r.lineup.forEach(function (m) {
        const card = ext.card[m] = ext.card[m] || {}, v = subs[m];
        let cat = v && YACHT_CATS.some(function (c) { return c.id === v.cat; }) && card[v.cat] == null ? v.cat : null, val = cat ? Math.max(0, Math.min(50, +v.val || 0)) : 0;
        if (!cat) { cat = YACHT_CATS.find(function (c) { return card[c.id] == null; }).id; val = 0; }
        card[cat] = val; pts[m] = val;
        if ((r.rn || 1) >= 12) { const up = ["n1", "n2", "n3", "n4", "n5", "n6"].reduce(function (a, k) { return a + (card[k] || 0); }, 0); if (up >= 63) pts[m] += 35; }
      });
      return { pts: pts, info: {}, ext: ext };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { const v = subs[m]; const c = v && YACHT_CATS.find(function (k) { return k.id === v.cat; }); return h("li", { class: x.pts[m] >= 25 ? "win" : "" }, h("span", { text: nickOf(m) + " · " + (c ? c.name : "자동 0점") + (v && v.dice ? " [" + v.dice.join("") + "]" : "") }), h("b", { text: "+" + (x.pts[m] || 0) })); }))];
    }
  },
  baseball: {
    rounds: 3, qSec: 100, input: "baseball",
    rules: ["0~9로 만든 서로 다른 4자리 비밀 숫자를 맞혀요(모두 같은 숫자).", "숫자와 자리가 맞으면 스트라이크(S), 숫자만 맞으면 볼(B).", "10번 안에 맞혀야 해요. 적은 시도 → 빠른 시간 순으로 순위."],
    makeQ: function (r) { const d = shuffled([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).join(""); return { key: "bb" + r.rn, text: "비밀 숫자 4자리를 맞혀라", secret: d }; },
    resolve: function (r) {
      const subs = r.subs || {}, ok = r.lineup.filter(function (m) { return subs[m] && subs[m].ok; }).map(function (m) { return { m: m, v: subs[m].tries * 1e6 + subs[m].ms }; });
      return { pts: rankPoints(ok, function (a, b) { return a.v - b.v; }), info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {};
      return [h("p", { class: "pr-big ok", text: "비밀 숫자: " + x.q.secret }), h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { const v = subs[m]; return h("li", { class: x.pts[m] === 100 ? "win" : "" }, h("span", { text: nickOf(m) + " · " + (v ? (v.ok ? v.tries + "번 · " + (v.ms / 1000).toFixed(1) + "초" : "실패") : "미제출") }), h("b", { text: "+" + (x.pts[m] || 0) })); }))];
    }
  },
  auction: {
    rounds: 5, qSec: 25, input: "number",
    rules: ["모두 1,000코인으로 시작해요. 라운드마다 물건과 그 가치(점수)가 공개돼요.", "몰래 입찰! 가장 많이 쓴 사람이 물건을 가져가고 쓴 만큼 코인이 줄어요(같으면 먼저 낸 사람).", "얻은 물건 점수 합 + 마지막에 남은 코인의 20%가 최종 점수."],
    makeQ: function (r) {
      const items = [["불주먹 금장 반지", 400], ["두목의 낡은 의자", 120], ["조직 비밀 장부", 300], ["한정판 피규어", 250], ["녹슨 열쇠", 60], ["황금 붕어빵", 220], ["수상한 서류가방", 180], ["전설의 주먹 장갑", 350]];
      const it = freshFrom(items, r, function (x) { return x[0]; });
      return { key: it[0], text: "🔨 " + it[0] + " · 가치 " + it[1] + "점", value: it[1], max: 1000, unit: "코인" };
    },
    extra: function (r) { const me = meMember(), b = ((r.ext || {}).budget || {}), mine = me ? (b[me.id] == null ? 1000 : b[me.id]) : null; return h("div", { class: "auc" }, mine != null ? h("p", { class: "pr-big", text: "💰 내 남은 코인 " + mine }) : null, h("p", { class: "note", text: (r.lineup || []).map(function (m) { return nickOf(m) + " " + (b[m] == null ? 1000 : b[m]); }).join(" · ") }), h("p", { class: "hint", text: "남은 코인보다 많이 적으면 남은 만큼만 입찰돼요. 0 = 패스" })); },
    resolve: function (r) {
      const subs = r.subs || {}, subT = r.subT || {}, ext = JSON.parse(JSON.stringify(r.ext || {})), pts = {}; ext.budget = ext.budget || {};
      r.lineup.forEach(function (m) { if (ext.budget[m] == null) ext.budget[m] = 1000; });
      const bids = r.lineup.filter(function (m) { return typeof subs[m] === "number" && subs[m] > 0; }).map(function (m) { return { m: m, v: Math.min(subs[m], ext.budget[m]) }; });
      bids.sort(function (a, b) { return b.v - a.v || (subT[a.m] || 1e9) - (subT[b.m] || 1e9); });
      const win = bids[0] || null;
      if (win) { ext.budget[win.m] -= win.v; pts[win.m] = r.q.value; }
      if ((r.rn || 1) >= (r.total || 1)) r.lineup.forEach(function (m) { pts[m] = (pts[m] || 0) + Math.round(ext.budget[m] * 0.2); });
      return { pts: pts, info: { win: win, bids: bids }, ext: ext };
    },
    round: function (x, r) {
      const i = x.info, b = (r.ext || {}).budget || {};
      return [h("p", { class: "pr-big ok", text: i.win ? "낙찰! " + nickOf(i.win.m) + " · " + i.win.v + "코인" : "아무도 입찰하지 않았어요" }),
        h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { const bb = i.bids.find(function (z) { return z.m === m; }); return h("li", { class: i.win && i.win.m === m ? "win" : "" }, h("span", { text: nickOf(m) + " · 입찰 " + (bb ? bb.v : 0) }), h("b", { text: "남은 코인 " + (b[m] == null ? 1000 : b[m]) })); }))];
    }
  },
  territory: {
    rounds: 12, fixedRounds: true, qSec: 15, input: "territory",
    rules: ["격자 지도에서 각자 시작 땅 1칸을 받아요.", "매 라운드 모두 동시에, 내 땅과 맞닿은 빈칸 하나를 골라요. 여러 명이 같은 칸을 고르면 아무도 못 가져요!", "12라운드 뒤 땅이 가장 넓은 사람이 승리. 새로 얻은 칸마다 +10, 마지막에 땅 1칸당 +10."],
    makeQ: function (r) {
      const W = r.lineup.length > 4 ? 10 : 8, prev = (r.ext || {}).map;
      let map = prev;
      if (!map) { const cells = ".".repeat(W * W).split(""), starts = shuffled([[0, 0], [W - 1, W - 1], [0, W - 1], [W - 1, 0], [Math.floor(W / 2), 0], [Math.floor(W / 2), W - 1], [0, Math.floor(W / 2)]]); r.lineup.forEach(function (m, i) { const s0 = starts[i]; cells[s0[1] * W + s0[0]] = String(i); }); map = cells.join(""); }
      return { key: "t" + r.rn, text: (r.rn || 1) + " / 12 · 땅을 넓혀라", W: W, map: map };
    },
    resolve: function (r) {
      const subs = r.subs || {}, W = r.q.W, map = r.q.map.split(""), pts = {}, ext = JSON.parse(JSON.stringify(r.ext || {})), want = {};
      r.lineup.forEach(function (m, i) { const c = subs[m]; if (typeof c === "number" && map[c] === "." && terrAdj(r.q.map, W, c, i)) (want[c] = want[c] || []).push(i); });
      Object.keys(want).forEach(function (c) { if (want[c].length === 1) { map[c] = String(want[c][0]); pts[r.lineup[want[c][0]]] = 10; } });
      ext.map = map.join("");
      if ((r.rn || 1) >= 12) r.lineup.forEach(function (m, i) { pts[m] = (pts[m] || 0) + ext.map.split("").filter(function (x) { return x === String(i); }).length * 10; });
      return { pts: pts, info: { clash: Object.keys(want).filter(function (c) { return want[c].length > 1; }).length }, ext: ext };
    },
    round: function (x, r) { return [h("p", { class: "note", text: x.info.clash ? "💥 같은 칸을 노린 충돌 " + x.info.clash + "건 — 아무도 못 가져갔어요" : "충돌 없이 확장!" }), terrView(Object.assign({}, x.q, { map: (r.ext || {}).map || x.q.map }), r, false)]; }
  },
  onecard: {
    rounds: 3, qSec: 20, turn: true, input: "onecard",
    rules: ["같은 무늬나 같은 숫자 카드를 내요. 낼 게 없으면 1장 먹기. 20초가 지나면 자동으로 먹어요.", "공격: 2(+2장), A(+3장), ♠A(+5장), 조커(+7장). 공격을 받으면 더 센 공격 카드로 막거나 다 먹어요.", "J 다음 사람 건너뛰기, Q 방향 바꾸기, K 한 번 더, 7 무늬 바꾸기. 15장 넘게 들면 파산!", "가장 먼저 다 내면 +100, 나머지는 남은 장수가 적을수록 점수."],
    makeQ: function (r) {
      const deck = [];
      ["♠", "♥", "♦", "♣"].forEach(function (s0) { ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].forEach(function (k) { deck.push(k + s0); }); });
      deck.push("JK1", "JK2");
      const d = shuffled(deck), hands = {}, per = r.lineup.length > 5 ? 5 : 7;
      r.lineup.forEach(function (m) { hands[m] = d.splice(0, per); });
      let top = d.shift(); while (/^(JK|2|A|7|J|Q|K)/.test(top)) { d.push(top); top = d.shift(); }
      return { key: "oc" + r.rn, text: "원카드!", order: shuffled(r.lineup), turn: 0, dir: 1, hands: hands, deck: d, pile: [top], suit: top.slice(-1), attack: 0, out: [] };
    },
    act: function (r, q, me, card) {
      const who = whoseTurn(q); if (me && me !== who) return null;
      const hand = q.hands[who];
      if (card === undefined) card = null;   /* time out → draw */
      if (card && card.c) { const s7 = card.s; card = card.c; q.pendSuit = s7; }
      if (card == null) {   /* draw */
        const n = q.attack || 1; for (let i = 0; i < n; i++) { if (!q.deck.length) ocRefill(q); if (q.deck.length) hand.push(q.deck.shift()); }
        q.attack = 0;
        if (hand.length > 15) { q.out.push(who); q.hands[who] = []; }
        return ocAdvance(q, 1);
      }
      if (hand.indexOf(card) < 0 || !ocCan(q, card)) return null;
      hand.splice(hand.indexOf(card), 1); q.pile.push(card); if (q.pile.length > 6) q.pile = q.pile.slice(-6);
      const rank = ocRank(card);
      q.suit = rank === "7" && q.pendSuit ? q.pendSuit : (rank === "JK" ? q.suit : card.slice(-1)); q.pendSuit = null;
      q.attack += ocPower(card);
      if (!hand.length) { q.winner = who; return { q: q, end: true }; }
      if (rank === "K") return { q: q };
      if (rank === "Q") { q.dir = -q.dir; return ocAdvance(q, 1); }
      if (rank === "J") return ocAdvance(q, 2);
      return ocAdvance(q, 1);
    },
    resolve: function (r) {
      const q = r.q, pts = {};
      r.lineup.forEach(function (m) { if (m === q.winner) pts[m] = 100; else if (q.out.indexOf(m) < 0) pts[m] = Math.max(0, 50 - (q.hands[m] || []).length * 5); });
      return { pts: pts, info: { winner: q.winner } };
    },
    round: function (x, r) { return [h("p", { class: "pr-big ok", text: "🂡 " + (x.info.winner ? nickOf(x.info.winner) + " 원카드 승리!" : "끝") }), h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { return h("li", null, h("span", { text: nickOf(m) + " · " + (x.q.out.indexOf(m) >= 0 ? "파산" : (x.q.hands[m] || []).length + "장 남음") }), h("b", { text: "+" + (x.pts[m] || 0) })); }))]; }
  },
  bluffdice: {
    rounds: 3, qSec: 25, turn: true, input: "bluff",
    rules: ["각자 주사위 3개를 몰래 굴려요(내 것만 보여요).", "차례대로 ‘전체 주사위 중 ○눈이 최소 ○개 있다’고 선언해요. 다음 사람은 더 높게 선언하거나 ‘거짓말!’을 외쳐요.", "확인해서 틀린 쪽이 주사위 1개를 잃어요. 다 잃으면 탈락(관전). 마지막 생존자 +100.", "더 높은 선언 = 개수가 더 많거나, 같은 개수에 더 큰 눈. 25초 안에 안 하면 자동으로 ‘거짓말!’"],
    makeQ: function (r) { const dice = {}; r.lineup.forEach(function (m) { dice[m] = rollDice(3); }); return { key: "bd" + r.rn, text: "블러핑 주사위", order: shuffled(r.lineup), turn: 0, dice: dice, bid: null, out: [], log: "" }; },
    act: function (r, q, me, a) {
      const who = whoseTurn(q); if (me && me !== who) return null;
      if (!a) a = q.bid ? { call: true } : { qty: 1, face: 2 };
      if (a.call && q.bid) {
        let cnt = 0; Object.keys(q.dice).forEach(function (m) { cnt += q.dice[m].filter(function (v) { return v === q.bid.face; }).length; });
        const loser = cnt >= q.bid.qty ? who : q.bid.by;
        q.log = nickOf(who) + "의 거짓말! 콜 → 실제 " + q.bid.face + "눈 " + cnt + "개 (선언 " + q.bid.qty + "개) → " + nickOf(loser) + " 주사위 -1";
        q.dice[loser] = q.dice[loser].slice(1);
        if (!q.dice[loser].length) q.out.push(loser);
        const alive = q.order.filter(function (m) { return q.out.indexOf(m) < 0; });
        if (alive.length <= 1) { q.winner = alive[0]; return { q: q, end: true, msg: "🎲 " + q.log }; }
        alive.forEach(function (m) { q.dice[m] = rollDice(q.dice[m].length); });
        q.bid = null; q.turn = q.order.indexOf(q.out.indexOf(loser) >= 0 ? alive[0] : loser);
        return { q: q, msg: "🎲 " + q.log };
      }
      const qty = Math.max(1, Math.round(a.qty)), face = Math.max(1, Math.min(6, Math.round(a.face)));
      if (q.bid && !(qty > q.bid.qty || (qty === q.bid.qty && face > q.bid.face))) return null;
      q.bid = { qty: qty, face: face, by: who };
      do { q.turn++; } while (q.out.indexOf(whoseTurn(q)) >= 0);
      return { q: q };
    },
    resolve: function (r) { const q = r.q, pts = {}; if (q.winner) pts[q.winner] = 100; q.out.slice().reverse().forEach(function (m, i) { pts[m] = Math.max(10, 60 - i * 20); }); return { pts: pts, info: { winner: q.winner } }; },
    round: function (x) { return [h("p", { class: "pr-big ok", text: "🎲 " + nickOf(x.info.winner) + " 최후의 허세왕!" }), h("p", { class: "note", text: x.q.log })]; }
  },
  taboo: {
    rounds: 3, qSec: 90, input: "taboo",
    rules: ["각자 금지어를 받아요. 남의 금지어는 보이는데 내 것은 안 보여요!", "대화창에서 수다를 떨며 상대가 자기 금지어를 말하게 유도해요.", "내가 내 금지어를 입력하면 걸려요(-40점, 새 금지어 받음). 라운드마다 100점에서 시작.", "90초 × 3라운드."],
    makeQ: function (r) { const words = {}, bank = shuffled(TABOO_WORDS); r.lineup.forEach(function (m, i) { words[m] = bank[i]; }); return { key: "tb" + r.rn, text: "상대가 금지어를 말하게 만들어라!", words: words, used: bank.slice(0, r.lineup.length) }; },
    resolve: function (r) { const c = ((r.ext || {}).catch || {})[r.rn] || {}, pts = {}; r.lineup.forEach(function (m) { pts[m] = Math.max(0, 100 - 40 * (c[m] || 0)); }); return { pts: pts, info: { c: c, words: r.q.words } }; },
    round: function (x, r) { return [h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { return h("li", { class: x.info.c[m] ? "" : "win" }, h("span", { text: nickOf(m) + " · 마지막 금지어 ‘" + x.info.words[m] + "’" }), h("b", { text: (x.info.c[m] || 0) + "번 걸림 · +" + (x.pts[m] || 0) })); }))]; }
  }
});
const TABOO_WORDS = ["그니까", "마자", "맞아", "대박", "웅웅", "오키", "아웃겨", "개웃겨", "까비", "에라이", "와우", "오호", "근데", "아니", "진짜", "제발", "몰라", "그러게", "귀여워", "언니", "미쳤다", "오예", "우와", "나도", "일단", "그래도", "아까", "역시", "젠장", "호호", "킬킬", "어엉", "오오", "아하", "그치", "좋다", "빨리", "자꾸", "게임", "뽑기"];   /* 단톡방에서 다들 입에 달고 사는 말들 */
const YACHT_CATS = [
  { id: "n1", name: "1 모음", f: function (d) { return d.filter(function (x) { return x === 1; }).length; } },
  { id: "n2", name: "2 모음", f: function (d) { return d.filter(function (x) { return x === 2; }).length * 2; } },
  { id: "n3", name: "3 모음", f: function (d) { return d.filter(function (x) { return x === 3; }).length * 3; } },
  { id: "n4", name: "4 모음", f: function (d) { return d.filter(function (x) { return x === 4; }).length * 4; } },
  { id: "n5", name: "5 모음", f: function (d) { return d.filter(function (x) { return x === 5; }).length * 5; } },
  { id: "n6", name: "6 모음", f: function (d) { return d.filter(function (x) { return x === 6; }).length * 6; } },
  { id: "ch", name: "초이스", f: function (d) { return d.reduce(function (a, b) { return a + b; }, 0); } },
  { id: "fk", name: "포카드", f: function (d) { const c = diceCount(d); return Object.keys(c).some(function (k) { return c[k] >= 4; }) ? d.reduce(function (a, b) { return a + b; }, 0) : 0; } },
  { id: "fh", name: "풀하우스", f: function (d) { const v = Object.values(diceCount(d)).sort(); return (v.join() === "2,3" || v.join() === "5") ? d.reduce(function (a, b) { return a + b; }, 0) : 0; } },
  { id: "ss", name: "스몰 스트레이트", f: function (d) { const s = new Set(d); return [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]].some(function (q) { return q.every(function (x) { return s.has(x); }); }) ? 15 : 0; } },
  { id: "ls", name: "라지 스트레이트", f: function (d) { const s = d.slice().sort().join(""); return s === "12345" || s === "23456" ? 30 : 0; } },
  { id: "ya", name: "야추", f: function (d) { return new Set(d).size === 1 ? 50 : 0; } }
];
function diceCount(d) { const c = {}; d.forEach(function (x) { c[x] = (c[x] || 0) + 1; }); return c; }
function rollDice(n) { const a = []; for (let i = 0; i < n; i++) a.push(1 + Math.floor(Math.random() * 6)); return a; }
const DIE = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
function placeFleet() {
  const taken = []; [4, 3, 3, 2].forEach(function (len) {
    for (let tries = 0; tries < 200; tries++) { const hz = Math.random() < 0.5, x = Math.floor(Math.random() * (hz ? 9 - len : 8)), y = Math.floor(Math.random() * (hz ? 8 : 9 - len)), cells = [];
      for (let k = 0; k < len; k++) cells.push((y + (hz ? 0 : k)) * 8 + x + (hz ? k : 0));
      if (cells.every(function (c) { return taken.indexOf(c) < 0; })) { cells.forEach(function (c) { taken.push(c); }); break; } }
  });
  return taken;
}
function terrAdj(map, W, c, i) { const x = c % W, y = Math.floor(c / W), t = String(i); return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(function (d) { const nx = x + d[0], ny = y + d[1]; return nx >= 0 && ny >= 0 && nx < W && ny < W && map[ny * W + nx] === t; }); }
const TERR_COL = ["#d2382f", "#2f6fd2", "#e2a21b", "#2f9e57", "#8a4fc9", "#ff7eb6", "#6ec6f0"];
function terrView(q, r, playable) {
  const me = meMember(), mi = me ? r.lineup.indexOf(me.id) : -1, mine = me ? (r.subs || {})[me.id] : null;
  const g = h("div", { class: "board terr" }); g.style.gridTemplateColumns = "repeat(" + q.W + ", 1fr)";
  q.map.split("").forEach(function (v, c) {
    const can = playable && mi >= 0 && v === "." && terrAdj(q.map, q.W, c, mi);
    const b = h("button", { type: "button", class: "cell" + (can ? " can" : "") + (mine === c ? " pick" : ""), disabled: !can, onclick: function () { sfx("click"); pSubmit(c); } });
    if (v !== ".") b.style.background = TERR_COL[+v % 7];
    g.appendChild(b);
  });
  return h("div", null, g, h("div", { class: "terr-legend" }, r.lineup.map(function (m, i) { const n = q.map.split("").filter(function (x) { return x === String(i); }).length; const s0 = h("span", { text: nickOf(m) + " " + n }); s0.style.borderColor = TERR_COL[i % 7]; return s0; })));
}
/* ---- one card ---- */
function ocRank(c) { return c.slice(0, 2) === "JK" ? "JK" : c.slice(0, -1); }
function ocPower(c) { const k = ocRank(c); return k === "JK" ? 7 : c === "A♠" ? 5 : k === "A" ? 3 : k === "2" ? 2 : 0; }
function ocCan(q, c) {
  const top = q.pile[q.pile.length - 1], k = ocRank(c);
  if (q.attack) return ocPower(c) >= Math.min(ocPower(top) || 2, 7) && ocPower(c) > 0;
  if (k === "JK") return true;
  return c.slice(-1) === q.suit || (ocRank(top) !== "JK" && k === ocRank(top));
}
function ocRefill(q) { const keep = q.pile.pop(); q.deck = shuffled(q.pile.concat(q.deck)); q.pile = [keep]; }
function ocAdvance(q, steps) {
  const alive = q.order.filter(function (m) { return q.out.indexOf(m) < 0; });
  if (alive.length <= 1) { q.winner = alive[0]; return { q: q, end: true }; }
  for (let s = 0; s < steps; s++) { do { q.turn = (q.turn + q.dir + q.order.length * 4) % q.order.length; } while (q.out.indexOf(whoseTurn(q)) >= 0); }
  return { q: q };
}
function cardEl(c, onClick, disabled) {
  const red = /[♥♦]/.test(c) || c === "JK2";
  return h("button", { type: "button", class: "card-ui" + (red ? " red" : ""), disabled: !!disabled, onclick: onClick, text: c === "JK1" ? "🃏흑" : c === "JK2" ? "🃏컬" : c });
}
/* ---- da vinci tiles ---- */
function ntInsert(q, m, t, open) { q.hands[m].push({ t: t, open: open }); q.hands[m].sort(function (a, b) { return a.t - b.t; }); }
function ntNext(q) { do { q.turn = (q.turn + 1) % q.order.length; } while (q.out.indexOf(whoseTurn(q)) >= 0); return { q: q }; }
function ntAuto(q, who) {
  if (q.streak) return { stop: true };
  const opts = []; q.order.forEach(function (m) { if (m !== who && q.out.indexOf(m) < 0) q.hands[m].forEach(function (x, i) { if (!x.open) opts.push({ m: m, i: i }); }); });
  const o = opts[Math.floor(Math.random() * opts.length)]; return { m: o.m, i: o.i, n: Math.floor(Math.random() * 12) };
}
function tileEl(x, mine, onClick, sel) {
  const white = x.t % 2 === 1, show = x.open || mine;
  return h("button", { type: "button", class: "tile-ui" + (white ? " w" : " b") + (x.open ? " open" : "") + (sel ? " sel" : ""), disabled: !onClick, onclick: onClick, text: show ? String(Math.floor(x.t / 2)) : "?" });
}
/* ---------- panels ---------- */
function turnBanner(q) { const me = meMember(), who = whoseTurn(q); return h("p", { class: "pr-big" + (me && me.id === who ? " ok" : ""), text: me && me.id === who ? "내 차례!" : nickOf(who) + "님 차례…" }); }
function boardPanel(r) { const d = PARTY[r.type]; return h("div", { class: "bg-wrap" }, turnBanner(r.q), boardView(r.q, d.view, true)); }
function battleshipPanel(r) {
  const me = meMember(), q = r.q, who = whoseTurn(q), myTurn = me && who === me.id, p = q.order;
  function sea(owner, shotsKey, clickable, revealShips) {
    const shots = q.shots[shotsKey].split(",").filter(Boolean).map(Number), fleet = q.fleets[owner], g = h("div", { class: "board sea" }); g.style.gridTemplateColumns = "repeat(8, 1fr)";
    for (let k = 0; k < 64; k++) { const shot = shots.indexOf(k) >= 0, hit = shot && fleet.indexOf(k) >= 0, ship = revealShips && fleet.indexOf(k) >= 0;
      g.appendChild(h("button", { type: "button", class: "cell" + (hit ? " hit" : shot ? " miss" : ship ? " ship" : ""), disabled: !clickable || shot, onclick: function () { sfx("click"); turnAct(function (rr, qq, m) { return PARTY.battleship.act(rr, qq, m, k); }); }, text: hit ? "💥" : shot ? "·" : "" })); }
    return g;
  }
  const meIdx = me ? p.indexOf(me.id) : -1, foeIdx = meIdx === 0 ? 1 : 0;
  return h("div", { class: "bs-wrap" }, turnBanner(q),
    h("div", { class: "field-label", text: meIdx >= 0 ? "상대 바다 (쏘기)" : nickOf(p[1]) + "의 바다" }), sea(p[meIdx >= 0 ? foeIdx : 1], meIdx >= 0 ? (meIdx === 0 ? "a" : "b") : "a", myTurn, false),
    meIdx >= 0 ? h("div", { class: "field-label", text: "내 바다" }) : h("div", { class: "field-label", text: nickOf(p[0]) + "의 바다" }), sea(p[meIdx >= 0 ? meIdx : 0], meIdx >= 0 ? (meIdx === 0 ? "b" : "a") : "b", false, meIdx >= 0));
}
function numtilePanel(r) {
  const me = meMember(), q = r.q, who = whoseTurn(q), myTurn = me && who === me.id;
  const rows = q.order.map(function (m) {
    const mine = me && m === me.id;
    return h("div", { class: "nt-row" + (q.out.indexOf(m) >= 0 ? " out" : "") }, h("b", { text: nickOf(m) + (m === who ? " 👉" : "") }),
      h("div", { class: "nt-tiles" }, q.hands[m].map(function (x, i) {
        const can = myTurn && !mine && !x.open && q.out.indexOf(m) < 0;
        return tileEl(x, mine, can ? function () { S.ntSel = { m: m, i: i }; render(); } : null, S.ntSel && S.ntSel.m === m && S.ntSel.i === i);
      })));
  });
  let ctl = null;
  if (myTurn) {
    const sel = S.ntSel && q.hands[S.ntSel.m] && q.hands[S.ntSel.m][S.ntSel.i] && !q.hands[S.ntSel.m][S.ntSel.i].open ? S.ntSel : null;
    ctl = h("div", { class: "nt-ctl" },
      h("p", { class: "hint", text: (q.drawn != null || q.pile.length ? "뽑은 타일: " + (q.drawn != null ? Math.floor(q.drawn / 2) + (q.drawn % 2 ? "(흰)" : "(검)") : "추리하면 자동으로 뽑아요") + " · " : "") + (sel ? nickOf(sel.m) + "의 " + (sel.i + 1) + "번째 타일은?" : "상대의 ? 타일을 눌러 고르세요") }),
      sel ? h("div", { class: "nt-nums" }, Array.from({ length: 12 }).map(function (_, n) { return h("button", { type: "button", class: "px-btn", text: String(n), onclick: function () { const a = { m: sel.m, i: sel.i, n: n }; S.ntSel = null; turnAct(function (rr, qq, m) { return PARTY.numtile.act(rr, qq, m, a); }); } }); })) : null,
      q.streak ? h("button", { type: "button", class: "px-btn", onclick: function () { turnAct(function (rr, qq, m) { return PARTY.numtile.act(rr, qq, m, { stop: true }); }); }, text: "✋ 여기서 멈추기" }) : null);
  }
  return h("div", { class: "nt" }, turnBanner(q), rows, ctl);
}
function onecardPanel(r) {
  const me = meMember(), q = r.q, who = whoseTurn(q), myTurn = me && who === me.id, top = q.pile[q.pile.length - 1];
  const others = h("div", { class: "oc-others" }, q.order.map(function (m) { return h("span", { class: m === who ? "now" : "" , text: nickOf(m) + " " + (q.out.indexOf(m) >= 0 ? "파산" : (q.hands[m] || []).length + "장") }); }));
  const center = h("div", { class: "oc-center" }, cardEl(top, null, true), h("div", null, h("b", { text: "무늬 " + q.suit }), q.attack ? h("p", { class: "pr-big bad", text: "공격 +" + q.attack + "장!" }) : null, h("p", { class: "note", text: "방향 " + (q.dir > 0 ? "→" : "←") + " · 덱 " + q.deck.length })));
  const hand = me && q.hands[me.id] ? q.hands[me.id] : null;
  let mine = null;
  if (hand) {
    mine = h("div", { class: "oc-hand" }, hand.map(function (c) {
      const ok = myTurn && ocCan(q, c);
      return cardEl(c, ok ? function () {
        if (ocRank(c) === "7") { S.oc7 = c; render(); return; }
        sfx("click"); turnAct(function (rr, qq, m) { return PARTY.onecard.act(rr, qq, m, c); });
      } : null, !ok);
    }));
  }
  const suitPick = S.oc7 && myTurn ? h("div", { class: "oc-suits" }, h("span", { text: "7! 바꿀 무늬:" }), ["♠", "♥", "♦", "♣"].map(function (s0) { return h("button", { type: "button", class: "px-btn", text: s0, onclick: function () { const c = S.oc7; S.oc7 = null; turnAct(function (rr, qq, m) { return PARTY.onecard.act(rr, qq, m, { c: c, s: s0 }); }); } }); })) : null;
  return h("div", { class: "oc" }, turnBanner(q), others, center, suitPick, mine,
    myTurn ? h("button", { type: "button", class: "px-btn", onclick: function () { turnAct(function (rr, qq, m) { return PARTY.onecard.act(rr, qq, m, null); }); }, text: q.attack ? "공격 받기 (" + q.attack + "장 먹기)" : "카드 1장 먹기" }) : null);
}
function bluffPanel(r) {
  const me = meMember(), q = r.q, who = whoseTurn(q), myTurn = me && who === me.id;
  const myDice = me && q.dice[me.id] ? q.dice[me.id] : null, total = Object.keys(q.dice).reduce(function (a, m) { return a + q.dice[m].length; }, 0);
  if (S.bdKey !== r.phase) { S.bdKey = r.phase; S.bdQty = q.bid ? q.bid.qty : 1; S.bdFace = q.bid ? Math.min(6, q.bid.face + 1) : 2; if (q.bid && q.bid.face >= 6) { S.bdQty = q.bid.qty + 1; S.bdFace = 1; } }
  return h("div", { class: "bd" }, turnBanner(q),
    h("p", { class: "pr-big", text: q.bid ? "현재 선언: " + DIE[q.bid.face] + " " + q.bid.face + "눈이 " + q.bid.qty + "개 이상 (" + nickOf(q.bid.by) + ")" : "첫 선언을 기다려요" }),
    h("p", { class: "note", text: "전체 주사위 " + total + "개 · " + q.order.map(function (m) { return nickOf(m) + " " + q.dice[m].length; }).join(" · ") }),
    q.log ? h("p", { class: "note", text: "직전: " + q.log }) : null,
    myDice ? h("div", { class: "bd-dice" }, h("span", { text: "내 주사위" }), myDice.map(function (v) { return h("b", { text: DIE[v] }); })) : h("p", { class: "note", text: "탈락했어요. 관전 중" }),
    myTurn ? h("div", { class: "bd-ctl" },
      h("div", { class: "bd-row" }, h("span", { text: "개수" }), h("button", { type: "button", class: "px-btn", text: "−", onclick: function () { S.bdQty = Math.max(1, S.bdQty - 1); render(); } }), h("b", { text: String(S.bdQty) }), h("button", { type: "button", class: "px-btn", text: "+", onclick: function () { S.bdQty = Math.min(total, S.bdQty + 1); render(); } })),
      h("div", { class: "bd-row" }, h("span", { text: "눈" }), [1, 2, 3, 4, 5, 6].map(function (f) { return h("button", { type: "button", class: "px-btn" + (S.bdFace === f ? " go-btn" : ""), text: DIE[f], onclick: function () { S.bdFace = f; render(); } }); })),
      h("div", { class: "op-row" },
        h("button", { type: "button", class: "go", onclick: function () { const a = { qty: S.bdQty, face: S.bdFace }; turnAct(function (rr, qq, m) { return PARTY.bluffdice.act(rr, qq, m, a); }); }, text: "선언: " + DIE[S.bdFace] + " " + S.bdQty + "개 이상" }),
        q.bid ? h("button", { type: "button", class: "danger", onclick: function () { turnAct(function (rr, qq, m) { return PARTY.bluffdice.act(rr, qq, m, { call: true }); }); }, text: "거짓말! 🔍" }) : null)) : null);
}
function yachtPanel(r, me) {
  const key = r.id + ":" + r.phase, q = r.q;
  if (lpReset(key)) { const rnd = mulberry32((q.seed ^ hashStr(me.id)) >>> 0); LP.rnd = rnd; LP.dice = [0, 0, 0, 0, 0].map(function () { return 1 + Math.floor(rnd() * 6); }); LP.hold = [false, false, false, false, false]; LP.rolls = 1; }
  if ((r.subs || {})[me.id] != null) return h("div", { class: "rf-pad done", text: "기록 완료! 결과를 기다려요" });
  const card = (((r.ext || {}).card) || {})[me.id] || {};
  return h("div", { class: "yacht" },
    h("div", { class: "y-dice" }, LP.dice.map(function (v, i) { return h("button", { type: "button", class: "y-die" + (LP.hold[i] ? " hold" : ""), text: DIE[v], onclick: function () { LP.hold[i] = !LP.hold[i]; render(); } }); })),
    h("button", { type: "button", class: "px-btn", disabled: LP.rolls >= 3, onclick: function () { LP.dice = LP.dice.map(function (v, i) { return LP.hold[i] ? v : 1 + Math.floor(LP.rnd() * 6); }); LP.rolls++; sfx("flip"); render(); }, text: "🎲 다시 굴리기 (" + (3 - LP.rolls) + "번 남음) · 누른 주사위는 고정" }),
    h("div", { class: "y-card" }, YACHT_CATS.map(function (c) {
      const used = card[c.id] != null, val = c.f(LP.dice);
      return h("button", { type: "button", class: "y-cat" + (used ? " used" : ""), disabled: used, onclick: function () { if (LP.sent) return; LP.sent = true; sfx("ding"); pSubmit({ cat: c.id, val: val, dice: LP.dice.slice() }); } },
        h("span", { text: c.name }), h("b", { text: used ? String(card[c.id]) : "+" + val }));
    })));
}
function hashStr(s0) { let h0 = 2166136261; for (let i = 0; i < s0.length; i++) { h0 ^= s0.charCodeAt(i); h0 = Math.imul(h0, 16777619); } return h0 >>> 0; }
function baseballPanel(r, me) {
  const key = r.id + ":" + r.phase, q = r.q;
  if (lpReset(key)) { LP.hist = []; LP.t0 = Date.now(); }
  if ((r.subs || {})[me.id] != null) { const v = r.subs[me.id]; return h("div", { class: "rf-pad done", text: v.ok ? "⚾ 정답! " + v.tries + "번 만에 맞혔어요" : "10번 안에 못 맞혔어요" }); }
  const inp = draft("input", "bb-in", { type: "text", class: "text-in", inputmode: "numeric", maxlength: "4", placeholder: "서로 다른 숫자 4개", autocomplete: "off" });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: "던지기" }));
  f.addEventListener("submit", function (ev) {
    ev.preventDefault(); const g = String(S.drafts["bb-in"] || inp.value || "").trim();
    if (!/^\d{4}$/.test(g) || new Set(g).size !== 4) { toast("서로 다른 숫자 4개를 넣어요."); return; }
    let st = 0, ba = 0; for (let i = 0; i < 4; i++) { if (g[i] === q.secret[i]) st++; else if (q.secret.indexOf(g[i]) >= 0) ba++; }
    LP.hist.push({ g: g, s: st, b: ba }); S.drafts["bb-in"] = ""; sfx(st === 4 ? "correct" : "click");
    if (st === 4 || LP.hist.length >= 10) { if (!LP.sent) { LP.sent = true; pSubmit({ ok: st === 4, tries: LP.hist.length, ms: Date.now() - LP.t0 }); } }
    render();
  });
  return h("div", { class: "bb" }, f, h("ul", { class: "pr-list" }, LP.hist.slice().reverse().map(function (x, i) { return h("li", null, h("span", { text: (LP.hist.length - i) + ". " + x.g }), h("b", { text: x.s === 4 ? "⚾ 홈런!" : x.s + "S " + x.b + "B" + (x.s + x.b === 0 ? " (아웃)" : "") })); })), h("p", { class: "hint", text: "남은 기회 " + (10 - LP.hist.length) + "번" }));
}
function tabooPanel(r, me) {
  const words = r.q.words;
  return h("div", { class: "tb" }, h("p", { class: "note", text: "내 금지어는 비밀! 다른 사람의 금지어:" }),
    h("ul", { class: "pr-list" }, (r.lineup || []).map(function (m) { return h("li", null, h("span", { text: nickOf(m) }), h("b", { text: me && m === me.id ? "???" : "‘" + words[m] + "’" })); })),
    h("p", { class: "hint", text: "아래 대화창으로 수다를 떨어요. 상대가 자기 금지어를 말하게 유도하세요!" }));
}
/* taboo: check my own message against my secret word before sending */
async function tabooCheck(text) {
  const me = meMember(), r = S.room; if (!me || !r || r.type !== "taboo" || r.status !== "q") return false;
  const w = r.q.words[me.id]; if (!w || normWord(text).indexOf(normWord(w)) < 0) return false;
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const rr = snap.data(); if (!rr || rr.status !== "q") return;
      const ext = JSON.parse(JSON.stringify(rr.ext || {})), q = JSON.parse(JSON.stringify(rr.q)); ext.catch = ext.catch || {}; const c = ext.catch[rr.rn] = ext.catch[rr.rn] || {};
      c[me.id] = (c[me.id] || 0) + 1;
      const fresh = TABOO_WORDS.filter(function (x) { return q.used.indexOf(x) < 0; }); const nw = fresh.length ? fresh[Math.floor(Math.random() * fresh.length)] : TABOO_WORDS[0];
      q.words[me.id] = nw; q.used.push(nw);
      sysMsg(tx, rr, "💥 " + me.nick + "님 금지어 ‘" + w + "’ 발언! (-40)");
      tx.update(roomRef(), { ext: ext, q: q });
    });
    sfx("bang");
  } catch (e) {}
  return true;
}


/* ================= 미술관: 그림판 · 그림 저장 · 비교 ================= */
const ART_INKS = ["#1b1b1d", "#d2382f", "#f07a1a", "#f4d35e", "#2f9e57", "#2f6fd2", "#6ec6f0", "#8a4fc9", "#ff7eb6", "#8b5a2b", "#f2c6a0", "#ffffff"];
const ART_SIZES = [3, 7, 14, 26];
const PAD = { key: null, el: null, cv: null, ctx: null, color: ART_INKS[0], size: 7, tool: "pen", undo: [], dirty: false, sent: false, last: null, timer: 0, locked: false };
const ART_IMG = {};   /* live doc id → dataURL */
function padFlood(ctx, x, y, hex) {
  const W = 320, img = ctx.getImageData(0, 0, W, W), d = img.data, i0 = (Math.floor(y) * W + Math.floor(x)) * 4;
  const tr = d[i0], tg = d[i0 + 1], tb = d[i0 + 2], c = parseInt(hex.slice(1), 16), nr = c >> 16 & 255, ng = c >> 8 & 255, nb = c & 255;
  if (Math.abs(tr - nr) + Math.abs(tg - ng) + Math.abs(tb - nb) < 8) return;
  const same = function (i) { return Math.abs(d[i] - tr) + Math.abs(d[i + 1] - tg) + Math.abs(d[i + 2] - tb) < 90; };
  const st = [Math.floor(x), Math.floor(y)], seen = new Uint8Array(W * W);
  while (st.length) {
    const py = st.pop(), px = st.pop(); if (px < 0 || py < 0 || px >= W || py >= W) continue;
    const k = py * W + px; if (seen[k]) continue; seen[k] = 1; const i = k * 4; if (!same(i)) continue;
    d[i] = nr; d[i + 1] = ng; d[i + 2] = nb; d[i + 3] = 255;
    st.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1);
  }
  ctx.putImageData(img, 0, 0);
}
/* one canvas per round (kept across re-renders so the drawing survives) */
function drawPad(key, onSubmit, opt) {
  opt = opt || {};
  if (PAD.key !== key) {
    clearTimeout(PAD.timer);
    PAD.key = key; PAD.undo = []; PAD.dirty = false; PAD.sent = false; PAD.tool = "pen";
    const cv = document.createElement("canvas"); cv.width = 320; cv.height = 320; cv.className = "art-cv";
    const ctx = cv.getContext("2d"); ctx.fillStyle = PAPER; ctx.fillRect(0, 0, 320, 320); ctx.lineCap = "round"; ctx.lineJoin = "round";
    PAD.cv = cv; PAD.ctx = ctx;
    const xy = function (e) { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * 320, (e.clientY - b.top) / b.height * 320]; };
    const snap = function () { PAD.undo.push(ctx.getImageData(0, 0, 320, 320)); if (PAD.undo.length > 15) PAD.undo.shift(); };
    cv.addEventListener("pointerdown", function (e) {
      if (PAD.sent || PAD.locked) return; e.preventDefault(); const p = xy(e); snap(); PAD.dirty = true;
      if (PAD.tool === "fill") { padFlood(ctx, p[0], p[1], PAD.color); return; }
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
      SK.drawing = true; PAD.last = p;
      ctx.strokeStyle = PAD.tool === "erase" ? PAPER : PAD.color; ctx.lineWidth = PAD.tool === "erase" ? PAD.size * 2 : PAD.size;
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 0.01, p[1]); ctx.stroke();
    });
    cv.addEventListener("pointermove", function (e) {
      if (!PAD.last) return; const p = xy(e);
      ctx.beginPath(); ctx.moveTo(PAD.last[0], PAD.last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); PAD.last = p;
    });
    const up = function () { if (!PAD.last) return; PAD.last = null; SK.drawing = false; if (SK.pendingRender) { SK.pendingRender = false; render(); } };
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { cv.addEventListener(ev, up); });
    PAD.el = h("div", { class: "art-pad" }, cv);
    /* never lose a drawing: hand it in by itself just before the time runs out */
    if (opt.endAt) { const ms = opt.endAt - Date.now() - 1500; PAD.timer = setTimeout(function () { if (PAD.key === key && !PAD.sent && PAD.dirty) padSubmit(onSubmit, true); }, Math.max(500, ms)); }
  }
  PAD.locked = !!opt.locked;
  PAD.cv.classList.toggle("locked", PAD.locked);
  if (PAD.sent) return h("div", { class: "art-done" }, h("img", { class: "art-img", src: PAD.cv.toDataURL("image/jpeg", 0.7), alt: "내 그림" }), h("p", { class: "hint", text: "제출 완료! 다른 사람을 기다려요" }));
  const tools = h("div", { class: "art-tools" },
    h("div", { class: "art-inks" }, ART_INKS.map(function (c) { const b = h("button", { type: "button", class: "ink" + (PAD.color === c && PAD.tool !== "erase" ? " on" : ""), "aria-label": c, onclick: function () { PAD.color = c; if (PAD.tool === "erase") PAD.tool = "pen"; render(); } }); b.style.background = c; return b; })),
    h("div", { class: "art-row" },
      ART_SIZES.map(function (s0) { return h("button", { type: "button", class: "px-btn sz" + (PAD.size === s0 ? " go-btn" : ""), onclick: function () { PAD.size = s0; render(); } }, h("i", { style: "width:" + Math.max(4, s0 / 1.6) + "px;height:" + Math.max(4, s0 / 1.6) + "px" })); }),
      h("button", { type: "button", class: "px-btn" + (PAD.tool === "fill" ? " go-btn" : ""), text: "🪣", title: "채우기", onclick: function () { PAD.tool = PAD.tool === "fill" ? "pen" : "fill"; render(); } }),
      h("button", { type: "button", class: "px-btn" + (PAD.tool === "erase" ? " go-btn" : ""), text: "🧽", title: "지우개", onclick: function () { PAD.tool = PAD.tool === "erase" ? "pen" : "erase"; render(); } }),
      h("button", { type: "button", class: "px-btn", text: "↩", title: "되돌리기", onclick: function () { const u = PAD.undo.pop(); if (u) PAD.ctx.putImageData(u, 0, 0); } }),
      h("button", { type: "button", class: "px-btn", text: "🗑", title: "전부 지우기", onclick: function () { PAD.undo.push(PAD.ctx.getImageData(0, 0, 320, 320)); PAD.ctx.fillStyle = PAPER; PAD.ctx.fillRect(0, 0, 320, 320); } })));
  return h("div", { class: "art-wrap" }, PAD.el, opt.locked ? h("p", { class: "hint", text: opt.lockText || "잠깐 기다려요…" }) : tools,
    opt.locked ? null : h("button", { type: "button", class: "save", onclick: function () { padSubmit(onSubmit); }, text: "🎨 그림 제출" }));
}
async function padSubmit(onSubmit, auto) {
  if (PAD.sent) return;
  if (!PAD.dirty) { if (!auto) toast("먼저 그림을 그려 주세요!"); return; } PAD.sent = true; clearTimeout(PAD.timer);
  const me = meMember(), r = S.room; if (!me || !r) return;
  const img = PAD.cv.toDataURL("image/jpeg", 0.7);
  try {
    const ref = await addDoc(collection(db, "rooms", S.roomId, "live"), { uid: myUid(), m: me.id, rk: "a:" + r.type + ":" + (r.game || 0) + ":" + (r.rn || 0), img: img, createdAt: serverTimestamp() });
    ART_IMG[ref.id] = img; sfx("ding");
    await onSubmit(ref.id, PAD.cv);
  } catch (e) { PAD.sent = false; toast(errText(e)); }
  render();
}
function artImg(id, cls) {
  if (!id) return h("div", { class: "art-img empty " + (cls || ""), text: "(그림 없음)" });
  if (ART_IMG[id] == null) {
    ART_IMG[id] = "";
    getDoc(doc(db, "rooms", S.roomId, "live", id)).then(function (snap) { ART_IMG[id] = snap.exists() ? snap.data().img : "x"; render(); }).catch(function () { ART_IMG[id] = "x"; });
  }
  const src = ART_IMG[id];
  return src && src !== "x" ? h("img", { class: "art-img " + (cls || ""), src: src, alt: "그림" }) : h("div", { class: "art-img empty " + (cls || ""), text: src === "x" ? "(불러오기 실패)" : "불러오는 중…" });
}
/* ---------- reference pictures (same seed → same picture on every phone) ---------- */
const REF_INKS = ["#d2382f", "#f07a1a", "#f4d35e", "#2f9e57", "#2f6fd2", "#8a4fc9", "#ff7eb6", "#1b1b1d", "#8b5a2b"];
function refPaint(ctx, seed, n) {
  const rnd = mulberry32(seed >>> 0), R = function (a, b) { return a + rnd() * (b - a); }, col = function () { return REF_INKS[Math.floor(rnd() * REF_INKS.length)]; };
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, 320, 320); ctx.lineCap = "round"; ctx.lineJoin = "round";
  for (let i = 0; i < n; i++) {
    const kind = Math.floor(rnd() * 6), x = R(50, 270), y = R(50, 270), s0 = R(28, 70);
    ctx.fillStyle = ctx.strokeStyle = col(); ctx.lineWidth = R(7, 14);
    ctx.beginPath();
    if (kind === 0) { ctx.arc(x, y, s0, 0, Math.PI * 2); ctx.fill(); }
    else if (kind === 1) { ctx.rect(x - s0, y - s0 * 0.7, s0 * 2, s0 * 1.4); ctx.fill(); }
    else if (kind === 2) { ctx.moveTo(x, y - s0); ctx.lineTo(x + s0, y + s0 * 0.8); ctx.lineTo(x - s0, y + s0 * 0.8); ctx.closePath(); ctx.fill(); }
    else if (kind === 3) { ctx.moveTo(R(20, 300), R(20, 300)); ctx.lineTo(R(20, 300), R(20, 300)); ctx.stroke(); }
    else if (kind === 4) { ctx.arc(x, y, s0, 0, Math.PI * 2); ctx.stroke(); }
    else { ctx.moveTo(x - s0, y); for (let k = 1; k <= 4; k++) ctx.lineTo(x - s0 + k * s0 / 2, y + (k % 2 ? -s0 / 2 : s0 / 2)); ctx.stroke(); }
  }
}
/* montage: a random cartoon suspect */
function facePaint(ctx, seed) {
  const rnd = mulberry32(seed >>> 0), pickR = function (a) { return a[Math.floor(rnd() * a.length)]; };
  const skin = pickR(["#f2c6a0", "#e0a878", "#c68642", "#8d5524", "#ffdbac"]), hair = pickR(["#1b1b1d", "#8b5a2b", "#f4d35e", "#d2382f", "#7a7a7a", "#2f6fd2"]);
  const shape = Math.floor(rnd() * 3), hairT = Math.floor(rnd() * 5), eyes = Math.floor(rnd() * 4), mouth = Math.floor(rnd() * 4);
  const glasses = rnd() < 0.4, stache = rnd() < 0.35, mole = rnd() < 0.35, scar = rnd() < 0.25, ears = rnd() < 0.5, hat = rnd() < 0.25;
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, 320, 320); ctx.lineCap = "round"; ctx.lineWidth = 5; ctx.strokeStyle = "#1b1b1d";
  const cx = 160, cy = 175, fw = shape === 1 ? 92 : 100, fh = shape === 1 ? 120 : 108;
  if (hairT === 4) { ctx.fillStyle = hair; ctx.beginPath(); ctx.ellipse(cx, cy + 10, fw + 22, fh + 15, 0, 0, Math.PI * 2); ctx.fill(); }
  if (ears) { ctx.fillStyle = skin; [-1, 1].forEach(function (s0) { ctx.beginPath(); ctx.ellipse(cx + s0 * fw, cy, 18, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }); }
  ctx.fillStyle = skin; ctx.beginPath();
  if (shape === 2) ctx.rect(cx - fw, cy - fh, fw * 2, fh * 2); else ctx.ellipse(cx, cy, fw, fh, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = hair;
  if (hairT === 1 || hairT === 4) { ctx.beginPath(); ctx.ellipse(cx, cy - fh + 18, fw + 4, 42, 0, Math.PI, Math.PI * 2); ctx.fill(); }
  if (hairT === 2) { ctx.beginPath(); for (let k = 0; k <= 8; k++) { const x = cx - fw + k * fw / 4; ctx.lineTo(x, cy - fh + (k % 2 ? -40 : 10)); } ctx.closePath(); ctx.fill(); }
  if (hairT === 3) { ctx.beginPath(); ctx.arc(cx, cy - fh + 6, 26, 0, Math.PI * 2); ctx.fill(); }
  if (hat) { ctx.fillStyle = pickR(["#d2382f", "#2f9e57", "#1b1b1d"]); ctx.fillRect(cx - fw - 16, cy - fh - 4, (fw + 16) * 2, 18); ctx.fillRect(cx - fw * 0.7, cy - fh - 70, fw * 1.4, 70); }
  const ey = cy - 18;
  [-1, 1].forEach(function (s0) {
    const ex = cx + s0 * 38; ctx.fillStyle = "#1b1b1d"; ctx.beginPath();
    if (eyes === 0) { ctx.arc(ex, ey, 7, 0, Math.PI * 2); ctx.fill(); }
    else if (eyes === 1) { ctx.fillStyle = "#fff"; ctx.arc(ex, ey, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = "#1b1b1d"; ctx.beginPath(); ctx.arc(ex + 4, ey + 3, 6, 0, Math.PI * 2); ctx.fill(); }
    else if (eyes === 2) { ctx.moveTo(ex - 14, ey); ctx.lineTo(ex + 14, ey); ctx.stroke(); }
    else { ctx.arc(ex, ey + 4, 13, Math.PI, Math.PI * 2); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(ex - 16, ey - 24 + (eyes === 3 ? 6 : 0) * s0); ctx.lineTo(ex + 16, ey - 24 - (eyes === 3 ? 6 : 0) * s0); ctx.stroke();
  });
  if (glasses) { ctx.lineWidth = 4; [-1, 1].forEach(function (s0) { ctx.beginPath(); ctx.arc(cx + s0 * 38, ey, 22, 0, Math.PI * 2); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(cx - 16, ey); ctx.lineTo(cx + 16, ey); ctx.stroke(); ctx.lineWidth = 5; }
  ctx.beginPath(); ctx.moveTo(cx, ey + 12); ctx.lineTo(cx - 10, cy + 30); ctx.lineTo(cx + 4, cy + 32); ctx.stroke();
  const my = cy + 62; ctx.beginPath();
  if (mouth === 0) { ctx.arc(cx, my - 18, 30, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  else if (mouth === 1) { ctx.moveTo(cx - 26, my); ctx.lineTo(cx + 26, my); ctx.stroke(); }
  else if (mouth === 2) { ctx.fillStyle = "#7a1d18"; ctx.ellipse(cx, my, 20, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
  else { ctx.arc(cx, my + 22, 28, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  if (stache) { ctx.fillStyle = hair; ctx.beginPath(); ctx.ellipse(cx - 18, cy + 44, 20, 8, 0.2, 0, Math.PI * 2); ctx.ellipse(cx + 18, cy + 44, 20, 8, -0.2, 0, Math.PI * 2); ctx.fill(); }
  if (mole) { ctx.fillStyle = "#3b2414"; ctx.beginPath(); ctx.arc(cx + 50, cy + 36, 5, 0, Math.PI * 2); ctx.fill(); }
  if (scar) { ctx.strokeStyle = "#a33"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 62, cy - 4); ctx.lineTo(cx - 40, cy + 26); for (let k = 0; k < 3; k++) { ctx.moveTo(cx - 58 + k * 8, cy + 4 + k * 10); ctx.lineTo(cx - 46 + k * 8, cy + k * 10); } ctx.stroke(); }
}
function refCanvas(paint, cls) { const cv = document.createElement("canvas"); cv.width = 320; cv.height = 320; cv.className = "art-img " + (cls || ""); paint(cv.getContext("2d")); return cv; }
/* how close is a drawing to the reference? compare coarse colour grids where either side has ink */
function artSim(cv, paint) {
  const ref = document.createElement("canvas"); ref.width = 320; ref.height = 320; paint(ref.getContext("2d"));
  function grid(src, n) { const c = document.createElement("canvas"); c.width = n; c.height = n; const x = c.getContext("2d"); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = "high"; x.drawImage(src, 0, 0, n, n); return x.getImageData(0, 0, n, n).data; }
  const P0 = [243, 241, 236];
  function score(n) {
    const a = grid(cv, n), b = grid(ref, n); let tot = 0, cnt = 0;
    for (let i = 0; i < a.length; i += 4) {
      const ia = Math.hypot(a[i] - P0[0], a[i + 1] - P0[1], a[i + 2] - P0[2]) > 40, ib = Math.hypot(b[i] - P0[0], b[i + 1] - P0[1], b[i + 2] - P0[2]) > 40;
      if (!ia && !ib) continue; cnt++;
      tot += Math.max(0, 1 - Math.hypot(a[i] - b[i], a[i + 1] - b[i + 1], a[i + 2] - b[i + 2]) / 130);
    }
    return cnt ? tot / cnt : 0;
  }
  return Math.round((score(24) * 0.6 + score(10) * 0.4) * 1000) / 10;
}
function artRk(r) { return r.id + ":" + (r.game || 0) + ":" + (r.rn || 0) + ":" + r.type; }
function padEnd(r) { return phaseEnd(r) || Date.now() + 60000; }
/* ---------- the four art rooms ---------- */
function copyDef(o) {
  return {
    rounds: 3, qSec: o.qSec, input: "art", rules: o.rules,
    makeQ: function (r) { return { key: "art" + r.rn + Math.random(), text: o.text, seed: Math.floor(Math.random() * 2147483647), n: o.n0 + (r.rn || 1), show: o.show || 0 }; },
    panel: function (r, me) {
      const q = r.q, paint = function (c) { refPaint(c, q.seed, q.n); };
      const showFor = o.show ? (FAST ? Math.max(2, Math.round(o.show / FAST)) : o.show) * 1000 : 0;
      const since = r.phaseAt && r.phaseAt.toMillis ? Date.now() - phMs(r) : 0, peek = o.show && since < showFor;
      if (peek && !S.artPeekT) S.artPeekT = setTimeout(function () { S.artPeekT = 0; render(); }, showFor - since + 50);
      const pad = drawPad(artRk(r), function (id, cv) { return pSubmit({ img: id, sim: artSim(cv, paint) }); }, { endAt: padEnd(r), locked: peek, lockText: "👀 잘 봐 두세요! 곧 사라져요" });
      return h("div", { class: "art-duo" }, o.show ? (peek ? refCanvas(paint, "ref") : h("div", { class: "art-img empty ref", text: "🙈 그림은 사라졌어요. 기억으로!" })) : refCanvas(paint, "ref"), pad);
    },
    resolve: function (r) {
      const subs = r.subs || {}, ok = r.lineup.filter(function (m) { return subs[m] && subs[m].img; }).map(function (m) { return { m: m, v: +subs[m].sim || 0 }; });
      const pts = rankPoints(ok, function (a, b) { return b.v - a.v; });
      ok.forEach(function (e) { if (e.v >= 80) pts[e.m] += 30; });
      return { pts: pts, info: {} };
    },
    round: function (x, r) {
      const subs = x.subs || {}, list = (r.lineup || []).filter(function (m) { return subs[m]; }).sort(function (a, b) { return (subs[b].sim || 0) - (subs[a].sim || 0); });
      return [h("div", { class: "art-gal" }, h("figure", { class: "ref" }, refCanvas(function (c) { refPaint(c, x.q.seed, x.q.n); }), h("figcaption", { text: "원본" })),
        list.map(function (m) { return h("figure", { class: x.pts[m] === 100 ? "win" : "" }, artImg(subs[m].img), h("figcaption", { text: nickOf(m) + " · 닮음 " + subs[m].sim + "% · +" + (x.pts[m] || 0) })); }))];
    }
  };
}
const TEL_START = ["두목이 몰래 라면을 끓이다 걸렸다", "고양이가 회의를 주최했다", "편의점 알바가 마법사였다", "버스에서 펭귄이 내린다", "외계인이 김장을 한다", "우디가 무대에서 탭댄스를 춘다", "냉장고 속에 작은 마을이 있다", "산타가 배달 오토바이를 탄다"];
Object.assign(PARTY, {
  copy: copyDef({ qSec: 60, n0: 2, text: "원본 그림을 최대한 똑같이 그려요!", rules: ["원본 그림을 보면서 60초 안에 똑같이 그려요. 색과 위치까지!", "제출하면 원본과 얼마나 닮았는지 자동으로 채점해요(닮음 %).", "닮은 순서대로 100·70·50… 점, 80% 이상이면 +30 보너스. 라운드마다 도형이 늘어나요."] }),
  recall: copyDef({ qSec: 50, n0: 1, show: 5, text: "5초 동안 보고, 기억으로 그려요!", rules: ["원본 그림이 5초 동안만 보여요. 그동안은 그릴 수 없어요.", "사라진 뒤 기억만으로 똑같이 그려요. 색·위치·크기 모두 채점!", "닮은 순서대로 100·70·50… 점, 80% 이상이면 +30. 라운드마다 더 복잡해져요."] }),
  montage: {
    rounds: 3, qSec: 75, vSec: 20, input: "art", vote: true,
    rules: ["매 라운드 한 명이 목격자! 목격자에게만 범인 얼굴이 보여요.", "목격자는 대화창으로 얼굴을 설명하고(그림은 못 그려요), 나머지는 몽타주를 그려요. 75초.", "목격자가 가장 닮은 몽타주를 골라요. 뽑힌 화가 +100, 목격자는 제출된 그림이 있으면 +40.", "마지막에 진짜 범인 얼굴과 나란히 공개!"],
    makeQ: function (r) { const n = r.lineup.length, w = r.lineup[((r.rn || 1) - 1) % n]; return { key: "mt" + r.rn + Math.random(), text: "🕵️ 목격자 " + nickOf(w) + "의 설명을 듣고 범인을 그려라!", seed: Math.floor(Math.random() * 2147483647), witness: w }; },
    canSubmit: function (r, m) { return m !== r.q.witness; },
    restNote: function (r) { return h("div", { class: "art-duo" }, refCanvas(function (c) { facePaint(c, r.q.seed); }, "ref"), h("p", { class: "pr-big ok", text: "당신이 목격자! 아래 대화창으로 이 얼굴을 설명하세요. (눈·코·입·머리·특징…)" })); },
    panel: function (r) { return drawPad(artRk(r), function (id) { return pSubmit(id); }, { endAt: padEnd(r) }); },
    voters: function (r) { return [r.q.witness]; },
    voteText: "범인과 가장 닮은 몽타주는?",
    waitNote: function (r) { return "목격자 " + nickOf(r.q.witness) + "님이 가장 닮은 몽타주를 고르는 중… 🕵️"; },
    cands: function (r) { const subs = r.subs || {}; return shuffled(r.lineup.filter(function (m) { return subs[m]; })).map(function (m, i) { return { id: "c" + i, img: subs[m], owner: m }; }); },
    resolve: function (r) {
      const v = (r.votes || {})[r.q.witness], c = (r.cands || []).find(function (x) { return x.id === v; }), pts = {};
      if (c) pts[c.owner] = 100;
      if ((r.cands || []).length) pts[r.q.witness] = 40;
      return { pts: pts, info: { pick: c ? c.owner : null } };
    },
    round: function (x) {
      return [h("div", { class: "art-gal" }, h("figure", { class: "ref" }, refCanvas(function (c) { facePaint(c, x.q.seed); }), h("figcaption", { text: "진짜 범인" })),
        (x.cands || []).map(function (c) { return h("figure", { class: c.owner === x.info.pick ? "win" : "" }, artImg(c.img), h("figcaption", { text: nickOf(c.owner) + (c.owner === x.info.pick ? " · 🏆 목격자 선택" : "") })); }))];
    }
  },
  telephone: {
    rounds: 6, qSec: 50, input: "art", noScore: true, roundsFor: function (r) { return Math.max(3, Math.min(6, (r.players || r.lineup || []).length)); },
    rules: ["1라운드: 각자 재밌는 문장을 써요.", "다음 라운드: 옆 사람 문장을 그림으로! 그다음: 옆 사람 그림을 보고 문장으로!", "바로 앞 것만 볼 수 있어요. 전달될수록 엉망진창… 마지막에 처음부터 끝까지 공개!", "라운드 수 = 참가 인원(최대 6)."],
    makeQ: function (r) {
      const n = r.lineup.length, k = (r.rn || 1) - 1, chains = (r.ext || {}).chains, give = {};
      r.lineup.forEach(function (m, i) { const c = (i + k) % n; give[m] = { c: c, prev: chains ? chains[c].items[chains[c].items.length - 1] : null }; });
      const draw = k % 2 === 1;
      return { key: "tel" + r.rn, text: k === 0 ? "재밌는 문장을 하나 써요! (다음 사람이 그려요)" : draw ? "앞사람의 문장을 그림으로!" : "앞사람의 그림을 보고 문장으로!", give: give, input: draw ? "art" : "text", long: true, hint: pick(TEL_START) };
    },
    panel: function (r) { return drawPad(artRk(r), function (id) { return pSubmit(id); }, { endAt: padEnd(r) }); },
    extra: function (r) {
      const me = meMember(), g = me && r.q.give[me.id]; if (!g) return null;
      if (!g.prev) return h("p", { class: "hint", text: "예시: " + r.q.hint });
      return g.prev.k === "d" ? h("div", { class: "art-prev" }, h("p", { class: "field-label", text: "앞사람의 그림" }), artImg(g.prev.v)) : h("p", { class: "pr-quote", text: "“" + g.prev.v + "”" });
    },
    resolve: function (r) {
      const ext = JSON.parse(JSON.stringify(r.ext || {})), subs = r.subs || {}, draw = r.q.input === "art";
      if (!ext.chains) ext.chains = r.lineup.map(function () { return { items: [] }; });
      r.lineup.forEach(function (m) { const g = r.q.give[m]; if (!g) return; const v = subs[m]; ext.chains[g.c].items.push(draw ? { k: "d", v: v || "", m: m } : { k: "t", v: v ? String(v) : "(…멍…)", m: m }); });
      return { pts: {}, info: {}, ext: ext, hideSubs: true };
    },
    round: function () { return [h("p", { class: "note", text: "전달 중… 다음 사람에게 넘어가요 📨" })]; },
    final: function (r) {
      return h("div", { class: "tel" }, ((r.ext || {}).chains || []).map(function (c, i) {
        return h("div", { class: "tel-chain" }, h("b", { text: "📨 전달 " + (i + 1) }), (c.items || []).map(function (it) {
          return h("div", { class: "tel-it" }, h("small", { text: nickOf(it.m) }), it.k === "d" ? artImg(it.v) : h("p", { class: "pr-quote", text: "“" + it.v + "”" }));
        }));
      }));
    }
  }
});


/* ================= 불주먹 올림픽: 개인 기록 종목을 이어 붙이는 메타 게임 ================= */
const OLY_EVENTS = ["reflex", "tensec", "typing", "memory", "ox", "trivia", "chosung", "copy", "recall", "baseball"];
function olyName(ev) { const g = REG_BY[ev]; return g ? g.icon + " " + g.name : ev; }
function olyUsed(r) { return (r.hist || []).map(function (x) { return x.q && x.q.ev; }).filter(Boolean); }
function olyPick(r, pool) { const used = olyUsed(r), fresh = pool.filter(function (e) { return used.indexOf(e) < 0; }); return pick(fresh.length ? fresh : pool); }
function olyQ(r, ev, extra) {
  const sub = PARTY[ev], q = sub.makeQ(r), sec = ev === "tensec" ? (q.target || 10) + 25 : sub.qSec;
  return Object.assign(q, { ev: ev, input: q.input || sub.input, sec: sec, key: q.key || ev, text: "[" + olyName(ev) + "] " + (q.text || "") }, extra || {});
}
function olyRes(r) { const sub = PARTY[r.q.ev]; return sub.resolve(Object.assign({}, r, { type: r.q.ev })); }
function olyRound(x, r) { const sub = PARTY[x.q.ev]; return [h("p", { class: "pr-big", text: olyName(x.q.ev) })].concat(sub.round(x, Object.assign({}, r, { type: x.q.ev })) || []); }
function olyDef(o) {
  return Object.assign({
    rounds: 5, oly: true, input: "oly", qSec: 30,
    makeQ: function (r) { return olyQ(r, olyPick(r, OLY_EVENTS)); },
    resolve: function (r) { const res = olyRes(r); return { pts: res.pts, info: res.info || {} }; },
    round: olyRound,
    final: function (r) { return h("p", { class: "note", text: "종목: " + (r.hist || []).map(function (x) { return olyName(x.q.ev); }).join(" → ") }); }
  }, o);
}
const TEAM_NAMES = [["🔥 불꽃팀", "#d2382f"], ["👊 주먹팀", "#2f6fd2"]];
function teamOf(q, m) { return q.teams && q.teams.a.indexOf(m) >= 0 ? 0 : 1; }
Object.assign(PARTY, {
  pentathlon: olyDef({ rounds: 5, fixedRounds: true, rules: ["서로 다른 5종목을 연달아 겨뤄요(순발력·타자·기억력·퀴즈·그림…).", "종목마다 순위대로 100·70·50… 점(퀴즈는 정답+속도 점수).", "5종목 누적 점수로 금·은·동!"] }),
  triathlon: olyDef({ rounds: 3, fixedRounds: true, rules: ["서로 다른 3종목 누적 점수 대결.", "종목은 매번 무작위. 짧고 굵게!"] }),
  solo: olyDef({ rounds: 5, rules: ["라운드마다 무작위 종목이 나와요(같은 종목은 잘 안 겹쳐요).", "라운드 수는 3·5·7 중 선택. 누적 점수로 우승."] }),
  survivor: olyDef({
    roundsFor: function (r) { return Math.max(2, (r.players || r.lineup || []).length - 1); },
    rules: ["매 라운드 무작위 종목! 그 라운드 점수가 가장 낮은 사람이 탈락해요(동점이면 함께 탈락, 단 전원 탈락은 없음).", "탈락하면 관전. 마지막 생존자 +300.", "라운드 수 = 인원 − 1."],
    canSubmit: function (r, m) { return ((r.ext || {}).out || []).indexOf(m) < 0; },
    over: function (r) { const out = (r.ext || {}).out || []; return r.lineup.filter(function (m) { return out.indexOf(m) < 0; }).length <= 1; },
    restNote: function () { return h("p", { class: "note", text: "💀 탈락했어요. 관전하며 응원해요!" }); },
    resolve: function (r) {
      const res = olyRes(r), ext = JSON.parse(JSON.stringify(r.ext || {})); ext.out = ext.out || [];
      const alive = r.lineup.filter(function (m) { return ext.out.indexOf(m) < 0; }), pts = {};
      alive.forEach(function (m) { pts[m] = res.pts[m] || 0; });
      const low = Math.min.apply(null, alive.map(function (m) { return pts[m]; })), losers = alive.filter(function (m) { return pts[m] === low; });
      const gone = losers.length < alive.length ? losers : [];
      gone.forEach(function (m) { ext.out.push(m); });
      const left = alive.filter(function (m) { return gone.indexOf(m) < 0; });
      if (left.length === 1 || (r.rn || 1) >= (r.total || 1)) left.forEach(function (m) { pts[m] += 300; });
      return { pts: pts, info: Object.assign({}, res.info || {}, { gone: gone, left: left }), ext: ext };
    },
    round: function (x, r) { return olyRound(x, r).concat([h("p", { class: "pr-big bad", text: x.info.gone.length ? "💀 탈락: " + x.info.gone.map(nickOf).join(", ") : "탈락 없음 (전원 동점)" }), h("p", { class: "note", text: "생존: " + x.info.left.map(nickOf).join(", ") })]); }
  }),
  team: olyDef({
    rules: ["시작하면 두 팀으로 나눠요(🔥 불꽃팀 vs 👊 주먹팀).", "라운드마다 무작위 종목. 팀원 점수의 평균이 팀 점수 — 인원이 달라도 공평해요.", "팀 점수는 팀원 모두에게 똑같이 들어가요. 이긴 팀은 라운드마다 +50!"],
    makeQ: function (r) {
      let teams = (r.rn || 1) > 1 && r.q && r.q.teams;
      if (!teams) { const sh = shuffled(r.lineup), half = Math.ceil(sh.length / 2); teams = { a: sh.slice(0, half), b: sh.slice(half) }; }
      return olyQ(r, olyPick(r, OLY_EVENTS), { teams: teams });
    },
    resolve: function (r) {
      const res = olyRes(r), t = r.q.teams, avg = function (L) { return Math.round(L.reduce(function (a, m) { return a + (res.pts[m] || 0); }, 0) / Math.max(1, L.length)); };
      const A = avg(t.a), B = avg(t.b), pts = {};
      t.a.forEach(function (m) { pts[m] = A + (A > B ? 50 : 0); }); t.b.forEach(function (m) { pts[m] = B + (B > A ? 50 : 0); });
      return { pts: pts, info: Object.assign({}, res.info || {}, { A: A, B: B, raw: res.pts }) };
    },
    extra: function (r) { const t = r.q.teams; return h("p", { class: "note", text: TEAM_NAMES[0][0] + ": " + t.a.map(nickOf).join(", ") + "  vs  " + TEAM_NAMES[1][0] + ": " + t.b.map(nickOf).join(", ") }); },
    round: function (x, r) { return olyRound(Object.assign({}, x, { pts: x.info.raw || x.pts }), r).concat([h("p", { class: "pr-big ok", text: TEAM_NAMES[0][0] + " " + x.info.A + " : " + x.info.B + " " + TEAM_NAMES[1][0] })]); },
    final: function (r) {
      const t = r.q.teams, sc = r.scores || {}, A = sc[t.a[0]] || 0, B = sc[t.b[0]] || 0;
      return h("p", { class: "pr-big ok", text: A === B ? "무승부!" : "🏆 " + (A > B ? TEAM_NAMES[0][0] : TEAM_NAMES[1][0]) + " 승리! (" + A + " : " + B + ")" });
    }
  }),
  cup: olyDef({
    roundsFor: function (r) { return Math.max(1, (r.cupEvents || []).length || 5); },
    rules: ["두목이 대회 종목과 순서를 정해요(대기실에서 선택, 안 고르면 무작위 5종목).", "모든 점수 2배! 우승자는 ‘두목배 챔피언’ 칭호를 받아요.", "정식 대회이니 진지하게…"],
    makeQ: function (r) { const L = r.cupEvents || []; return olyQ(r, L.length ? L[((r.rn || 1) - 1) % L.length] : olyPick(r, OLY_EVENTS)); },
    resolve: function (r) { const res = olyRes(r), pts = {}; Object.keys(res.pts).forEach(function (m) { pts[m] = res.pts[m] * 2; }); return { pts: pts, info: res.info || {} }; },
    lobby: function (r) {
      const L = r.cupEvents || [], boss = isBoss();
      return h("div", { class: "field" }, h("div", { class: "field-label", text: "대회 종목 " + (L.length ? L.length + "개 (누른 순서대로 진행)" : "— 무작위 5종목") }),
        h("div", { class: "chips" }, OLY_EVENTS.map(function (e) {
          const i = L.indexOf(e);
          return h("button", { type: "button", class: "chip", disabled: !boss, "aria-pressed": i >= 0 ? "true" : "false", onclick: function () { roomUpdate({ cupEvents: i >= 0 ? L.filter(function (x) { return x !== e; }) : L.concat([e]).slice(0, 10) }); }, text: (i >= 0 ? (i + 1) + ". " : "") + olyName(e) });
        })),
        boss ? null : h("p", { class: "hint", text: "종목은 두목만 정할 수 있어요." }));
    },
    final: function (r) { const sc = r.scores || {}, top = (r.lineup || []).slice().sort(function (a, b) { return (sc[b] || 0) - (sc[a] || 0); })[0]; return h("div", null, h("p", { class: "pr-big ok", text: "🏆 제1회 두목배 챔피언: " + nickOf(top) }), h("p", { class: "note", text: "종목: " + (r.hist || []).map(function (x) { return olyName(x.q.ev); }).join(" → ") })); }
  })
});

function partyDef(r) { return r && PARTY[r.type]; }
function partyRounds(r) { const d = PARTY[r.type]; if (d.roundsFor) return d.roundsFor(r); if (d.fixedRounds) return d.rounds; return [3, 5, 7].indexOf(r.prounds) >= 0 ? r.prounds : d.rounds; }
async function pStart() {
  const r0 = S.room, d = partyDef(r0), g = REG_BY[r0.type];
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < g.min) throw { code: "few", n: g.min };
      if (lineup.length > g.max) throw { code: "many", n: g.max };
      if (d.canStart && d.canStart()) throw { code: "cant", msg: d.canStart() };
      const base = Object.assign({}, r, { lineup: lineup, hist: [], rn: 1, ext: {} });
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, g.icon + " " + g.name + " 시작! " + partyRounds(r) + "라운드");
      tx.update(roomRef(), nextPhase(r, { status: "q", lineup: lineup, rn: 1, total: partyRounds(r), q: d.makeQ(base), subs: {}, subT: {}, scores: {}, hist: [], ext: {}, game: game, startedAt: serverTimestamp() }));
    });
  } catch (e) {
    if (e && e.code === "few") toast(e.n + "명 이상 모여야 시작할 수 있어요.");
    else if (e && e.code === "many") toast("최대 " + e.n + "명까지 할 수 있어요.");
    else if (e && e.code === "phase") toast("이미 게임이 시작됐어요.");
    else if (e && e.code === "cant") toast(e.msg);
    else toast(errText(e));
  }
}
async function pSubmit(val) {
  const me = meMember(), r = S.room; if (!me || !r || r.status !== "q") return;
  try {
    const el = r.phaseAt && r.phaseAt.toMillis ? Math.max(0, Date.now() - phMs(r)) : 0;
    await updateDoc(roomRef(), { ["subs." + me.id]: val, ["subT." + me.id]: el });
    await pMaybeResolve();
  } catch (e) { toast(errText(e)); }
}
function pVoters(r) { const d = PARTY[r.type]; return d.voters ? d.voters(r) : (r.lineup || []); }
async function pVote(val) {
  const me = meMember(), r = S.room; if (!me || !r || r.status !== "v") return;
  try {
    await updateDoc(roomRef(), { ["votes." + me.id]: val });
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const rr = snap.data();
      if (!rr || rr.status !== "v") return;
      const v = rr.votes || {};
      if (pVoters(rr).every(function (m) { return v[m] != null; })) pResolveTx(tx, rr);
    });
  } catch (e) { toast(errText(e)); }
}
function pExpected(r) { const d = partyDef(r); return (r.lineup || []).filter(function (m) { return !d.canSubmit || d.canSubmit(r, m); }); }
async function pMaybeResolve() {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "q") return;
    const subs = r.subs || {};
    if (pExpected(r).every(function (m) { return subs[m] != null; })) pResolveTx(tx, r);
  });
}
function pResolveTx(tx, r) {
  const d = PARTY[r.type];
  if (d.vote && r.status === "q") {   /* write phase done → anonymous vote */
    const cands = d.cands(r);
    if (cands.length) { tx.update(roomRef(), nextPhase(r, { status: "v", cands: cands, votes: {} })); return; }
  }
  const res = d.resolve(r), scores = Object.assign({}, r.scores || {});
  Object.keys(res.pts).forEach(function (m) { scores[m] = (scores[m] || 0) + res.pts[m]; });
  const rec = { rn: r.rn, q: r.q, pts: res.pts, info: res.info, subs: res.hideSubs ? null : (r.subs || {}), cands: r.cands || null, votes: r.votes || null };
  const patch = { status: "rr", scores: scores, hist: (r.hist || []).concat([rec]) };
  if (res.ext) patch.ext = res.ext;
  if (res.hideSubs) patch.subs = {};
  tx.update(roomRef(), nextPhase(r, patch));
}
async function pResolve(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || (r.status !== "q" && r.status !== "v") || (expectPhase != null && r.phase !== expectPhase)) return;
    pResolveTx(tx, r);
  });
}
async function pNext(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "rr" || (expectPhase != null && r.phase !== expectPhase)) return;
    if ((r.rn || 1) >= (r.total || 1) || (PARTY[r.type].over && PARTY[r.type].over(r))) { sysMsg(tx, r, "🏁 게임 끝! 결과를 확인하세요."); tx.update(roomRef(), nextPhase(r, { status: "result" })); return; }
    const rn = (r.rn || 1) + 1, base = Object.assign({}, r, { rn: rn });
    tx.update(roomRef(), nextPhase(r, { status: "q", rn: rn, q: PARTY[r.type].makeQ(base), subs: {}, subT: {}, cands: null, votes: {} }));
  });
}
/* 악어 이빨: 내 차례에 이빨 하나 누르기 (시간이 지나면 아무 이빨이나 자동) */
async function crocPick(i, auto, expectPhase) {
  const me = meMember();
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "q" || (r.type !== "croc" && r.type !== "pirate")) return;
    if (expectPhase != null && r.phase !== expectPhase) return;
    const q = Object.assign({}, r.q), who = q.order[q.turn % q.order.length];
    if (!auto && (!me || who !== me.id)) return;
    if (i == null) { const free = []; for (let k = 0; k < q.teeth; k++) if (q.picked.indexOf(k) < 0) free.push(k); i = pick(free); }
    if (q.picked.indexOf(i) >= 0) return;
    q.picked = q.picked.concat([i]);
    if (i === q.bad) { q.loser = who; pResolveTx(tx, Object.assign({}, r, { q: q })); tx.update(roomRef(), { q: q }); return; }
    q.turn = q.turn + 1;
    tx.update(roomRef(), nextPhase(r, { q: q }));
  });
}
function partyTimeout(r) {
  if (r.status === "q" && PARTY[r.type].turn) return turnAct(function (rr, qq, m) { return PARTY[rr.type].act(rr, qq, m); }, true, r.phase);
  if (r.status === "q") return r.type === "croc" || r.type === "pirate" ? crocPick(null, true, r.phase) : pResolve(r.phase);
  if (r.status === "v") return pResolve(r.phase);
  if (r.status === "rr") return pNext(r.phase);
}

/* ---------- local play for the solo-score games (each phone measures on its own) ---------- */
const LP = { key: null, state: "", t0: 0, timer: 0, sent: false };
function lpReset(key) { if (LP.key === key) return false; clearTimeout(LP.timer); LP.key = key; LP.state = ""; LP.t0 = 0; LP.sent = false; return true; }
function reflexPanel(r, me) {
  const key = r.id + ":" + r.phase;
  if (lpReset(key)) {
    LP.state = "wait";
    LP.timer = setTimeout(function () { if (LP.key === key && LP.state === "wait") { LP.state = "go"; const el = document.querySelector(".rf-pad"); if (el) { el.className = "rf-pad go"; el.textContent = "지금! 눌러!"; } requestAnimationFrame(function () { LP.t0 = performance.now(); }); sfx("go"); } }, r.q.delay);
  }
  const done = (r.subs || {})[me.id] != null;
  const pad = h("button", { type: "button", class: "rf-pad " + (done ? "done" : LP.state), text: done ? ((r.subs[me.id] > 0) ? r.subs[me.id] + "ms!" : "부정 출발 😵") : LP.state === "go" ? "지금! 눌러!" : "기다려…" });
  function hit(e) {
    if (e) e.preventDefault();
    if (LP.sent || (r.subs || {})[me.id] != null) return;
    if (LP.state === "wait") { LP.sent = true; clearTimeout(LP.timer); sfx("sad"); pSubmit(-1); return; }
    if (LP.state === "go" && LP.t0) { LP.sent = true; const ms = Math.round(performance.now() - LP.t0); sfx("ding"); pSubmit(Math.max(1, ms)); }
  }
  pad.addEventListener("pointerdown", hit);
  LP.hit = hit;
  return pad;
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && LP.hit && S.room && S.room.type === "reflex" && S.room.status === "q" && !(e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) LP.hit(e);
});
function timerPanel(r, me) {
  const key = r.id + ":" + r.phase; if (lpReset(key)) LP.state = "idle";
  const done = (r.subs || {})[me.id] != null;
  if (done) return h("div", { class: "rf-pad done", text: "기록 완료! " + (r.subs[me.id] / 1000).toFixed(3) + "초 (결과 대기)" });
  const btn = h("button", { type: "button", class: "rf-pad " + (LP.state === "run" ? "go" : "wait"), text: LP.state === "run" ? "■ 정지!" : "▶ 시작" });
  btn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    if (LP.state === "idle") { LP.state = "run"; LP.t0 = performance.now(); btn.className = "rf-pad go"; btn.textContent = "■ 정지!"; sfx("click"); }
    else if (LP.state === "run" && !LP.sent) { LP.sent = true; LP.state = "done"; sfx("ding"); pSubmit(Math.round(performance.now() - LP.t0)); }
  });
  return btn;
}
function similarity(a, b) {
  const A = Array.from(a), B = Array.from(b), dp = []; for (let j = 0; j <= B.length; j++) dp[j] = j;
  for (let i = 1; i <= A.length; i++) { let prev = dp[0]; dp[0] = i; for (let j = 1; j <= B.length; j++) { const t = dp[j]; dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (A[i - 1] === B[j - 1] ? 0 : 1)); prev = t; } }
  return Math.max(0, 1 - dp[B.length] / Math.max(1, B.length));
}
function typingPanel(r, me) {
  const key = r.id + ":" + r.phase;
  if (lpReset(key)) { LP.state = "count"; LP.t0 = 0; LP.timer = setTimeout(function () { if (LP.key === key) { LP.state = "type"; LP.t0 = performance.now(); render(); } }, 3000); }
  const done = (r.subs || {})[me.id] != null;
  if (done) { const v = r.subs[me.id]; return h("div", { class: "rf-pad done", text: "완료! " + v.cpm + "타 · 정확도 " + v.acc + "%" }); }
  if (LP.state === "count") return h("div", { class: "rf-pad wait", text: "3초 뒤 시작! 준비…" });
  const inp = draft("input", "type-in", { type: "text", class: "text-in type-in", autocomplete: "off", spellcheck: "false", placeholder: "위 문장을 그대로 입력하고 Enter" });
  ["paste", "drop", "copy", "cut"].forEach(function (ev) { inp.addEventListener(ev, function (e) { e.preventDefault(); toast("복사·붙여넣기는 안 돼요!"); }); });
  inp.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: "완료" }));
  f.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (LP.sent) return;
    const t = (S.drafts["type-in"] || inp.value || "").trim(); if (!t) return;
    LP.sent = true;
    const ms = Math.max(500, Math.round(performance.now() - LP.t0)), acc = similarity(t, r.q.text);
    const cpm = Math.round(Array.from(t).length / (ms / 60000));
    S.drafts["type-in"] = "";
    pSubmit({ ms: ms, acc: Math.round(acc * 100), cpm: cpm, score: Math.round(cpm * acc * acc) });
  });
  return f;
}

/* ---------- screens ---------- */
function screenPartyLobby(id) {
  const g = REG_BY[id], me = meMember();
  const rooms = roomsOf(id);
  const list = rooms.length
    ? h("ul", { class: "room-list" }, rooms.map(function (r) {
        const mine = me && (r.players || []).indexOf(me.id) >= 0;
        const label = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : "게임 중";
        return h("li", null, h("button", { type: "button", class: "room-item", onclick: function () { go("room-" + r.id); } },
          h("span", { class: "ri-main" }, h("b", { text: nickOf(r.createdBy) + "의 방" }), h("span", { class: "ri-sub", text: (r.players || []).map(nickOf).join(", ") || "아직 아무도 없어요" })),
          h("span", { class: "ri-side" }, h("span", { class: "status-chip" + (r.status === "lobby" ? " open" : ""), text: label }), h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  const cat = CATEGORIES.find(function (c) { return c.id === g.cat; });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("cat-" + g.cat); }, text: cat.name + "으로" }),
    h("div", { class: "sec-head" }, h("div", null, h("span", { class: "eyebrow", text: cat.en + " · " + STATUS_TXT[g.status] }), h("h2", { text: g.icon + " " + g.name }), h("p", { text: g.desc + " (" + g.min + "~" + g.max + "명)" }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom(id); } }, me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    h("details", { class: "guide", open: true }, h("summary", { text: g.name + " 규칙" }), h("div", { class: "guide-body" }, gameRules(g))));
}
function scoreBoard(r) {
  const sc = r.scores || {}, rank = (r.lineup || []).slice().sort(function (a, b) { return (sc[b] || 0) - (sc[a] || 0); });
  return h("ul", { class: "role-list" }, rank.map(function (p, i) {
    return h("li", null, h("span", { text: (["🥇", "🥈", "🥉"][i] || (i + 1) + "등") + " " + nickOf(p) }), h("b", { text: (sc[p] || 0).toLocaleString() + "점" }));
  }));
}
function screenPartyRoom(r) {
  const g = REG_BY[r.type], d = PARTY[r.type], me = meMember();
  const rk = r.id + ":" + (r.game || 0) + ":" + (r.rn || 0);
  if (S.pqKey !== rk) { S.pqKey = rk; delete S.drafts["pq-num"]; delete S.drafts["pq-text"]; delete S.drafts["type-in"]; }
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-" + r.type); }, text: g.name + " 방 목록" });
  const players = r.players || [], inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby", lineup = playing ? (r.lineup || []) : players;
  const isPlayer = !!(me && lineup.indexOf(me.id) >= 0);
  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : (r.rn || 1) + " / " + (r.total || 1) + " 라운드";
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: g.icon + " " + g.name + " · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    h("span", { class: "mode-chip", text: (playing ? r.total : partyRounds(r)) + "라운드" }));
  let body;
  if (r.status === "lobby") {
    const n = players.length, ok = n >= g.min && n <= g.max;
    body = h("div", { class: "panel" },
      h("div", { class: "field-label", text: "모인 사람 " + n + "명 · " + g.min + "~" + g.max + "명" }),
      h("div", { class: "chips" }, players.map(function (p) { return h("span", { class: "chip static" + (me && p === me.id ? " me" : ""), text: nickOf(p) + (p === r.createdBy ? " 👑" : "") }); })),
      d.fixedRounds || d.roundsFor ? null : h("div", { class: "field-label", text: "라운드 수" }),
      d.fixedRounds || d.roundsFor ? null : h("div", { class: "seg" }, [3, 5, 7].map(function (k) { return h("button", { type: "button", "aria-pressed": partyRounds(r) === k ? "true" : "false", onclick: function () { roomUpdate({ prounds: k }); } }, k + "라운드"); })),
      r.type === "tensec" ? h("div", { class: "field-label", text: "목표 시간" }) : null,
      r.type === "tensec" ? h("div", { class: "seg" }, [5, 10, 15].map(function (k) { return h("button", { type: "button", "aria-pressed": (r.target || 10) === k ? "true" : "false", onclick: function () { roomUpdate({ target: k }); } }, k + "초"); })) : null,
      !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
        : inRoom ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", disabled: !ok, onclick: pStart, text: ok ? "게임 시작" : n < g.min ? g.min + "명부터 시작" : "최대 " + g.max + "명" }))
          : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
      d.canStart && d.canStart() ? h("p", { class: "msg err", text: d.canStart() }) : null,
      d.lobby ? d.lobby(r) : null,
      d.editor && isBoss() ? d.editor() : null,
      h("details", { class: "guide" }, h("summary", { text: "규칙" }), h("div", { class: "guide-body" }, gameRules(g))));
  } else if (r.status === "result") {
    const sc = r.scores || {}, rank = (r.lineup || []).slice().sort(function (a, b) { return (sc[b] || 0) - (sc[a] || 0); });
    body = h("div", { class: "answer team" },
      d.noScore ? h("div", { class: "result-title", text: g.icon + " " + g.name + " 결과" }) : ceremony(rank[0], rank.slice(1), g.name + " 우승 · " + (sc[rank[0]] || 0).toLocaleString() + "점"),
      d.final ? d.final(r) : null,
      d.noScore ? null : scoreBoard(r),
      h("div", { class: "op-row" },
        h("button", { type: "button", onclick: function () { go("game-" + r.type); }, text: "방 목록" }),
        h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
  } else {
    const q = r.q || {}, subs = r.subs || {};
    const expected = pExpected(r), doneN = expected.filter(function (m) { return subs[m] != null; }).length;
    const stage = crewStage(lineup, saidMap(r, ["chat"]), function (p) {
      if ((r.type === "croc" || r.type === "pirate") && r.status === "q") { const who = q.order[q.turn % q.order.length]; if (p === who) return { cls: "now", badge: "👉" }; }
      if (r.type === "hotbomb" && r.status === "q" && q.holder === p) return { cls: "now", badge: "💣" };
      if (d.turn && r.status === "q" && q.order) { if (q.out && q.out.indexOf(p) >= 0) return { sub: "탈락" }; if (whoseTurn(q) === p) return { cls: "now", badge: "👉" }; }
      if (r.status === "v" && (r.votes || {})[p] != null) return { cls: "ok", badge: "✓", badgeCls: "ok", sub: "투표" };
      if (r.status === "q" && subs[p] != null) return { cls: "ok", badge: "✓", badgeCls: "ok", sub: d.noScore ? "제출" : (r.scores || {})[p] ? (r.scores[p]).toLocaleString() + "점" : "제출" };
      return { sub: d.noScore ? null : ((r.scores || {})[p] || 0).toLocaleString() + "점" };
    });
    let panel;
    if (r.status === "q") {
      const sd = q.ev && PARTY[q.ev] ? PARTY[q.ev] : d;
      const mine = me ? subs[me.id] : undefined, can = isPlayer && (!d.canSubmit || d.canSubmit(r, me.id)), IN = q.input || d.input;
      let input = null;
      if (!isPlayer && d.turn) input = IN === "board" ? boardPanel(r) : IN === "battleship" ? battleshipPanel(r) : IN === "numtile" ? numtilePanel(r) : IN === "onecard" ? onecardPanel(r) : bluffPanel(r);
      else if (!isPlayer) input = h("p", { class: "note", text: "관전 중이에요." });
      else if (!can && d.restNote) input = d.restNote(r);
      else if (!can) input = h("p", { class: "note", text: r.type === "loyalty" ? "이번 라운드는 휴식이에요. ☕" : "이번엔 쉬어요." });
      else if (IN === "choice") input = h("div", { class: "pq-choices" }, q.opts.map(function (o, k) {
        return h("button", { type: "button", class: "pq-opt" + (mine === k ? " on" : ""), onclick: function () { sfx("click"); pSubmit(k); }, text: o });
      }));
      else if (IN === "number") {
        const inp = draft("input", "pq-num", { type: "number", class: "text-in", min: "0", max: String(q.max), inputmode: "numeric", placeholder: "0 ~ " + q.max + (q.unit ? " " + q.unit : "") });
        const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: mine != null ? "바꾸기" : "제출" }));
        f.addEventListener("submit", function (ev) { ev.preventDefault(); const v = Math.round(+(S.drafts["pq-num"] || inp.value)); if (!(v >= 0 && v <= q.max)) { toast("0~" + q.max + " 사이로 넣어주세요."); return; } sfx("click"); pSubmit(v); });
        input = h("div", null, f, mine != null ? h("p", { class: "hint", text: "제출함: " + mine + (q.unit ? q.unit : "") + " (마감 전까지 바꿀 수 있어요)" }) : null);
      } else if (IN === "text") {
        const inp = draft("input", "pq-text", { type: "text", class: "text-in", maxlength: q.long ? "80" : "30", placeholder: q.long ? "여기에 적어요" : "답 입력" });
        const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm go", text: mine != null ? "바꾸기" : "제출" }));
        f.addEventListener("submit", function (ev) { ev.preventDefault(); const v = (S.drafts["pq-text"] || inp.value || "").trim(); if (!v) return; sfx("click"); pSubmit(v.slice(0, q.long ? 80 : 30)); });
        input = h("div", null, f, mine != null ? h("p", { class: "hint", text: "제출함: “" + mine + "”" }) : null);
      } else if (IN === "balloon") input = balloonPanel(r, me);
      else if (IN === "hotbomb") input = hotbombPanel(r, me);
      else if (IN === "member") input = h("div", { class: "vote-grid" }, lineup.filter(function (p) { return d.selfOk || p !== me.id; }).map(function (p) {
        return h("button", { type: "button", class: "vote-btn", "aria-pressed": mine === p ? "true" : "false", onclick: function () { sfx("click"); pSubmit(p); } }, h("div", { class: "vp" }, photoBox(findMember(p) || {})), h("span", { text: nickOf(p) }));
      }));
      else if (IN === "name") input = h("div", { class: "chips pq-names" }, S.members.map(function (m) {
        return h("button", { type: "button", class: "chip", "aria-pressed": mine === m.id ? "true" : "false", onclick: function () { sfx("click"); pSubmit(m.id); }, text: m.nick });
      }));
      else if (IN === "memory") input = memoryPanel(r, me);
      else if (IN === "art") input = mine != null && !(PAD.key === artRk(r) && PAD.sent) ? h("div", { class: "rf-pad done", text: "제출 완료! 다른 사람을 기다려요" }) : sd.panel(r, me);
      else if (IN === "board") input = boardPanel(r);
      else if (IN === "battleship") input = battleshipPanel(r);
      else if (IN === "numtile") input = numtilePanel(r);
      else if (IN === "onecard") input = onecardPanel(r);
      else if (IN === "bluff") input = bluffPanel(r);
      else if (IN === "yacht") input = yachtPanel(r, me);
      else if (IN === "baseball") input = baseballPanel(r, me);
      else if (IN === "territory") input = terrView(q, r, true);
      else if (IN === "taboo") input = tabooPanel(r, me);
      else if (IN === "reflex") input = reflexPanel(r, me);
      else if (IN === "timer") input = timerPanel(r, me);
      else if (IN === "typing") input = typingPanel(r, me);
      else if (IN === "croc") {
        const who = q.order[q.turn % q.order.length], myTurn = me && who === me.id;
        input = h("div", { class: "croc" + (r.type === "pirate" ? " pirate" : "") },
          h("div", { class: "croc-head", text: r.type === "pirate" ? "🏴‍☠️🛢️" : "🐊" }),
          h("div", { class: "croc-teeth" }, Array.from({ length: q.teeth }).map(function (_, k) {
            const used = q.picked.indexOf(k) >= 0;
            return h("button", { type: "button", class: "tooth" + (used ? " used" : ""), disabled: used || !myTurn, onclick: function () { sfx("click"); crocPick(k, false); }, "aria-label": "이빨 " + (k + 1) });
          })),
          h("p", { class: "pr-big" + (myTurn ? " ok" : ""), text: myTurn ? "내 차례! 이빨 하나를 눌러요" : nickOf(who) + "님 차례…" }));
      }
      panel = h("div", { class: "panel turn" + (r.type === "croc" ? "" : " pq") },
        r.type === "hotbomb" ? h("p", { class: "pq-hint", text: "⏳ 언제 터질지는 아무도 몰라요…" }) : timerEl(r, r.type === "croc" || r.type === "pirate" || d.turn ? "차례 남은 시간" : "남은 시간"),
        h("p", { class: "pq-text", text: q.text }),
        d.extra ? d.extra(r) : null,
        sd !== d && sd.extra ? sd.extra(r) : null,
        (q.ev || r.type) === "typing" && !(subs[me && me.id] != null) && LP.state === "type" ? h("p", { class: "type-src", text: q.text }) : null,
        input,
        r.type === "croc" || r.type === "pirate" || r.type === "hotbomb" || IN === "reflex" || d.turn || ["taboo", "yacht", "baseball", "territory"].indexOf(q.ev || r.type) >= 0 ? null : h("p", { class: "hint", text: "제출 " + doneN + " / " + expected.length + " · 다른 사람 선택은 결과 때 공개돼요" }));
    } else if (r.status === "v") {
      const cands = r.cands || [], myVote = me ? (r.votes || {})[me.id] : undefined, canVote = me && pVoters(r).indexOf(me.id) >= 0;
      const vdone = pVoters(r).filter(function (m) { return (r.votes || {})[m] != null; }).length;
      let vin;
      if (!canVote && d.waitNote) vin = h("p", { class: "note", text: d.waitNote(r) });
      else if (!canVote) vin = h("p", { class: "note", text: isPlayer ? "이번엔 내 답이 문제예요. 다들 맞히는 중… 🤫" : "관전 중이에요." });
      else if (d.voteInput === "member") vin = h("div", { class: "chips pq-names" }, lineup.filter(function (m) { return m !== me.id; }).map(function (m) {
        return h("button", { type: "button", class: "chip", "aria-pressed": myVote === m ? "true" : "false", onclick: function () { sfx("click"); pVote(m); }, text: nickOf(m) });
      }));
      else vin = h("div", { class: "cand-list" }, cands.map(function (c) {
        const own = c.owner === me.id;
        return h("button", { type: "button", class: "cand" + (myVote === c.id ? " on" : ""), disabled: own, onclick: function () { sfx("click"); pVote(c.id); } },
          r.type === "meme" ? memePic(q.who, c.text) : c.img ? artImg(c.img) : h("span", { text: c.text }), own ? h("small", { text: "내 답" }) : null);
      }));
      panel = h("div", { class: "panel turn pq" },
        timerEl(r, "투표 남은 시간"),
        h("p", { class: "pq-text", text: d.voteText || (d.voteInput === "member" ? "이 글은 누가 썼을까?" : "가장 마음에 드는 답에 투표!") }),
        d.voteInput === "member" && cands[0] ? h("p", { class: "pr-quote", text: "“" + cands[0].text + "”" }) : h("p", { class: "pq-hint", text: q.text }),
        vin, h("p", { class: "hint", text: "투표 " + vdone + " / " + pVoters(r).length }));
    } else {
      const x = (r.hist || [])[(r.hist || []).length - 1];
      panel = h("div", { class: "panel pr" },
        timerEl(r, (r.rn || 1) >= (r.total || 1) ? "최종 결과까지" : "다음 라운드까지"),
        h("p", { class: "pq-text", text: (r.rn || 1) + "라운드 결과 · " + ((x && x.q && x.q.text) || "") }),
        x ? d.round(x, r) : null,
        d.noScore ? null : h("details", { class: "guide", open: true }, h("summary", { text: "누적 점수" }), h("div", { class: "guide-body" }, scoreBoard(r))));
    }
    if (r.status === "q" && ["art", "board", "battleship", "numtile", "onecard", "yacht", "territory"].indexOf(q.input || d.input) >= 0) stage.classList.add("hide-m");
    body = [stage, panel];
  }
  return h("section", { class: "screen room" }, back, head, body, partyChat(r, me));
}
function partyChat(r, me) {
  const game = r.game || 0, msgs = S.msgs.filter(function (m) { return (m.game || 0) === game; });
  const log = h("div", { class: "log", role: "log", "aria-live": "polite" },
    msgs.length ? msgs.map(function (m) {
      if (m.kind === "sys" || m.kind === "skip") return h("div", { class: "msg-sys strong", text: m.text });
      return h("div", { class: "bubble chat" + (me && m.memberId === me.id ? " mine" : "") }, h("div", { class: "b-meta" }, h("b", { text: m.nick || "손님" })), h("div", { class: "b-text", text: m.text }));
    }) : h("div", { class: "msg-sys", text: "아직 대화가 없어요." }));
  const inp = draft("input", "chat-text", { type: "text", class: "text-in", maxlength: "120", placeholder: "대화 보내기", autocomplete: "off" });
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm", text: "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault(); const t = inp.value.trim(); if (!t || !S.user) return;
    S.drafts["chat-text"] = ""; inp.value = "";
    try { await sendMsg("chat", t); if (r.type === "taboo") await tabooCheck(t); render(); } catch (e) { toast(errText(e)); }
  });
  const action = r.status === "q" && ["art"].indexOf((r.q && r.q.input) || (PARTY[r.type] || {}).input) >= 0 && !(r.type === "montage" || (r.type === "telephone" && r.q.input !== "art"));
  return h("div", { class: "field dock" + (r.type === "reflex" && r.status === "q" ? " slim" : "") + (action ? " slim drawer" : "") }, h("div", { class: "field-label", text: "대화" }), log, f);
}

/* ---------- Sketch (드로잉퀴즈): drawing and guessing ---------- */
const SDUR = { draw: 60, reveal: 5 };
if (FAST) Object.keys(SDUR).forEach(function (k) { SDUR[k] = Math.max(2, Math.round(SDUR[k] / FAST)); });
const SK_WORDS = ["소나기", "번지점프", "블랙홀", "피라미드", "엘리베이터", "회전목마", "롤러코스터", "낙하산", "신호등", "자판기",
  "정전기", "그림자", "메아리", "오로라", "도미노", "불꽃놀이", "숨바꼭질", "줄다리기", "잠수함", "등산", "김장", "세뱃돈",
  "벼락치기", "지각", "야근", "다이어트", "짝사랑", "첫눈", "장마", "눈싸움", "모래성", "해돋이", "보름달", "별똥별",
  "지진", "태풍", "빙하", "정글", "무인도", "풍차", "허수아비", "외계인", "좀비", "뱀파이어", "닌자", "보물지도",
  "타임머신", "로봇청소기", "전자레인지", "셀카", "라이브방송", "택배", "배달", "오락실", "캠핑", "바비큐", "회식",
  "소개팅", "결혼식", "돌잔치", "졸업식", "수능", "월요병", "불금", "월급날", "잠꼬대", "코골이", "하품", "재채기",
  "딸꾹질", "방귀", "윙크", "만세", "가위바위보", "팔씨름", "줄넘기", "훌라후프", "스카이다이빙", "서핑", "스키점프",
  "컬링", "양궁", "펜싱", "인공위성", "현미경", "나침반", "모래시계", "사다리", "그네", "미끄럼틀", "시소", "분수대"];
SK_MORE.forEach(function (w) { if (SK_WORDS.indexOf(w) < 0) SK_WORDS.push(w); });
const PAPER = "#f3f1ec";
const INKS = ["#1b1b1d", "#7a7a7a", "#ffffff", "#d2382f", "#ff7eb6", "#f07a1a", "#e2a21b", "#f4d35e", "#2f9e57", "#9ad35a", "#2f6fd2", "#6ec6f0", "#8a4fc9", "#8b5a2b", "#f2c6a0"];
const SK = { canvas: null, ctx: null, turnKey: null, unsub: null, strokes: [], drawing: false, pendingRender: false, cur: null, color: INKS[0], size: 8, eraser: false, flushT: null, line: false, sliding: false };
try { const v = +localStorage.getItem("bf-pen"); if (v >= 2 && v <= 40) SK.size = v; } catch (e) {}

/* Surprise names: never announced in the UI. Default list until the boss saves one. */
const SK_DEFAULT_NAMES = ["주먹이", "연상퀴즈", "올라올라", "서바이벌꼬로록"];
const SK_SURPRISE = 0.1;
const SK_HARD_SHARE = 0.5;   /* 어려운 단어 비율 */
function skCrewWords() {
  const seen = {}, out = [];
  function add(w) { w = String(w || "").trim(); if (w && !seen[w]) { seen[w] = 1; out.push(w); } }
  S.members.forEach(function (m) { add(m.nick); });
  (S.sketchNames || SK_DEFAULT_NAMES).forEach(add);
  return out;
}
function skPickWord(mode, used, today) {
  const crew = skCrewWords(), general = SK_WORDS;
  /* rare: about one drawing in ten, and at most once per game */
  const already = (used || []).some(function (w) { return crew.indexOf(w) >= 0; });
  const pool = crew.length && !already && Math.random() < SK_SURPRISE ? crew : Math.random() < SK_HARD_SHARE ? SK_HARD : general;
  const notRoom = pool.filter(function (w) { return (used || []).indexOf(w) < 0; });
  let fresh = notRoom.filter(function (w) { return (today || []).indexOf(w) < 0; });
  if (!fresh.length) fresh = notRoom.length ? notRoom : pool;
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
  return Array.from(word || "").map(function (ch, i) {
    const c = ch.charCodeAt(0);
    if (ch === " ") return " ";
    if (c >= 0xAC00 && c <= 0xD7A3) return showCho && (showCho === 2 || i === 0 || showCho === true) ? CHO.charAt(Math.floor((c - 0xAC00) / 588)) : "○";
    if (/[()]/.test(ch)) return ch;
    return "○";
  }).join("");
}
/* someone in the room who was left out of this game (e.g. was in another app when it started) joins it */
const LATE = {};
async function lateJoin(r) {
  const me = meMember(); if (!me || !S.user) return;
  const key = r.id + ":" + (r.game || 0) + ":" + me.id;
  if (LATE[key]) return; LATE[key] = 1;
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const rr = snap.data();
      if (!rr || rr.status === "lobby" || rr.status === "result" || rr.status === "closed") return;
      if ((rr.players || []).indexOf(me.id) < 0 || (rr.lineup || []).indexOf(me.id) >= 0) return;
      const patch = { lineup: (rr.lineup || []).concat([me.id]) };
      if (rr.type === "sketch") patch.order = (rr.order || []).concat([me.id]);
      sysMsg(tx, rr, "👋 " + me.nick + "님이 게임에 합류했어요.");
      tx.update(roomRef(), patch);
    });
  } catch (e) { delete LATE[key]; }
}
function needsLateJoin(r) {
  const me = meMember();
  return !!(me && (r.type === "sketch" || r.type === "assoc") && r.status !== "lobby" && r.status !== "result"
    && (r.players || []).indexOf(me.id) >= 0 && (r.lineup || []).indexOf(me.id) < 0);
}
function skRounds(r) { return [3, 5, 8, 10].indexOf(r.rounds) >= 0 ? r.rounds : 3; }
function skDrawer(r) { return r.order[r.turn % r.order.length]; }
function skTotal(r) { return r.order.length * (r.rounds || 1); }
function skTurnKey(r) { return (r.game || 0) * 1000 + (r.turn || 0); }

async function startSketch() {
  try {
    const today = await usedToday("sk");
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "lobby") throw { code: "phase" };
      const lineup = presentPlayers(r).slice().sort();
      if (lineup.length < 2) throw { code: "few" };
      const order = lineup.slice();
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
      const word = skPickWord(r.wordMode || "mix", [], today);
      const game = (r.game || 0) + 1;
      sysMsg(tx, { game: game }, "🎨 드로잉퀴즈 시작! 첫 번째 화가는 " + nickOf(order[0]) + "님이에요.");
      tx.update(roomRef(), nextPhase(r, {
        status: "draw", lineup: lineup, order: order, turn: 0, word: word, used: [word], guessed: [], scores: {},
        skipUsed: false, game: game, startedAt: serverTimestamp(), rounds: skRounds(r), stars: {}, starGiven: [], dayUsed: dayPatch(r, "sk", [word])
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
  const today = await usedToday("sk");
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
    const word = skPickWord(r.wordMode || "mix", r.used || [], today);
    const drawer = r.order[next % r.order.length];
    sysMsg(tx, r, "🎨 " + (next + 1) + "번째 그림 · 화가는 " + nickOf(drawer) + "님");
    tx.update(roomRef(), nextPhase(r, { status: "draw", turn: next, word: word, used: (r.used || []).concat([word]), dayUsed: dayPatch(r, "sk", [word]), guessed: [], skipUsed: false }));
  });
}
function sketchTimeout(r) {
  if (r.status === "draw") return skToReveal(r.phase);
  if (r.status === "reveal") return skNextTurn(r.phase);
}
async function skSkipWord() {
  const me = meMember(); if (!me) return;
  try {
    const today = await usedToday("sk");
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const r = snap.data();
      if (!r || r.status !== "draw" || skDrawer(r) !== me.id || r.skipUsed || (r.guessed || []).length) throw { code: "no" };
      const word = skPickWord(r.wordMode || "mix", (r.used || []).concat([r.word]), today);
      tx.update(roomRef(), { word: word, used: (r.used || []).concat([word]), dayUsed: dayPatch(r, "sk", [word]), skipUsed: true });
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
      const pts = [10, 7, 5][g.length] || 3;
      const dr = skDrawer(rr), scores = Object.assign({}, rr.scores || {});
      scores[me.id] = (scores[me.id] || 0) + pts;
      scores[dr] = (scores[dr] || 0) + 2;
      const ng = g.concat([me.id]);
      sysMsg(tx, rr, "🎯 " + me.nick + "님 " + (g.length + 1) + "등으로 정답! (+" + pts + "점)");
      if (ng.length >= rr.lineup.length - 1) {
        sysMsg(tx, rr, "모두 맞혔어요! 정답은 ‘" + rr.word + "’");
        tx.update(roomRef(), nextPhase(rr, { guessed: ng, scores: scores, status: "reveal" }));
      } else tx.update(roomRef(), { guessed: ng, scores: scores });
    });
  } else {
    sfx("click");
    await sendMsg("chat", r.status === "draw" ? maskAnswer(text, skAnswers(r.word)) : text);
  }
}
/* chat from someone who already knows the answer: hide the answer so nobody gets a free point */
function maskAnswer(text, answers) {
  const t = normWord(text);
  const hit = (answers || []).some(function (a) { a = normWord(a); return a && t.indexOf(a) >= 0; });
  return hit ? "🤐 (정답이 들어 있어서 가렸어요)" : text;
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
  c.addEventListener("contextmenu", function (e) { e.preventDefault(); });   /* Ctrl+click on a Mac */
  SK.canvas = c; SK.ctx = c.getContext("2d", { willReadFrequently: true });
  if (window.ResizeObserver) new ResizeObserver(skResize).observe(c);
  return c;
}
function skResize() {
  const c = SK.canvas, w = c && c.clientWidth;
  if (!w) return;
  const px = Math.round(w * Math.min(2, window.devicePixelRatio || 1));
  if (c.width !== px) { c.width = px; c.height = px; skRedraw(); }
}
/* paint bucket: fill the touching area of the same color (small tolerance for soft line edges) */
function hexRgb(c) { const n = parseInt(String(c).slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function skFillAt(st) {
  const c = SK.canvas, x = SK.ctx; if (!c || !c.width || !st.pts || st.pts.length < 2) return;
  const W = c.width, H = c.height, k = W / 1000;
  const sx = Math.min(W - 1, Math.max(0, Math.round(st.pts[0] * k))), sy = Math.min(H - 1, Math.max(0, Math.round(st.pts[1] * k)));
  let img;
  try { img = x.getImageData(0, 0, W, H); } catch (e) { return; }
  const d = img.data, at = (sy * W + sx) * 4, r0 = d[at], g0 = d[at + 1], b0 = d[at + 2];
  const fc = hexRgb(st.color);
  if (Math.abs(fc[0] - r0) + Math.abs(fc[1] - g0) + Math.abs(fc[2] - b0) < 6) return;
  const TOL = 110, seen = new Uint8Array(W * H), stack = [sy * W + sx];
  function same(i) { const j = i * 4; return Math.abs(d[j] - r0) + Math.abs(d[j + 1] - g0) + Math.abs(d[j + 2] - b0) <= TOL; }
  while (stack.length) {
    const i = stack.pop();
    if (seen[i]) continue;
    seen[i] = 1;
    if (!same(i)) continue;
    const j = i * 4; d[j] = fc[0]; d[j + 1] = fc[1]; d[j + 2] = fc[2]; d[j + 3] = 255;
    const px = i % W;
    if (px > 0) stack.push(i - 1);
    if (px < W - 1) stack.push(i + 1);
    if (i >= W) stack.push(i - W);
    if (i < W * (H - 1)) stack.push(i + W);
  }
  x.putImageData(img, 0, 0);
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
  SK.strokes.slice(start).forEach(function (st) { if (st.fill) skFillAt(st); else skSeg(x, k, st); });
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
  if (cur.line && !final) return;   /* a straight line is sent once, when you let go */
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
  const p0 = skPoint(e);
  /* paint bucket: Ctrl (⌘ on a Mac) + click, or the 채우기 button */
  if (e.ctrlKey || e.metaKey || SK.fill) {
    const chunk = { uid: myUid(), turn: SK.turnKey, fill: true, color: SK.eraser ? PAPER : SK.color, size: 0, pts: p0, t: Date.now() * 1000 + (skSeq++ % 1000), createdAt: serverTimestamp() };
    SK.strokes.push(chunk); skFillAt(chunk);
    addDoc(collection(db, "rooms", S.roomId, "strokes"), chunk).catch(function (err) { toast(errText(err)); });
    sfx("pop");
    return;
  }
  /* straight line: Shift on a computer, or the 직선 button */
  const line = !!(e.shiftKey || SK.line);
  SK.cur = { color: SK.eraser ? PAPER : SK.color, size: SK.eraser ? Math.max(16, SK.size * 2) : SK.size, pts: line ? [p0[0], p0[1], p0[0], p0[1]] : p0, line: line };
  skRedraw();
  clearInterval(SK.flushT);
  SK.flushT = setInterval(function () { skFlush(false); }, 250);
}
function skMove(e) {
  if (!SK.drawing || !SK.cur) return;
  e.preventDefault();
  if (SK.cur.line) { const q = skPoint(e); SK.cur.pts[2] = q[0]; SK.cur.pts[3] = q[1]; skRedraw(); return; }
  if (e.shiftKey && SK.cur.pts.length >= 2) {
    /* Shift pressed in the middle of a stroke: keep what was drawn, continue as a straight line from here */
    const c0 = SK.cur, lx0 = c0.pts[c0.pts.length - 2], ly0 = c0.pts[c0.pts.length - 1];
    if (c0.pts.length >= 4) skFlush(true);
    SK.cur = { color: c0.color, size: c0.size, pts: [lx0, ly0, lx0, ly0], line: true };
    return;
  }
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
    return h("button", { type: "button", class: "sk-ink" + (c === "#ffffff" ? " light" : ""), style: "background:" + c, "aria-label": "색 " + c,
      "aria-pressed": !SK.eraser && SK.color === c ? "true" : "false", onclick: function () { SK.color = c; SK.eraser = false; render(); } });
  });
  const dot = h("span", { class: "sk-dot" });
  function paintDot() {
    const d = Math.max(3, Math.min(34, SK.eraser ? Math.max(16, SK.size * 2) * 0.8 : SK.size * 0.8));
    dot.style.width = dot.style.height = d + "px";
    dot.style.background = SK.eraser ? PAPER : SK.color;
  }
  paintDot();
  const num = h("b", { class: "sk-size-num", text: String(SK.size) });
  const slider = h("input", { type: "range", class: "sk-size", min: "2", max: "40", step: "1", value: String(SK.size), "aria-label": "펜 굵기" });
  slider.addEventListener("pointerdown", function () { SK.sliding = true; });
  slider.addEventListener("input", function () { SK.size = +slider.value; num.textContent = slider.value; paintDot(); });
  function done() {
    SK.sliding = false;
    try { localStorage.setItem("bf-pen", String(SK.size)); } catch (e) {}
    if (SK.pendingRender) { SK.pendingRender = false; render(); }
  }
  slider.addEventListener("change", done);
  slider.addEventListener("pointerup", done);
  return h("div", { class: "sk-tools" },
    h("div", { class: "sk-row sk-inks" }, swatches),
    h("div", { class: "sk-row" },
      h("span", { class: "sk-size-lbl", text: "굵기" }), slider, h("span", { class: "sk-dot-box" }, dot), num),
    h("div", { class: "sk-row" },
      h("button", { type: "button", class: "sk-btn", "aria-pressed": SK.line ? "true" : "false", title: "컴퓨터에서는 Shift를 누른 채 그어도 직선이 돼요",
        onclick: function () { SK.line = !SK.line; if (SK.line) SK.fill = false; render(); }, text: "📏 직선" }),
      h("button", { type: "button", class: "sk-btn", "aria-pressed": SK.fill ? "true" : "false", title: "컴퓨터에서는 Ctrl(맥은 ⌘)을 누른 채 클릭해도 채워져요",
        onclick: function () { SK.fill = !SK.fill; if (SK.fill) SK.line = false; render(); }, text: "🪣 채우기" }),
      h("button", { type: "button", class: "sk-btn", "aria-pressed": SK.eraser ? "true" : "false", onclick: function () { SK.eraser = !SK.eraser; render(); }, text: "지우개" }),
      h("button", { type: "button", class: "sk-btn danger", onclick: skClear, text: "전체 지우기" })),
    IS_MOBILE ? null : h("p", { class: "sk-tip", text: "💡 Shift + 드래그 = 직선 · " + (IS_MAC ? "⌘" : "Ctrl") + " + 클릭 = 그 영역 색 채우기" }));
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
            h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
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
          h("li", { text: "맞힌 순서대로 1등 10점, 2등 7점, 3등 5점, 그다음부터 3점. 화가는 맞힌 사람 한 명당 2점을 받아요." }),
          h("li", { text: "40초가 지나면 첫 글자 초성, 마지막 10초에는 모든 초성이 힌트로 나와요." })))),
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
  if (needsLateJoin(r)) lateJoin(r);
  skWatch(r.status === "draw" || r.status === "reveal" ? skTurnKey(r) : null);
  const scores = r.scores || {};
  const drawer = playing && r.order ? skDrawer(r) : null;
  const iDraw = !!(me && drawer === me.id && r.status === "draw");
  const guessed = r.guessed || [];

  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? "게임 끝" : (r.turn + 1) + " / " + skTotal(r) + "번째 그림";
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "드로잉퀴즈 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    h("span", { class: "mode-chip", text: (playing ? (r.rounds || 1) : skRounds(r)) + "바퀴" }));
  const chips = h("div", { class: "chips" }, lineup.slice().sort(function (a, b) { return (scores[b] || 0) - (scores[a] || 0); }).map(function (p) {
    const ok = guessed.indexOf(p) >= 0;
    return h("span", { class: "chip static" + (me && p === me.id ? " me" : "") + (ok ? " done" : "") },
      (p === drawer && r.status !== "result" ? "🖌 " : "") + nickOf(p) + (playing ? " " + (scores[p] || 0) + "점" : "") + (ok ? " ✓" : ""));
  }));

  let body;
  if (r.status === "lobby") body = skLobbyPanel(r, me, inRoom, players);
  else if (r.status === "result") body = skResultPanel(r);
  else {
    const leftMs = r.status === "draw" && phaseEnd(r) != null ? phaseEnd(r) - Date.now() : Infinity;
    /* harder: first consonant only after 2/3 of the time, all consonants for the last 10 seconds */
    const t1 = SDUR.draw * 1000 / 3, t2 = Math.min(10000, SDUR.draw * 1000 / 6);
    const half = leftMs < t1 ? (leftMs < t2 ? 2 : 1) : 0;
    clearTimeout(SK.hintT);
    if (leftMs !== Infinity && leftMs > t2) SK.hintT = setTimeout(render, (leftMs > t1 ? leftMs - t1 : leftMs - t2) + 80);
    const info = r.status === "reveal"
      ? h("div", { class: "panel turn sk-info" }, timerEl(r, "정답 공개 · 다음 그림까지"),
          h("p", { class: "sk-answer" }, "정답 ", h("b", { text: r.word })),
          h("p", { class: "note", text: guessed.length ? "맞힌 사람: " + guessed.map(nickOf).join(", ") : "아무도 못 맞혔어요." }))
      : iDraw
        ? h("div", { class: "panel turn mine sk-info" }, timerEl(r, "내가 화가예요 · 남은 시간"),
            h("p", { class: "sk-answer" }, "그릴 것 ", h("b", { text: r.word }),
              !r.skipUsed && !guessed.length ? h("button", { type: "button", class: "link-btn", onclick: skSkipWord, text: "단어 바꾸기(1번)" }) : null))
        : h("div", { class: "panel turn sk-info" }, timerEl(r, "화가 " + nickOf(drawer) + " · 남은 시간"),
            h("p", { class: "sk-answer" }, "힌트 ", h("b", { class: "sk-hint", text: skHint(r.word, half) }),
              h("small", { text: me && guessed.indexOf(me.id) >= 0 ? " 정답! 기다리는 중" : half === 2 ? " 초성 공개" : half ? " 첫 글자 초성 공개" : " " + Array.from(r.word || "").length + "글자" })));
    const said = skSaid(r);
    const left = [], right = [];
    lineup.forEach(function (p, i) { (i % 2 ? right : left).push(skAvatar(p, i % 2 ? "r" : "l", r, said)); });
    skFloatNew(r);
    body = [info,
      h("div", { class: "sk-arena" },
        h("div", { class: "sk-side" }, left),
        h("div", { class: "sk-stage" + (iDraw ? " drawing" : "") }, h("div", { class: "sk-canvas-wrap" }, skCanvas(), skFloatLayer())),
        h("div", { class: "sk-side" }, right)),
      iDraw ? skTools() : skReactBar(r, me)];
  }
  const res = h("section", { class: "screen room" }, back, head,
    playing && r.status !== "result" ? null : h("div", { class: "field" }, h("div", { class: "field-label", text: playing ? "점수" : "모인 사람 " + lineup.length + "명" }), chips),
    body, skChat(r, me, iDraw));
  requestAnimationFrame(skResize);
  return res;
}
/* reactions while someone draws: faces, thumbs up / down, and a star for a good drawing */
const REACTS = ["😂", "😮", "😍", "🤔", "👍", "👎", "🔥"];
let reactAt = 0;
async function skReact(e) {
  if (Date.now() - reactAt < 600) return;
  reactAt = Date.now();
  try { await sendMsg("react", e); } catch (err) { toast(errText(err)); }
}
async function skStar() {
  const me = meMember(), r = S.room; if (!me || !r) return;
  try {
    await runTransaction(db, async function (tx) {
      const snap = await tx.get(roomRef()); const rr = snap.data();
      if (!rr || (rr.status !== "draw" && rr.status !== "reveal") || rr.turn !== r.turn || rr.game !== r.game) throw { code: "late" };
      const drawer = skDrawer(rr), key = skTurnKey(rr) + ":" + me.id, given = rr.starGiven || [];
      if (drawer === me.id) throw { code: "self" };
      if (given.indexOf(key) >= 0) throw { code: "again" };
      const stars = Object.assign({}, rr.stars || {});
      stars[drawer] = (stars[drawer] || 0) + 1;
      tx.update(roomRef(), { stars: stars, starGiven: given.concat([key]).slice(-400) });
      tx.set(doc(collection(db, "rooms", S.roomId, "msgs")), { uid: myUid(), memberId: me.id, nick: me.nick, text: "⭐", kind: "react", game: rr.game || 0, createdAt: serverTimestamp() });
    });
    sfx("heal");
  } catch (e) {
    toast(e && e.code === "again" ? "이 그림에는 이미 별을 줬어요." : e && e.code === "self" ? "내 그림에는 별을 줄 수 없어요." : e && e.code === "late" ? "다음 그림으로 넘어갔어요." : errText(e));
  }
}
function skReactBar(r, me) {
  const isPlayer = me && (r.lineup || []).indexOf(me.id) >= 0;
  if (!isPlayer) return null;
  const starred = (r.starGiven || []).indexOf(skTurnKey(r) + ":" + me.id) >= 0;
  return h("div", { class: "sk-react" },
    REACTS.map(function (e) { return h("button", { type: "button", class: "sk-re", "aria-label": "반응 " + e, onclick: function () { skReact(e); }, text: e }); }),
    h("button", { type: "button", class: "sk-re star" + (starred ? " done" : ""), disabled: starred, onclick: skStar, text: starred ? "⭐ 별 줬어요" : "⭐ 별 주기" }));
}
/* emojis float up over the drawing; the layer survives re-renders so animations aren't cut */
const FLOAT_SEEN = {};
function skFloatLayer() {
  if (!SK.floats) SK.floats = h("div", { class: "sk-floats", "aria-hidden": "true" });
  return SK.floats;
}
function skFloatNew(r) {
  const now = Date.now(), game = r.game || 0, layer = skFloatLayer();
  S.msgs.forEach(function (m) {
    if (m.kind !== "react" || (m.game || 0) !== game || FLOAT_SEEN[m.id]) return;
    FLOAT_SEEN[m.id] = 1;
    const t = m.createdAt && m.createdAt.toMillis ? m.createdAt.toMillis() : now;
    if (now - t > 4000) return;
    const el = h("span", { class: "sk-float" + (m.text === "⭐" ? " star" : ""), text: m.text });
    el.style.left = (10 + Math.random() * 75) + "%";
    el.style.animationDuration = (1.6 + Math.random() * 0.8) + "s";
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  });
}
/* latest chat line per player, shown as a speech bubble for a few seconds */
const SAY_MS = 6000;
const SAY_SEEN = {};
function sayFresh(id) { if (!id || SAY_SEEN[id]) return false; SAY_SEEN[id] = 1; return true; }
function saidMap(r, kinds) {
  const out = {}, now = Date.now(), game = r.game || 0;
  let next = Infinity;
  kinds = kinds || ["chat"];
  S.msgs.forEach(function (m) {
    if ((m.game || 0) !== game || kinds.indexOf(m.kind) < 0 || !m.memberId) return;
    const t = m.createdAt && m.createdAt.toMillis ? m.createdAt.toMillis() : now;
    if (now - t < SAY_MS) { out[m.memberId] = { text: m.text, kind: m.kind, fresh: sayFresh(m.id) }; next = Math.min(next, t + SAY_MS); }
  });
  clearTimeout(SK.sayT);
  if (next < Infinity) SK.sayT = setTimeout(render, Math.max(200, next - now + 100));
  return out;
}
function skSaid(r) { return saidMap(r, ["chat", "react"]); }
/* characters in a row with what they just said in a bubble above their heads */
function crewStage(lineup, said, state) {
  const me = meMember();
  return h("div", { class: "stage" }, lineup.map(function (p) {
    const x = (state && state(p)) || {};
    const say = said[p];
    return h("div", { class: "st-av" + (me && p === me.id ? " me" : "") + (x.cls ? " " + x.cls : "") },
      say ? h("span", { class: "st-say" + (say.fresh ? " fresh" : "") + (say.kind === "guess" ? " wrong" : say.kind === "hint" ? " hint" : ""), text: (say.kind === "guess" ? "✗ " : "") + say.text }) : null,
      h("div", { class: "st-ph" }, photoBox(findMember(p) || {}), x.badge ? h("span", { class: "sk-badge" + (x.badgeCls ? " " + x.badgeCls : ""), text: x.badge }) : null),
      h("span", { class: "st-name", text: nickOf(p) }),
      x.sub != null ? h("span", { class: "st-sub", text: x.sub }) : null);
  }));
}
/* keep bubbles inside the stage so nothing spills off the screen */
function fitBubbles() {
  document.querySelectorAll(".st-say").forEach(function (el) {
    const box = el.closest(".stage"); if (!box) return;
    el.style.setProperty("--dx", "0px");
    const a = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    let dx = 0;
    if (a.left < b.left) dx = b.left - a.left; else if (a.right > b.right) dx = b.right - a.right;
    if (dx) el.style.setProperty("--dx", Math.round(dx) + "px");
  });
}
function skAvatar(p, side, r, said) {
  const drawer = skDrawer(r), ok = (r.guessed || []).indexOf(p) >= 0, me = meMember();
  return h("div", { class: "sk-av " + side + (p === drawer ? " drawer" : "") + (ok ? " ok" : "") + (me && p === me.id ? " me" : "") },
    h("div", { class: "sk-av-ph" }, photoBox(findMember(p) || {}), p === drawer ? h("span", { class: "sk-badge", text: "🖌" }) : ok ? h("span", { class: "sk-badge ok", text: "✓" }) : null),
    h("span", { class: "sk-av-name", text: nickOf(p) }),
    h("span", { class: "sk-av-score", text: ((r.scores || {})[p] || 0) + "점" + ((r.stars || {})[p] ? " ⭐" + r.stars[p] : "") }),
    said[p] ? h("span", { class: "sk-say" + (said[p].fresh ? " fresh" : ""), text: said[p].text }) : null);
}
function skLobbyPanel(r, me, inRoom, players) {
  function seg(field, value, label, def) {
    return h("button", { type: "button", "aria-pressed": (field === "rounds" ? skRounds(r) : (r[field] || def)) === value ? "true" : "false",
      onclick: function () { const p = {}; p[field] = value; roomUpdate(p); } }, label);
  }
  const n = players.length, enough = n >= 2;
  return h("div", { class: "panel" },
    h("div", { class: "field-label", text: "게임 설정 · 참가자 누구나 바꿀 수 있어요" }),
    h("div", { class: "field-label", text: "몇 바퀴 돌까요? (한 바퀴 = 모두 한 번씩 그리기)" }),
    h("div", { class: "seg" }, seg("rounds", 3, "3바퀴", 3), seg("rounds", 5, "5바퀴", 3), seg("rounds", 8, "8바퀴", 3), seg("rounds", 10, "10바퀴", 3)),
    !me ? h("p", { class: "note", text: "신원을 고른 조직원만 참가할 수 있어요." })
      : inRoom
        ? h("div", { class: "op-row" },
            h("button", { type: "button", onclick: leaveRoom, text: "방 나가기" }),
            h("button", { type: "button", class: "go", disabled: !enough, onclick: startSketch, text: enough ? "게임 시작" : "2명부터 시작" }))
        : h("button", { type: "button", class: "save", onclick: joinRoom, text: "이 방에 참가하기" }),
    h("p", { class: "hint", text: "단톡방에 ‘게임방 → 드로잉퀴즈에 방 열었어’라고 알려주세요." }));
}
function skResultPanel(r) {
  const scores = r.scores || {}, stars = r.stars || {};
  const rank = (r.lineup || []).slice().sort(function (a, b) { return (scores[b] || 0) - (scores[a] || 0); });
  const medal = ["🥇", "🥈", "🥉"];
  const starTop = (r.lineup || []).slice().sort(function (a, b) { return (stars[b] || 0) - (stars[a] || 0); })[0];
  return h("div", { class: "answer team" },
    ceremony(rank[0], rank.slice(1), "드로잉퀴즈 우승 · " + (scores[rank[0]] || 0) + "점"),
    starTop && stars[starTop] ? h("p", { class: "sk-star-award", text: "⭐ 인기 화가상: " + nickOf(starTop) + " (별 " + stars[starTop] + "개)" }) : null,
    h("ul", { class: "role-list" }, rank.map(function (p, i) {
      return h("li", null, h("span", { text: (medal[i] || (i + 1) + "등") + " " + nickOf(p) }), h("b", { text: (scores[p] || 0) + "점" + (stars[p] ? " · ⭐" + stars[p] : "") }));
    })),
    h("div", { class: "op-row" },
      h("button", { type: "button", onclick: function () { go("game-sketch"); }, text: "방 목록" }),
      h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
}
function skChat(r, me, iDraw) {
  const game = r.game || 0;
  const msgs = S.msgs.filter(function (m) { return (m.game || 0) === game && m.kind !== "react"; });
  const isPlayer = me && (r.lineup || []).indexOf(me.id) >= 0;
  const done = me && (r.guessed || []).indexOf(me.id) >= 0;
  let ph = "대화 보내기", enabled = true;
  if (r.status === "draw") {
    if (iDraw) { ph = "화가는 그림으로만 말해요"; enabled = false; }
    else if (!isPlayer) { ph = "게임 중에는 참가자만 입력할 수 있어요"; enabled = false; }
    else if (done) ph = "맞힌 사람도 수다 OK (정답은 자동으로 가려져요)";
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
  const guessing = r.status === "draw" && enabled && !done;
  const f = h("form", { class: "send-row", novalidate: true }, inp, h("button", { type: "submit", class: "btn-sm" + (guessing ? " go" : ""), disabled: !enabled, text: guessing ? "제출" : "보내기" }));
  f.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const t = inp.value.trim(); if (!t || !S.user || !enabled) return;
    S.drafts["chat-text"] = ""; inp.value = "";
    try { await skGuess(t); render(); } catch (e) { toast(e && e.code === "late" ? "아쉽게 시간이 지났어요." : errText(e)); }
  });
  return h("div", { class: "field dock sk" + (iDraw ? " slim drawer" : "") }, h("div", { class: "field-label", text: r.status === "draw" ? "정답 맞히기" : "대화" }), log, f);
}


/* ---------- Smoke race (빨리 담배피기): hold to inhale, release to exhale ---------- */
const SMDUR = { ready: 5, play: 50, shot: 5 };
if (FAST) Object.keys(SMDUR).forEach(function (k) { SMDUR[k] = Math.max(2, Math.round(SMDUR[k] / FAST)); });
const SM = {
  fill: 0.6,      /* lungs per second while inhaling: full (and coughing) after ~1.7 s */
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
      sysMsg(tx, { game: game }, "🚬 빨리 담배피기 시작! 50초 안에 다 못 피우면 킬러가 처리합니다.");
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
    /* everyone who didn't finish in time is shot; if all finished, the slowest one is */
    const failed = st.filter(function (x) { return !x.done; }).map(function (x) { return x.m; }).reverse();
    const losers = failed.length ? failed : [st[st.length - 1].m];
    const left = alive.filter(function (m) { return losers.indexOf(m) < 0; });
    const out = (r.out || []).concat(losers);
    if (failed.length) sysMsg(tx, r, "💥 탕" + (losers.length > 1 ? "탕탕" : "") + "! " + r.round + "라운드 시간 안에 못 피운 " + losers.map(nickOf).join(", ") + "님 처형.");
    else sysMsg(tx, r, "💥 탕! " + r.round + "라운드 모두 다 피웠지만 제일 늦은 " + nickOf(losers[0]) + "님 탈락.");
    if (left.length === 0) {
      sysMsg(tx, r, "☠️ 전원 사망… 킬러만 웃는다.");
      tx.update(ref, nextPhase(r, { status: "result", alive: [], out: out, board: st, shot: losers[0], shots: losers, winner: null }));
    } else if (left.length === 1) {
      sysMsg(tx, r, "👑 최후의 1인 " + nickOf(left[0]) + "! 모두 무릎 꿇어라.");
      tx.update(ref, nextPhase(r, { status: "result", alive: left, out: out, board: st, shot: losers[0], shots: losers, winner: left[0] }));
    } else {
      tx.update(ref, nextPhase(r, { status: "shot", alive: left, out: out, board: st, shot: losers[0], shots: losers, line: KILLER_LINES[Math.floor(Math.random() * KILLER_LINES.length)] }));
    }
  });
}
async function smNextRound(expectPhase) {
  await runTransaction(db, async function (tx) {
    const snap = await tx.get(roomRef()); const r = snap.data();
    if (!r || r.status !== "shot" || (expectPhase != null && r.phase !== expectPhase)) return;
    const round = (r.round || 1) + 1;
    sysMsg(tx, r, "🚬 " + round + "라운드! 남은 사람 " + (r.alive || []).length + "명.");
    tx.update(roomRef(), nextPhase(r, { status: "ready", round: round, rk: (r.game || 0) * 100 + round, board: [], shot: null, shots: [] }));
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
      SMK.fin = r.phaseAt && r.phaseAt.toMillis ? now - phMs(r) : 0;
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
            h("span", { class: "ri-sub", text: "접속 " + hereCount(r) + "명" + (mine ? " · 참가 중" : "") }))));
      }))
    : h("div", { class: "empty", text: S.roomsReady ? "열린 방이 없어요. 새 방을 만들어 조직원을 불러 모으세요." : "방 목록을 불러오는 중…" });
  return h("section", { class: "screen" },
    h("button", { class: "back", type: "button", onclick: function () { go("games"); }, text: "게임방으로" }),
    h("div", { class: "sec-head" },
      h("div", null, h("span", { class: "eyebrow", text: "G-06" }), h("h2", { text: "빨리 담배피기" }),
        h("p", { text: "들숨 날숨 타이밍 싸움. 다 못 피우면 킬러가 처리하고, 최후의 1인이 형님이 된다." }))),
    h("button", { type: "button", class: "save", disabled: !me || !S.user, onclick: function () { createRoom("smoke"); } },
      me ? "새 방 만들기" : "신원을 고른 조직원만 방을 만들 수 있어요"),
    h("div", { class: "field" }, h("div", { class: "field-label", text: "열린 방" }), list),
    h("details", { class: "guide" },
      h("summary", { text: "빨리 담배피기 규칙" }),
      h("div", { class: "guide-body" },
        h("ol", null,
          h("li", { text: "버튼을 꾹 누르고 있으면 들숨, 떼면 날숨이에요. 들이마시는 동안만 담배가 타요." }),
          h("li", { text: "숨이 얼마나 찼는지는 화면에 안 나와요. 들이마시는 소리가 높아질수록 꽉 찬 거예요. 깊게 마실수록 더 빨리 타지만, 너무 오래 마시면 콜록콜록! " + (SM.coughMs / 1000) + "초 동안 못 피우고 담배도 " + SM.coughLoss + "% 날아가요." }),
          h("li", { text: "떼면 ‘후~’ 하고 내쉬어요. 그 소리가 끝나기 전에 또 누르면 덜 내쉰 만큼 기침할 확률이 커져요. 소리를 잘 듣고 감으로 리듬을 타세요." }),
          h("li", { text: "50초 안에 한 개비를 다 못 피우면 킬러에게 탕! 못 피운 사람은 전부 죽어요." }),
          h("li", { text: "모두 다 피웠으면 제일 늦게 피운 한 명이 탈락해요. 마지막 1인이 남을 때까지 계속해요." }),
          h("li", { text: "다 같이 못 피우면 전원 사망… 킬러의 승리예요." })))));
}
function screenSmokeRoom(r) {
  const back = h("button", { class: "back", type: "button", onclick: function () { go("game-smoke"); }, text: "빨리 담배피기 방 목록" });
  const me = meMember();
  const players = r.players || [];
  const inRoom = me && players.indexOf(me.id) >= 0;
  const playing = r.status !== "lobby";
  smWatch(playing ? r.rk : null);
  const title = r.status === "lobby" ? "대기 중" : r.status === "result" ? (r.winner ? "최후의 1인" : "전원 사망") : r.round + "라운드" + (r.status === "ready" ? " 준비" : r.status === "shot" ? " 처형" : "");
  const head = h("div", { class: "room-head" },
    h("div", null, h("span", { class: "eyebrow", text: "빨리 담배피기 · " + nickOf(r.createdBy) + "의 방" }), h("h2", { text: title })),
    playing ? h("span", { class: "mode-chip", text: "생존 " + (r.alive || []).length + "명" }) : null);
  let body;
  if (r.status === "lobby") {
    const n = players.length;
    body = h("div", { class: "panel" },
      h("div", { class: "field-label", text: "모인 사람 " + n + "명" }),
      h("div", { class: "chips" }, players.map(function (p) { return h("span", { class: "chip static" + (me && p === me.id ? " me" : ""), text: nickOf(p) }); })),
      h("p", { class: "note", text: "50초 안에 다 못 피우면 전부 킬러에게 처형! 모두 다 피웠으면 제일 늦은 한 명이 탈락해요." }),
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
    const shots = r.shots && r.shots.length ? r.shots : [r.shot];
    body = h("div", { class: "panel shot" },
      h("div", { class: "shot-scene" + (shots.length > 1 ? " many" : "") },
        h("div", { class: "killer", "aria-hidden": "true" },
          h("span", { class: "k-man", text: "🕴️" }), h("span", { class: "k-gun", text: "🔫" }), h("span", { class: "k-flash", text: "💥" })),
        h("span", { class: "bullet", "aria-hidden": "true" }),
        h("div", { class: "victims" }, shots.map(function (id, i) {
          const v = findMember(id) || { nick: nickOf(id) };
          const el = h("div", { class: "victim" }, h("span", { class: "bang", text: "탕!" }), h("div", { class: "v-photo" }, photoBox(v)));
          el.style.setProperty("--d", (i * 0.35) + "s");
          return el;
        }))),
      h("p", { class: "shot-line" }, "킬러: “" + (r.line || KILLER_LINES[0]) + "”"),
      h("p", null, h("b", { text: shots.map(nickOf).join(", ") }), "님 탈락.", shots.length > 1 ? h("small", { class: "note", text: " (시간 안에 못 피움)" }) : null),
      smBoard(r), timerEl(r, "다음 라운드까지"));
  } else {
    const w = findMember(r.winner) || { nick: nickOf(r.winner) };
    body = h("div", { class: "panel result-smoke" },
      r.winner ? ceremony(r.winner, (r.out || []).slice().reverse(), "최후의 1인 · 오늘의 형님")
        : ceremony(null, (r.out || []).slice().reverse(), "전원 사망 · 킬러의 승리", null, { emoji: "🕴️", name: "킬러" }),
      h("div", { class: "op-row" },
        h("button", { type: "button", onclick: function () { go("game-smoke"); }, text: "방 목록" }),
        h("button", { type: "button", class: "go", onclick: backToLobby, text: "같은 방에서 한 판 더" })));
  }
  return h("section", { class: "screen room" }, back, head, body, smChat(r, me));
}
/* ending: the winner laughs, everyone else kneels and cries */
const CRY_LINES = ["엉엉 😭", "형님… 😭", "흑흑 😢", "으앙 😭", "억울해 😭", "다음엔 꼭… 😢"];
function ceremony(winnerId, others, title, extra, stand) {
  const w = stand ? { nick: stand.name } : (findMember(winnerId) || { nick: nickOf(winnerId) });
  return h("div", { class: "ceremony" },
    h("div", { class: "winner laughing" },
      h("span", { class: "w-say", text: "음하하하하! 😆" }),
      h("span", { class: "crown", "aria-hidden": "true", text: stand ? "🔫" : "👑" }),
      stand ? h("div", { class: "w-photo w-emoji", text: stand.emoji }) : h("div", { class: "w-photo" }, photoBox(w)),
      h("div", { class: "w-name", text: w.nick }), h("div", { class: "eyebrow", text: title || "오늘의 형님" }), extra || null),
    others.length ? h("div", { class: "kneel" }, others.map(function (m, i) {
      const mm = findMember(m) || { nick: nickOf(m) };
      return h("div", { class: "kn crying" },
        h("span", { class: "kn-say", text: CRY_LINES[i % CRY_LINES.length] }),
        h("div", { class: "kn-photo" }, photoBox(mm), h("span", { class: "tear l" }), h("span", { class: "tear r" })),
        h("span", { class: "kn-name", text: "🧎 " + mm.nick }));
    })) : null);
}
function smBoard(r) {
  return h("ol", { class: "sm-board" }, (r.board || []).map(function (x) {
    return h("li", { class: (r.shots || [r.shot]).indexOf(x.m) >= 0 ? "dead" : "" }, h("span", { text: nickOf(x.m) }),
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
  return h("div", { class: "field dock" + (r.status === "play" || r.status === "ready" ? " slim" : "") }, h("div", { class: "field-label", text: "대화" }), log, f);
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
  if (!on) { breathStop(); mediaKeepAlive(false); bgmSet(null); } else { mediaKeepAlive(true); ac(); sfx("ding"); bgmSet(bgmMoodFor()); }
  soundBtn.textContent = on ? "🔊" : "🔇";
  soundBtn.setAttribute("aria-label", on ? "소리 끄기" : "소리 켜기");
  toast(on ? "효과음을 켰어요." : "효과음을 껐어요.");
}
const bgmBtn = h("button", { type: "button", class: "snd-btn bgm-btn" + (BGM.on ? "" : " off"), "aria-pressed": BGM.on ? "true" : "false",
  "aria-label": BGM.on ? "배경음악 끄기" : "배경음악 켜기", text: "🎵", onclick: function () { setBgm(!BGM.on); } });
function setBgm(on) {
  BGM.on = on;
  try { localStorage.setItem("bf-bgm", on ? "on" : "off"); } catch (e) {}
  bgmBtn.classList.toggle("off", !on);
  bgmBtn.setAttribute("aria-pressed", on ? "true" : "false");
  bgmBtn.setAttribute("aria-label", on ? "배경음악 끄기" : "배경음악 켜기");
  if (on) { mediaKeepAlive(true); ac(); }
  bgmSet(bgmMoodFor());
  toast(on ? (SND.on ? "배경음악을 켰어요. 게임방에 들어가면 나와요." : "배경음악을 켰어요. 🔇 소리도 켜야 들려요.") : "배경음악을 껐어요.");
}
function setVol(kind, v) {
  VOL[kind] = v;
  try { localStorage.setItem("bf-vol", JSON.stringify(VOL)); } catch (e) {}
  const c = SND.ctx;
  if (kind === "sfx" && SND.sfxOut && c) SND.sfxOut.gain.setTargetAtTime(sfxGain(), c.currentTime, 0.03);
  if (kind === "bgm" && BGM.master && c) BGM.master.gain.setTargetAtTime(bgmLevel({ vol: BGM.vol || 1 }), c.currentTime, 0.05);
}
function volRow(kind, label, onBtn) {
  const out = h("b", { class: "vol-num", text: VOL[kind] + "%" });
  const sl = h("input", { type: "range", min: "0", max: "100", step: "5", value: String(VOL[kind]), "aria-label": label + " 음량" });
  sl.addEventListener("input", function () { setVol(kind, +sl.value); out.textContent = sl.value + "%"; });
  sl.addEventListener("change", function () { if (kind === "sfx") sfx("ding"); });
  return h("div", { class: "vol-row" }, h("span", { class: "vol-label", text: label }), sl, out, onBtn);
}
const volPanel = h("div", { class: "vol-pop", hidden: true, role: "dialog", "aria-label": "음량 조절" },
  h("p", { class: "vol-title", text: "음량 조절" }),
  volRow("bgm", "🎵 배경음악"), volRow("sfx", "🔊 효과음"),
  h("p", { class: "vol-hint", text: "켜기/끄기는 옆의 🎵 🔊 버튼. 휴대폰 자체 볼륨도 같이 확인해 주세요." }));
const volBtn = h("button", { type: "button", class: "snd-btn vol-btn", "aria-label": "음량 조절", "aria-expanded": "false", text: "🎚️",
  onclick: function (e) { e.stopPropagation(); const open = volPanel.hidden; volPanel.hidden = !open; volBtn.setAttribute("aria-expanded", open ? "true" : "false"); if (open) { mediaKeepAlive(true); ac(); } } });
document.addEventListener("click", function (e) { if (!volPanel.hidden && !volPanel.contains(e.target) && e.target !== volBtn) { volPanel.hidden = true; volBtn.setAttribute("aria-expanded", "false"); } });
const header = h("div", { class: "filebar wrap" },
  h("span", { class: "brand" }, logo("logo-s"), h("span", null, h("b", { text: "불주먹조직" }), " · 비밀본부")),
  h("span", { class: "fb-right" }, volBtn, bgmBtn, soundBtn, volPanel, opChip, h("span", { class: "lvl", text: "기밀 등급 A" })));
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
/* Korean typing on Windows: the IME is still building the current syllable (조합 중) while you type.
   Rebuilding the screen in that moment replaces the input box and breaks the syllable (오타).
   So: never redraw while composing, and send with Enter only after the last syllable is finished. */
const IME = { on: false, pending: false, submitFor: null, sentForm: null, sentAt: 0, fallback: 0 };
function imeSubmit(t) {
  clearTimeout(IME.fallback);
  const f = t && t.form; if (!f) return;
  if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event("submit", { cancelable: true }));
  IME.sentForm = f; IME.sentAt = Date.now();
}
/* Windows Chrome can fire a second Enter right after the IME one: don't send the same message twice */
document.addEventListener("submit", function (e) {
  if (IME.sentForm === e.target && Date.now() - IME.sentAt < 500) { e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
document.addEventListener("compositionstart", function () { IME.on = true; }, true);
document.addEventListener("compositionend", function (e) {
  IME.on = false;
  const t = e.target;
  if (IME.submitFor && IME.submitFor === t) {
    IME.submitFor = null;
    setTimeout(function () { imeSubmit(t); }, 0);
  }
  if (IME.pending) { IME.pending = false; setTimeout(render, 30); }
}, true);
document.addEventListener("keydown", function (e) {
  const t = e.target;
  if (e.key !== "Enter" || !(e.isComposing || e.keyCode === 229) || !t || t.tagName !== "INPUT" || !t.form) return;
  e.preventDefault();          /* wait for compositionend, then submit once with the whole word */
  IME.submitFor = t;
  clearTimeout(IME.fallback);
  IME.fallback = setTimeout(function () { if (IME.submitFor === t) { IME.submitFor = null; IME.on = false; imeSubmit(t); } }, 400);
}, true);
document.addEventListener("focusout", function () { if (IME.pending && !IME.on) { IME.pending = false; render(); } }, true);
function draw() {
  if (SK.drawing || SK.sliding || SMK.holding) { SK.pendingRender = true; return; }
  if (IME.on && document.activeElement && main.contains(document.activeElement)) { IME.pending = true; return; }
  migrateCrewTopic();
  const active = document.activeElement;
  const aid = active && active.id && main.contains(active) ? active.id : null;
  const sel = aid && typeof active.selectionStart === "number" ? [active.selectionStart, active.selectionEnd] : null;
  const oldLog = main.querySelector(".log");
  const logState = oldLog ? { top: oldLog.scrollTop, pinned: oldLog.scrollHeight - oldLog.scrollTop - oldLog.clientHeight < 60 } : null;

  const r = currentRoute();
  ensureTipsSub();
  mtEnsureSubs();
  let tab = "hq", view;
  if (!S.membersReady) {
    view = h("section", { class: "screen" }, h("div", { class: "empty", text: "본부 문을 여는 중…" }));
  } else if (needsGate()) {
    view = screenGate();
  } else if (r === "members") { tab = "members"; view = screenMembers(); }
  else if (r.indexOf("m-") === 0) { tab = "members"; view = screenDetail(r.slice(2)); }
  else if (r === "games") { tab = "games"; view = screenGames(); }
  else if (r === "rooms") { tab = "games"; view = screenOpenRooms(); }
  else if (r === "game-liar") { tab = "games"; view = screenLiarLobby(); }
  else if (r === "game-mafia") { tab = "games"; view = screenMafiaLobby(); }
  else if (r === "game-sketch") { tab = "games"; view = screenSketchLobby(); }
  else if (r.indexOf("cat-") === 0) { tab = "games"; view = screenCategory(r.slice(4)); }
  else if (r.indexOf("game-") === 0 && PARTY[r.slice(5)]) { tab = "games"; view = screenPartyLobby(r.slice(5)); }
  else if (r === "game-smoke") { tab = "games"; view = screenSmokeLobby(); }
  else if (r === "game-assoc") { tab = "games"; view = screenAssocLobby(); }
  else if (r.indexOf("room-") === 0) { tab = "games"; view = screenRoom(r.slice(5)); }
  else if (r === "guestbook") { tab = "guestbook"; view = screenGuestbook(); }
  else if (r === "cases") view = screenCases();
  else if (r.indexOf("cases-") === 0) { const parts = r.slice(6).split("-"); const idx = +parts.pop(); view = screenCases(parts.join("-"), idx); }
  else if (r.indexOf("case-") === 0) view = screenCase(r.slice(5));
  else if (r === "gather") view = screenGathers();
  else if (r.indexOf("gather-") === 0) view = screenGather(r.slice(7));
  else if (r === "tips") view = screenTips();
  else if (r === "game-manito") { tab = "games"; view = screenManito(); }
  else view = screenHQ();
  if (r.indexOf("room-") !== 0) { watchRoom(null); skWatch(null); smWatch(null); }

  if (r !== lastRoute) S.confirmDelete = false;
  if (r !== "games" && r.indexOf("cat-") !== 0 && !(S.inviteOpen && r.indexOf("room-") === 0)) watchPresence(false);
  if (r !== lastRoute) setTimeout(function () { presenceBeat(true); }, 800);

  const gate = S.membersReady && needsGate();
  tabbar.hidden = gate;
  if (view.classList && view.classList.contains("room") && S.room) {
    const rh = view.querySelector(".room-head");
    if (rh && !rh.querySelector(".exit-btn")) rh.insertBefore(exitButton(S.room), rh.firstChild);
    const me = meMember();
    if (rh && me && (S.room.players || []).indexOf(me.id) >= 0 && S.room.status !== "closed") {
      rh.insertBefore(inviteButton(S.room), rh.querySelector(".exit-btn"));
      if (S.inviteOpen) view.appendChild(inviteSheet(S.room));
    } else S.inviteOpen = false;
  } else S.inviteOpen = false;
  if (view.classList && view.classList.contains("room")) {
    const dock = Array.prototype.find.call(view.children, function (c) { return c.classList.contains("dock"); });
    if (dock) {
      const col = h("div", { class: "room-main" });
      Array.prototype.slice.call(view.children).forEach(function (c) { if (c !== dock) col.appendChild(c); });
      view.replaceChildren(col, dock); view.classList.add("split");
    }
  }
  document.body.classList.toggle("wide-room", r.indexOf("room-") === 0);
  if (r !== lastRoute && view.classList) view.classList.add("enter");
  main.replaceChildren(view);
  invBar.replaceChildren.apply(invBar, [inviteBanner()].filter(Boolean));
  cmtSweep();
  requestAnimationFrame(fitBubbles);
  bgmSet(bgmMoodFor());
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
