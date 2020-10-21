<template>
	<v-col
		cols="6"
		sm="3"
		lg="3"
		xl="2"
	>
		<v-card class="h-100 d-flex flex-column justify-space-between">
			<v-card-title class="text-h6 pb-0"> Countdown </v-card-title>
			<div id="countdown">
				<v-card
					class="number px-3 py-3 text-h6"
					color="primary"
					v-for="(num, i) of daysToGo"
					:key="i"
				>
					{{ num }}</v-card>
			</div>
			<v-card-subtitle class="daysToGo pt-0">
				days to go
			</v-card-subtitle>
		</v-card>
	</v-col>
</template>

<script>
export default {
	computed: {
		daysToGo() {
			const countDownDay = [20, 2]; // 20th of February
			const today = new Date();
			const cday = new Date(
				today.getFullYear(),
				countDownDay[1] - 1,
				countDownDay[0]
			);
			if (today.getTime() > cday.getTime()) {
				cday.setFullYear(cday.getFullYear() + 1);
			}
			const diff = cday.getTime() - today.getTime();

			return Math.floor(diff / (1000 * 60 * 60 * 24))
				.toString()
				.split("");
		},
	},
};
</script>

<style lang="scss" scoped>
	#countdown {
		display: flex;
		align-self: center;
		justify-content: center;
		width: 100%;
		padding: 0 15px;

		.number {
			text-align: center;
			font-weight: 800;
			color: white !important;
			margin: 0 3px;
			max-width: 40px !important;
		}
	}

	.daysToGo {
		align-self: center;
	}
</style>
