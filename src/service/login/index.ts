import request from "@/service";
import type { TLoginForm } from "@/views/login/types";

export const postLoginAPI = (data:TLoginForm) => {
  return request.post({
    url: "/v1/auth/password/login",
    data
  });
};

export const postCaptchaAPI = () => {
  return request.post({
    url: "/v1/auth/image/captcha",
  });
};

