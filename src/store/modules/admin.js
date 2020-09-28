export default {
    state: {
        isAdmin: false,
        users: null,
    },
    getters: {
        users(state) {
            return state.users;
        },
        isAdmin(state) {
            return state.isAdmin
        }
    },
    mutations: {
        users(state, val) {
            state.users = val;
        },
        isAdmin(state, val) {
            state.isAdmin = val
        }
    },
    actions: {
        usersWatcher({ getters, commit }) {
            getters.db.collection("users").onSnapshot((usersCollection) => {
                const users = []
                usersCollection.forEach((user) => {
                    users.push(user.data());
                });
                commit('users', users);
            });
        },
        async changeRole({ getters }, { id, role }) {
            try {
                const changeRoleFunction = await getters.functions.httpsCallable("changeRole");
                const res = await changeRoleFunction({ id, role });
                return res
            } catch (err) {
                return err
            }
        },

    },
};
