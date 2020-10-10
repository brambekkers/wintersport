<template>
	<v-app-bar app dark color="primary" v-if="user">
		<!-- Open regular sidebar -->
		<v-app-bar-nav-icon
			v-if="isHome"
			@click="$store.commit('sidebar', !$store.getters.sidebar)"
		></v-app-bar-nav-icon>
		<!-- Close Photo detail -->
		<v-btn
			v-else-if="photoDetail"
			icon
			@click="$store.commit('photoDetail', '')"
		>
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<!-- Backbutton to home -->
		<v-btn v-else icon @click="$router.push('/')">
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<v-toolbar-title> {{ routerName }} </v-toolbar-title>
	</v-app-bar>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		data: () => ({
			drawer: false,
		}),
		computed: {
			...mapGetters(["user", "photoDetail"]),
			isHome() {
				return this.$route.path === "/";
			},
			routerName() {
				return this.$route.name;
			},
		},
	};
</script>

<style>
</style>