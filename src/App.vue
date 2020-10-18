<template>
	<v-app id="app">
		<Background />
		<Sidebar />
		<Header />
		<v-main id="main">
			<Snackbar />
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import { mapActions } from "vuex";
	import Sidebar from "@/components/Sidebar.vue";
	import Header from "@/components/Header.vue";
	import Background from "@/components/Background.vue";
	import Snackbar from "@/components/Snackbar.vue";

	export default {
		name: "App",
		components: { Sidebar, Header, Background, Snackbar },
		methods: {
			...mapActions([
				"initializeApp",
				"userWatcher",
				"usersWatcher",
				"webcamWatcher",
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
				this.webcamWatcher();
			} catch (error) {
				console.error(error);
			}

			this.askPermission();
		},
	};
</script>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Exo:wght@100;200;400;500;600;800;900&display=swap");

	body {
		max-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	#app {
		overflow-x: hidden;
		overflow-y: auto;
		font-family: "Happy Monkey", cursive !important;
		z-index: 1;

		.title,
		.text-h1,
		.text-h2,
		.text-h3,
		.text-h4,
		.text-h5,
		.text-h6 {
			font-family: "Exo", sans-serif !important;
		}

		.text-subtitle-1,
		.text-subtitle-2 {
			font-family: "Happy Monkey", cursive !important;
		}

		#main {
			height: calc(100vh);
			z-index: 2;
		}

		.h-100 {
			height: 100% !important;
		}
	}
</style>
