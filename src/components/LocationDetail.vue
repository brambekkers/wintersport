<template>
	<v-row id="detail">
		<v-col
			cols="12"
			sm="8"
			md="6"
			lg="4"
			xl="3"
		>
			<v-card
				elevation="4"
				v-if="locationDetail"
			>
				<v-icon
					id="closeButton"
					color="gray darken-4"
					@click="$store.commit('locationDetail', null)"
				>
					close
				</v-icon>
				<v-card-title class="text-h6">
					<v-chip
						small
						class="ma-2"
						:color="p.color"
						text-color="white"
						v-if="p.ref"
					>{{ p.ref }}</v-chip>
					{{ p.name ? p.name : `${p.difficulty} downhill ski run` }}
				</v-card-title>
				<v-card-subtitle>
					<div v-if="p.name && !p.liftType">
						{{ `${p.difficulty} downhill ski run` }}
					</div>
					<div v-if="p.liftType">
						{{ p.liftType }}
					</div>
					<div>Average Slope: {{ averageSlope }}%</div>
					<div>Distance: {{ distance }} meter</div>
				</v-card-subtitle>
				<v-divider v-if="heights"></v-divider>

				<v-sparkline
					:line-width="2"
					:padding="10"
					:smooth="true"
					:value="heights"
					auto-draw
					v-if="heights"
				></v-sparkline>

			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from "vuex";
import * as turf from "@turf/turf";
console.log(turf);

export default {
	computed: {
		...mapGetters(["locationDetail"]),
		p() {
			return this.locationDetail.properties;
		},
		c() {
			return this.locationDetail.geometry.coordinates;
		},
		resolution() {
			if (this.p.elevationProfile) {
				return this.p.elevationProfile.resolution;
			}
			const c = this.c;
			const from = turf.point([c[0][1], c[0][0]]);
			const to = turf.point([c[c.length - 1][1], c[c.length - 1][0]]);
			const options = { units: "kilometers" };

			return (turf.distance(from, to, options) * 1000) / c.length;
		},
		heights() {
			if (this.p.elevationProfile) {
				return this.p.elevationProfile.heights;
			}
			if (this.c.length) {
				return this.c.map((c) => c[2]);
			}
			return false;
		},
		slopes() {
			if (this.heights) {
				return this.heights.map((c, i, arr) => {
					if (arr[i + 1]) {
						const n = arr[i + 1];
						const h = c - n;
						return Number(((h / this.resolution) * 100).toFixed(2));
					}
					return 0;
				});
			}
		},
		averageSlope() {
			if (this.slopes) {
				return (
					this.slopes.reduce((p, c) => p + c, 0) / this.slopes.length
				).toFixed(2);
			}
			return 0;
		},
		distance() {
			if (this.heights) {
				return Math.round(this.heights.length * this.resolution);
			}
			return 0;
		},
	},
};
</script>

<style lang="scss" scoped>
	#detail {
		position: absolute;
		z-index: 50;
		top: 1rem;
		left: 1rem;
		right: 1rem;

		#closeButton {
			position: absolute;
			top: 0.5rem;
			right: 0.5rem;
		}
	}
</style>