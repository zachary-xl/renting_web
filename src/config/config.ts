import type { IConfig } from "./types";

// 获取环境变量
const ENV = import.meta.env;
// 默认配置文件
export const configSource: IConfig = {
  // 开发环境
  appEnv: ENV.VITE_APP_ENV,
  // 项目名
  projectName: ENV.VITE_APP_NAME,
  // 项目描述
  projectDesc: ENV.VITE_APP_DESCRIPTION,
  // 资源base地址
  base: ENV.VITE_BASE,
  // 接口代理URL路径
  baseUrl: ENV.VITE_BASE_URL,
  // 服务端接口路径
  serverUrl: ENV.VITE_BASE_SERVER_URL,
  // 请求过期时间
  timeout: Number(ENV.VITE_TIMER_OUT),
  // 存储方法
  storage: ENV.VITE_STORAGE,
  // 存储过期方法
  storageIsExpire: JSON.parse(ENV.VITE_IS_EXPIRE)
};
