import request from "@/service";
import { TPagination, TPayPayload, TUserListParams, TUserListResponse } from "@/views/user/types";
// 用户列表
export const getUserListAPI = (params: TPagination & Partial<TUserListParams>) => {
  return request.get<TUserListResponse>({
    url: "/user/list",
    params
  });
};

// 充值
export const postPayRecordRechargeAPI = (data: TPayPayload) => {
  return request.post<TUserListResponse>({
    url: "/pay_record/recharge",
    data
  });
};

// 提现
export const postPayRecordWithdrawalAPI = (data: TPayPayload) => {
  return request.post<TUserListResponse>({
    url: "/pay_record/withdrawal",
    data
  });
};
