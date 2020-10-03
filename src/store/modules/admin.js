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
			return state.isAdmin;
		},
	},

	mutations: {
		users(state, val) {
			state.users = val;
		},
		isAdmin(state, val) {
			state.isAdmin = val;
		},
	},

	actions: {
		async changeRole({ getters }, { id, role }) {
			try {
				const changeRoleFunction = await getters.functions.httpsCallable(
					"changeRole"
				);

				const res = await changeRoleFunction({ id, role });

				return res;
			} catch (err) {
				return err;
			}
		},

		async addUserAsAdmin({ getters }, userInput) {
			try {
				const addUserFunction = await getters.functions.httpsCallable(
					"addUser"
				);

				const newUser = await addUserFunction(userInput);

				return newUser;
			} catch (err) {
				return err;
			}
		},
	},
};
