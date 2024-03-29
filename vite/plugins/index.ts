import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend-plus/dist";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";

import Legacy from "./Legacy";
import Icons from "./Icons";
import AutoImport from "./AutoImports";
import Components from "./Components";
import Compression from "./Compression";
import StyleImport from "./StyleImport";
import CreateSvgIcons from "./CreateSvgIcons";

export default function createVitePlugins(viteEnv, isBuild = false): PluginOption[] {
  const plugins: PluginOption[] = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes("xl-")
        }
      }
    }), // vue vite 对 vue 支持
    vueJsx(), // vueJsx vite 对 jsx 支持
    VueSetupExtend, // 定义组件的 name 值
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: "index.html",
          template: "/index.html",
          entry: "src/main.ts"
        },
        {
          filename: "ie.html",
          template: "/ie.html"
        }
      ]
    })
  ];
  plugins.push(Legacy());
  plugins.push(Icons());
  plugins.push(AutoImport());
  plugins.push(Components());
  plugins.push(StyleImport());
  plugins.push(CreateSvgIcons());
  isBuild && plugins.push(visualizer({ open: true }));
  isBuild && plugins.push(Compression(viteEnv));
  return plugins;
}
