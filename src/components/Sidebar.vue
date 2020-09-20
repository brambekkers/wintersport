<template>
	<v-navigation-drawer app v-model="drawer" light>
		<v-list dense>
			<template v-for="(header, i) of headers">
				<v-subheader :key="i">{{ header.name }}</v-subheader>
				<v-list-item-group color="primary" :key="i">
					<v-list-item v-for="(item, j) in header.items" :key="j">
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.title"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
	export default {
		props: ["drawer"],
		data() {
			return {
				headers: [
					{
						name: "profile",
						items: [
							{
								action: "local_activity",
								title: "Login",
								icon: "login",
							},
						],
					},
					{
						name: "Actions",
						items: [
							{
								action: "restaurant",
								title: "Dining",
							},
							{
								action: "school",
								title: "Education",
							},
							{
								action: "directions_run",
								title: "Family",
							},
							{
								action: "healing",
								title: "Health",
							},
							{
								action: "content_cut",
								title: "Office",
							},
							{
								action: "local_offer",
								title: "Promotions",
							},
						],
					},
				],
			};
		},
	};
</script>

<style></style>
