<template>
	<v-app id="app">
		<Sidebar />
		<Header />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { mapActions } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

export default {
	name: "App",
	components: { Sidebar, Header },
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

<style lang="scss">
	body {
		max-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	#app {
		overflow: hidden;
	}
</style>
