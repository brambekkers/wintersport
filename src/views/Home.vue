<template>
	<v-container>
		<v-row class="justify-center" align="stretch" dense>
			<!-- <v-col cols="8" md="4" xl="2" class="pt-0 mt-n4">
				<v-img
					contain
					src="@/assets/happySkiFriends/skilift.png"
				></v-img>
			</v-col> -->
			<Countdown />
		</v-row>
		<v-row align="stretch" dense>
			<v-col cols="6">
				<v-card color="#ECECEC" elevation="4" height="100%">
					<v-img
						contain
						src="@/assets/happySkiFriends/skilift.png"
					></v-img>
				</v-card>
			</v-col>
			<Weather />
			<Webcam />
		</v-row>
	</v-container>
</template>

<script>
	import Countdown from "@/components/Countdown.vue";
	import Weather from "@/components/Weather-card.vue";
	import Webcam from "@/components/Webcam-card.vue";
	export default {
		name: "Home",
		components: { Countdown, Weather, Webcam },
	};
</script>
