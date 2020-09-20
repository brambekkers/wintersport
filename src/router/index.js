import Vue from "vue";
import VueRouter from "vue-router";
import { Home, Settings, Login } from "../views";

Vue.use(VueRouter);

const routes = [
<<<<<<< HEAD
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
=======
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
>>>>>>> 481bc4103331842c02eb32089a1316a165f245d7
];

const router = new VueRouter({
	routes,
});

export default router;
