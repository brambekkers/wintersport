import axios from 'axios'

const BASE_URL = 'https://api.weatherunlocked.com/api'

export default class WeatherUnlocked {
    constructor({ appId, apiKey }) {
        this.appId = appId
        this.apiKey = apiKey

        this.agent = axios.create({
            baseURL: BASE_URL,
            headers: {
                accept: 'application/json',
            }
        })

        this.agent.interceptors.request.use(config => ({
            ...config,
            params: {
                ...params,
                app_id: appId,
                api_key: apiKey,
            },
        }))
    }

    async getSnowReport(resortId) {
        return await this.agent.get(`/snowreport/${resortId}`)
    }
}