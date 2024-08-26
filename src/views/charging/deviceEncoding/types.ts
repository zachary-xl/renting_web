export type TPagination = {
  noPage: string
  currentPage: number
  pageSize: number
}
export type TListParams = {
  search: string
  imei: string
  brandId: string
  brandName: string
  categoryName: string
  userId: string
  nickame: string
  isParkCharge: string
  status: number
  bindAtGte: number
  bindAtLte: number
}

export type TListResponse = {
  data: {
    list: TList[]
    currentPage: number
    pageSize: number
    total: number
  }
}

export type TList = {
  imei: string
  categoryName: string
  brandName: string
  nickname: number
  createdAt: number
}

export type TFormData = {
  name: string
  brandId: string
  categoryId: string
  imei: string
  avatarIds: string
  isShare: string
  isParkCharge: string
  address: string
  latitude: number
  longitude: number
}
