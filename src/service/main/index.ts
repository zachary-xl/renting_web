import request from "../request";
import type { IUserInfo, IMenu, IResponse, IResponseData } from "./types";

export const postLoginAPI = (data: FormData) => {
  return request.post<IResponse>({
    url: "/admin/login",
    data
  });
};
export const getUserGetInfoAPI = () => {
  return request.get<IResponseData<IUserInfo>>({
    url: "/admin/user/getInfo"
  });
};
export const getMenusAPI = () => {
  return request.get<IResponseData<IMenu[]>>({
    url: "/admin/menu/getMenu"
  });
};
