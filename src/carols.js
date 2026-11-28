/* 저작권이 끝난 전통 캐롤 멜로디 (직접 합성해서 연주)
   notes: "음이름 박자" 목록 (박자는 4분음표 = 1), R = 쉼표.  chords: 마디마다 화음 하나 */
export const CAROLS = {
  /* Jingle Bells (후렴) */
  jingle: {
    name: "징글벨", bpm: 120, beats: 4, bells: true,
    notes: "E4 1 E4 1 E4 2 | E4 1 E4 1 E4 2 | E4 1 G4 1 C4 1.5 D4 0.5 | E4 4 | F4 1 F4 1 F4 1.5 F4 0.5 | F4 1 E4 1 E4 1 E4 0.5 E4 0.5 | E4 1 D4 1 D4 1 E4 1 | D4 2 G4 2 | " +
           "E4 1 E4 1 E4 2 | E4 1 E4 1 E4 2 | E4 1 G4 1 C4 1.5 D4 0.5 | E4 4 | F4 1 F4 1 F4 1.5 F4 0.5 | F4 1 E4 1 E4 1 E4 0.5 E4 0.5 | G4 1 G4 1 F4 1 D4 1 | C4 4",
    chords: ["C", "C", "C", "C", "F", "C", "D7", "G7", "C", "C", "C", "C", "F", "C", "G7", "C"]
  },
  /* We Wish You a Merry Christmas */
  wish: {
    name: "We Wish You a Merry Christmas", bpm: 132, beats: 3, bells: true,
    notes: "R 2 D4 1 | G4 1 G4 0.5 A4 0.5 G4 0.5 F#4 0.5 | E4 1 C4 1 E4 1 | A4 1 A4 0.5 B4 0.5 A4 0.5 G4 0.5 | F#4 1 D4 1 F#4 1 | B4 1 B4 0.5 C5 0.5 B4 0.5 A4 0.5 | " +
           "G4 1 E4 1 D4 0.5 D4 0.5 | E4 1 A4 1 F#4 1 | G4 2 D4 1 | G4 1 G4 1 G4 1 | F#4 2 F#4 1 | G4 1 F#4 1 E4 1 | D4 2 A4 1 | B4 1 A4 1 G4 1 | D5 1 D4 1 D4 0.5 D4 0.5 | E4 1 A4 1 F#4 1 | G4 3",
    chords: ["G", "G", "C", "A7", "D", "B7", "Em", "C D7", "G", "G", "D", "Em", "D", "G", "C", "D7", "G"]
  },
  /* Deck the Halls */
  deck: {
    name: "Deck the Halls", bpm: 112, beats: 4, bells: true,
    notes: "G4 1.5 F4 0.5 E4 1 D4 1 | C4 1 D4 1 E4 1 C4 1 | D4 0.5 E4 0.5 F4 0.5 D4 0.5 E4 1.5 D4 0.5 | C4 1 B3 1 C4 2 | " +
           "G4 1.5 F4 0.5 E4 1 D4 1 | C4 1 D4 1 E4 1 C4 1 | D4 0.5 E4 0.5 F4 0.5 D4 0.5 E4 1.5 D4 0.5 | C4 1 B3 1 C4 2 | " +
           "D4 1.5 E4 0.5 F4 1 D4 1 | E4 1.5 F4 0.5 G4 1 D4 1 | E4 0.5 F#4 0.5 G4 1 A4 0.5 B4 0.5 C5 1 | B4 1 A4 1 G4 2 | " +
           "G4 1.5 F4 0.5 E4 1 D4 1 | C4 1 D4 1 E4 1 C4 1 | A4 0.5 A4 0.5 A4 0.5 A4 0.5 G4 1.5 F4 0.5 | E4 1 D4 1 C4 2",
    chords: ["C", "C G", "G7 C", "G7 C", "C", "C G", "G7 C", "G7 C", "G", "C G", "D", "G", "C", "C", "F", "G7 C"]
  },
  /* Silent Night (고요한 밤) — 6/8을 4분음표 3박으로 */
  silent: {
    name: "고요한 밤", bpm: 72, beats: 3, bells: false, soft: true,
    notes: "G4 0.75 A4 0.25 G4 0.5 E4 1.5 | G4 0.75 A4 0.25 G4 0.5 E4 1.5 | D5 1 D5 0.5 B4 1.5 | C5 1 C5 0.5 G4 1.5 | A4 1 A4 0.5 C5 0.75 B4 0.25 A4 0.5 | G4 0.75 A4 0.25 G4 0.5 E4 1.5 | " +
           "A4 1 A4 0.5 C5 0.75 B4 0.25 A4 0.5 | G4 0.75 A4 0.25 G4 0.5 E4 1.5 | D5 1 D5 0.5 F5 0.75 D5 0.25 B4 0.5 | C5 1.5 E5 1.5 | C5 0.5 G4 0.5 E4 0.5 G4 0.75 F4 0.25 D4 0.5 | C4 3",
    chords: ["C", "C", "G7", "C", "F", "C", "F", "C", "G7", "C", "C G7", "C"]
  },
  /* Carol of the Bells (우크라이나 민요 '셰드릭') — 마피아 낮의 긴장감 */
  bells: {
    name: "Carol of the Bells", bpm: 100, beats: 3, bells: false, minor: true,
    notes: "Bb4 1 A4 0.5 Bb4 0.5 G4 1 | Bb4 1 A4 0.5 Bb4 0.5 G4 1 | Bb4 1 A4 0.5 Bb4 0.5 G4 1 | Bb4 1 A4 0.5 Bb4 0.5 G4 1 | " +
           "D5 1 C5 0.5 D5 0.5 Bb4 1 | D5 1 C5 0.5 D5 0.5 Bb4 1 | F5 1 Eb5 0.5 F5 0.5 D5 1 | F5 1 Eb5 0.5 F5 0.5 D5 1 | " +
           "G5 0.5 G5 0.5 G5 0.5 F5 0.5 Eb5 0.5 D5 0.5 | C5 0.5 C5 0.5 C5 0.5 Bb4 0.5 A4 0.5 G4 0.5 | A4 0.5 Bb4 0.5 C5 0.5 A4 0.5 Bb4 1 | Bb4 1 A4 0.5 Bb4 0.5 G4 1",
    chords: ["Gm", "Gm", "Gm", "Gm", "Gm", "Gm", "Bb", "Bb", "Eb", "Cm", "D7", "Gm"]
  }
};
const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export function noteMidi(n) {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(n); if (!m) return null;
  return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
}
/* "C", "Am", "G7", "Bb", "D7" -> MIDI notes (root in octave 3) */
export function chordNotes(name) {
  const m = /^([A-G])(#|b)?(m)?(7)?$/.exec(name); if (!m) return [48, 52, 55];
  const root = 48 + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
  const n = [root, root + (m[3] ? 3 : 4), root + 7];
  if (m[4]) n.push(root + 10);
  return n;
}
/* split a song into bars: [{ notes: [[midi|null, startBeat, lenBeats]], chords: [names] }] */
export function songBars(song) {
  return song.notes.split("|").map(function (bar, i) {
    const t = bar.trim().split(/\s+/), notes = []; let at = 0;
    for (let k = 0; k + 1 < t.length; k += 2) { const len = parseFloat(t[k + 1]); notes.push([t[k] === "R" ? null : noteMidi(t[k]), at, len]); at += len; }
    return { notes: notes, chords: (song.chords[i] || "C").split(" ") };
  });
}
