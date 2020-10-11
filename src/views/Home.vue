<template>
	<v-container>
		<v-row align="stretch" justify="space-between" dense>
			<Info />
			<Countdown />
		</v-row>
		<v-row align="stretch" dense>
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
