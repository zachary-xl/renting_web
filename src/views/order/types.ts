export type TPagination = {
  noPage: string;
  currentPage: number;
  pageSize: number;
};

export type TOrderManageListParams = {
  search?: string;
  code?: string;
  userId?: string;
  userName?: string;
  chargeStationId?: string;
  chargeStationDeviceCode?: string;
  chargeStationName?: string;
  startAt?: number;
  endAt?: number;
};

export type TOrderListResponse = {
  data: {
    list: TOrderList[];
    currentPage: number;
    pageSize: number;
    total: number;
  };
};
export type TOrderDetailResponse = {
  data: TOrderList;
};
export type TOrderList = {
  userName: string;
  code: string;
  chargeDegree: string;
  recordList: TRecordList[];
  chargeStationDeviceCode: number;
  startAt: number;
  endAt: number;
  chargeCost: number;
  chargeStationName: string;
  chargeStationaddress: string;
};

export type TRecordList = {
  chargeCost: number;
  chargeDegree: string;
  endAt: number;
  startAt: number;
  id: string;
};
