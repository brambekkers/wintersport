<template>
	<div>
		<v-img height="33%" src="@/assets/happySkiFriends/sunny.png"></v-img>
		<v-card class="mt-n5 py-2 mx-2" flat elevation="4">
			<v-row>
				<v-col class="pt-0">
					<v-card class="mb-4" flat>
						<v-app-bar flat color="rgba(0, 0, 0, 0)">
							<v-toolbar-title
								class="subtitle-1 font-weight-medium pl-0"
							>
								Snow Report
							</v-toolbar-title>
						</v-app-bar>
						<v-card-text class="pa-0">
							<v-simple-table v-if="snowReport" class="mt-n4">
								<template v-slot:default>
									<tbody>
										<tr>
											<td>Conditions</td>
											<td>{{ snowReport.conditions }}</td>
										</tr>
										<tr>
											<td>Snowfall</td>
											<td>
												{{ snowReport.newsnow_cm }} cm
											</td>
										</tr>
										<tr>
											<td>Mountain</td>
											<td>
												{{ snowReport.uppersnow_cm }} cm
											</td>
										</tr>
										<tr>
											<td>Valley</td>
											<td>
												{{ snowReport.lowersnow_cm }} cm
											</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</v-card-text>
					</v-card>
					<v-divider />
					<v-card class="my-4" flat>
						<v-app-bar flat color="rgba(0, 0, 0, 0)">
							<v-toolbar-title
								class="subtitle-1 font-weight-medium pl-0"
							>
								Weather Forecast
							</v-toolbar-title>
							<v-spacer />
							<v-btn icon @click="toggleDayPart" rounded>
								<v-icon color="primary" v-if="dayPart === 'day'"
									>brightness_5</v-icon
								>
								<v-icon
									v-if="dayPart === 'night'"
									color="primary"
									>brightness_4</v-icon
								>
							</v-btn>
							<v-btn icon @click="toggleMountainPart">
								<v-icon
									color="primary"
									v-if="mountainPart === 'base'"
									>house</v-icon
								>
								<v-icon
									color="primary"
									v-if="mountainPart === 'mid'"
									>grass</v-icon
								>
								<v-icon
									v-if="mountainPart === 'upper'"
									color="primary"
									>terrain</v-icon
								>
							</v-btn>
						</v-app-bar>
						<v-card-text class="pa-0">
							<template>
								<v-carousel
									v-if="weatherForecast"
									v-model="day"
									:light="!this.$vuetify.theme.dark"
									:continuous="false"
									:show-arrows="false"
									hide-delimiter-background
									height="auto"
								>
									<v-carousel-item
										class="mb-16"
										v-for="(forecast,
										i) in weatherForecast.days"
										:key="i"
									>
										<v-simple-table class="mt-n4">
											<template v-slot:default>
												<tbody>
													<tr>
														<td>Date</td>
														<td>
															{{
																forecast[
																	dayPart
																].date
															}}
														</td>
													</tr>
													<tr>
														<td>Conditions</td>
														<td>
															{{
																forecast[
																	dayPart
																][mountainPart]
																	.wx_desc
															}}
														</td>
													</tr>
													<tr>
														<td>Temperature</td>
														<td>
															{{
																forecast[
																	dayPart
																][mountainPart]
																	.temp_avg_c
															}}
															°C
														</td>
													</tr>
													<tr>
														<td>Wind Speed</td>
														<td>
															{{
																forecast[
																	dayPart
																][mountainPart]
																	.windspd_avg_kmh
															}}
															km/h
														</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
									</v-carousel-item>
								</v-carousel>
							</template>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";

	export default {
		name: "Home",
		computed: { ...mapGetters(["snowReport", "weatherForecast"]) },
		methods: {
			...mapActions(["refreshSnowReport", "refreshWeatherForecast"]),
			toggleDayPart() {
				const dayParts = ["day", "night"];
				this.dayPart =
					dayParts[
						(dayParts.indexOf(this.dayPart) + 1) % dayParts.length
					];
			},
			toggleMountainPart() {
				const mountainParts = ["base", "upper"];
				this.mountainPart =
					mountainParts[
						(mountainParts.indexOf(this.mountainPart) + 1) %
							mountainParts.length
					];
			},
		},
		mounted() {
			this.refreshSnowReport();
			this.refreshWeatherForecast();
		},
		data: () => ({
			day: 0,
			dayPart: "day",
			mountainPart: "upper",
		}),
	};
</script>
