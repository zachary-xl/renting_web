import { defineStore } from "pinia";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION,
  GET_IS_FIXED_HEADER_POSITION,
  GET_IS_FIXED_HEADER_TOP
} from "@/model";
import type { IState } from "./types";

export default defineStore("settings", {
  state: (): IState => ({
    isExpand: true, // 是否展开
    isFullScreen: false, // 是否全屏
    isFixedHeader: true // 是否固定头部
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
    }
  },
  persist: {
    enabled: true
  }
});
