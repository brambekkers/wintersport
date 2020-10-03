<template>
	<v-container>
		<v-row>
			<v-col align="center">
				<Avatar size="33vw" :profile="profile" />
				<v-btn icon @click="openAvatarSheet">
					<v-icon>edit</v-icon>
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
			<v-sheet class="pa-4">
				<v-container>
					<v-file-input
						accept="image/*"
						ref="avatarInput"
						v-model="avatarInput"
						label="Avatar"
						hint="Choose your avatar."
						prepend-icon="mdi-camera"
					/>
					<div class="text-right">
						<v-btn text color="primary" @click="avatarSheet = false">
							Cancel
						</v-btn>
						<v-btn color="primary" @click="saveAvatar">
							Save
						</v-btn>
					</div>
				</v-container>
			</v-sheet>
		</v-bottom-sheet>
		<v-bottom-sheet v-model="nameSheet">
			<v-sheet class="pa-4">
				<v-container>
					<v-text-field
						ref="nameInput"
						v-model="nameInput"
						label="Name"
						hint="Choose your display name."
					/>
					<div class="text-right">
						<v-btn text color="primary" @click="nameSheet = false">
							Cancel
						</v-btn>
						<v-btn color="primary" @click="saveName">
							Save
						</v-btn>
					</div>
				</v-container>
			</v-sheet>
		</v-bottom-sheet>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Avatar from "@/components/Avatar.vue";

export default {
	components: { Avatar },
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
	},
	methods: {
		...mapActions(["updateAvatar", "updateProfile"]),
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
