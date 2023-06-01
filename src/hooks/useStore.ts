import { storeToRefs } from "pinia";
import { useSettingStore, useAuthStore, useTagsViewStore } from "@/store";

export function useAuthStoreToRefs() {
  const authStore = useAuthStore();
  return {
    authStore,
    ...storeToRefs(authStore)
  };
}

export function useSettingStoreToRefs() {
  const settingStore = useSettingStore();
  return {
    settingStore,
    ...storeToRefs(settingStore)
  };
}
export function useTagsViewStoreToRefs() {
  const tagsViewStore = useTagsViewStore();
  return {
    tagsViewStore,
    ...storeToRefs(tagsViewStore)
  };
}
