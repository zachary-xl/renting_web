export type TPagination = {
  noPage?: string;
  currentPage: number;
  pageSize: number;
};
export type TListParams = {
  name: string;
  brandId: string;
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
  brandName: number;
  name: string;
  avatarId: string;
  categoryUrlId: string;
  createdAt: number;
};
export type TBrandListResponse = {
  data: {
    list: TBrandList[];
  };
};
export type TBrandList = {
  id: string;
  name: string;
  value: string;
  label: string;
};
export type TFormData = {
  avatarId: string;
  brandId: string;
  name: string;
  id?: string;
};
export type TFormCompProps = {
  visible:boolean;
  title: string;
  initFormData?:TFormData
}
