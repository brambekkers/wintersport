<template>
<v-col cols="6" sm="3" lg="3" xl="2" v-if="weatherForecast">
	<v-card class="h-100">
		<v-card-title class="text-h6">Weather</v-card-title>
		<v-card-subtitle class="pb-2">
			{{weatherForecast.forecast[0]["upper"].wx_desc}}
		</v-card-subtitle>
		<v-card-text class="d-flex justify-center">
		<v-avatar class="avatar" size="80px">
			<v-img :src="getImgUrl" contain height="100px" class="mx-4 py-2" />
		</v-avatar>
			<v-chip
				color="secondary"
				class="py-2 white--text"
				overlap
				borderd
			>
				<strong class="font-weight-bold">
					{{weatherForecast.forecast[0]["upper"].temp_avg_c}} 
					</strong
				><span>°C</span>
			</v-chip>
		</v-card-text>
	</v-card>
</v-col>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";

	export default {
		computed: {
			...mapGetters(["weatherForecast"]),
			getImgUrl() {
				const images = require.context(
					"../assets/weather/",
					false,
					/\.svg$/
				);
				let cloud = "cloudy";

				if (this.weatherForecast && this.weatherForecast.forecast) {
					const img = this.weatherForecast.forecast[0]["upper"].wx_icon;
					if (img === "Blizzard.gif") cloud = `snow`;
					if (img === "HeavySnow.gif") cloud = `snow`;
					if (img === "HeavySnowSwrsDay.gif") cloud = `snow`;
					if (img === "IsoSnowSwrsDay.gif") cloud = `snow`;
					if (img === "ModSnow.gif") cloud = `snow`;
					if (img === "OccLightSnow.gif") cloud = `snow`;

					if (img === "HeavySnowSwrsNight.gif") cloud = `moonSnow`;
					if (img === "IsoSnowSwrsNight.gif") cloud = `moonSnow`;
					if (img === "ModSnowSwrsNight.gif") cloud = `moonSnow`;

					if (img === "PartlyCloudyNight.gif") cloud = `moon`;
					if (img === "Clear.gif") cloud = `moon`;

					if (img === "Sunny.gif") cloud = `sun`;

					if (img === "IsoRainSwrsNight.gif") cloud = `rain`;
					if (img === "IsoSleetSwrsDay.gif") cloud = `rain`;
					if (img === "IsoSleetSwrsNight.gif") cloud = `rain`;
					if (img === "ModRain.gif") cloud = `rain`;
					if (img === "ModSleet.gif") cloud = `rain`;
					if (img === "ModSleetSwrsDay.gif") cloud = `rain`;
					if (img === "OccLightRain.gif") cloud = `rain`;
					if (img === "OccLightSleet.gif") cloud = `rain`;

					if (img === "FreezingDrizzle.gif") cloud = `hail`;
					if (img === "FreezingRain.gif") cloud = `hail`;

					if (img === "CloudRainThunder.gif") cloud = `thunder`;
					if (img === "CloudSleetSnowThunder.gif") cloud = `thunder`;
					if (img === "PartCloudRainThunderDay.gif") cloud = `thunder`;
					if (img === "PartCloudRainThunderNight.gif") cloud = `thunder`;
					if (img === "PartCloudSleetSnowThunderDay.gif")
						cloud = `thunder`;
					if (img === "PartCloudSleetSnowThunderNight.gif")
						cloud = `thunder`;

					if (img === "Cloudy.gif") cloud = `cloudy`;
					if (img === "Overcast.gif") cloud = `cloudy`;

					if (img === "Fog.gif") cloud = `fog`;
					if (img === "FreezingFog.gif") cloud = `fog`;
					if (img === "mist.gif") cloud = `fog`;

					if (img === "HeavyRain.gif") cloud = `heavyRain`;
					if (img === "HeavyRainSwrsDay.gif") cloud = `heavyRain`;
					if (img === "HeavyRainSwrsNight.gif") cloud = `heavyRain`;
					if (img === "HeavySleet.gif") cloud = `thickCloudsRain`;
					if (img === "HeavySleetSwrsDay.gif") cloud = `thickCloudsRain`;
					if (img === "HeavHeavySleetSwrsNightySnow.gif")
						cloud = `thickCloudsRain`;

					if (img === "IsoRainSwrsDay.gif") cloud = `sunRain`;
					if (img === "ModRainSwrsDay.gif") cloud = `sunRain`;
					if (img === "ModSnowSwrsDay.gif") cloud = `sunRain`;

					if (img === "PartlyCloudyDay.gif") cloud = `cloudSun`;
				}

				return images("./" + cloud + ".svg");
			},
		},
		methods: {
			...mapActions(["refreshSnowReport", "refreshWeatherForecast"]),
		},
		mounted() {
			this.refreshSnowReport();
			this.refreshWeatherForecast();
		},
	};
</script>

<style lang="scss" scoped>
.avatar{
	border: solid 3px #747374 ;
}
</style>