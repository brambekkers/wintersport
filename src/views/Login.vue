<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="signIn">
					<v-img
						src="@/assets/profile.png"
						class="profileImage mx-auto"
						aspect-ratio="1"
					></v-img>
					<v-card-text>
						<h2 class="title text-h4 text-center font-weight-bold">
							Welcome back
						</h2>
						<h4
							class="title text-subtitle-1 text-center mb-1 font-weight-light"
						>
							Sign in to continue
						</h4>
					</v-card-text>

					<v-card-text>
						<v-text-field
							label="Login"
							name="login"
							prepend-icon="mdi-account"
							type="text"
							v-model="user.email"
						></v-text-field>

						<v-text-field
							label="Password"
							class="mt-0"
							name="password"
							prepend-icon="mdi-lock"
							type="password"
							v-model="user.password"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn type="submit" block color="primary">Login</v-btn>
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
				this.$router.push("/");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.profileImage {
	width: 30vw;
	max-width: 250px;
}
</style>
