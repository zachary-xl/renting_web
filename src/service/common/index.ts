import request from "@/service";

// 上传文件
export function postFileUploadAPI(data: FormData) {
  return request.post({
    url: "/file/upload",
    data
  });
}
// 下载文件
export function getFileDownloadAPI(id) {
  return request.get({
    url: "/file/download/" + id,
  });
}

