<template>
	<div>
		<div id="myMap"></div>
		<Avatar ref="avatar" :size="30" :profile="profile" />
		<div ref="webcam" class="webcam" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import Avatar from "@/components/Avatar.vue";

	export default {
		name: "Location",
		components: { Avatar },
		data() {
			return {
				myMap: null,
				home: null,
			};
		},
		watch: {
			location: {
				handler: "addPersonIconToMap",
				immediate: true,
			},
			allCams: {
				handler: "addWebcamsToMap",
			},
		},
		computed: {
			...mapGetters(["profile", "allCams", "location"]),
		},
		methods: {
			...mapActions(["getLocation"]),
			initMap() {
				window.mapboxgl.accessToken =
					"pk.eyJ1IjoiYnJhbWJvbWIiLCJhIjoiY2tmb2QybTBiMDM1bTJ0b2Fuc3IwcXk4cCJ9.3Y8h5jl_NZhbNwWLVkqAXQ";
				this.myMap = new window.mapboxgl.Map({
					container: "myMap",
					style: "mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g", // the outdoors-v10 style but without Hillshade layers
					center: [12.617214, 47.387759], // starting position [lng, lat]
					zoom: 15, // starting zoom
					attributionControl: false,
				});
			},
			addMapSource() {
				return new Promise((resolve) => {
					this.myMap.on("load", () => {
						// Terrain map
						this.myMap.addSource("dem", {
							type: "raster-dem",
							url: "mapbox://mapbox.terrain-rgb",
						});
						this.myMap.addLayer(
							{
								id: "hillshading",
								source: "dem",
								type: "hillshade",
								// insert below waterway-river-canal-shadow;
								// where hillshading sits in the Mapbox Outdoors style
							},
							"waterway-river-canal-shadow"
						);
						// ski map
						this.myMap.addSource("piste-tiles", {
							type: "raster",
							tiles: [
								"https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png",
							],
							tileSize: 256,
						});
						this.myMap.addLayer({
							id: "snow-tiles",
							type: "raster",
							source: "piste-tiles",
							minzoom: 10,
							maxzoom: 17,
							layout: {
								visibility: "visible",
							},
						});
						resolve();
					});
				});
			},
			addNavigationControl() {
				const nav = new window.mapboxgl.NavigationControl();
				this.myMap.addControl(nav, "top-right");
			},
			addHomeIcon() {
				new window.mapboxgl.Marker()
					.setLngLat([12.617214, 47.387759])
					.addTo(this.myMap);
			},
			addPersonIconToMap() {
				if (this.location) {
					var el = this.$refs.avatar.$el;
					new window.mapboxgl.Marker(el)
						.setLngLat([
							this.location.coords.longitude,
							this.location.coords.latitude,
						])
						.addTo(this.myMap);
				}
			},
			addWebcamsToMap() {
				for (const cam of this.allCams) {
					if (cam.location && cam.location.lng && cam.location.lat) {
						const el = document.createElement("div");
						el.className = "webcam_location_icon";

						el.addEventListener("click", () => {
							this.$router.push("/webcams");
						});

						var popup = new window.mapboxgl.Popup({
							offset: 25,
						}).setText(cam.name);

						new window.mapboxgl.Marker(el)
							.setLngLat([cam.location.lng, cam.location.lat])
							.setPopup(popup) // sets a popup on this marker
							.addTo(this.myMap);
					}
				}
			},
		},
		async mounted() {
			this.initMap();
			await this.addMapSource();
			this.getLocation();
			this.addHomeIcon();
			this.addWebcamsToMap();
		},
	};
</script>

<style lang="scss">
	#myMap {
		width: 100vw;
		height: calc(100vh - 56px);
	}
	.floatingButton {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 200;
	}
	.webcam_location_icon {
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-image: url("../assets/happySkiFriends/camera.png");

		width: 40px;
		height: 40px;
	}

	.mapboxgl-ctrl {
		display: none !important;
	}
</style>
