import request from "../request";
import type { IUserGetInfoResponse, IResponse, IResponseData } from "./types";
import { IMenu } from "./types";

export const postLoginAPI = (data: FormData) => {
  return request.post<IResponse>({
    url: "/admin/login",
    data
  });
};
export const getUserGetInfoAPI = () => {
  return request.get<IResponseData<IUserGetInfoResponse>>({
    url: "/admin/user/getInfo"
  });
};
export const getMenusAPI = () => {
  return request.get<IResponseData<IMenu[]>>({
    url: "/admin/menu/getMenu"
  });
};

