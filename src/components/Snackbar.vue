<template>
	<v-snackbar
		v-model="snackbar"
		:timeout="snackbarDuration"
		color="transparent"
		elevation="0"
		absolute
		centered
		top
	>
		<v-alert
			border="right"
			colored-border
			:type="snackbarType"
			elevation="2"
			light
		>
			{{ snackbarMessage }}
		</v-alert>
	</v-snackbar>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["snackbarMessage", "snackbarType", "snackbarDuration"]),
			snackbar: {
				get: function () {
					return this.$store.getters.snackbar;
				},
				set: function () {
					this.$store.commit("snackbar", false);
				},
			},
		},
	};
</script>

<style>
</style>