export type TPagination = {
  noPage: string;
  currentPage: number;
  pageSize: number;
};
export type TUserListParams = {
  search: string;
  nickname: string;
  username: string;
  phone: string;
  email: string;
  code: string;
  createdAtGte: number;
  createdAtLte: number;
};

export type TUserListResponse = {
  data: {
    list: TUserList[];
    currentPage: number;
    pageSize: number;
    total: number;
  };
};

export type TUserList = {
  username: string;
  wxId: string;
  chargeDegree: string;
  chargeStationNum: number;
  balance: number;
  createdAt: number;
};
