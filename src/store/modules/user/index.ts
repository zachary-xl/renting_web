import { defineStore } from "pinia";
import type { IState, IRegister } from "./types";
import { STORAGE_TYPE } from "@/model";

export default defineStore("user", {
  state: (): IState => ({
    userInfo: {
      username: "lxl"
    }
  }),
  getters: {
    userInfoGetter: (state) => state.userInfo
  },
  actions: {
    registerUserAction(data: IRegister) {
      try {
        // api...
      } catch (error) {
        // return error
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: STORAGE_TYPE,
        paths: ["userInfo"]
      }
    ]
  }
});
