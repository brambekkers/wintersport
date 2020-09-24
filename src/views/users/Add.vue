<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="createUser">
					<v-card-text>
						<h2 class="title text-h4 text-center font-weight-bold">
							Add user
						</h2>
						<h4 class="title text-subtitle-1 text-center mb-1 font-weight-light">
							Create a new user account
						</h4>
					</v-card-text>

					<v-card-text>
						<v-text-field
							label="Name"
							name="name"
							class="my-0 py-0"
							prepend-icon="mdi-account"
							type="text"
							v-model="newUser.name"
						></v-text-field>

						<v-text-field
							label="Login"
							name="login"
							class="my-0 py-0"
							prepend-icon="email"
							type="email"
							v-model="newUser.email"
						></v-text-field>

						<v-text-field
							label="Password"
							class="my-0 py-0"
							name="password"
							prepend-icon="mdi-lock"
							type="password"
							v-model="newUser.password"
						></v-text-field>
						<v-text-field
							label="Control password"
							class="my-0 py-0"
							name="password"
							prepend-icon="mdi-lock"
							type="password"
							v-model="newUser.controlPassword"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn type="submit" block color="primary">Create new user</v-btn>
					</v-card-actions>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			newUser: {
				name: "",
				email: "",
				password: "",
				controlPassword: "",
				role: "user",
			},
		};
	},

	methods: {
		async createUser() {},
	},
};
</script>

<style lang="scss" scoped>
.profileImage {
	width: 30vw;
	max-width: 250px;
}
</style>
