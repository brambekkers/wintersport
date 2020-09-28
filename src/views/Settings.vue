<template>
	<v-container>
		<v-row>
			<v-col align="center">
				<v-btn icon width="33vw" height="33vw" @click="openAvatarSheet">
					<v-avatar size="33vw" color="primary">
						<!-- <img v-if="avatar" :src="avatar" alt="Avatar" /> -->
						<div
							v-if="avatar"
							class="avatar"
							:style="`background: url(${avatar})`"
						></div>
						<span v-else class="white--text headline">{{ initials }}</span>
					</v-avatar>
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-list>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-subtitle>Name</v-list-item-subtitle>
							<v-list-item-title>{{ name }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-btn icon @click="openNameSheet">
								<v-icon>edit</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
		<v-bottom-sheet v-model="avatarSheet">
			<v-sheet>
				<v-container>
					<v-row>
						<v-col cols="12">
							<div class="px-4">
								<v-file-input
									accept="image/*"
									ref="avatarInput"
									v-model="avatarInput"
									label="Avatar"
									hint="Choose your avatar."
									prepend-icon="mdi-camera"
								/>
							</div>
						</v-col>
						<v-col cols="12">
							<v-row>
								<v-col cols="6">
									<div class="text-left">
										<v-btn text color="primary" @click="removeAvatar">
											Remove avatar
										</v-btn>
									</div>
								</v-col>
								<v-col cols="6">
									<div class="text-right">
										<v-btn text color="primary" @click="saveAvatar">
											Save
										</v-btn>
									</div>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-container>
			</v-sheet>
		</v-bottom-sheet>
		<v-bottom-sheet v-model="nameSheet">
			<v-sheet>
				<v-container>
					<v-row>
						<v-col>
							<div class="px-4">
								<v-text-field
									ref="nameInput"
									v-model="nameInput"
									label="Name"
									hint="Choose your display name."
								/>
							</div>
							<div class="text-right">
								<v-btn class="mt-6" text color="primary" @click="saveName">
									Save
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</v-container>
			</v-sheet>
		</v-bottom-sheet>
	</v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			avatar: undefined,
			avatarSheet: false,
			avatarInput: undefined,
			name: undefined,
			nameSheet: false,
			nameInput: undefined,
		};
	},
	computed: {
		...mapGetters(["db", "storage", "user"]),
		initials() {
			if (!this.name) return undefined;
			const names = this.name.match(/\b\w/g) || [];
			return `${names.shift() || ""}${names.pop() || ""}`.toUpperCase();
		},
	},
	methods: {
		openAvatarSheet() {
			this.avatarSheet = !this.avatarSheet;
			this.$nextTick(() => {
				this.$refs.avatarInput.focus();
			});
		},
		async saveAvatar() {
			this.avatar = URL.createObjectURL(this.avatarInput);
			this.avatarSheet = !this.avatarSheet;
			const storageRef = await this.storage
				.ref()
				.child(`avatars/${this.user.uid}`);
			await storageRef.put(this.avatarInput);
			await this.user.updateProfile({
				photoURL: await storageRef.getDownloadURL(),
			});
		},
		async removeAvatar() {
			this.avatar = "";
			await this.user.updateProfile({ photoURL: "" });
		},
		openNameSheet() {
			this.nameInput = this.name;
			this.nameSheet = !this.nameSheet;
			this.$nextTick(() => {
				this.$refs.nameInput.focus();
			});
		},
		async saveName() {
			this.name = this.nameInput;
			this.nameSheet = !this.nameSheet;
			await this.user.updateProfile({ displayName: this.nameInput });
		},
		setUserValues() {
			if (this.user) {
				this.avatar = this.user.photoURL;
				this.name = this.user.displayName;
			}
		},
	},
	watch: {
		/**
		 * @todo Won't be necessary anymore when we delay the render until the
		 * authenticated user is retrieved.
		 */

		user: {
			handler: "setUserValues",
			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.avatar {
	height: 100%;
	width: 100%;
	background-position: center !important;
	background-size: cover !important;
}
</style>
