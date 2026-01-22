self.addEventListener("install", (event) => {
  console.log("[SW] install");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] activate");
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // 일단은 아무것도 가로채지 않음
});
