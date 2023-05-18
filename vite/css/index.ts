import Tailwindcss from "tailwindcss";
import PostcssPresetEnv from "postcss-preset-env";
import type { CSSOptions } from "vite";

export default function createViteCss(): CSSOptions {
  return {
    devSourcemap: true, // css sourcemap
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.module.scss";`,
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: [
        Tailwindcss,
        PostcssPresetEnv,
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  };
}
