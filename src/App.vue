<template>
	<v-app>
		<Sidebar />

		<v-app-bar app light v-if="user">
			<v-app-bar-nav-icon
				@click="$store.commit('sidebar', !$store.getters.sidebar)"
			></v-app-bar-nav-icon>
			<v-toolbar-title> {{ routerName }} </v-toolbar-title>
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
	computed: {
		routerName() {
			return this.$route.name;
		},
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		...mapActions([
			"initializeApp",
			"userWatcher",
			"initializeWeather",
			"refreshSnowReport",
		]),
	},
	async created() {
		try {
			await this.initializeApp();
			this.userWatcher();
		} catch (error) {
			console.error(error);
		}
	},
};
</script>
