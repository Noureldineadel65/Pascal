import { writable } from "svelte/store";
import { compareStrings } from "../utils";
const store = writable([]);
Array.prototype.moveToStart = function (index) {
	this.splice(0, 0, this.splice(index, 1)[0]);
	return this;
};
export default {
	subscribe: store.subscribe,
	setCountries: function (data) {
		store.set(
			data.map((e) => [
				e[0].trim(),
				{ cities: e[1].cities.map((i) => i.trim()) },
			])
		);
		this.sortCountries();
	},
	moveToFront: function (item) {
		this.sortCountries();
		store.update((data) => {
			return data.moveToStart(
				data.findIndex((e) => compareStrings(e[0], item))
			);
		});
	},
	sortCountries: () => {
		store.update((data) => {
			return data.sort((a, b) =>
				a[0]
					.toLowerCase()
					.trim()
					.localeCompare(b[0].toLowerCase().trim())
			);
		});
	},
};
