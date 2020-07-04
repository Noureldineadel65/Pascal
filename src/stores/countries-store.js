import { writable } from "svelte/store";
import { compareStrings } from "../utils";
const store = writable([]);
Array.prototype.move = function (from, to) {
	this.splice(to, 0, this.splice(from, 1)[0]);
	return this;
};
export default {
	subscribe: store.subscribe,
	setCountries: function (data) {
		store.set(data);
		this.sortCountries();
	},
	// moveToFront: function (item) {
	// 	this.sortCountries();
	// 	store.update((data) => {
	// 		const index = data.findIndex((e) => {
	// 			return compareStrings(e[0], item);
	// 		});
	// 		return [...data].move(index, 0);
	// 	});
	// },
	sortCountries: () => {
		store.update((data) => {
			return data.sort((a, b) => a[0].localeCompare(b[0]));
		});
	},
};
