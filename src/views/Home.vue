<template>
	<div>
		<v-parallax
			dark
			src="https://www.hubertushof-hinterglemm.at/andsrv/content/files/hinterglemm.83.jpg"
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
import "refreshable/dist/assets/refreshable.css";

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
