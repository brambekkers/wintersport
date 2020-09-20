import firebaseConfig from '@/config/firebase-config'

import * as firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

export default {
    state: {
        firebase: null,
        auth: null,
        db: null,
        user: null,
    },
    getters: {
        firebase(state) {
            return state.firebase
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
        user(state) {
            return state.user;
        },
    },
    mutations: {
        firebase(state, firebase) {
            state.firebase = firebase
        },
        user(state, val) {
            state.user = val;
        }

    },
    actions: {
        async initializeApp({ commit }) {
            commit("firebase", await firebase.initializeApp(firebaseConfig));
            return true;
        },
        userWatcher({ getters, commit }) {
            getters.auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('User signed in', user)
                    commit("user", user ? user : null);
                } else {
                    console.log('Not signed in')
                    commit("user", null);
                }
            });
        },
    }
}