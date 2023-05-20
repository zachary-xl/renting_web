export interface IResponse {
  readonly code: number;
  readonly message: string;
}

export interface IResponseData<T> {
  readonly code: number;
  readonly message: string;
  readonly data: T;
}

export interface IUserGetInfoResponse {
  user: IUser;
}

export interface IUser {
  username: string;
  email: string;
  avatar?: any;
  roles: string[];
  permissions: string[];
}

export interface IMenu{
  menuId: string;
  path: string;
  superiorId?: any;
  menuType: string;
  name: string;
}
