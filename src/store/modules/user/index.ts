import { defineStore } from "pinia";
import type { IState, IRegister } from "./types";
import { GET_USER_INFO_ACTION, GET_MENUS_ACTION, LOGIN_ACTION, STORAGE_TYPE } from "@/model";
import { getMenusAPI, getUserGetInfoAPI, postLoginAPI } from "@/service/main";

export default defineStore("user", {
  state: (): IState => ({
    roles: [],
    user: {
      username: "",
      avatar: "",
      email: ""
    },
    menuList: []
  }),
  getters: {},
  actions: {
    [LOGIN_ACTION](userInfo) {
      const { username, password } = userInfo;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      return new Promise((resolve, reject) => {
        postLoginAPI(formData).then(res => {
          resolve();
        }).catch(reject);
      });
    },
    [GET_USER_INFO_ACTION]() {
      return new Promise((resolve, reject) => {
        getUserGetInfoAPI().then(res => {
          console.log(res);
          resolve();
        }).catch(reject);
      });
    },
    [GET_MENUS_ACTION]() {
      return new Promise((resolve, reject) => {
        getMenusAPI().then(res => {
          console.log("menu", res);
          resolve();
        }).catch(reject);
      });
    }
  },
  persist: {
    enabled: true
    // strategies: [
    //   {
    //     key: "user",
    //     storage: STORAGE_TYPE,
    //     paths: ["userInfo"]
    //   }
    // ]
  }
});
