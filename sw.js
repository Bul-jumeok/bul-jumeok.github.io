// 비밀본부 설치용 서비스 워커. 페이지는 항상 인터넷에서 새로 받아요(업데이트가 바로 반영).
// 인터넷이 끊겼을 때만 마지막으로 받은 첫 화면을 보여줘요.
const SHELL = "bf-shell-v1";
self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.add("./"); }).catch(function () {}));
});
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).then(function (res) {
    const copy = res.clone();
    caches.open(SHELL).then(function (c) { c.put("./", copy); }).catch(function () {});
    return res;
  }).catch(function () { return caches.match("./"); }));
});
