import axios from "axios";

const BASE_URL = "https://api.weatherunlocked.com/api";

export default class WeatherUnlocked {
	constructor({ appId, appKey }) {
		this.appId = appId;
		this.appKey = appKey;

		this.agent = axios.create({
			baseURL: BASE_URL,
			headers: {
				accept: "application/json",
			},
			params: {
				app_id: appId,
				app_key: appKey,
			},
		});
	}

	async getSnowReport(resortId) {
		return (await this.agent.get(`/snowreport/${resortId}`)).data;
	}

	async getResortForecast(resortId, params) {
		return (await this.agent.get(`resortforecast/${resortId}`, { params }))
			.data;
	}
}

export const resorts = {
	austria: {
		saalbachHinterglem: 222018,
	},
};
