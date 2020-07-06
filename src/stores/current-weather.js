import { writable } from "svelte/store";
const store = writable({
	country: "",
	day: "",
	description: "",
	feels_like: 0,
	humidity: 0,
	icon: "",
	id: 0,
	main: "",
	pressure: 0,
	temp: 0,
	time: "0",
	wind_speed: 0,
});
export default {
	subscribe: store.subscribe,
	setWeather: (data) => {
		store.set(data);
	},
};
