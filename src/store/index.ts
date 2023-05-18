import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export { default as useAppStore } from "./modules/app";
export { default as useUserStore } from "./modules/user";
export default pinia;
