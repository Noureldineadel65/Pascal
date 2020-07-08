import { compareStrings, extractWeatherInformation } from "./utils";
import currentWeather from "./stores/current-weather.js";
import cities from "./cities.json";
import WeatherStore from "./stores/weather-store.js";
import countriesStore from "./stores/countries-store.js";
import axios from "axios";
class weatherAPI {
	constructor() {
		this.apiKey = "dd91a9e6a83c49a6f37752ea71c27844";
	}
	async getCurrentCity() {
		try {
			const res = await axios.get("https://geolocation-db.com/json/");
			return res.data.city;
		} catch {
			const res = await this.getCapitalCity(
				cities[Math.floor(Math.random() * cities.length)].country
			);
			return res;
		}
	}
	async init(data) {
		if (compareStrings(data.country, "Current Location")) {
			const res = await this.getCurrentCity();
			const cityRes = await this.getWeatherForCity(res);
			await this.getWeatherDisplay(res);
			currentWeather.setWeather(
				Object.assign({}, cityRes, { city: res })
			);
		} else {
			try {
				if (data.city) {
					const cityRes = await this.getWeatherForCity(data.city);
					currentWeather.setWeather(
						Object.assign({}, cityRes, { city: data.city })
					);
					await this.getWeatherDisplay(data.city);
					return $currentWeather;
				} else {
					const getCapital = await this.getCapitalCity(data.country);

					const cityRes = await this.getWeatherForCity(getCapital);
					currentWeather.setWeather(
						Object.assign({}, cityRes, { city: getCapital })
					);
					await this.getWeatherDisplay(getCapital);
					return $currentWeather;
				}
			} catch {
				return new Error();
			}
		}
	}
	async getCapitalCity(country) {
		const res = await axios.get(
			`https://restcountries.eu/rest/v2/name/${country}`
		);
		return res.data[0].capital;
	}
	async getWeatherDisplay(city) {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
		);
		WeatherStore.setWeatherData(
			res.data.list.map((e) => {
				return extractWeatherInformation(e);
			})
		);
	}
	async getWeatherForCity(city) {
		try {
			const res = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}
		`
			);
			const data = extractWeatherInformation(res.data);
			return data;
		} catch {
			return new Error(`Couldn't get weather for ${city}`);
		}
	}
}
export default (data) => new weatherAPI().init(data);
