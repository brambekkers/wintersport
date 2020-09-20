import WeatherUnlocked from "../../clients/WeatherUnlocked";
import { appId, apiKey } from "../../config/weather-unlocked-config";

export default {
	state: {
		client: null,
		snowReport: null,
	},
	getters: {
		client: (state) => state.client,
		snowReport: (state) => state.snowReport,
	},
	mutations: {
		client(state, client) {
			state.client = client;
		},
	},
	actions: {
		initializeWeather({ commit }) {
			const client = new WeatherUnlocked(appId, apiKey);
			commit("client", client);
		},
		async refreshSnowReport({ getters, commit }, resortId) {
			const snowReport = await getters.client.getSnowReport(resortId);
			commit("snowReport", snowReport);
		},
	},
};
