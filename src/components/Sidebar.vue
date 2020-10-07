<template>
	<v-navigation-drawer app v-model="sidebar" id="sidebar">
		<v-list
			dense
			class="sidebarList d-flex flex-column justify-space-between"
		>
			<template v-for="(header, i) of headers">
				<div :key="i" :class="header.class">
					<v-subheader v-if="header.show">{{
						header.name
					}}</v-subheader>
					<v-list-item-group v-if="header.show" color="primary">
						<!-- No sub menu -->
						<template v-if="!header.subItems">
							<MenuItem
								v-for="(item, j) in header.items"
								:key="j"
								:title="item.title"
								:icon="item.icon"
								:action="item.action"
								:route="item.route"
							/>
						</template>

						<!-- SubMenu -->
						<template v-if="header.subItems">
							<v-list-group
								:value="true"
								v-for="(subItem, j) in header.subItems"
								:key="j"
								:prepend-icon="subItem.icon"
							>
								<template v-slot:activator>
									<v-list-item-title>{{
										subItem.name
									}}</v-list-item-title>
								</template>
								<MenuItem
									v-for="(item, j) in subItem.items"
									:key="j"
									:title="item.title"
									:icon="item.icon"
									:action="item.action"
									:route="item.route"
								/>
							</v-list-group>
						</template>
					</v-list-item-group>
					<v-divider class="mt-2" v-if="header.name === 'Actions'" />
				</div>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
	import MenuItem from "@/components/MenuItem.vue";
	export default {
		props: ["drawer"],
		components: { MenuItem },
		data() {
			return {
				admins: [
					["Management", "mdi-account-multiple-outline"],
					["Settings", "mdi-cog-outline"],
				],
			};
		},
		computed: {
			isAdmin() {
				return this.$store.getters.isAdmin;
			},
			sidebar: {
				get: function () {
					return this.$store.getters.sidebar;
				},
				set: function (newValue) {
					this.$store.commit("sidebar", newValue);
				},
			},
			headers() {
				return [
					{
						name: "Actions",
						show: true,
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
								route: "location",
							},
							{
								title: "Routes",
								icon: "directions",
								route: "routes",
							},
							{
								title: "Webcams",
								icon: "videocam",
								route: "webcams",
							},
							{
								title: "Photos",
								icon: "perm_media",
								route: "photos",
							},
							{
								title: "Chat",
								icon: "chat",
								route: "chat",
							},
						],
					},
					{
						name: "Admin",
						show: this.$store.getters.isAdmin,
						class: "",
						subItems: [
							{
								name: "Users",
								class: "",
								icon: "admin_panel_settings",
								items: [
									{
										title: "All users",
										icon: "people",
										route: "users",
									},
									{
										title: "Add User",
										icon: "person_add",
										route: "users/add",
									},
								],
							},
						],
					},
					{
						name: "Account",
						show: true,
						class: "mt-auto",
						items: [
							{
								title: "Settings",
								icon: "settings",
								route: "settings",
							},
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
	#sidebar {
		height: 100vh;
		max-height: 100vh;

		.sidebarList {
			height: 100%;
		}
	}
</style>
