export default {
	state: {
		user: null,
	},
	getters: {
		user(state) {
			return state.user;
		},
	},
	mutations: {
		user(state, val) {
			state.user = val;
		},
	},
	actions: {
		userWatcher({ getters, commit }) {
			getters.auth.onAuthStateChanged((user) => {
				if (user) {
					console.log("User signed in");
					commit("user", user ? user : null);
				} else {
					console.log("Not signed in");
					commit("user", null);
				}
			});
		},
		async signIn({ getters }, { email, password }) {
			await getters.auth
				.signInWithEmailAndPassword(email, password)
				.catch((error) => {
					throw error;
				});
			return true;
		},
		async singOut({ getters }) {
			await getters.auth
				.signOut()
				.then(() => {
					return true;
				})
				.catch(function(error) {
					throw error;
				});
		},
		async addUserAsAdmin({ getters }, userInput) {
			try {
				const addUserFunction = await getters.functions.httpsCallable(
					"addUser"
				);
				const newUser = addUserFunction(userInput);
				return newUser;
			} catch (err) {
				return err;
			}
		},
	},
};
