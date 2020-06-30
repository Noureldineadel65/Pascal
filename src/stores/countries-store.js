import { List } from "immutable";
import { writable } from "svelte/store";
const store = writable([]);
export default {
	subscribe: store.subscribe,
	setCountries: (data) => {},
};
