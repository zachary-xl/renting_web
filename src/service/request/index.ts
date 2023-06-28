import MyRequest from "./request";
import { configSource } from "@/config";

const request = new MyRequest({
  baseURL: configSource.appEnv === "development" ? configSource.baseUrl : configSource.serverUrl,
  timeout: configSource.timeout,
  withCredentials: true
});

export default request;
