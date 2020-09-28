<template>
	<v-app-bar
		app
		dark
		color="primary"
		v-if="user"
	>
		<v-app-bar-nav-icon
			v-if="isHome"
			@click="$store.commit('sidebar', !$store.getters.sidebar)"
		></v-app-bar-nav-icon>
		<v-btn
			v-else
			icon
			@click="$router.push('/')"
		>
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<v-toolbar-title> {{ routerName }} </v-toolbar-title>
	</v-app-bar>
</template>

<script>
export default {
	data: () => ({
		drawer: false,
		//
	}),
	computed: {
		isHome() {
			return this.$route.path === "/";
		},
		routerName() {
			return this.$route.name;
		},
		user() {
			return this.$store.getters.user;
		},
	},
};
</script>

<style>
</style>