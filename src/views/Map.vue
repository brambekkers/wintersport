<template>
	<div>
		<!-- <v-img
			width="100vw"
			src="@/assets/skimap.jpg"
		></v-img> -->
		<object
			data="https://openskimap.org/#13.63/47.38636/12.61644"
			id="map"
			type="text/html"
		>

			Error: Embedded data could not be displayed.
		</object>

	</div>
</template>

<script>
export default {
	name: "Map",
	methods: {
		removeFromIframe() {
			var iframe = document.getElementById("map");
			var ccWindow = iframe.contentWindow.document.getElementsByClassName(
				"cc-window"
			)[0];
			ccWindow.style.display = "none";
		},
	},
	mounted() {
		setTimeout(() => {
			this.removeFromIframe();
		}, 2000);
		// window.mapboxgl.accessToken =
		// 	"pk.eyJ1IjoiYnJhbWJvbWIiLCJhIjoiY2tmb2QybTBiMDM1bTJ0b2Fuc3IwcXk4cCJ9.3Y8h5jl_NZhbNwWLVkqAXQ";
		// new window.mapboxgl.Map({
		// 	container: "map",
		// 	style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
		// 	center: [12.615781, 47.388256], // starting position [lng, lat]
		// 	zoom: 15, // starting zoom
		// });
	},
};
</script>

<style lang="scss" scoped>
	#map {
		width: 100vw;
		height: calc(100vh + 40px);
	}
</style>
