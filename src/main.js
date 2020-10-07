import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount("#app");

store.$app = app; // <--- !!! this line adds $app to your store object
