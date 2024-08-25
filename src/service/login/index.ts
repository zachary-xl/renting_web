import request from "@/service";
import type { TLoginForm, TLoginResponse } from "@/views/login/types";

export const postLoginAPI = (data:TLoginForm) => {
  return request.post<TLoginResponse>({
    url: "/v1/auth/password/login",
    data
  });
};

export const postCaptchaAPI = () => {
  return request.post({
    url: "/v1/auth/image/captcha",
  });
};

export const postRefreshTokenAPI = (accessToken, refreshToken) => {
  return request.post({
    url: "/v1/auth/token/refresh",
    data:{
      accessToken,
      refreshToken
    }
  });
};

