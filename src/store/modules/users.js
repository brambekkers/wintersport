export default {
	state: {
		users: null,
	},

	getters: {
		users(state) {
			return state.users;
		},
	},

	mutations: {
		users(state, value) {
			state.users = value;
		},
	},

	actions: {
		usersWatcher({ getters, commit }) {
			getters.db.collection("users").onSnapshot((usersCollection) => {
				const users = usersCollection.docs.map((user) => user.data());
				commit("users", users);
			});
		},
	},
};
