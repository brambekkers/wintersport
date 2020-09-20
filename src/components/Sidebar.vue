<template>
	<v-navigation-drawer app v-model="sidebar" light>
		<v-list dense>
			<template v-for="(header, i) of headers">
				<div :key="i">
					<v-subheader>{{ header.name }}</v-subheader>
					<v-list-item-group color="primary">
						<v-list-item v-for="(item, j) in header.items" :key="j" :to="item.action">
							<v-list-item-icon>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.title"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</div>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: ["drawer"],
	computed: {
		sidebar: {
			get: function() {
				return this.$store.getters.sidebar;
			},
			set: function(newValue) {
				this.$store.commit("sidebar", newValue);
			},
		},
	},
	data() {
		return {
			headers: [
				{
					name: "Profile",
					items: [
						{
							title: "Login",
							icon: "login",
							action: "login",
						},
						{
							title: "Logout",
							icon: "power_settings_new",
							action: "register",
						},
						{
							title: "Register",
							icon: "person_add",
							action: "register",
						},
					],
				},
				{
					name: "Actions",
					items: [
						{
							title: "Weather",
							icon: "person_add",
							action: "weather",
						},
						{
							title: "Map",
							icon: "map",
							action: "map",
						},
						{
							title: "Location",
							icon: "map",
							action: "map",
						},
						{
							title: "Routes",
							icon: "person_add",
							action: "routes",
						},
						{
							title: "Webcams",
							icon: "person_add",
							action: "routes",
						},
						{
							title: "Photos",
							icon: "person_add",
							action: "routes",
						},
						{
							title: "Chat",
							icon: "person_add",
							action: "routes",
						},
					],
				},
			],
		};
	},
};
</script>

<style></style>
