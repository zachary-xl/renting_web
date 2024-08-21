export type { FormInstance, FormRules } from "element-plus";

export interface IFormData {
  username: string;
  password: string;
  remember: boolean;
}

export interface IReqLoginForm {
  username: string;
  password: string;
  code: string;
}
export interface IResLogin {
  access_token: string;
}
export interface IResAuthButtons {
  [key: string]: string[];
}
