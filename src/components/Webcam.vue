<template>
	<v-hover>
		<template v-slot:default="{ hover }">
			<div id="video">
				<video
					width="100%"
					:poster="webcam.poster"
					@click="fullscreen"
					:ref="webcam.name"
				>
					<source
						:src="webcam.videoUrl"
						type="video/mp4"
					/>
				</video>
				<v-chip
					color="primary"
					class="height ma-2"
					overlap
				>
					<v-icon class="mr-2">landscape</v-icon>
					{{ webcam.height }}
				</v-chip>
				<div class="bottomBar">
					<h2>{{ webcam.name }}</h2>

					<p class="time white--text">
						{{ webcam.time }}
					</p>
				</div>
				<v-fade-transition>
					<v-overlay
						v-if="hover"
						absolute
						color="#036358"
					>
						<v-btn @click="fullscreen">Watch webcam</v-btn>
					</v-overlay>
				</v-fade-transition>
			</div>

		</template>
	</v-hover>
</template>

<script>
export default {
	data() {
		return {
			hover: false,
		};
	},
	props: ["webcam"],
	methods: {
		fullscreen() {
			const elem = this.$refs[this.webcam.name];
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				/* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE/Edge */
				elem.msRequestFullscreen();
			}
			elem.muted = true;
			elem.play();
		},
	},
};
</script>

<style scoped lang="scss">
	#video {
		position: relative;

		.height {
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
		}

		.bottomBar {
			position: absolute;
			z-index: 10;
			color: white;
			background: rgba(255, 255, 255, 0.2);
			width: 100%;
			height: 20%;
			padding: 1rem;
			bottom: 2%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			h2 {
				font-weight: 200;
			}

			.time {
				font-size: 1rem;
				margin: 0;
				font-weight: 400;
			}
		}
	}
</style>
