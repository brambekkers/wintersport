import firebaseConfig from "@/config/firebase-config";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

firebase.initializeApp(firebaseConfig)

export default {
	state: {
		firebase: null,
		auth: null,
		db: null,
		storage: null,
		functions: null,
	},

	getters: {
		firebase: (state) => state.firebase,
		auth: (state) => state.firebase.auth(),
		db: (state) => state.firebase.firestore(),
		storage: (state) => state.firebase.storage(),
		functions: (state) => state.firebase.functions(),
	},

	mutations: {
		firebase(state, firebase) {
			state.firebase = firebase;
		},
	},

	actions: {
		async initializeApp({ commit }) {
			if (firebase.apps.length === 0) {
				commit("firebase", await firebase.initializeApp(firebaseConfig));
			} else {
				commit("firebase", firebase.apps[0]);
			}
			return true;
		},

	},
};

firebase.getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, reject);
	})
}
