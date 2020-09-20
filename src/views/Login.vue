<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card class="elevation-12">
					<v-form @submit.prevent="signIn">
						<v-toolbar color="primary" dark flat>
							<v-toolbar-title>Login</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-text-field
								label="Login"
								name="login"
								prepend-icon="mdi-account"
								type="text"
								v-model="user.email"
							></v-text-field>

							<v-text-field
								id="password"
								label="Password"
								name="password"
								prepend-icon="mdi-lock"
								type="password"
								v-model="user.password"
							></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn type="submit" color="primary">Login</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			user: {
				email: "",
				password: "",
			},
		};
	},
	methods: {
		async signIn() {
			console.log("test");
			try {
				await this.$store.dispatch("signIn", this.user);
				this.$router.push("/profile");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
