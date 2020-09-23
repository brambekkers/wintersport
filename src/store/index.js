import Vue from "vue";
import Vuex from "vuex";

// modules
import Firebase from "./modules/firebase";
import WeatherUnlocked from "./modules/weatherUnlocked";
import User from "./modules/user";
import Chat from "./modules/chat";
import Webcam from "./modules/webcam";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebar: false,
    settings: {
      theme: 'light'
    }
  },
  mutations: {
    sidebar: (state, newState) => { state.sidebar = newState }
  },
  getters: {
    sidebar: (state) => state.sidebar,
    theme: (state) => state.setting.theme
  },
  modules: { Firebase, WeatherUnlocked, User, Chat, Webcam },
});
