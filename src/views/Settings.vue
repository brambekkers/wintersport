<template>
	<v-container v-if="profile">
		<v-row justify="center">
			<v-col cols="12" xl="4" align="center">
				<div class="avatar__wrapper">
					<Avatar :profile="profile" />
					<v-menu v-if="profile && profile.avatar">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								icon
								elevation="2"
								class="avatar__button secondary--text"
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>more_vert</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="openAvatarSheet">
								<v-list-item-title>Edit</v-list-item-title>
							</v-list-item>
							<v-list-item @click="removeAvatar">
								<v-list-item-title>Remove</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-btn v-else icon elevation="2" class="avatar__button">
						<v-icon @click="openAvatarSheet">edit</v-icon>
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" md="10" lg="8" xl="6">
				<v-list rounded dense>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-subtitle>Name</v-list-item-subtitle>
							<v-list-item-title>
								{{ profile.name }}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-btn icon @click="openNameSheet">
								<v-icon>edit</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-subtitle>
								Password
							</v-list-item-subtitle>
							<v-list-item-title>*********</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-btn icon to="/changepassword">
								<v-icon>edit</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
					<v-divider />
					<v-list-item>
						<v-list-item-content class="my-5">
							<v-list-item-title>Darkmode</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-switch
								:input-value="darkMode"
								@change="updateDarkMode"
							></v-switch>
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
						<v-btn
							text
							color="primary"
							@click="avatarSheet = false"
						>
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
						<v-btn color="primary" @click="saveName"> Save </v-btn>
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
			darkMode() {
				return this.profile && this.profile.darkMode
					? this.profile.darkMode
					: false;
			},
		},
		methods: {
			...mapActions([
				"updateAvatar",
				"removeAvatar",
				"updateProfile",
				"updateDarkMode",
			]),
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
	.avatar__wrapper {
		position: relative;
		width: 33vw;
		height: 33vw;
	}
	.avatar__button {
		position: absolute;
		background: white;
		right: 0;
		bottom: 0;
	}
</style>
