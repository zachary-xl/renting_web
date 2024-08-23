import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import router from "./router/router";
import { useAuthStoreToRefs, useSettingStoreToRefs } from "@/hooks";
import { MENUS_ACTION, USER_INFO_ACTION, LOGOUT_ACTION } from "@/model";
import { AxiosError } from "axios";
import { getStorage } from "@/utils";
// 关闭加载微调器
NProgress.configure({ showSpinner: false });
const whiteList = ["/login", "/401", "/404"];

let isLogin = false;
let role = false;
router.beforeEach(async (to, _, next) => {
  NProgress.start();
  if(getStorage("accessToken")){
    const {settingStore} = useSettingStoreToRefs()
    to.meta.title && settingStore.setTitle(to.meta.title)
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    }else{

    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  // const { authStore, roles } = useAuthStoreToRefs();
  // if (!isLogin) {
  //   //  如果token不存在就跳转到登录页面
  //   if (!whiteList.includes(to.path)) {
  //     return next({
  //       path: "/login",
  //       query: {
  //         redirect: encodeURIComponent(to.fullPath)
  //       }
  //     });
  //   }
  // } else {
  //   if (!role && !whiteList.includes(to.path)) {
  //     try {
  //       // await authStore[USER_INFO_ACTION]();
  //       await authStore[MENUS_ACTION]();
  //       role = true;
  //       return next({ ...to, replace: true });
  //     } catch (e) {
  //       if (e instanceof AxiosError && e?.response?.status === 401) {
  //         return next({ path: "/401" });
  //       }
  //     }
  //   } else {
  //     if (to.path === "/login") {
  //       return next({ path: "/login" });
  //     }
  //   }
  // }
  return next();
});

router.afterEach(to => {
  NProgress.done();
  // TODO
  const title = to.meta?.title;
  if (title) document.title = title as string;
});
