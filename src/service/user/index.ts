import request from "@/service";
import { TPagination, TUserListParams, TUserListResponse } from "@/views/user/types";
// 用户列表
export const getUserListAPI = (params:TPagination & Partial<TUserListParams>) => {
  return request.get<TUserListResponse>({
    url: "/v1/user/list",
    params
  });
};

// 充值
export const postPayRecordRechargeAPI = (params:TUserListParams) => {
  return request.get<TUserListResponse>({
    url: "/v1/pay_record/recharge",
    params
  });
};

// 提现
export const postPayRecordWithdrawalAPI = (params:TUserListParams) => {
  return request.get<TUserListResponse>({
    url: "/v1/pay_record/withdrawal",
    params
  });
};
