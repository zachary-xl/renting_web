import type { IState } from "./types";
import { defineStore } from "pinia";
import localforage from "localforage";
import { postLoginAPI } from "@/service";
import { clearStorage, mapPathToMenu } from "@/utils";
import { GET_MENUS_ACTION, GET_USER_INFO_ACTION, LOGIN_ACTION, LOGOUT_ACTION } from "@/model";

export default defineStore("user", {
  state: (): IState => ({
    roles: [],
    user: {
      username: "",
      avatar: "",
      email: ""
    },
    sidebarRouters: []
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
          resolve(res);
        }).catch(reject);
      });
    },
    [LOGOUT_ACTION]() {
      return new Promise(async (resolve) => {
        clearStorage();
        await localforage.clear();
        resolve();
      });
    },
    [GET_USER_INFO_ACTION]() {
      return new Promise(async (resolve, reject) => {
        try {
          // const info = await getUserGetInfoAPI();
          let info = {
            data: {
              username: "username",
              avatar: "avatar",
              email: "email"
            }
          };
          await localforage.setItem("userInfo", info.data);
          this.user = info.data;
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
    },
    [GET_MENUS_ACTION]() {
      return new Promise(async (resolve, reject) => {
        try {
          // const menu = await getMenusAPI();
          let data = [
            {
              id: 1,
              title: "系统管理",
              icon: "shezhi02",
              name: "System",
              path: "/system",
              pid: 0
            },
            {
              id: 2,
              title: "用户管理",
              icon: "jiaoseguanli",
              name: "User",
              path: "/system/user",
              pid: 1
            },
            {
              id: 3,
              title: "角色管理",
              icon: "ziliao",
              name: "Role",
              path: "/system/role",
              pid: 1
            },
            {
              id: 4,
              title: "菜单管理",
              icon: "xiugai",
              name: "Menu",
              path: "/system/menu",
              pid: 1
            },
            {
              id: 5,
              title: "生活",
              icon: "yuangong",
              name: "Life",
              path: "/life",
              link:"https://www.baidu.com",
              pid: 0
            }
          ];
          this.sidebarRouters = mapPathToMenu(data);
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
    }
  },
  persist: {
    enabled: true
    // strategies: [
    //   {
    //     key: "userInfo",
    //     storage: sessionStorage,
    //     paths: ["user"]
    //   }
    // ]
  }
});
