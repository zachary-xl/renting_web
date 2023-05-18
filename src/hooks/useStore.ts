import { storeToRefs } from "pinia";
import { useAppStore } from "@/store";

export function useAppStoreToRefs() {
  const appStore = useAppStore();
  return {
    appStore,
    ...storeToRefs(appStore)
  };
}
