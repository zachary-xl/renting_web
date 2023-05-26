import type {RouteRecordRaw} from "vue-router"
export interface IState {
  user: IUser,
  roles: string[];
  permissions?: string[];
  sidebarRouters: RouteRecordRaw[]
}

export interface IUser {
  username: string;
  email: string;
  avatar?: string;
}
export interface IMenuList {
  menuId: string;
  path: string;
  superiorId?: any;
  menuType: string;
  name: string;
}

