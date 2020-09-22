<template>
	<div>
		<v-tabs
			show-arrows
			v-model="tab"
		>
			<v-tab>All</v-tab>
			<v-tab
				v-for="(area, key) in webcams"
				:key="key"
			>{{key}}</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<Webcam
					v-for="(webcam, i) of all"
					:key="i"
					:webcam="webcam"
				/>
			</v-tab-item>
			<v-tab-item
				v-for="(area, key) in webcams"
				:key="key"
			>
				<Webcam
					v-for="(webcam, i) of area"
					:key="i"
					:webcam="webcam"
				/>
			</v-tab-item>
		</v-tabs-items>

	</div>
</template>

<script>
import Webcam from "@/components/Webcam.vue";

export default {
	name: "Webcams",
	components: { Webcam },
	data() {
		return {
			tab: null,
			webcams: {
				saalbach: [
					{
						name: "Kohlmaiskopf",
						url: "https://webtv.feratel.com/webtv/?cam=5244",
						videoUrl: null,
						poster: null,
						height: 1794,
					},
					{
						name: "Schattberg-ost",
						url: "https://webtv.feratel.com/webtv/?cam=5274",
						videoUrl: null,
						poster: null,
						height: 2020,
					},
					{
						name: "Schattberg-west",
						url: "https://webtv.feratel.com/webtv/?cam=5275",
						videoUrl: null,
						poster: null,
						height: 2200,
					},
					{
						name: "Kohlmais tal",
						url: "https://webtv.feratel.com/webtv/?cam=5276",
						videoUrl: null,
						poster: null,
						height: 1040,
					},
					{
						name: "Zwölferkogel",
						url: "https://webtv.feratel.com/webtv/?cam=5278",
						videoUrl: null,
						poster: null,
						height: 1984,
					},
					{
						name: "Wildenkarkogel",
						url: "https://webtv.feratel.com/webtv/?cam=5279",
						videoUrl: null,
						poster: null,
						height: 1910,
					},
				],
				hinterglemm: [
					{
						name: "Hinterglemm tal",
						url: "https://webtv.feratel.com/webtv/?cam=5277",
						videoUrl: null,
						poster: null,
						height: 1070,
					},
				],
				leogang: [
					{
						name: "Großer Asitz",
						url: "https://webtv.feratel.com/webtv/?cam=5240",
						videoUrl: null,
						poster: null,
						height: 1872,
					},
					{
						name: "Asitz Bergstation",
						url: "https://webtv.feratel.com/webtv/?cam=5241",
						videoUrl: null,
						poster: null,
						height: 1762,
					},
					{
						name: "Talstation Asitzbahn",
						url: "https://webtv.feratel.com/webtv/?cam=5242",
						videoUrl: null,
						poster: null,
						height: 840,
					},
				],
			},
		};
	},
	computed: {
		all() {
			const all = [];
			for (const area of Object.values(this.webcams)) {
				for (const webcam of area) {
					all.push(webcam);
				}
			}
			return all;
		},
	},
	methods: {
		async scrapeData() {
			for (const area in this.webcams) {
				for (const [i, webcam] of this.webcams[area].entries()) {
					const response = await fetch(webcam.url);
					// status "OK"
					if (response.status === 200) {
						// Get dom
						var html = await response.text();
						var parser = new DOMParser();

						// Get items
						var doc = await parser.parseFromString(html, "text/html");
						var video = doc.querySelector("video");
						const time = doc
							.querySelector("#video_clock_div")
							.querySelector("nobr").textContent;
						const videoUrl = video
							.querySelector("source")
							.src.match(/(.*?(?:mp4))|.*/)[0];

						// Set Data to Vue
						this.$set(this.webcams[area][i], "scrapeDate", Date.now());
						this.$set(this.webcams[area][i], "poster", video.poster);
						this.$set(this.webcams[area][i], "time", time);
						this.$set(this.webcams[area][i], "videoUrl", videoUrl);
					}
				}
			}
		},
	},
	mounted() {
		this.scrapeData();
	},
};
</script>
