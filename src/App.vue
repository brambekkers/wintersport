<template>
	<v-app>
		<Sidebar :drawer="drawer" />

		<v-app-bar
			app
			color="success"
		>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title> Wintersport 2021 </v-toolbar-title>
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<!-- If using vue-router -->
				<router-view />
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>

<script>
import { mapActions } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import { resorts } from "@/config/weather-unlocked-config.js";

export default {
	name: "App",
	data: () => ({
		drawer: false,
		//
	}),
	components: { Sidebar },
	methods: {
		...mapActions([
			"initializeApp",
			"userWatcher",
			"initializeWeather",
			"refreshSnowReport",
		]),
	},
	async mounted() {
		try {
			await this.initializeApp();
			this.userWatcher();
		} catch (error) {
			console.error(error);
		}

		try {
			this.initializeWeather();
			await this.refreshSnowReport(resorts.saalbachHinterglem);
		} catch (error) {
			console.error(error);
		}
	},
};
</script>
