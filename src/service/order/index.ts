import request from "@/service";
import { TOrderDetailResponse, TOrderListResponse, TOrderManageListParams, TPagination } from "@/views/order/types";

export const postOrderManageListAPI = (params:TPagination & Partial<TOrderManageListParams>) => {
  return request.get<TOrderListResponse>({
    url: "/v1/order_manage/list",
    params
  });
};
export const postOrderManageDetailAPI = (id:string) => {
  return request.get<TOrderDetailResponse>({
    url: "/v1/order_manage/detail/" + id
  });
};
