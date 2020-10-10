<template>
	<div id="photoDetail">
		<PinchZoom :url="photoDetail" />

		<div id="actionBar">
			<v-row justify="space-around">
				<v-icon color="white"> favorite </v-icon>
				<v-icon color="white"> edit </v-icon>
				<v-icon color="white"> share </v-icon>
				<v-icon color="white"> delete </v-icon>
			</v-row>
		</div>
	</div>
</template>

<script>
	import PinchZoom from "@/components/PinchZoom.vue";
	import { mapGetters } from "vuex";

	export default {
		components: { PinchZoom },
		computed: {
			...mapGetters(["photoDetail"]),
		},
	};
</script>

<style lang="scss" scoped>
	#photoDetail {
		position: relative;

		#actionBar {
			position: absolute;
			padding: 0.8rem;
			z-index: 100;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.5);

			padding: 0.8rem;
		}
	}
</style>