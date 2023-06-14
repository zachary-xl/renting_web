import type { IState } from "./types";
import localforage from "localforage";
import { defineStore } from "pinia";
import { postLoginAPI, getUserGetInfoAPI, getMenusAPI } from "@/service";
import { addRoutesWithMenu, clearStorage, formatTree, loadLocalRoutes, mapPathToMenu } from "@/utils";
import { MENUS_ACTION, USER_INFO_ACTION, LOGIN_ACTION, LOGOUT_ACTION } from "@/model";

export default defineStore("user", {
  state: (): IState => ({
    roles: [],
    user: {
      username: "",
      avatar: "",
      email: ""
    },
    menusList: []
  }),
  getters: {},
  actions: {
    [LOGIN_ACTION](userInfo) {
      const { username, password } = userInfo;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      return new Promise((resolve, reject) => {
        postLoginAPI(formData)
          .then(res => {
            resolve(res);
          })
          .catch(reject);
      });
    },
    [LOGOUT_ACTION]() {
      return new Promise(async resolve => {
        clearStorage();
        await localforage.clear();
        resolve(true);
      });
    },
    [USER_INFO_ACTION]() {
      return new Promise(async (resolve, reject) => {
        try {
          const info = await getUserGetInfoAPI();
          // let info = {
          //   data: {
          //     username: "username",
          //     avatar: "",
          //     email: ""
          //   }
          // };
          await localforage.setItem("userInfo", info.data);
          this.roles = ["role"];
          this.user = info.data;
          console.log("userInfo");
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
    },
    [MENUS_ACTION]() {
      return new Promise(async (resolve, reject) => {
        try {
          // const data = await getMenusAPI();
          let data = [
            {
              id: 1,
              title: "系统管理",
              icon: "logo",
              name: "System",
              path: "/system",
              redirect: "/system/user",
              pid: 0
            },
            {
              id: 2,
              title: "用户管理",
              icon: "login",
              name: "User",
              path: "/system/user",
              pid: 1
            },
            {
              id: 3,
              title: "角色管理",
              icon: "jeep-car",
              name: "Role",
              path: "/system/role",
              pid: 1
            },
            {
              id: 4,
              title: "菜单管理",
              icon: "lovers-aoc",
              name: "Menu",
              path: "/system/menu",
              pid: 1
            },
            {
              id: 5,
              title: "生活",
              icon: "parachute-man",
              name: "Life",
              path: "/life",
              link: "https://www.baidu.com",
              pid: 0
            }
          ];
          let localRoutes = loadLocalRoutes();
          let treeMenuData = formatTree(data);
          let menus = mapPathToMenu(treeMenuData, localRoutes);
          addRoutesWithMenu(menus);

          this.menusList = [{ name: "Main", path: "/main", title: "首页", icon: "shouye" }, ...treeMenuData];
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
    }
  }
  // persist: {
  // enabled: true
  // strategies: [
  //   {
  //     key: "userInfo",
  //     storage: sessionStorage,
  //     paths: ["user"]
  //   }
  // ]
  // }
});
