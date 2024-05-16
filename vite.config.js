import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"
import { ViteFaviconsPlugin } from "vite-plugin-favicon"

export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: "public/icons/favicon-196x196.png",

      favicons: {
        path: "icons/",
      },
    }),
    //   VitePWA({
    //     registerType: "autoUpdate",
    //     includeAssets: [
    //       "favicon.ico",
    //       "apple-touch-icon-57x57.png",
    //       "apple-touch-icon-60x60.png",
    //       "apple-touch-icon-72x72.png",
    //       "apple-touch-icon-76x76.png",
    //       "apple-touch-icon-114x114.png",
    //       "apple-touch-icon-120x120.png",
    //       "apple-touch-icon-144x144.png",
    //       "apple-touch-icon-152x152.png",
    //       "favicon-196x196.png",
    //       "favicon-96x96.png",
    //       "favicon-32x32.png",
    //       "favicon-16x16.png",
    //       "favicon-128.png",
    //       "mstile-70x70.png",
    //       "mstile-144x144.png",
    //       "mstile-150x150.png",
    //       "mstile-310x150.png",
    //       "mstile-310x310.png",
    //     ],
    //     manifest: {
    //       name: "Time Makes Society",
    //       short_name: "TMS",
    //       description: "TMS with PWA",
    //       start_url: "/",
    //       display: "standalone",
    //       background_color: "#ffffff",
    //       theme_color: "#ffffff",
    //       icons: [
    //         {
    //           src: "logo.png",
    //           sizes: "192x192",
    //           type: "image/png",
    //           purpose: "any",
    //         },
    //         {
    //           src: "pwa-512x512.png",
    //           sizes: "512x512",
    //           type: "image/png",
    //           purpose: "any",
    //         },
    //         {
    //           src: "pwa-144x144.png",
    //           sizes: "144x144",
    //           type: "image/png",
    //           purpose: "any",
    //         },
    //       ],
    //     },
    //   }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://kscoldproject.site:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
})
