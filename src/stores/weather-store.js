import { writable } from "svelte/store";
import { organizeWeatherData } from "../utils";
const store = writable([]);
export default {
	subscribe: store.subscribe,
	setWeatherData: (data) => {
		const copyData = [...data];
		const organizedData = [];
		const days = [];
		copyData.forEach((i) => {
			if (days.indexOf(i.day) === -1) {
				days.push(i.day);
			}
		});

		days.forEach((e) => {
			organizedData.push({
				day: e,
				data: copyData.filter((i) => i.day === e),
			});
		});
		store.set(organizeWeatherData(organizedData));
	},
};
