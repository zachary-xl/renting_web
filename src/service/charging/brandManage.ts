import request from "@/service";
import type { TPagination, TListParams, TListResponse, TFormData } from "@/views/charging/brandManage/types";
// 品牌列表
export const getChargeStationBrandListAPI = (params: TPagination & Partial<TListParams>) => {
  return request.get<TListResponse>({
    url: "/charge_station/brand/list",
    params
  });
};
// 品牌删除
export const deleteChargeStationBrandDeleteAPI = (id: string) => {
  return request.delete<TListResponse>({
    url: "/charge_station/brand/delete/" + id
  });
};
// 品牌创建
export const postChargeStationBrandCreateAPI = (data: TFormData) => {
  return request.post({
    url: "/charge_station/brand/create",
    data
  });
};
// 品牌修改
export const putChargeStationBrandUpdateAPI = (id: string, data: TFormData) => {
  return request.put({
    url: "/charge_station/brand/update/" + id,
    data
  });
};

