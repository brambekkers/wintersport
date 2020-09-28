<template>
	<v-data-table
		:headers="headers"
		:items="users ? users: []"
		:items-per-page="5"
		:loading="!users"
		loading-text="Loading users... Please wait"
	>
		<template v-slot:item.role="{ item }">
			<v-switch
				:input-value="item.role === 'admin'"
				@change="changeRole({id: item.id , role: item.role === 'admin' ? 'user' : 'admin'})"
			></v-switch>
		</template>
	</v-data-table>
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
		...mapGetters(["users"]),
	},
	methods: {
		...mapActions(["changeRole"]),
	},
};
</script>

<style>
</style>