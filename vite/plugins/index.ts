import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend-plus";

import Legacy from "./Legacy";
import Icons from "./Icons";
import AutoImport from "./AutoImports";
import Components from "./Components";
import Compression from "./Compression";
import StyleImport from "./StyleImport";
import CreateSvgIcons from "./CreateSvgIcons";

export default function createVitePlugins(viteEnv, isBuild = false): PluginOption[] {
  const plugins: PluginOption[] = [
    vue(), // vue vite 对 vue 支持
    vueJsx(), // vueJsx vite 对 jsx 支持
    VueSetupExtend.default() // 定义组件的 name 值
  ];
  plugins.push(Legacy());
  plugins.push(Icons());
  plugins.push(AutoImport());
  plugins.push(Components());
  plugins.push(StyleImport());
  plugins.push(CreateSvgIcons());
  isBuild && plugins.push(Compression(viteEnv));
  return plugins;
}
