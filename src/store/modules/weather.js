import WeatherUnlocked, { resorts } from "../../clients/WeatherUnlocked";
import config from "../../config/weather-unlocked-config";

export default {
	state: {
		client: new WeatherUnlocked(config),
		snowReport: null,
		weatherForecast: null,
	},

	getters: {
		client: (state) => state.client,
		snowReport: (state) => state.snowReport,
		weatherForecast: (state) => state.weatherForecast,
	},

	mutations: {
		snowReport(state, snowReport) {
			state.snowReport = snowReport;
		},
		weatherForecast(state, weatherForecast) {
			state.weatherForecast = weatherForecast;
		},
	},

	actions: {
		async refreshSnowReport({ getters, commit }) {
			const snowReport = await getters.client.getSnowReport(
				resorts.austria.saalbachHinterglem
			);

			commit("snowReport", snowReport);
		},

		async refreshWeatherForecast({ getters, commit }) {
			const weatherForecast = await getters.client.getResortForecast(
				resorts.austria.saalbachHinterglem,
				{ hourly_interval: 12 }
			);

			weatherForecast.days = weatherForecast.forecast.reduce(
				(perDay, value, index) => {
					const dayIndex = Math.floor(index / 2);
					const dayPart = index % 2 === 0 ? "day" : "night";

					if (!perDay[dayIndex]) {
						perDay[dayIndex] = {};
					}

					perDay[dayIndex][dayPart] = value;

					return perDay;
				},
				[]
			);

			commit("weatherForecast", weatherForecast);
		},
	},
};
