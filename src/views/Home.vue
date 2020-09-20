<template>
	<div>
		<v-parallax
			dark
			src="https://upload.wikimedia.org/wikipedia/commons/4/47/Snowboarder_in_flight_%28Tannheim%2C_Austria%29.jpg"
		/>
		<v-col>
			<v-expansion-panels>
				<v-expansion-panel>
					<v-expansion-panel-header>
						Sneeuw
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-simple-table v-if="snowReport">
							<template v-slot:default>
								<tbody>
									<tr>
										<td>Nieuwe sneeuw</td>
										<td>{{ snowReport.newsnow_cm }} cm</td>
									</tr>
									<tr>
										<td>Op de berg</td>
										<td>{{ snowReport.uppersnow_cm }} cm</td>
									</tr>
									<tr>
										<td>In het dal</td>
										<td>{{ snowReport.lowersnow_cm }} cm</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "Home",
	computed: { ...mapGetters(["snowReport"]) },
	methods: { ...mapActions(["refreshSnowReport"]) },
	async mounted() {
		try {
			await this.refreshSnowReport();
		} catch (error) {
			console.error(error);
		}
	},
};
</script>
