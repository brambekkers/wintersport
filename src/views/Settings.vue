<template>
	<v-container>
		<v-row>
			<v-col align="center">
				<v-btn icon width="33vw" height="33vw" @click="openAvatarSheet">
					<v-avatar size="33vw" color="primary">
						<img
							v-if="profile && profile.avatar"
							:src="profile.avatar"
							alt="Avatar"
						/>
						<!-- <div
              v-if="profile.avatar"
              class="avatar"
              :style="`background: url(${avatar})`"
            ></div> -->
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
							<v-list-item-title v-if="profile">{{
								profile.name
							}}</v-list-item-title>
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
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			avatarSheet: false,
			avatarInput: undefined,
			nameSheet: false,
			nameInput: undefined,
		};
	},
	computed: {
		...mapGetters(["profile"]),
		initials() {
			if (!this.profile || !this.profile.name) return undefined;
			const names = this.profile.name.match(/\b\w/g) || [];
			return `${names.shift() || ""}${names.pop() || ""}`.toUpperCase();
		},
	},
	methods: {
		...mapActions(["updateAvatar"]),
		openAvatarSheet() {
			this.avatarInput = null;
			this.avatarSheet = !this.avatarSheet;
			this.$nextTick(() => {
				this.$refs.avatarInput.focus();
			});
		},
		async saveAvatar() {
			this.updateAvatar(this.avatarInput);
			this.avatarSheet = !this.avatarSheet;
		},
		async removeAvatar() {
			//
		},
		openNameSheet() {
			this.nameInput = null;
			this.nameSheet = !this.nameSheet;
			this.$nextTick(() => {
				this.$refs.nameInput.focus();
			});
		},
		async saveName() {
			this.updateProfile({ name: this.nameInput });
			this.nameSheet = !this.nameSheet;
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
