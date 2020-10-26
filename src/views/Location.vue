<template>
	<div>
		<div id="map"></div>
		<v-card id="detail" elevation="4" v-if="detail">
			<v-card-title class="text-h6">
				<v-chip
					small
					class="ma-2"
					:color="detail.properties.color"
					text-color="white"
					v-if="detail.properties.ref"
					>{{ detail.properties.ref }}</v-chip
				>
				{{
					detail.properties.name
						? detail.properties.name
						: `${detail.properties.difficulty} downhill ski run`
				}}
			</v-card-title>
			<v-card-subtitle>
				<div v-if="detail.properties.name">
					{{ `${detail.properties.difficulty} downhill ski run` }}
				</div>
				<div>Average Slope: {{ detail.properties.distance }}</div>
				<div>Distance: {{ detail.properties.distance }}</div>
			</v-card-subtitle>
		</v-card>
		<Avatar ref="avatar" :size="30" :profile="profile" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import Avatar from "@/components/Avatar.vue";
	import mapbox from "@/config/mapbox-config.js";
	import openskimap from "@/config/openskimap.js";

	export default {
		name: "Location",
		components: { Avatar },
		data() {
			return {
				myMap: null,
				home: null,
				detail: null,
			};
		},
		watch: {
			location: {
				handler: "addPersonIconToMap",
			},
			allCams: {
				handler: "addWebcamsToMap",
			},
		},
		computed: {
			...mapGetters(["profile", "allCams", "location", "skibus"]),
		},
		methods: {
			...mapActions(["getLocation", "fetchOpenskimap"]),
			initMap() {
				window.mapboxgl.accessToken = mapbox.token;

				this.myMap = new window.mapboxgl.Map({
					container: "map",
					style: "mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g", // the outdoors-v10 style but without Hillshade layers
					center: [12.617214, 47.387759], // starting position [lng, lat]
					zoom: 15, // starting zoom

					// maxBounds: [
					// 	[12.520067, 47.337654], // Southwest coordinates
					// 	[12.802201, 47.463263],
					// ],
				});
			},
			addSource() {
				return new Promise((resolve) => {
					this.myMap.on("load", () => {
						// Terrain map
						this.myMap.addSource("dem", {
							type: "raster-dem",
							url: "mapbox://mapbox.terrain-rgb",
						});

						this.myMap.addSource("skiMap", openskimap);
						resolve();
					});
				});
			},
			addLayers() {
				// Terrain map
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

				// SkiMap - lines
				this.myMap.addLayer({
					id: "runs-lines",
					type: "line",
					source: "skiMap",
					"source-layer": "runs",
					layout: {
						"line-cap": "round",
						"line-join": "round",
					},
					paint: {
						"line-width": 2,
						"line-color": ["get", "color"],
					},
				});
				// SkiMap - lines
				this.myMap.addLayer({
					id: "lifts-lines",
					type: "line",
					source: "skiMap",
					"source-layer": "lifts",
					paint: {
						"line-width": 3,
						"line-color": "gray",
					},
				});

				// Actions
				const maps = ["lifts-lines", "runs-lines"];

				maps.forEach((map) => {
					console.log(map);
					this.myMap.on("mousemove", map, (e) => {
						this.myMap.getCanvas().style.cursor = "pointer";
					});
					this.myMap.on("mouseleave", map, () => {
						this.myMap.getCanvas().style.cursor = "";
					});

					this.myMap.on("click", map, this.setDetail);
				});
			},
			async setDetail(e) {
				const feature = e.features[0];
				const coordinates = feature.geometry.coordinates[0].slice();
				const id = feature.properties.id;

				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}
				this.detail = await this.fetchOpenskimap(id);
				console.log(this.detail);
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
			addSkibusToMap() {
				for (const busstop of this.skibus) {
					if (busstop.pos && busstop.pos.lng && busstop.pos.lat) {
						const el = document.createElement("div");
						el.className = "skibus_location_icon";

						var popup = new window.mapboxgl.Popup({
							offset: 25,
						}).setText(`${busstop.number} - ${busstop.name}`);

						new window.mapboxgl.Marker(el)
							.setLngLat([busstop.pos.lng, busstop.pos.lat])
							.setPopup(popup) // sets a popup on this marker
							.addTo(this.myMap);
					}
				}
			},
		},
		async mounted() {
			this.initMap();
			await this.addSource();
			this.addLayers();
			this.getLocation();
			this.addHomeIcon();
			this.addWebcamsToMap();
			this.addSkibusToMap();
			this.addPersonIconToMap();
		},
	};
</script>

<style lang="scss">
	#map {
		width: 100vw;
		height: calc(100vh - 56px);
	}

	#detail {
		position: absolute;
		z-index: 50;
		top: 1rem;
		left: 1rem;
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

		width: 25px;
		height: 25px;
	}

	.skibus_location_icon {
		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
		background-image: url("../assets/happySkiFriends/skibus.png");

		width: 25px;
		height: 30px;
	}

	.mapboxgl-ctrl {
		display: none !important;
	}
</style>
