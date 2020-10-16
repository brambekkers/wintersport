<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="signIn">
					<v-img
						src="@/assets/happySkiFriends/profile.png"
						class="profileImage mx-auto"
					></v-img>
					<h4 class="title text-h4 mb-0 text-center font-weight-bold">
						Welcome back
					</h4>
					<v-card-subtitle
						class="text-subtitle-1 text-center mb-1 pt-0 font-weight-light"
					>
						Sign in to continue
					</v-card-subtitle>
					<v-card-text>
						<v-text-field
							label="Email"
							name="login"
							prepend-icon="mdi-account"
							type="email"
							v-model="user.email"
							hide-details="true"
							solo
						></v-text-field>

						<v-text-field
							label="Password"
							class="mt-2"
							name="password"
							prepend-icon="mdi-lock"
							type="password"
							v-model="user.password"
							hide-details="true"
							solo
						></v-text-field>
					</v-card-text>
					<v-card-actions class="d-flex flex-column text-center">
						<v-btn type="submit" block color="primary">Login</v-btn>
						<router-link
							class="text-subtitle-2 mt-2"
							to="/forgotPassword"
							color="transparent"
							>Forgot password?
						</router-link>
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
		computed: {
			fbUser() {
				return this.$store.getters.user;
			},
		},
		watch: {
			fbUser() {
				if (this.fbUser) {
					this.$router.push("/");
				}
			},
		},
		methods: {
			async signIn() {
				try {
					await this.$store.dispatch("signIn", this.user);
					this.$store.dispatch("snackbar", {
						msg:
							"Welcome to the mountain! Put your ski boots on and have fun!",
						type: "success",
					});
				} catch (error) {
					this.$store.dispatch("snackbar", {
						msg: error.message,
						type: "error",
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.profileImage {
		width: 40vw;
		max-width: 250px;
	}
</style>
