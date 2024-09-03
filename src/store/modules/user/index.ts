import { clearStorage, getStorage, setStorage } from "@/utils";
import type { TLoginForm } from "@/views/login/types";
import type { TState } from "@/store/modules/user/types";
import { postLoginAPI } from "@/service/login";

const useUserStore = defineStore("user", {
  state: (): TState => ({
    accessToken: getStorage("accessToken"),
    refreshToken: getStorage("refreshToken"),
    expire: 0
  }),
  actions: {
    loginAction(loginForm: TLoginForm) {
      const username = loginForm.username.trim();
      return new Promise((resolve, reject) => {
        postLoginAPI({ ...loginForm, username })
          .then(({ data }) => {
            setStorage("accessToken", data.accessToken);
            setStorage("refreshToken", data.refreshToken);
            setStorage("expire", data.expire);
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken;
            this.expire = data.expire;
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logoutAction() {
      return new Promise((resolve, reject) => {
        clearStorage();
        resolve(true);
      });
    }
  }
});

export default useUserStore;
