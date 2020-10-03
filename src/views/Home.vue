<template>
    <v-container>
        <v-row class="justify-center">
            <Countdown />
        </v-row>
    </v-container>
</template>

<script>
import Countdown from "@/components/Countdown.vue";
export default {
    name: "Home",
    components: { Countdown }
};
</script>
