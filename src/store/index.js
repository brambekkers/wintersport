import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// modules
import Firebase from "./modules/firebase";
import Weather from "./modules/weather";
import User from "./modules/user";
import Users from "./modules/users";
import Chat from "./modules/chat";
import Admin from "./modules/admin";
import Webcam from "./modules/webcam";
import Photos from "./modules/photos";
import Location from "./modules/location";
import Notification from "./modules/notification";
import Skibus from "./modules/skibus";




export default new Vuex.Store({
    state: {
        sidebar: false,
        settings: {
            theme: "light"
        }
    },
    mutations: {
        sidebar: (state, newState) => {
            state.sidebar = newState;
        }
    },
    getters: {
        sidebar: (state) => state.sidebar,
        theme: (state) => state.setting.theme
    },
    modules: { Firebase, Weather, User, Users, Chat, Webcam, Admin, Photos, Location, Notification, Skibus }
});
