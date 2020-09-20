import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";

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
];

const router = new VueRouter({
	routes,
});

export default router;
