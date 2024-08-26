import type { RouteRecordRaw } from "vue-router";

export default [
  {
    redirect: "/main",
    path: "/"
  },
  {
    path: "",
    redirect: "/user",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [
      // {
      //   name: "Main",
      //   path: "/main",
      //   component: () => import("@/views/main.vue"),
      //   meta: {
      //     title: "首页",
      //     icon: "shouye"
      //   }
      // },
      {
        name: "User",
        path: "/user",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "login"
        }
      },
      {
        name: "Order",
        path: "/order",
        component: () => import("@/views/order/index.vue"),
        meta: {
          title: "订单管理",
          icon: "login"
        }
      },
      {
        name: "Charging",
        path: "/charging",
        children: [
          {
            name: "DeviceEncoding",
            path: "deviceEncoding",
            component: () => import("@/views/charging/deviceEncoding/index.vue"),
            meta: {
              title: "设备编码管理",
              icon: "shouye"
            }
          }
        ],
        meta: {
          title: "充电桩管理",
          icon: "login"
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
