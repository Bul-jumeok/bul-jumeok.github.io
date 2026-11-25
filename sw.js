// 비밀본부 설치용 서비스 워커. 캐시를 쓰지 않아 업데이트가 항상 바로 반영돼요.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
