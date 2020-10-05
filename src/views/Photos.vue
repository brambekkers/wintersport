<template>
	<v-container id="container" :style="`padding: ${detail ? '0' : ''}`">
		<v-row dense v-if="!detail">
			<v-col cols="4" md="3" xl="2" v-for="(photo, i) of photos" :key="i">
				<v-card
					><v-img
						:aspect-ratio="16 / 9"
						lazy-src="https://picsum.photos/id/11/10/6"
						:src="photo.url"
						@click="detail = photo.url"
					></v-img
				></v-card>
			</v-col>
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
				v-if="!detail"
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<v-btn
				id="addButton"
				color="secondary"
				dark
				absolute
				fab
				@click="detail = ''"
				v-if="detail"
			>
				<v-icon>navigate_before</v-icon>
			</v-btn>
		</v-fab-transition>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
		<PinchZoom :url="detail" v-if="detail" />
	</v-container>
</template>

<script>
	import PinchZoom from "@/components/PinchZoom.vue";

	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Photos",
		components: { PinchZoom },
		data() {
			return {
				detail: "",
				overlay: false,
			};
		},
		computed: {
			...mapGetters(["photos"]),
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
