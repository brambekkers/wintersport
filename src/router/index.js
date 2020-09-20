import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";
import Chat from "../views/Chat";

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
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
