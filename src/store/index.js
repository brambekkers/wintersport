import Vue from "vue";
import Vuex from "vuex";

// modules
import Firebase from "./modules/firebase";
import Weather from "./modules/weather";
import User from "./modules/user";
import Users from "./modules/users";
import Chat from "./modules/chat";
import Admin from "./modules/admin";
import Webcam from "./modules/webcam";
import Photos from "./modules/photos";

Vue.use(Vuex);

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
    modules: { Firebase, Weather, User, Users, Chat, Webcam, Admin, Photos }
});
