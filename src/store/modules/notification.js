
export default {
    state: {
        snackbar: false,
		snackbarMessage: "",
        snackbarType: "error",
        snackbarDuration: 5000
    },

    getters: {
        snackbar(state) {
            return state.snackbar;
        },
        snackbarMessage(state) {
            return state.snackbarMessage;
        },
        snackbarType(state) {
            return state.snackbarType;
        },
        snackbarDuration(state) {
            return state.snackbarDuration;
        }
    },

    mutations: {
        snackbar(state, val) {
            state.snackbar = val;
        },
        snackbarMessage(state, val) {
            state.snackbarMessage = val;
        },
        snackbarType(state, val){
            state.snackbarType = val;
        },
        snackbarDuration(state, val){
            state.snackbarDuration = val;
        }
    },

    actions: {
        snackbar({commit},{msg, type, duration = 5000}){
            commit('snackbar', true)
            commit('snackbarMessage', msg)
            commit('snackbarType', type)
            commit('snackbarDuration', 5000)
            setTimeout(() => {
                return true
            }, duration)
        }
    }
};
