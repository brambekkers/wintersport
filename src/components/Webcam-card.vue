<template>
<v-col cols="6" sm="3" lg="3" xl="2" >
	<v-card class="h-100 d-flex flex-column">
		<v-card-title class="text-h6"> Webcams </v-card-title>
		<v-card-subtitle>{{ onlineAmount }} online</v-card-subtitle>
		<v-card-actions class="align-self-end mt-auto mb-3 mr-3">
			<v-btn rounded outlined> Watch now </v-btn>
		</v-card-actions>
	</v-card>
</v-col>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
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