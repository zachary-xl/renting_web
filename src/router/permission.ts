import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {ElMessage} from "element-plus";
import router from "./router";
import {useUserStoreToRefs} from "@/hooks";
import {GET_MENUS_ACTION, GET_USER_INFO_ACTION, LOGOUT_ACTION} from "@/model";
// 关闭加载微调器
NProgress.configure({showSpinner: false});
const whiteList = ["/login", "/401", "/404"];

router.beforeEach((to, from) => {
  NProgress.start();
  const {userStore, roles} = useUserStoreToRefs();
  console.log(to.path, roles.value.length)
  if (whiteList.includes(to.path)) {
    // 在免登录白名单，直接进入
    NProgress.done();
    return true;
    // next()
  } else {
    if (roles.value.length === 0) {
      userStore[GET_USER_INFO_ACTION]().then(res => {
        userStore[GET_MENUS_ACTION]().then(res => {
          NProgress.done();
          console.log(res)
          return true;
        });
      }).catch(err => {
        NProgress.done();
        ElMessage.error(err);
        userStore[LOGOUT_ACTION]().then(res => {
          return "/login";
        });
      });
    } else {
      NProgress.done();
      return true;
      // next()
    }
  }

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
});

router.afterEach((guard) => {
  NProgress.done();
});
