<template>
	<v-container
		id="container"
		:style="`padding: ${photoDetail ? '0' : ''}`"
		:fluid="!!photoDetail"
	>
		<v-row dense v-if="!photoDetail">
			<Photo v-for="(photo, i) of photos" :key="i" :url="photo.url" />
		</v-row>

		<input
			type="file"
			ref="fileInput"
			name="files"
			accept="image/*"
			multiple
			@change="addPhotos"
			v-show="false"
		/>

		<v-fab-transition>
			<v-btn
				id="addButton"
				color="primary"
				dark
				absolute
				fab
				@click="$refs.fileInput.click()"
				v-if="!photoDetail"
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>

		<PhotoDetail v-if="!!photoDetail" />
	</v-container>
</template>

<script>
	import Photo from "@/components/Photo.vue";
	import PhotoDetail from "@/components/PhotoDetail.vue";

	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Photos",
		components: { Photo, PhotoDetail },
		data() {
			return {
				overlay: false,
			};
		},
		computed: {
			...mapGetters(["photos", "photoDetail"]),
		},
		methods: {
			...mapActions(["updatePhoto"]),
			async addPhotos(input) {
				this.overlay = true;
				const files = input.target.files || input.dataTransfer.files;
				if (files.length) {
					for (const photo of files) {
						try {
							await this.updatePhoto(photo);
						} catch (error) {
							console.log(error);
						} finally {
							this.overlay = false;
						}
					}
				}
			},
		},
		mounted() {
			if (!this.webcams) {
				if (this.firebase) {
					this.$store.dispatch("photosWatcher");
				} else {
					setTimeout(() => {
						this.$store.dispatch("photosWatcher");
					}, 1000);
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	#container {
		height: calc(100vh - 56px);
		overflow: auto;
		position: relative;

		#addButton {
			right: 1rem;
			bottom: 1rem;
		}
	}
</style>
