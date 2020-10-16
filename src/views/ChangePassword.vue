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
				:type="errorType"
				elevation="2"
				light
			>
				{{ error }}
			</v-alert>
		</v-snackbar>

		<v-row align="center" justify="center">
			<v-col cols="10" sm="8" md="4">
				<v-form @submit.prevent="changePassword" ref="form">
					<v-img
						src="@/assets/happySkiFriends/changePassword.png"
						class="profileImage mx-auto"
					></v-img>
					<v-card-text>
						<h2 class="title text-h5 text-center font-weight-bold">
							Change Password
						</h2>
						<h4
							class="title text-subtitle-2 text-center mb-1 font-weight-light"
						>
							Enter your old and new password below.
						</h4>
					</v-card-text>

					<v-card-text>
						<v-text-field
							label="Old Password"
							prepend-icon="lock_open"
							class="mb-6"
							type="password"
							v-model="passwords.oldPassword"
							hide-details="true"
							solo
							required
						></v-text-field>
						<v-text-field
							label="New Password"
							class="mt-2"
							hide-details="true"
							prepend-icon="lock"
							type="password"
							v-model="passwords.newPassword"
							solo
							required
						></v-text-field>
						<v-text-field
							label="Confirm Password"
							class="mt-2"
							:rules="controllPasswordRules"
							prepend-icon="vpn_key"
							type="password"
							v-model="passwords.controlPassword"
							solo
							required
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn type="submit" block color="primary"
							>Change</v-btn
						>
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
				errorType: "error",
				passwords: {
					oldPassword: "",
					newPassword: "",
					controlPassword: "",
				},
			};
		},
		computed: {
			controllPasswordRules() {
				const errors = [];

				if (!this.passwords.controlPassword)
					errors.push("Controll password is required");
				if (this.passwords.controlPassword != this.passwords.newPassword)
					errors.push("Control password does not match");

				return errors;
			},
		},
		methods: {
			async changePassword() {
				if (!this.controllPasswordRules.length) {
					try {
						await this.$store.dispatch(
							"changePassword",
							this.passwords
						);
						this.snackbar = true;
						this.errorType = "success";
						this.error = "password changed";
						setTimeout(() => this.$router.push("/settings"), 500);
					} catch (error) {
						this.snackbar = true;
						this.errorType = "error";
						this.error = error.message;
					}
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
