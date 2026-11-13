// Нужен, чтобы сайт устанавливался на главный экран как приложение.
// Страницы всегда берутся из сети; сохранённая копия показывается только без интернета.
const CACHE = "app-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(r, copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(r).then((m) => m || Response.error()))
  );
});
