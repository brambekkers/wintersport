<template>
	<v-navigation-drawer app v-model="sidebar" light>
		<v-list dense class="sidebarList d-flex flex-column justify-space-between">
			<template v-for="(header, i) of headers">
				<div :key="i" :class="header.class">
					<v-subheader>{{ header.name }}</v-subheader>
					<v-list-item-group color="primary">
						<v-list-item
							v-for="(item, j) in header.items"
							:key="j"
							:to="item.route ? item.route : '#'"
							@click="item.action ? item.action() : null"
						>
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

		headers() {
			return [
				{
					name: "Actions",
					items: [
						{
							title: "Weather",
							icon: "ac_unit",
							route: "weather",
						},
						{
							title: "Map",
							icon: "map",
							route: "map",
						},
						{
							title: "Location",
							icon: "location_on",
							route: "map",
						},
						{
							title: "Routes",
							icon: "directions",
							route: "routes",
						},
						{
							title: "Webcams",
							icon: "videocam",
							route: "routes",
						},
						{
							title: "Photos",
							icon: "person_add",
							route: "routes",
						},
						{
							title: "Chat",
							icon: "chat",
							route: "chat",
						},
					],
				},
				{
					name: "Account",
					class: "mt-auto",
					items: [
						{
							title: "Logout",
							icon: "power_settings_new",
							route: "",
							action: async () => {
								await this.$store.dispatch("singOut");
								this.$router.push("/login");
							},
						},
					],
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.sidebarList {
	height: 100vh;
	max-height: 100vh;
}
</style>
