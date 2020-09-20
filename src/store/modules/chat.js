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
        sentMessage({ getters }, message) {
            const uid = getters.auth.currentUser.uid

            getters.db.doc("chat/main").set({
                text: message,
                uid: uid,
                sentAt: firebase.database.ServerValue.TIMESTAMP
            })
        }
    },
};
