import request from "@/service";
import {  TFormData } from "@/views/charging/brandManage/types";
import { TBrandListResponse, TListParams, TListResponse, TPagination } from "@/views/charging/categoryManage/types";
// 型号列表
export const getChargeStationBrandListAPI = () => {
  return request.get<TBrandListResponse>({
    url: "/charge_station/brand/list",
    params: {
      noPage: "true"
    }
  });
};
// 型号列表
export const getChargeStationCategoryListAPI = (params: TPagination & Partial<TListParams>) => {
  return request.get<TListResponse>({
    url: "/charge_station/category/list",
    params
  });
};
// 型号删除
export const deleteChargeStationCategoryDeleteAPI = (id: string) => {
  return request.delete<TListResponse>({
    url: "/charge_station/category/delete/" + id
  });
};
// 品牌创建
export const postChargeStationCategoryCreateAPI = (data: TFormData) => {
  return request.post({
    url: "/charge_station/category/create",
    data
  });
};
// 品牌修改
export const postChargeStationCategoryUpdateAPI = (id: string, data: TFormData) => {
  return request.put({
    url: "/charge_station/category/update/" + id,
    data
  });
};

