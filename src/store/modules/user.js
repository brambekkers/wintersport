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
		userWatcher({ getters, commit, dispatch }) {
			getters.auth.onAuthStateChanged(async (user) => {
				if (user) {
					// Set user data
					commit("user", user ? user : null);

					// Check if user is admin from server
					const idTokenResult = await getters.auth.currentUser.getIdTokenResult(true);
					// If admin
					if (idTokenResult.claims.role === "admin") {
						commit('isAdmin', true)
						dispatch('usersWatcher')
					}
				} else {
					console.log("Not signed in");
					commit("user", null);
					commit('isAdmin', false);

				}
			});
		},
		async signIn({ getters }, { email, password }) {
			try {
				await getters.auth.signInWithEmailAndPassword(email, password)
				return true;
			} catch (err) {
				console.log(err)
				throw err
			}
		},
		async singOut({ getters }) {
			await getters.auth
				.signOut()
				.then(() => {
					return true;
				})
				.catch((error) => {
					throw error;
				});
		},
		async addUserAsAdmin({ getters }, userInput) {
			try {
				const addUserFunction = await getters.functions.httpsCallable(
					"addUser"
				);
				const newUser = await addUserFunction(userInput);
				console.log(newUser)
				return newUser;
			} catch (err) {
				return err;
			}
		},
	},
};
