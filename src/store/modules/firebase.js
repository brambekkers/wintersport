import firebaseConfig from "@/config/firebase-config";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

export default {
    state: {
        firebase: null,
        auth: null,
        db: null
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
        functions(state) {
            return state.firebase.functions();
        }
    },
    mutations: {
        firebase(state, firebase) {
            state.firebase = firebase;
        }
    },
    actions: {
        async initializeApp({ commit }) {
            commit("firebase", await firebase.initializeApp(firebaseConfig));
            return true;
        }
    }
};
