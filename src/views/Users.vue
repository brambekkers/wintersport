<template>
	<div>
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
					:disabled="user.uid === item.id"
					@change="toggleRole({id: item.id , role: item.role === 'admin' ? 'user' : 'admin'})"
				></v-switch>
			</template>

		</v-data-table>
		<v-snackbar
			v-model="snackbar"
			timeout="2000"
		>
			{{ snackbarText }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="blue"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			snackbar: false,
			snackbarText: "",
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
				this.snackbarText = "You cant change your own role!";
				this.snackbar = true;
			}
		},
	},
};
</script>

<style>
</style>