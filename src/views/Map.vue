<template>
    <img id="map" ref="map" src="@/assets/skimap.jpg" />
</template>

<script>
import PinchZoom from "pinch-zoom-js";
export default {
    mounted() {
        new PinchZoom(this.$refs.map, {
            maxZoom: 7
        });
    }
};
</script>

<style lang="scss" scoped>
#map {
}
</style>
