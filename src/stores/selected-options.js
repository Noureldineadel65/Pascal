import { writable } from "svelte/store";
const store = writable({
	country: "Current Location",
	city: "",
});
export default {
	subscribe: store.subscribe,
	set: ({ city, country }) =>
		store.set({ country: country.trim(), city: city.trim() }),
	updateCity: (newCity) => {
		store.update((data) => {
			return Object.assign({}, data, { city: newCity });
		});
	},
};
