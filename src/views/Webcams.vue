<template>
	<div id="webcams">
		<v-tabs show-arrows v-model="tab">
			<v-tab>All</v-tab>
			<v-tab v-for="(area, key) in webcams" :key="key">{{ key }}</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab" class="items transparent">
			<v-tab-item>
				<v-row dense>
					<Webcam v-for="(webcam, i) of allCams" :key="i" :webcam="webcam" />
				</v-row>
			</v-tab-item>
			<v-tab-item v-for="(area, key) in webcams" :key="key">
				<v-row dense>
					<Webcam v-for="(webcam, i) of area" :key="i" :webcam="webcam" />
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import Webcam from "@/components/Webcam.vue";
import { mapActions } from "vuex";

export default {
	name: "Webcams",
	components: { Webcam },
	data() {
		return {
			tab: null,
		};
	},
	watch: {
		webcams: {
			handler: "checkCams",
			immediate: true,
			deep: true
		},
	},
	computed: {
		allCams() {
			return this.$store.getters.allCams;
		},
		webcams() {
			return this.$store.getters.webcams;
		},
	},
	methods: {
		...mapActions(["updateCam"]),
		async checkCams() {
			// Only check if you have webcams
			if (this.webcams) {
				for (const area in this.webcams) {
					let changes = false;
					for (const webcam of Object.values(this.webcams[area])) {
						const minBetweenLastScrape =
							(Date.now() - new Date(webcam.scrapeDate)) / 1000 / 60;
						const maxScrapeMin = 15;

						if (minBetweenLastScrape > maxScrapeMin) {
							await this.updateCam({ area, webcam });
							changes = true;
						}
					}

					if (changes) {
						this.$store.dispatch("updateAllCams", this.webcams);
					}
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
#webcams {
	height: 100%;
	.items {
	}
	.transparent {
		background: transparent !important;
	}
}
</style>
