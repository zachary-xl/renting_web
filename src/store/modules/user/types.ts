export interface IRegister {
  username: string;
  password: string;
}
export interface IState {
  userInfo: IUserInfo;
}
interface IUserInfo {
  username: string;
}
export interface dataItem {
	total: number;
	pageSize: number;
	page: number;
	results: Array<resultsItem>;
}

export interface resultsItem {
	phoneNumber: string;
	nickName: string;
	description: string;
	avatar: any;
	userId: string;
	email: string;
	username: string;
}

export interface rootType {
	code: number;
	data: Array<dataItem>;
	message: string;
}

