import type { RouteRecordRaw } from "vue-router";

export default [
  {
    redirect: "/main",
    path: "/"
  },
  {
    path: "",
    redirect: "/main",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        name: "Main",
        path: "/main",
        component: () => import("@/views/main.vue"),
        meta: {
          title: "首页",
          icon: "shouye"
        }
      }
    ]
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  }
] as unknown as RouteRecordRaw[];
