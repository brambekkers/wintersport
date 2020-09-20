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
            getters.db.doc("chat/main").set({
                name: "Los Angeles",
                state: "CA",
                country: "USA"
            })
        }
    },
};
