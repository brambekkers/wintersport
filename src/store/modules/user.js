export default {
    state: {
        user: null,
        profile: null,
    },

    getters: {
        user(state) {
            return state.user;
        },
        profile(state) {
            return state.profile;
        }
    },

    mutations: {
        user(state, val) {
            state.user = val;
        },
        profile(state, val) {
            state.profile = val;
        }
    },

    actions: {
        userWatcher({ getters: { auth, db }, commit }) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // Set user
                    commit("user", user);

                    // Set profile
                    const profile = (await db.doc(`users/${user.uid}`).get()).data();
                    commit("profile", profile);

                    // set darkMode
                    this.$app.$vuetify.theme.dark = profile.darkMode;

                    // Set isAdmin
                    const token = await auth.currentUser.getIdTokenResult(true);
                    if (token.claims.role === "admin") {
                        commit("isAdmin", true);
                    }
                } else {
                    console.log("Not signed in");
                    commit("user", null);
                    commit("profile", null);
                    commit("isAdmin", false);
                }
            });
        },

        async signIn({ getters }, { email, password }) {
            try {
                await getters.auth.signInWithEmailAndPassword(email, password);
                return true;
            } catch (err) {
                console.log(err);
                throw err;
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

        async updateAvatar({ getters: { storage, user }, dispatch }, avatar) {
            const storageRef = await storage.ref().child(`avatars/${user.uid}`);

            await storageRef.put(avatar);

            await dispatch("updateProfile", {
                avatar: await storageRef.getDownloadURL()
            });
        },

        async updateDarkMode({ dispatch }, bool) {
            this.$app.$vuetify.theme.dark = bool;

            await dispatch("updateProfile", {
                darkMode: bool
            });
        },

        async removeAvatar({ getters: { storage, user }, dispatch }) {
            const storageRef = await storage.ref().child(`avatars/${user.uid}`);

            await storageRef.delete();

            await dispatch("updateProfile", {
                avatar: null
            });
        },

        async updateProfile({ getters: { user, db }, commit }, input) {
            await db.doc(`users/${user.uid}`).update(input);

            const profile = (await db.doc(`users/${user.uid}`).get()).data();
            commit("profile", profile);
        }
    }
};
