/*
 * @name: getAssets 获取assets目录的文件路径
 * @folder:  需要读取的目录
 * @name: 文件名，需要包括扩展名
 */
export const getAssets = (folder: string, name: string) => {
  // 注意路径一定要以../assets开头，开发环境下，vite 会自动拼上 src
  return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
};
// 排除出对象中假的值
export function excludingFakeObject(obj:any){
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== '' && value !== 0
    )
  );
}
