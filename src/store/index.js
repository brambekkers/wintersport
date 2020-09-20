import Vue from "vue";
import Vuex from "vuex";

// modules
import Firebase from "./modules/firebase";
import WeatherUnlocked from "./modules/weatherUnlocked";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebar: false
  },
  mutations: {
    sidebar: (state, newState) => { state.sidebar = newState }
  },
  getters: {
    sidebar: (state) => state.sidebar
  },
  modules: { Firebase, WeatherUnlocked, User },
});
