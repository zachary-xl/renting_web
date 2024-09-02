import { getChargeStationBrandListAPI } from "@/service/charging/categoryManage";

export type TPagination = {
  noPage?: string;
  currentPage: number;
  pageSize: number;
};
export type TListParams = {
  name: string;
};
export type TListResponse = {
  data: {
    list: TList[];
    currentPage: number;
    pageSize: number;
    total: number;
  };
};

export type TList = {
  createdAt: number;
  id: string;
  name: string;
};
export type TFormData = {
  name: string;
  id?: string;
};
export type TFormCompProps = {
  visible:boolean;
  title: string;
  initFormData?:TFormData
}

