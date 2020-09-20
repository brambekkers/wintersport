<template>
	<v-app>
		<Sidebar />
		<v-app-bar app light v-if="user">
			<v-app-bar-nav-icon
				v-if="isHome"
				@click="$store.commit('sidebar', !$store.getters.sidebar)"
			></v-app-bar-nav-icon>
			<v-btn v-else icon @click="$router.go(-1)">
				<v-icon>arrow_back</v-icon>
			</v-btn>
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
	computed: {
		isHome() {
			return this.$route.path === "/";
		},
	},
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
