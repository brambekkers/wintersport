<template>
	<CardTemplate cols="12" sm="6" lg="4" xl="3" height="200px">
		<!-- Front of card -->
		<template v-slot:front>
			<div id="countdown-container">
				<div id="countdown" class="pa-0">
					<v-card class="number" light>
						<span class="hanger hanger-left"></span>
						<span class="hanger hanger-right"></span>
						<span class="topBar"></span>
						<p>{{ daysToGo }}</p>
					</v-card>
					<v-card class="daysToGo text-h4">
						<p>Days to go</p>
					</v-card>
				</div>
				<v-img
					class="petunia"
					src="@/assets/happySkiFriends/Petunia.png"
					alt="Petunia"
					contain
				/>
			</div>
		</template>
		<!-- Back of card -->
		<template v-slot:back>
			<p>countDown</p>
		</template>
	</CardTemplate>
</template>

<script>
	import CardTemplate from "@/components/Home-card-template.vue";

	export default {
		components: { CardTemplate },
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

				return Math.floor(diff / (1000 * 60 * 60 * 24));
			},
		},
	};
</script>

<style lang="scss" scoped>
	#countdown-container {
		height: 100%;
		position: relative;
		padding: 1rem;

		#countdown {
			top: 50%;
			transform: translateY(-50%);
			width: 50%;
			position: absolute;
			display: flex;
			text-align: center;
			z-index: 1;

			div {
				font-size: 2rem;
				font-weight: 600;
				display: flex;
				justify-content: center;
				align-items: center;

				p {
					margin: 0;
				}
			}

			.number {
				position: relative;
				flex: 3;
				flex-direction: column;
				min-height: 90px;
				justify-content: flex-start;

				p {
					padding: 1rem;
					min-height: 50% !important;
					display: flex;
					align-items: center;
				}

				.topBar {
					min-height: 30% !important;
					width: 100%;
					background: #ed1b24;
				}

				.hanger {
					position: absolute;
					top: -8%;
					height: 20%;
					width: 6%;
					border-radius: 25%;
					z-index: 2;
					background: #202028 !important;
				}

				.hanger-left {
					left: 20%;
				}
				.hanger-right {
					right: 20%;
				}
			}

			.daysToGo {
				padding: 1rem;
				flex: 4;
				background: #202028 !important;
				color: white;
				line-height: 1.8rem;
				border-radius: 0 4px 4px 0;
			}
		}

		.petunia {
			position: absolute;
			height: 100%;
			right: 1rem;
			top: 0;
			width: 50%;
			z-index: 2;
		}
	}
</style>
