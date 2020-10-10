<template>
	<v-col cols="4" md="3" xl="2">
		<v-card class="img-container">
			<v-img
				:aspect-ratio="1 / 1"
				:src="url"
				@click="$store.commit('photoDetail', url)"
			/>
			<v-chip color="primary" class="ma-1 px-2 favorite" small overlap>
				<v-icon small>favorite</v-icon>
			</v-chip>
		</v-card>
	</v-col>
</template>

<script>
	export default {
		props: ["url"],
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