import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
export * from "./user";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export default pinia;
