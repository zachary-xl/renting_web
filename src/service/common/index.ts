import request from "@/service";
import type { IApiResponseBase, IOneWord } from "./types";

export function getOneWord() {
  return request.get<IApiResponseBase<IOneWord>>({
    url: "https://api.xygeng.cn/one"
  });
}
