import Vue from "vue";
import Vuex from "vuex";

// modules
import Firebase from "./modules/firebase";
import WeatherUnlocked from "./modules/weatherUnlocked";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Firebase, WeatherUnlocked, User },
});
