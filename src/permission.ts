import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import router from "./router/router";
import { useAuthStoreToRefs } from "@/hooks";
import { MENUS_ACTION, USER_INFO_ACTION, LOGOUT_ACTION } from "@/model";
import { AxiosError } from "axios";
// 关闭加载微调器
NProgress.configure({ showSpinner: false });
const whiteList = ["/login", "/401", "/404"];

let isLogin = true;
let role = false;
router.beforeEach(async (to, _, next) => {
  NProgress.start();
  const { authStore, roles } = useAuthStoreToRefs();
  if (!isLogin) {
    //  如果token不存在就跳转到登录页面
    if (!whiteList.includes(to.path)) {
      next({
        path: "/login",
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      });
      return;
    }
  } else {
    if (!role && !whiteList.includes(to.path)) {
      try {
        // await authStore[USER_INFO_ACTION]();
        const routes = await authStore[MENUS_ACTION]();
        role = true;
        return next({ ...to, replace: true });
      } catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          next({ path: "/401" });
        }
      }
    } else {
      if (to.path === "/login") {
        return next({ path: "/" });
      }
    }
  }
  next();
});

router.afterEach((to) => {
  NProgress.done();
  // TODO
  // const title = to.meta?.title;
  // if (title)
  //   document.title = title as string;
});
