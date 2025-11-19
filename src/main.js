import axios from 'axios';
<<<<<<< HEAD
axios.defaults.baseURL = "http://localhost:3005";
=======
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3005";
>>>>>>> 67204052ba61bca53f2b8c573e821669311c1a3d
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import componentUI from "./components/UI";
import componentUX from "./components/UX";
import store from '@/store';
const app = createApp(App);
componentUI.forEach((component) => {
    app.component(component.__name || component.name, component);
});
componentUX.forEach((component) => {
    app.component(component.__name || component.name, component);
});
app.use(router).use(store).mount("#app");
//# sourceMappingURL=main.js.map