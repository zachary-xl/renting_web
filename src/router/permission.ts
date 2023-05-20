import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { hasStorage } from "@/utils";
import { useUserStoreToRefs } from "@/hooks";
import { GET_USER_INFO_ACTION } from "@/model";
// 关闭加载微调器
NProgress.configure({ showSpinner: false });
const whiteList = ["/main", "/401", "/404"];

router.beforeEach((to, from) => {
  NProgress.start();

  const { userStore } = useUserStoreToRefs();
  // userStore[GET_USER_INFO_ACTION]().then(res => {
  //   console.log(res);
  // });
  // if (hasStorage("token")) {
  //   NProgress.done();
  //   return true;
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入
  //     return true;
  //   } else {
  //     NProgress.done();
  //     return `/main?redirect=${to.fullPath}`; // 否则全部重定向到登录页
  //   }
  // }
  return true;
});

router.afterEach((guard) => {
  NProgress.done();
});
