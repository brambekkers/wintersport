import Vue from "vue";
import VueRouter from "vue-router";
import { Home, Settings, Login } from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
