import request from "@/service";
import type { IApiResponseBase, IOneWord } from "./types";

export function postUploadFile() {
  return request.post<IApiResponseBase<IOneWord>>({
    url: "/file/upload",
    data:{

    }
  });
}
