import { defineStore } from "pinia";
import { GET_IS_EXPAND_WIDTH, GET_IS_FULLSCREEN, TOGGlE_EXPAND_ACTION, TOGGlE_FULLSCREEN_ACTION } from "@/model";

export default defineStore("app", {
  state: () => ({
    isExpand: true,
    isFullScreen: false
  }),
  getters: {
    [GET_IS_EXPAND_WIDTH](state) {
      return state.isExpand ? 200 : 60;
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
