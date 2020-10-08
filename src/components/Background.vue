<template>
	<div id="background" :class="darkMode ? 'night' : ' day'">
		<img
			id="mountain"
			:class="darkMode ? 'darkness' : ''"
			src="@/assets/happySkiFriends/mountain.svg"
		/>
		<div id="clouds_day" v-if="!darkMode" />
		<div id="clouds_night" v-if="darkMode" />
	</div>
</template>

<script>
	export default {
		computed: {
			profile() {
				return this.$store.getters.profile;
			},
			darkMode() {
				return this.profile && this.profile.darkMode ? true : false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	#background {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;

		z-index: 1;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;

		#clouds_day {
			position: absolute;
			bottom: 0;
			right: 0;
			top: 0;
			left: 0;
			z-index: 1;
			width: 130vw;
			background-image: url("../assets/happySkiFriends/clouds_day.svg");
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}
		#clouds_night {
			position: absolute;
			bottom: 0;
			right: 0;
			top: 0;
			left: 0;
			z-index: 1;
			width: 130vw;
			background-image: url("../assets/happySkiFriends/clouds_night.svg");
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}
		#mountain {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 2;
			max-width: calc(30vw + 1000px);
			width: 130vw;
			min-width: 600px;
		}

		.darkness {
			filter: brightness(50%);
		}
	}

	.day {
		background-image: linear-gradient(#bbdaec, #dbeef8);
	}

	.night {
		background-image: linear-gradient(#13194d, #2a3f6e);
	}
</style>
