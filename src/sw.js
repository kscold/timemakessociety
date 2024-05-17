self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed")
  e.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/icons/favicon.ico",
        "/icons/favicon-196x196.png",
        "/icons/logo-512x512.png",
      ])
    })
  )
})

// activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] actived", e)
})

// fetch event
self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] fetched resource " + e.request.url)
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request)
    })
  )
})
