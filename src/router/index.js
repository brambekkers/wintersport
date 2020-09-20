import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";
import Map from "../views/Map";
import Location from "../views/Location";
import Routes from "../views/Routes";
import Webcams from "../views/Webcams";
import Photos from "../views/Photos";
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
		path: "/map",
		name: "Map",
		component: Map,
	},
	{
		path: "/location",
		name: "Location",
		component: Location,
	},
	{
		path: "/routes",
		name: "Routes",
		component: Routes,
	},
	{
		path: "/webcams",
		name: "Webcams",
		component: Webcams,
	},
	{
		path: "/photos",
		name: "Photos",
		component: Photos,
	},
	{
		path: "/chat",
		name: "Chat",
		component: Chat,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
