import type { ServerOptions } from "vite";

export default function createViteServer(): ServerOptions {
  return {
    host: "0.0.0.0",
    port: 3000,
    hmr: true,
    open: true,
    proxy: {
      "/api": {
        target: "https://ui34702984.yicp.fun",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "/api")
      }
    }
  };
}
