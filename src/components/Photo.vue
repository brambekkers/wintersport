<template>
	<v-col
		cols="4"
		md="3"
		xl="2"
	>
		<v-card
			class="img-container"
			elevation="4"
		>
			<v-img
				:aspect-ratio="1 / 1"
				:src="photo.url"
				@click="$store.commit('photoDetail', photo.url)"
			/>
			<v-chip
				v-if="isFavorited"
				class="ma-1 px-2 favorite"
				small
				overlap
			>
				<v-icon
					small
					color="red"
				>favorite</v-icon>
			</v-chip>
		</v-card>
	</v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: ["photo"],
	computed: {
		...mapGetters(["user"]),
		isFavorited() {
			if (this.photo && this.photo.favorites) {
				return this.photo.favorites.includes(this.user.uid);
			}
			return false;
		},
	},
};
</script>

<style lang="scss" scoped>
	.image-container {
		position: relative;
	}
	.favorite {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
