import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/styles/index.scss";
import "./assets/fonts/index.scss";
import "element-plus/dist/index.css";
import 'virtual:svg-icons-register'
// import { registerIconComponent } from "@/utils";
import { SvgIcon } from "@/components";
const app = createApp(App);
app.component("SvgIcon", SvgIcon);

app.use(router);
app.use(store);
// registerIconComponent(settings);
app.mount("#app");
