<template>
  <v-col>
    <v-parallax
      dark
      src="https://www.hubertushof-hinterglemm.at/andsrv/content/files/hinterglemm.83.jpg"
    />
    {{ snowReport }}
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: { ...mapGetters(["snowReport"]) },
};
</script>
