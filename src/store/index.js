import Vue from "vue";
import Vuex from "vuex";

// modules
import Firebase from "./modules/firebase";
import WeatherUnlocked from "./modules/weatherUnlocked";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Firebase, WeatherUnlocked },
});
