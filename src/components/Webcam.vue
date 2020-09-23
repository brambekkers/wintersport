<template>
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
			{{webcam.height}}

		</v-chip>
		<div class="bottomBar">
			<h2>{{webcam.name}}</h2>
		</div>

	</div>
</template>

<script>
export default {
	props: ["webcam"],
	methods: {
		fullscreen() {
			console.log("test");
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

			h2 {
				font-weight: 200;
			}
		}
	}
</style>