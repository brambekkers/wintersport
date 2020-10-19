<template>
	<PinchZoom :url="url" />
</template>

<script>
import PinchZoom from "@/components/PinchZoom.vue";
export default {
	components: { PinchZoom },
	computed: {
		skibus() {
			return this.$store.getters.skibus;
		},
		url() {
			return require("@/assets/skibusMap.png");
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
