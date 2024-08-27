import request from "@/service";
import type { TOrderDetailResponse, TOrderListResponse, TOrderManageListParams, TPagination } from "@/views/order/types";

export const postOrderManageListAPI = (params: TPagination & Partial<TOrderManageListParams>) => {
  return request.get<TOrderListResponse>({
    url: "/order_manage/list",
    params
  });
};
export const postOrderManageDetailAPI = (id: string) => {
  return request.get<TOrderDetailResponse>({
    url: "/order_manage/detail/" + id
  });
};
