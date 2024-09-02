import request from "@/service";
import type { TUploadResponse } from "@/service/common/types";

// 上传文件
export function postFileUploadAPI(data: FormData) {
  return request.post<TUploadResponse>({
    url: "/file/upload",
    data
  });
}
// 下载文件
export function getFileDownloadAPI(id:string) {
  return request.get<{data: ArrayBuffer}>({
    url: "/file/download/" + id,
    responseType: 'arraybuffer'
  });
}

