import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

const defaultRoutes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/main",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        name: "Main",
        path: "/main",
        component: () => import("@/views/main.vue"),
        meta: {
          title: "首页"
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
  },
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
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404"
    }
  }
];
const router: Router = createRouter({
  routes: defaultRoutes,
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  }
});
export default router;
