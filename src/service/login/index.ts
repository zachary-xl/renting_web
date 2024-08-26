import request from "@/service";
import type { TLoginForm, TLoginResponse } from "@/views/login/types";

export const postLoginAPI = (data:TLoginForm) => {
  return request.post<TLoginResponse>({
    url: "/auth/password/login",
    data
  });
};

export const postCaptchaAPI = () => {
  return request.post({
    url: "/auth/image/captcha",
  });
};

export const postRefreshTokenAPI = (accessToken, refreshToken) => {
  return request.post({
    url: "/auth/token/refresh",
    data:{
      accessToken,
      refreshToken
    }
  });
};

