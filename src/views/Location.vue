<template>
    <div>
        <div id="myMap" class="map"></div>
    </div>
</template>

<script>
export default {
    name: "Map",
    data() {
        return {
            myMap: null
        };
    },
    methods: {},
    mounted() {
        window.mapboxgl.accessToken = "pk.eyJ1IjoiYnJhbWJvbWIiLCJhIjoiY2tmb2QybTBiMDM1bTJ0b2Fuc3IwcXk4cCJ9.3Y8h5jl_NZhbNwWLVkqAXQ";
        this.myMap = new window.mapboxgl.Map({
            container: "myMap",
            style: {
                version: 8,
                sources: {
                    "mapbox-satellite": {
                        type: "raster",
                        url: "mapbox://mapbox.satellite",
                        tileSize: 256
                    },
                    "piste-tiles": {
                        type: "raster",
                        tiles: ["https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"],
                        tileSize: 256
                    }
                },
                layers: [
                    {
                        id: "mapbox-satellite",
                        type: "raster",
                        source: "mapbox-satellite"
                    },
                    {
                        id: "snow-tiles",
                        type: "raster",
                        source: "piste-tiles",
                        minzoom: 10,
                        maxzoom: 17
                    }
                ]
            },
            center: [12.617214, 47.387759], // starting position [lng, lat]
            zoom: 15 // starting zoom
        });

        new window.mapboxgl.Marker().setLngLat([12.617214, 47.387759]).addTo(this.myMap);
    }
};
</script>

<style lang="scss" scoped>
.map {
    width: 100vw;
    height: calc(100vh - 56px);
}
</style>
