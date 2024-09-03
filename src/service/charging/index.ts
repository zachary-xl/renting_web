import request from "@/service";
import {
  TBrandResponse,
  TCategoryResponse,
  TFormData,
  TListParams,
  TListResponse,
  TPagination
} from "@/views/charging/deviceEncoding/types";
// 充电桩列表
export const getChargeStationListAPI = (params: TPagination & Partial<TListParams>) => {
  return request.get<TListResponse>({
    url: "/charge_station/list",
    params
  });
};
// 充电桩解绑
export const postChargeStationOperateUnbindAPI = (id: string) => {
  return request.post({
    url: "/charge_station/operate/unbind/" + id
  });
};
// 充电桩创建
export const postChargeStationCreateAPI = (data: TFormData) => {
  return request.post({
    url: "/charge_station/create",
    data
  });
};
// 充电桩xlsx导入
export const postChargeStationXLSXImportAPI = (data: FormData) => {
  return request.post({
    url: "/charge_station/xlsx/import",
    data
  });
};
// 充电桩模板下载
export const postChargeStationTemplateDownloadAPI = () => {
  return request.post({
    url: "/charge_station/template/download",
    responseType: "blob"
  });
};
// 型号列表
export const getChargeStationCategoryListAPI = (params) => {
  return request.get<TCategoryResponse>({
    url: "/charge_station/category/list",
    params
  });
};
// 品牌列表
export const getChargeStationBrandListAPI = (params: { noPage: string }) => {
  return request.get<TBrandResponse>({
    url: "/charge_station/brand/list",
    params
  });
};
