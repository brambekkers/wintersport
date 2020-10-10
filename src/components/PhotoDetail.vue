<template>
    <div id="photoDetail">
        <PinchZoom :url="photoDetail" />

        <v-card dark id="actionBar">
            <v-row justify="space-around">
                <v-btn icon @click="toggleFavorite">
                    <v-icon v-if="isFavorited" color="red"> favorite </v-icon>
                    <v-icon v-if="!isFavorited"> favorite_border </v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon> edit </v-icon>
                </v-btn>
                <v-btn icon @click="share">
                    <v-icon> share </v-icon>
                </v-btn>
                <v-btn icon :disabled="photo.user != user.uid" @click="deleteDialog = true">
                    <v-icon> delete </v-icon>
                </v-btn>
            </v-row>

            <v-row justify="center" absolute>
                <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">
                            Do you really?
                        </v-card-title>
                        <v-card-text>Do you wanna remove this image frome the app?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="deleteDialog = false">
                                Nope
                            </v-btn>
                            <v-btn color="red " text @click="removeImage">
                                Delete
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import PinchZoom from "@/components/PinchZoom.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PhotoDetail",
    data() {
        return {
            deleteDialog: false
        };
    },
    components: { PinchZoom },
    computed: {
        ...mapGetters(["photos", "photoDetail", "user"]),
        photo() {
            return this.photos.filter((p) => p.url === this.photoDetail)[0];
        },
        isFavorited() {
            if (this.photo && this.photo.favorites) {
                return this.photo.favorites.includes(this.user.uid);
            }
            return false;
        }
    },
    methods: {
        ...mapActions(["deletePhoto", "setPhotoFavorite"]),
        async share() {
            try {
                if (navigator.share) {
                    await navigator.share({ title: "Example Page", url: "" });
                }
            } catch (err) {
                console.error("Share failed:", err.message);
            }
        },
        removeImage() {
            this.deleteDialog = false;
            this.deletePhoto(this.photo);
        },
        toggleFavorite() {
            if (this.isFavorited) {
                const favorites = [...this.photo.favorites];
                this.setPhotoFavorite({
                    photo: this.photo,
                    favorites: {
                        favorites: favorites.filter((f) => f != this.user.uid)
                    }
                });
            } else {
                const favorites = this.photo.favorites ? [...this.photo.favorites] : [];
                favorites.push(this.user.uid);
                this.setPhotoFavorite({
                    photo: this.photo,
                    favorites: {
                        favorites
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#photoDetail {
    position: relative;

    #actionBar {
        position: absolute;
        padding: 0.8rem;
        z-index: 100;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 0px;
        background: rgba(0, 0, 0, 0.5);

        padding: 0.7rem;
    }
}
</style>
