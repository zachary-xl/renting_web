import { storeToRefs } from "pinia";
import { useSettingStore, useAuthStore, useTagsViewStore } from "@/store";
import useUserStore from "@/store/modules/user";

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

export function useUserStoreToRefs() {
  const userStore = useUserStore();
  return {
    userStore,
    ...storeToRefs(userStore)
  };
}
