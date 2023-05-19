import { storeToRefs } from "pinia";
import { useSettingStore } from "@/store";

export function useSettingStoreToRefs() {
  const settingStore = useSettingStore();
  return {
    settingStore,
    ...storeToRefs(settingStore)
  };
}
