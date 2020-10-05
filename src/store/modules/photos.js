import * as firebase from "firebase";

export default {
    state: {
        photos: []
    },

    getters: {
        photos(state) {
            return state.photos;
        }
    },

    mutations: {
        photos(state, val) {
            state.photos = val;
        }
    },

    actions: {
        photosWatcher({ getters, commit }) {
            getters.db.doc("chat/main").onSnapshot((doc) => {
                commit("chat", doc.data().messages);
            });
        },

        addPhoto({ getters }, message) {
            const user = getters.auth.currentUser;

            getters.db.doc("chat/main").update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    user: user.uid,
                    text: message,
                    sentAt: Date.now()
                })
            });
        }
    }
};
