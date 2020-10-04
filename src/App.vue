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
				"usersWatcher",
				"initializeWeather",
				"refreshSnowReport",
			]),
			// NOTIFICATION TEST
			// TODO: Make global function to use everywhere in the app
			askPermission() {
				Notification.requestPermission((result) => {
					console.log("result from permission question", result);
					if (result !== "granted") {
						alert("You probably do not like notifications?!");
					} else {
						console.log(
							"A notification will be send from the service worker => This only works in production"
						);
						this.showNotification();
					}
				});
			},
			showNotification() {
				if ("serviceWorker" in navigator) {
					navigator.serviceWorker.ready // returns a Promise, the active SW registration
						.then((swreg) =>
							swreg.showNotification("Notifications granted", {
								body: "Here is a first notification",
								icon: "/img/icons/android-chrome-192x192.png",
								image: "/img/autumn-forest.png",
								vibrate: [300, 200, 300],
								badge: "/img/icons/plint-badge-96x96.png",
								actions: [
									{
										action: "confirm",
										title: "Okay",
										icon:
											"/img/icons/android-chrome-192x192.png",
									},
									{
										action: "cancel",
										title: "Cancel",
										icon:
											"/img/icons/android-chrome-192x192.png",
									},
								],
							})
						);
				}
			},
		},
		async created() {
			try {
				await this.initializeApp();
				this.userWatcher();
				this.usersWatcher();
			} catch (error) {
				console.error(error);
			}

			this.askPermission();
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
