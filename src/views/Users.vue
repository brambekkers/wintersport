<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="users ? users : []"
			:items-per-page="5"
			:loading="!users"
			loading-text="Loading users... Please wait"
		>
			<template v-slot:item.role="{ item }">
				<v-switch
					:input-value="item.role === 'admin'"
					:disabled="user.uid === item.id"
					@change="
						toggleRole({
							id: item.id,
							role: item.role === 'admin' ? 'user' : 'admin',
						})
					"
				></v-switch>
			</template>
		</v-data-table>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			return {
				headers: [
					{
						text: "Displayname",
						align: "start",
						value: "name",
					},
					{ text: "UID", value: "id" },
					{ text: "Email", value: "email" },
					{ text: "Admin", value: "role", sortable: false },
				],
			};
		},
		computed: {
			...mapGetters(["users", "user"]),
		},
		methods: {
			...mapActions(["changeRole"]),
			toggleRole({ id, role }) {
				if (this.user.uid != id) {
					this.changeRole({ id, role });
				} else {
					this.$store.dispatch("snackbar", {
						msg: "You cant change your own role!",
						type: "error",
					});
				}
			},
		},
	};
</script>

<style>
</style>