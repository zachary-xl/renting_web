import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./permission";
import "./assets/styles/index.scss";
import "./assets/fonts/index.scss";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";

import { SvgIcon } from "@/components";
import { registerIconComponent } from "@/utils";
import { initTheme } from "@/config";

const app = createApp(App);
registerIconComponent(app);
initTheme("light");
app.component("SvgIcon", SvgIcon);

app.use(store);
app.use(router);

app.mount("#app");
