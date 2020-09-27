<template>
	<v-container>
		<v-row>
			<v-col align="center">
				<v-btn icon width="33vw" height="33vw" @click="openAvatarSheet">
					<v-avatar size="33vw" color="primary">
						<img v-if="avatar" alt="Avatar" :src="avatar" />
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
						<v-col>
							<div class="px-4">
								<v-file-input
									accept="image/*"
									ref="avatar"
									v-model="newAvatar"
									label="Avatar"
									hint="Choose your avatar."
									prepend-icon="mdi-camera"
								/>
							</div>
							<div class="text-right">
								<v-btn class="mt-6" text color="primary" @click="saveAvatar">
									Save
								</v-btn>
							</div>
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
									ref="name"
									v-model="newName"
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
export default {
	data: () => ({
		avatar: undefined,
		avatarSheet: false,
		newAvatar: undefined,
		name: "Anonymous Penguin",
		nameSheet: false,
		newName: undefined,
	}),
	computed: {
		initials() {
			const names = this.name.match(/\b\w/g) || [];
			return `${names.shift()}${names.pop()}`.toUpperCase();
		},
	},
	methods: {
		openAvatarSheet() {
			this.avatarSheet = !this.avatarSheet;
			this.$nextTick(() => {
				this.$refs.avatar.focus();
			});
		},
		saveAvatar() {
			this.avatar = URL.createObjectURL(this.newAvatar);
			this.avatarSheet = !this.avatarSheet;
		},
		openNameSheet() {
			this.newName = this.name;
			this.nameSheet = !this.nameSheet;
			this.$nextTick(() => {
				this.$refs.name.focus();
			});
		},
		saveName() {
			this.name = this.newName;
			this.nameSheet = !this.nameSheet;
		},
	},
};
</script>
