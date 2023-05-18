import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/styles/index.css";
import "element-plus/dist/index.css";
// import { registerIconComponent } from "@/utils";

const app = createApp(App);
app.use(store);
app.use(router);
// registerIconComponent(app);
app.mount("#app");
