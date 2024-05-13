import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { createProxyMiddleware } from "http-proxy-middleware"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://kscoldproject.site", // 프록시할 대상 서버 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // URL에서 '/api'를 제거하여 요청
      },
    },
  },
})
