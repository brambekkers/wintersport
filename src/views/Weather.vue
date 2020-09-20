<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card class="mb-4">
					<v-app-bar flat color="rgba(0, 0, 0, 0)">
						<v-toolbar-title class="title pl-0">
							Snow Report
						</v-toolbar-title>
					</v-app-bar>
					<v-card-text>
						<v-simple-table v-if="snowReport">
							<template v-slot:default>
								<tbody>
									<tr>
										<td>Conditions</td>
										<td>{{ snowReport.conditions }}</td>
									</tr>
									<tr>
										<td>Snowfall</td>
										<td>{{ snowReport.newsnow_cm }} cm</td>
									</tr>
									<tr>
										<td>Mountain</td>
										<td>{{ snowReport.uppersnow_cm }} cm</td>
									</tr>
									<tr>
										<td>Valley</td>
										<td>{{ snowReport.lowersnow_cm }} cm</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
				<v-card class="mb-4">
					<v-app-bar flat color="rgba(0, 0, 0, 0)">
						<v-toolbar-title class="title pl-0">
							Weather Forecast
						</v-toolbar-title>
						<v-spacer />
						<v-btn icon @click="toggleDayPart">
							<v-icon v-if="dayPart === 'day'">brightness_5</v-icon>
							<v-icon v-if="dayPart === 'night'">brightness_4</v-icon>
						</v-btn>
						<v-btn icon @click="toggleMountainPart">
							<v-icon v-if="mountainPart === 'base'">house</v-icon>
							<v-icon v-if="mountainPart === 'mid'">grass</v-icon>
							<v-icon v-if="mountainPart === 'upper'">terrain</v-icon>
						</v-btn>
					</v-app-bar>
					<v-card-text>
						<template>
							<v-carousel
								v-if="weatherForecast"
								v-model="day"
								light
								:continuous="false"
								:cycle="cycle"
								:show-arrows="false"
								hide-delimiter-background
								height="auto"
							>
								<v-carousel-item
									class="mb-16"
									v-for="(forecast, i) in weatherForecast.days"
									:key="i"
								>
									<v-simple-table>
										<template v-slot:default>
											<tbody>
												<tr>
													<td>Date</td>
													<td>
														{{ forecast[dayPart].date }}
													</td>
												</tr>
												<tr>
													<td>Conditions</td>
													<td>
														{{ forecast[dayPart][mountainPart].wx_desc }}
													</td>
												</tr>
												<tr>
													<td>Temperature</td>
													<td>
														{{ forecast[dayPart][mountainPart].temp_avg_c }}
														°C
													</td>
												</tr>
												<tr>
													<td>Wind Speed</td>
													<td>
														{{
															forecast[dayPart][mountainPart].windspd_avg_kmh
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
	</v-container>
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
				dayParts[(dayParts.indexOf(this.dayPart) + 1) % dayParts.length];
		},
		toggleMountainPart() {
			const mountainParts = ["base", "upper"];
			this.mountainPart =
				mountainParts[
					(mountainParts.indexOf(this.mountainPart) + 1) % mountainParts.length
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
