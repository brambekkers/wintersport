<template>
	<PinchZoom :url="url" />
</template>

<script>
import PinchZoom from "@/components/PinchZoom.vue";
export default {
	components: { PinchZoom },
	computed: {
		url() {
			return require("@/assets/skimap.jpg");
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
