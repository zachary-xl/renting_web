import type { UploadFile, UploadFiles } from "element-plus";

export type TPagination = {
  noPage?: string;
  currentPage: number;
  pageSize: number;
};
export type TListParams = {
  search: string;
  deviceCode: string;
  brandId: string;
  brandName: string;
  categoryName: string;
  userId: string;
  nickname: string;
  statusName: string;
  isParkCharge: string;
  status: number;
  bindAtGte: number;
  bindAtLte: number;
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
  id: string;
  deviceCode: string;
  categoryName: string;
  brandName: string;
  nickname: number;
  name: string;
  createdAt: number;
  expireBindAt: number;
  firstBindAt: number;
};

export type TFormData = {
  // name?: string;
  brandId: string;
  categoryId: string;
  deviceCode: string;
  // avatarIds?: string;
  // isShare?: string;
  // isParkCharge?: string;
  // address?: string;
  // latitude?: number;
  // longitude?: number;
};
export type upload = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;

export type TCategoryResponse = {
  data: {
    list: TCategoryList[];
  };
};
export type TCategoryList = {
  name: string;
  id: string;
};

export type TBrandResponse = {
  data: {
    list: TBrandList[];
  };
};
export type TBrandList = {
  name: string;
  id: string;
};
