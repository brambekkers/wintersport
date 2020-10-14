<template>
	<v-container>
		<v-row dense>
			<Info />
		</v-row>
		<v-row align="stretch" dense>
			<Countdown />
			<Weather />
			<Webcam />
		</v-row>
	</v-container>
</template>

<script>
	import Countdown from "@/components/Countdown-card.vue";
	import Weather from "@/components/Weather-card.vue";
	import Webcam from "@/components/Webcam-card.vue";
	import Info from "@/components/Info-card.vue";
	export default {
		name: "Home",
		components: { Countdown, Weather, Webcam, Info },
	};
</script>

<style lang="scss" scoped>
</style>
