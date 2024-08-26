import { configSource } from "@/config";
import { useSettingStoreToRefs } from "@/hooks";

/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  const { dynamicTitle, title } = useSettingStoreToRefs();
  if (dynamicTitle.value) {
    document.title = title.value + ' - ' + configSource.projectName;
  } else {
    document.title = configSource.projectName;
  }
}
