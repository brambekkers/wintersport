<template>
    <div>
        <div id="myMap" class="map"></div>
        <Avatar ref="avatar" :size="30" :profile="profile" @click="alert('test')" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Avatar from "@/components/Avatar.vue";

export default {
    name: "Map",
    components: { Avatar },
    data() {
        return {
            myMap: null,
            home: null,
            personPos: null
        };
    },
    watch: {
        personPos: {
            handler: "addPersonToMap"
        }
    },
    computed: {
        ...mapGetters(["profile"])
    },
    methods: {
        initMap() {
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

            // this.addNavigationControl()
            this.addHomeIcon();
        },
        addNavigationControl() {
            const nav = new window.mapboxgl.NavigationControl();
            this.myMap.addControl(nav, "top-right");
        },
        addHomeIcon() {
            new window.mapboxgl.Marker().setLngLat([12.617214, 47.387759]).addTo(this.myMap);
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => (this.personPos = pos), this.highAccuracyError, { maximumAge: 0, timeout: 5000, enableHighAccuracy: true });
            }
        },
        highAccuracyError(error) {
            console.log(error);
            if (error.code == error.TIMEOUT) {
                navigator.geolocation.watchPosition((pos) => (this.personPos = pos), this.errorCallback_lowAccuracy, { maximumAge: 0, timeout: 10000, enableHighAccuracy: false });
                return;
            }
        },
        lowAccuracyError(error) {
            console.log(error);
        },
        addPersonToMap() {
            var el = this.$refs.avatar.$el;
            new window.mapboxgl.Marker(el).setLngLat([this.personPos.coords.longitude, this.personPos.coords.latitude]).addTo(this.myMap);
        }
    },
    mounted() {
        this.initMap();
        this.getLocation();
    }
};
</script>

<style lang="scss" scoped>
.map {
    width: 100vw;
    height: calc(100vh - 56px);
}
</style>
