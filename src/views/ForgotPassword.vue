<template>
	<v-container class="fill-height" fluid>
		<!-- Alert -->

		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="resetPassword" ref="form">
					<v-img
						src="@/assets/happySkiFriends/confused.png"
						class="profileImage mx-auto"
					></v-img>
					<v-card-text>
						<h2 class="title text-h5 text-center font-weight-bold">
							Forgot Password
						</h2>
						<h4
							class="title text-subtitle-2 text-center mb-1 font-weight-light"
						>
							No worries! We will send you an email with
							instructions on how to reset your password.
						</h4>
					</v-card-text>

					<v-card-text>
						<v-text-field
							label="Email"
							prepend-icon="mail"
							type="email"
							v-model="email"
							solo
							required
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn type="submit" block color="primary">Send</v-btn>
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
				email: "",
			};
		},
		computed: {
			auth() {
				return this.$store.getters.auth;
			},
		},
		methods: {
			async resetPassword() {
				try {
					await this.auth.sendPasswordResetEmail(this.email);
					this.$store.dispatch("snackbar", {
						msg: "That went well! Have a quick look in your mailbox...",
						type: "success",
					});
					this.$router.push("/login");
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
