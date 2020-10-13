<template>
	<CardTemplate cols="6" height="200px">
		<!-- Front of card -->
		<template v-slot:front>
			<v-card-title class="text-h6 pb-0"> Webcams </v-card-title>
			<v-img
				class="mx-4"
				src="@/assets/happySkiFriends/camera.png"
			></v-img>
		</template>
		<!-- Back of card -->
		<template v-slot:back>
			<v-card-title class="text-h6"> Webcams </v-card-title>
			<v-card-subtitle>{{ onlineAmount }} online</v-card-subtitle>
			<v-card-actions>
				<v-btn rounded outlined> Watch now </v-btn>
			</v-card-actions>
		</template>
	</CardTemplate>
</template>

<script>
	import { mapGetters } from "vuex";
	import CardTemplate from "@/components/Home-card-template.vue";

	export default {
		components: { CardTemplate },

		computed: {
			...mapGetters(["allCams"]),
			onlineAmount() {
				return this.allCams.filter((c) => c.online).length;
			},
		},
	};
</script>

<style>
</style>