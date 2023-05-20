import { storeToRefs } from "pinia";
import { useSettingStore, useUserStore } from "@/store";

export function useSettingStoreToRefs() {
  const settingStore = useSettingStore();
  return {
    settingStore,
    ...storeToRefs(settingStore)
  };
}
export function useUserStoreToRefs() {
  const userStore = useUserStore();
  return {
    userStore,
    ...storeToRefs(userStore)
  };
}
