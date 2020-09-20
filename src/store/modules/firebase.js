import firebaseConfig from "@/config/firebase-config";

import * as firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

export default {
  state: {
    firebase: null,
    auth: null,
    db: null,

  },
  getters: {
    firebase(state) {
      return state.firebase;
    },
    db(state) {
      return state.firebase.firestore();
    },
    auth(state) {
      return state.firebase.auth();
    },
    storage(state) {
      return state.firebase.storage();
    },

  },
  mutations: {
    firebase(state, firebase) {
      state.firebase = firebase;
    },


  },
  actions: {
    async initializeApp({ commit }) {
      commit("firebase", await firebase.initializeApp(firebaseConfig));
      return true;
    },

  },
};
