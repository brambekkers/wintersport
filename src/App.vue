<template>
	<v-app>
		<Sidebar />

		<v-app-bar app light>
			<v-app-bar-nav-icon
				@click="$store.commit('sidebar', !$store.getters.sidebar)"
			></v-app-bar-nav-icon>
			<v-toolbar-title> Wintersport 2021 </v-toolbar-title>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>

<script>
import { mapActions } from "vuex";
import Sidebar from "@/components/Sidebar.vue";

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
	},
};
</script>
