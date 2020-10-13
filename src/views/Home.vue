<template>
	<v-container>
		<v-row align="stretch" justify="space-between" dense>
			<Countdown />
			<Info />
		</v-row>
		<v-row align="stretch" dense>
			<Weather />
			<Webcam />
			<CardTemplate cols="6" height="200px">
				<template v-slot:front>
					<v-card-title class="my-0 pt-0 title">Weather</v-card-title>
					<v-card-subtitle class="py-0 sub-title"
						>test 1</v-card-subtitle
					>
					<v-img
						src="http://pre14.deviantart.net/0aef/th/pre/f/2014/015/2/f/look_at_that_thing_morty____rick_and_morty_by_kory226-d72a6ub.png"
						alt=""
						contain
					/>
				</template>
				<template v-slot:back>
					<div class="pa-5">
						<h3 class="synopsis">Synopsis</h3>
						<p>
							Rick and Morty is an American adult animated
							television series created by Justin Roiland and Dan
							Harmon for Adult Swim.
						</p>
						<div class="buttons">
							<v-btn> <i class="fa fa-play"></i>Watch now </v-btn>
							<v-btn class="btn secondary">
								<i class="fa fa-heart"></i>Add to list
							</v-btn>
						</div>
					</div>
				</template>
			</CardTemplate>
		</v-row>
	</v-container>
</template>

<script>
	import Countdown from "@/components/Countdown-card.vue";
	import Weather from "@/components/Weather-card.vue";
	import Webcam from "@/components/Webcam-card.vue";
	import Info from "@/components/Info-card.vue";
	import CardTemplate from "@/components/Home-card-template.vue";
	export default {
		name: "Home",
		components: { Countdown, Weather, Webcam, Info, CardTemplate },
	};
</script>

<style lang="scss" scoped>
</style>
