import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

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

// Users
import Users from "../views/Users";
import AddUser from "../views/users/Add";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/weather",
        name: "Weather",
        component: Weather
    },
    {
        path: "/map",
        name: "Map",
        component: Map
    },
    {
        path: "/location",
        name: "Location",
        component: Location
    },
    {
        path: "/routes",
        name: "Routes",
        component: Routes
    },
    {
        path: "/webcams",
        name: "Webcams",
        component: Webcams
    },
    {
        path: "/photos",
        name: "Photos",
        component: Photos
    },
    {
        path: "/chat",
        name: "Chat",
        component: Chat
    },
    // Users
    {
        path: "/users",
        name: "Users",
        component: Users
    },
    {
        path: "/users/add",
        name: "Add user",
        component: AddUser
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(async (record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        if (!(await store.getters.firebase.auth().currentUser.uid)) {
            next({ name: "Login" });
        } else {
            next(); // go to wherever I'm going
        }
    } else {
        next(); // does not require auth, make sure to always call next()!
    }
});

export default router;
