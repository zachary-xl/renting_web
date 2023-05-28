import {createRouter, createWebHashHistory} from "vue-router";
import type {RouteRecordRaw, Router} from "vue-router";

export const defaultRoutes: RouteRecordRaw[] = [
  {
    redirect: "/main",
    path: "/"
  },
  {
    path: "",
    redirect: "/main",
    name:"Layout",
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
      },
      // {
      //   name:"System",
      //   path: "/system",
      //   // component: () => import("@/layout/index.vue"),
      //   meta:{
      //     title:"系统管理"
      //   },
      //   children: [
      //     {
      //       name: "Role",
      //       path: "/system/role",
      //       component: () => import("@/views/system/role/index.vue"),
      //     },
      //     {
      //       name: "User",
      //       path: "/system/user",
      //       component: () => import("@/views/system/user/index.vue"),
      //     }
      //   ]
      // }
    ]
  },
  /*{
    path: "/system",
    component: () => import("@/layout/index.vue"),
    name:"System",
    meta:{
      title:"系统管理"
    },
    children: [
      {
        name: "Role",
        path: "/system/role",
        component: () => import("@/views/system/role/index.vue"),
      },
      {
        name: "User",
        path: "/system/user",
        component: () => import("@/views/system/user/index.vue"),
      }
    ]
  },*/
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  }
];
export const errorRoutes: RouteRecordRaw[] = [
  {
    name: "NotPermission",
    path: "/401",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "401"
    }
  },
  {
    name: "NotFound",
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404"
    }
  }
]
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
]

const router: Router = createRouter({
  routes: [...defaultRoutes, ...errorRoutes],
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {top: 0, left: 0};
    }
  }
});
export default router;
