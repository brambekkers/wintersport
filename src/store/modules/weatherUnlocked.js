import WeatherUnlocked, { resorts } from "../../clients/WeatherUnlocked";
import config from "../../config/weather-unlocked-config";

export default {
	state: {
		client: new WeatherUnlocked(config),
		snowReport: null,
	},
	getters: {
		client: (state) => state.client,
		snowReport: (state) => state.snowReport,
	},
	mutations: {
		snowReport(state, snowReport) {
			state.snowReport = snowReport;
		},
	},
	actions: {
		async refreshSnowReport({ getters, commit }) {
			const snowReport = await getters.client.getSnowReport(
				resorts.austria.saalbachHinterglem
			);

			commit("snowReport", snowReport);
		},
	},
};
