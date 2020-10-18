<template>
	<v-col
		cols="6"
		lg="3"
		v-show="!videoVisible || videoVisible === webcam.name"
	>
		<v-hover>
			<template v-slot:default="{ hover }">
				<v-card
					id="webcam"
					@click="fullscreen"
					elevation="4"
				>
					<v-img
						:src="webcam.poster"
						:aspect-ratio="1 / 1"
					/>
					<v-chip
						color="primary"
						class="height ma-2"
						small
						overlap
					>
						<v-icon class="mr-2">landscape</v-icon>
						{{ webcam.height }}
					</v-chip>
					<v-card-title class="title pt-1 pb-0 px-2">
						{{ webcam.name }}
					</v-card-title>

					<v-card-subtitle class="time pb-1 pt-0 px-2">
						<v-icon
							small
							class="mr-2"
						>schedule</v-icon>
						{{ webcam.time }}
					</v-card-subtitle>

					<!-- 
					<div class="bottomBar">
						<h2>{{ webcam.name }}</h2>

						<p class="time white--text">
							{{ webcam.time }}
						</p>
					</div> -->
					<v-fade-transition>
						<v-overlay
							v-if="hover"
							absolute
							color="#036358"
						>
							<v-btn @click="fullscreen">Watch webcam</v-btn>
						</v-overlay>
					</v-fade-transition>
				</v-card>
			</template>
		</v-hover>

		<div
			id="player"
			v-show="videoVisible"
		>
			<video
				width="100%"
				:poster="webcam.poster"
				:ref="webcam.name"
				loop
				controls="false"
			>
				<source
					:src="webcam.videoUrl"
					type="video/mp4"
				/>
			</video>
		</div>
	</v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			hover: false,
		};
	},
	watch: {
		videoVisible(newValue) {
			if (newValue != this.webcam.name) {
				const elem = this.$refs[this.webcam.name];
				elem.pause();
			}
		},
	},
	computed: {
		...mapGetters(["videoVisible"]),
	},
	props: ["webcam"],
	methods: {
		fullscreen() {
			const elem = this.$refs[this.webcam.name];
			this.$store.commit("videoVisible", this.webcam.name);

			elem.muted = true;
			elem.play();
		},
	},
};
</script>

<style scoped lang="scss">
	#webcam {
		position: relative;

		.height {
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
		}

		.title {
			font-size: 1rem !important;
			// font-weight: 200;
		}

		.time {
			font-size: 0.8rem !important;
			margin: 0;
			font-weight: 400;
		}
	}

	#player {
		position: absolute;
		top: calc(-48px);
		left: 0;
		width: 100%;
		height: calc(100vh - 56px);
		background: #000;
		z-index: 9999;

		display: flex;
		justify-content: center;
		align-items: center;

		video::-webkit-media-controls {
			display: none;
		}
	}
</style>
