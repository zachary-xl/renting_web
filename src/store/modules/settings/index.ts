import { defineStore } from "pinia";
import { initTheme } from "@/config";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  GET_IS_FIXED_HEADER_POSITION,
  GET_IS_FIXED_HEADER_TOP,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION,
  TOGGLE_THEME_ACTION
} from "@/model";
import type { IState, TTheme } from "./types";
import { useDynamicTitle } from "@/utils/dynamicTitle";

export default defineStore("settings", {
  state: (): IState => ({
    title: "",
    dynamicTitle: "",

    isExpand: true, // 是否展开
    isFullScreen: false, // 是否全屏
    isFixedHeader: true, // 是否固定头部
    isThemed: "light" // 当前主题状态
  }),
  getters: {
    [GET_IS_EXPAND_WIDTH](state) {
      return state.isExpand ? 200 : 64;
    },
    [GET_IS_FULLSCREEN](state) {
      if (state.isFullScreen) {
        document.documentElement.requestFullscreen().then();
        return "icon-fullscreen-exit";
      } else {
        !!document.fullscreenElement && document.exitFullscreen();
        return "icon-fullscreen-open";
      }
    },
    [GET_IS_FIXED_HEADER_POSITION](state) {
      return state.isFixedHeader ? "fixed" : "relative";
    },
    [GET_IS_FIXED_HEADER_TOP](state) {
      return state.isFixedHeader ? "84px" : "0";
    }
  },
  actions: {
    [TOGGlE_EXPAND_ACTION]() {
      this.isExpand = !this.isExpand;
    },
    [TOGGlE_FULLSCREEN_ACTION]() {
      this.isFullScreen = !this.isFullScreen;
    },
    [TOGGLE_THEME_ACTION](theme: TTheme) {
      this.isThemed = theme === "light" ? "dark" : "light";
      initTheme(this.isThemed);
    },
    setTitle(title) {
      this.title = title;
      useDynamicTitle();
    }
  },
  persist: {
    enabled: true
  }
});
