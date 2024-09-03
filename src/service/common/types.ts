export interface IApiResponseBase<T> {
  code: number;
  message?: string;
  data: T;
}
export type TUploadResponse = {
  data: {
    id: string;
  };
};
export interface IOneWord {
  content: string;
  created_at: string;
  id: number;
  name: string;
  origin: string;
  tag: string;
  updated_at: string;
}
