import { compareStrings, extractWeatherInformation } from "./utils";
import currentWeather from "./stores/current-weather.js";
import axios from "axios";
class weatherAPI {
	constructor() {}
	async getCurrentWeather() {
		const res = await axios.get("https://geolocation-db.com/json/");
		return res.data.city;
	}
	async init(data) {
		if (compareStrings(data.country, "Current Location")) {
			const res = await this.getCurrentWeather();
			const cityRes = await this.getWeatherForCity(res);
			currentWeather.setWeather(
				Object.assign({}, cityRes, { city: res })
			);
		} else {
			try {
				const cityRes = await this.getWeatherForCity(data.city);
				currentWeather.setWeather(
					Object.assign({}, cityRes, { city: data.city })
				);
				return $currentWeather;
			} catch {
				return new Error();
			}
		}
	}
	async getWeatherForCity(city) {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dd91a9e6a83c49a6f37752ea71c27844
    `
		);
		const data = extractWeatherInformation(res.data);
		return data;
	}
}
export default (data) => new weatherAPI().init(data);
