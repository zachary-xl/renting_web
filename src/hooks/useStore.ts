import { storeToRefs } from "pinia";
import { useSettingStore, useAuthStore } from "@/store";

export function useSettingStoreToRefs() {
  const settingStore = useSettingStore();
  return {
    settingStore,
    ...storeToRefs(settingStore)
  };
}
export function useAuthStoreToRefs() {
  const authStore = useAuthStore();
  return {
    authStore,
    ...storeToRefs(authStore)
  };
}
