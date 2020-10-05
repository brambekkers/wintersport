<template>
	<v-container id="container">
		<v-row dense>
			<v-col cols="4" v-for="(photo, i) of photos" :key="i">
				<v-card
					><v-img
						lazy-src="https://picsum.photos/id/11/10/6"
						src="https://picsum.photos/id/11/500/300"
					></v-img
				></v-card>
			</v-col>
		</v-row>

		<v-fab-transition>
			<v-btn id="addButton" color="primary" dark absolute fab>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-container>
</template>

<script>
	export default {
		name: "Photos",
		data() {
			return {
				photos: [
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	#container {
		height: calc(100vh - 56px);
		overflow: scroll;

		#addButton {
			right: 1rem;
			bottom: 1rem;
		}
	}
</style>
