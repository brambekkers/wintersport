<template>
	<div id="background">
		<!-- Sky -->
		<transition name="fade">
			<div id="sky_day" class="sky" v-if="!darkMode" key="day" />
			<div id="sky_night" class="sky" v-if="darkMode" key="night" />
		</transition>

		<!-- Mountain -->
		<img
			id="mountain"
			:class="darkMode ? 'darkness' : ''"
			src="@/assets/happySkiFriends/mountain.svg"
		/>

		<!-- Clouds -->
		<transition
			name="bounce"
			enter-active-class="bounceIn"
			leave-active-class="fadeOut"
			mode="out-in"
		>
			<div id="clouds_day" class="clouds" v-if="!darkMode" key="day" />
			<div id="clouds_night" class="clouds" v-if="darkMode" key="night" />
		</transition>
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
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;

	z-index: 1;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	.sky {
		position: absolute;
		bottom: 0;
		right: 0;
		top: 0;
		left: 0;
		z-index: 1;
		animation-duration: 2s;
	}

	#sky_day {
		background: linear-gradient(#bbdaec, #dbeef8);
	}
	#sky_night {
		background: linear-gradient(#13194d, #2a3f6e);
	}

	.clouds {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -10vw;
		left: -10vw;
		z-index: 1;

		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
	}

	#clouds_day {
		background-image: url("../assets/happySkiFriends/clouds_day.svg");
	}
	#clouds_night {
		background-image: url("../assets/happySkiFriends/clouds_night.svg");
	}
	#mountain {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		max-width: calc(30vw + 1000px);
		width: 130vw;
		min-width: 600px;
		transition: all 1s;
	}

	.darkness {
		filter: brightness(50%);
	}
}
</style>
