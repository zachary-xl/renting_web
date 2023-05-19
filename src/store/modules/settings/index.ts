import { defineStore } from "pinia";
import {
  GET_IS_EXPAND_WIDTH,
  GET_IS_FULLSCREEN,
  TOGGlE_EXPAND_ACTION,
  TOGGlE_FULLSCREEN_ACTION
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
        document.documentElement.requestFullscreen();
        return "icon-fullscreen-exit";
      } else {
        !!document.fullscreenElement && document.exitFullscreen();
        return "icon-fullscreen-open";
      }
    }
  },
  actions: {
    [TOGGlE_EXPAND_ACTION]() {
      this.isExpand = !this.isExpand;
    },
    [TOGGlE_FULLSCREEN_ACTION]() {
      this.isFullScreen = !this.isFullScreen;
    }
  }
});
