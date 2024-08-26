import request from "@/service";
import { TFormData, TListParams, TListResponse, TPagination } from "@/views/charging/deviceEncoding/types";
// 充电桩列表
export const getChargeStationListAPI = (params:TPagination & Partial<TListParams>) => {
  return request.get<TListResponse>({
    url: "/charge_station/list",
    params
  });
};
// 充电桩解绑
export const postChargeStationOperateUnbindAPI = (id:string) => {
  return request.post({
    url: "/charge_station/operate/unbind/" + id,
  });
};
// 充电桩创建
export const postChargeStationCreateAPI = (data:TFormData) => {
  return request.post({
    url: "charge_station/create",
    data
  });
};
