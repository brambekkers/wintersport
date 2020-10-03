import * as firebase from "firebase";

export default {
	state: {
		chat: null,
	},

	getters: {
		chat(state) {
			return state.chat;
		},
	},

	mutations: {
		chat(state, val) {
			state.chat = val;
		},
	},

	actions: {
		chatWatcher({ getters, commit }) {
			getters.db.doc("chat/main").onSnapshot((doc) => {
				commit("chat", doc.data().messages);
			});
		},

		sendMessage({ getters }, message) {
			const user = getters.auth.currentUser;

			getters.db.doc("chat/main").update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					user: user.uid,
					text: message,
					sentAt: Date.now(),
				}),
			});
		},
	},
};
