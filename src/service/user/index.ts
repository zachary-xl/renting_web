import request from "@/service";
import type { TPagination, TUserListParams, TUserListResponse } from "@/views/user/types";
// 用户列表
export const getUserListAPI = (params:TPagination & Partial<TUserListParams>) => {
  return request.get<TUserListResponse>({
    url: "/user/list",
    params
  });
};

// 充值
export const postPayRecordRechargeAPI = (params:TUserListParams) => {
  return request.get<TUserListResponse>({
    url: "/pay_record/recharge",
    params
  });
};

// 提现
export const postPayRecordWithdrawalAPI = (params:TUserListParams) => {
  return request.get<TUserListResponse>({
    url: "/pay_record/withdrawal",
    params
  });
};
