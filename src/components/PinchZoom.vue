<template>
	<pinch-zoom id="map">
		<img ref="map" :src="url" />
	</pinch-zoom>
</template>

<script>
	import PinchZoom from "vue-pinch-zoom";
	export default {
		components: { PinchZoom },
		props: ["url"],
	};
</script>

<style lang="scss" scoped>
	#map {
		height: calc(100vh - 56px);
	}
</style>
