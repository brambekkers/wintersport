export default {
    state: {
        photos: [],
        photoDetail: ""
    },

    getters: {
        photos(state) {
            return state.photos;
        },
        photoDetail(state) {
            return state.photoDetail;
        }
    },

    mutations: {
        photos(state, val) {
            state.photos = val;
        },
        photoDetail(state, val) {
            state.photoDetail = val;
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
