import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store/index";
import firebase from "firebase";

import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";
import Maps from "../views/Map";
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
        name: "Happy Ski Friends",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (!firebase.apps.length) {
                setTimeout(() => {
                    if (firebase.auth().currentUser) {
                        next();
                    } else {
                        next("/login");
                    }
                }, 1000);
            } else {
                if (firebase.auth().currentUser) {
                    next();
                } else {
                    next("/login");
                }
            }
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
        component: Maps
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

export default router;
