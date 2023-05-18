import request from "../request";
import { ILoginResponse } from "./types";

export const postLoginAPI = (data: FormData) => {
  return request.post<ILoginResponse>({
    url: "/admin/login",
    data
  });
};


