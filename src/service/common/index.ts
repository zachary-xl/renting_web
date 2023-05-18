import request from "@/service";
import type { IApiResponseBase, IOneWord } from "./bean";

export function getOneWord() {
  return request.get<IApiResponseBase<IOneWord>>({
    url: "https://api.xygeng.cn/one"
  });
}
