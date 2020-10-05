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
            getters.db.collection("photos").onSnapshot((photoCollection) => {
                const photos = photoCollection.docs.map((photo) => photo.data());
                commit("photos", photos);
            });
        },
        async updatePhoto({ getters }, photo) {
            const user = getters.auth.currentUser;
            const date = Date.now();
            try {
                const storageRef = await getters.storage.ref().child(`photos/${date}-${photo.name}`);
                const uploadedPhoto = await storageRef.put(photo);

                await getters.db.doc(`photos/${uploadedPhoto.ref.name}`).set({
                    user: user.uid,
                    path: uploadedPhoto.ref.fullPath,
                    url: await storageRef.getDownloadURL(),
                    uploadeDate: date
                });
                return true;
            } catch (error) {
                return error;
            }
        }
    }
};
