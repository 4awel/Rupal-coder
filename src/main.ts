import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3005";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import componentUI from "./components/UI";
import componentUX from "./components/UX";

import store from '@/store';

const app = createApp(App);

componentUI.forEach((component: any) => {
  app.component(component.__name || component.name, component);
});

componentUX.forEach((component: any) => {
  app.component(component.__name || component.name, component);
});

app.use(router).use(store).mount("#app");
