<template>
	<v-avatar :size="size || '100%'" color="primary">
		<img class="avatar__image" v-if="image" :src="image" :alt="name" />
		<span v-else class="white--text headline">{{ initials }}</span>
	</v-avatar>
</template>

<script>
export default {
	props: ["profile", "size"],
	computed: {
		image() {
			return this.profile ? this.profile.avatar : undefined;
		},
		name() {
			return this.profile ? this.profile.name : undefined;
		},
		initials() {
			if (!this.profile || !this.profile.name) {
				return undefined;
			}

			const initials = this.profile.name.match(/\b\w/g) || [];

			const first = initials.shift() || "";
			const last = initials.pop() || "";

			return `${first}${last}`.toUpperCase();
		},
	},
};
</script>

<style>
.avatar__image {
	object-fit: cover;
}
</style>
