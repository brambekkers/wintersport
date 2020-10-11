<template>
	<v-col cols="12" sm="6" md="4" lg="4" xl="3">
		<v-card elevation="4" height="100%">
			<v-row dense>
				<v-col cols="6" class="pl-5">
					<v-img src="@/assets/happySkiFriends/camera.png"></v-img>
				</v-col>
				<v-col cols="6"
					><v-card-title class="headline"> Webcams </v-card-title>
					<v-card-subtitle>{{ onlineAmount }} online</v-card-subtitle>
					<v-card-actions>
						<v-btn rounded outlined to="/webcams">
							Watch now
						</v-btn>
					</v-card-actions></v-col
				>
			</v-row>
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