import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export { default as useAuthStore } from "./modules/auth";
export { default as useSettingStore } from "./modules/settings";
export { default as useTagsViewStore } from "./modules/tagsView";
export default pinia;
