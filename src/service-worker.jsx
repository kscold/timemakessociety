self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-shell").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/src/main.jsx",
        "/manifest.json",
        "/pwa-192x192.png",
        "/pwa-512x512.png",
        "/pwa-144x144.png",
      ])
    })
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `/service-worker.js`
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("ServiceWorker registered: ", registration)
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed: ", error)
        })
    })
  } else {
    console.log("ServiceWorker is not supported in this browser.")
  }
}
