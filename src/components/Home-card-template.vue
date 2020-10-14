<template>
	<v-col
		:cols="cols"
		:sm="sm"
		:md="md"
		:lg="lg"
		:xl="xl"
		class="card-container"
	>
		<v-card
			class="card"
			:style="`height: ${height}`"
			elevation="4"
			:color="color"
		>
			<div class="front">
				<slot name="front"></slot>
			</div>
			<div class="back">
				<slot name="back"></slot>
			</div>
		</v-card>
	</v-col>
</template>

<script>
	export default {
		props: ["cols", "sm", "md", "lg", "xl", "height", "color"],
	};
</script>

<style lang="scss" scoped>
	.card-container {
		perspective: 1000;
	}

	.card {
		width: 100%;
		height: 200px;
		position: relative;
		overflow: hidden;
		transition: 0.5s;
		transform-style: preserve-3d;
		&:hover {
			transform: rotateY(180deg);
			.front {
				opacity: 0;
			}
			.back {
				opacity: 1;
			}
		}
	}

	.front,
	.back {
		backface-visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition-delay: 0.15s;
		transition: 0;
	}

	.front {
		transform: rotateY(0deg);
	}

	.back {
		transform: rotateY(180deg);
		opacity: 0;
		backface-visibility: visible;
	}
</style>