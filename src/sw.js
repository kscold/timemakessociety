// install event
// self.addEventListener("install", (e) => {
//   console.log("[Service Worker] installed")
//   e.waitUntil(
//     caches.open("app-shell").then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/src/main.jsx",
//         "/manifest.json",
//       ])
//     })
//   )
// })

// // activate event
// self.addEventListener("activate", (e) => {
//   console.log("[Service Worker] actived", e)
// })

// // fetch event
// self.addEventListener("fetch", (e) => {
//   console.log("[Service Worker] fetched resource " + e.request.url)
// })

self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed")
})

// activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] actived", e)
})

// fetch event
self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] fetched resource " + e.request.url)
})
