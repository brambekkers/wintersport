<template>
	<CardTemplate cols="6" sm="3" lg="3" xl="2" height="200px">
		<!-- Front of card -->
		<template v-slot:front>
			<v-img
				class="mx-4"
				height="100%"
				src="@/assets/happySkiFriends/camera.png"
				contain
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