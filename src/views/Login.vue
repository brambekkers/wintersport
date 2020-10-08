<template>
	<v-container class="fill-height" fluid>
		<!-- Alert -->
		<v-snackbar
			v-model="snackbar"
			timeout="5000"
			color="transparent"
			elevation="0"
			absolute
			centered
			top
		>
			<v-alert
				border="right"
				colored-border
				type="error"
				elevation="2"
				light
			>
				{{ error }}
			</v-alert>
		</v-snackbar>

		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="signIn">
					<v-img
						src="@/assets/happySkiFriends/profile.png"
						class="profileImage mx-auto"
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
							label="Email"
							name="login"
							prepend-icon="mdi-account"
							type="email"
							v-model="user.email"
							solo
						></v-text-field>

						<v-text-field
							label="Password"
							class="mt-0"
							name="password"
							prepend-icon="mdi-lock"
							type="password"
							v-model="user.password"
							solo
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
				snackbar: false,
				error: "",
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
				} catch (error) {
					this.snackbar = true;
					this.error = error.message;
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
