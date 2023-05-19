import type { CSSOptions } from "vite";

export default function createViteCss(): CSSOptions {
  return {
    devSourcemap: true, // css sourcemap
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.module.scss";`,
        javascriptEnabled: true
      }
    }
  };
}
