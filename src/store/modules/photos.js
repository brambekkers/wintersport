import { nanoid } from "nanoid";

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
            const id = nanoid();

            try {
                const storageRef = await getters.storage.ref().child(`photos/${id}`);
                const uploadedPhoto = await storageRef.put(photo);

                await getters.db.doc(`photos/${id}`).set({
                    user: user.uid,
                    id,
                    path: uploadedPhoto.ref.fullPath,
                    url: await storageRef.getDownloadURL(),
                    uploadeDate: Date.now()
                });
                return true;
            } catch (error) {
                return error;
            }
        },
        async deletePhoto({ getters, commit }, photo) {
            try {
                commit("photoDetail", "");
                await getters.storage
                    .ref()
                    .child(photo.path)
                    .delete();
                await getters.db.doc(photo.path).delete();
            } catch (error) {
                return error;
            }
        },
        async setPhotoFavorite({ getters }, { photo, favorites }) {
            await getters.db.doc(photo.path).update(favorites);
        }
    }
};
