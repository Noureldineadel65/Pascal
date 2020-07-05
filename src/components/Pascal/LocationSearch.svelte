<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  import Search from "../UI/Search.svelte";
  import selectedOptions from "../../stores/selected-options.js";
  import Filters from "../UI/Filters.svelte";
  import countriesStore from "../../stores/countries-store.js";
  import CountriesList from "./CountriesList.svelte";
  let search = "";
  let selected = "Current Location";
  let cities = [];
  let selectedCity = "";
  let resetFilter = false;
  function handleSelection(e) {
    if (selected === e.detail.name) {
      selected = "Current Location";
      countriesStore.sortCountries();
      selectedOptions.set({ country: "Current Location", city: "" });
    } else {
      cities = [];

      setTimeout(() => {
        selected = e.detail.name;
        cities = e.detail.cities;
        selectedOptions.set({ country: selected, city: "" });
        if (
          selected.trim().toLowerCase() ===
          "Current Location".trim().toLowerCase()
        ) {
          countriesStore.sortCountries();
        } else {
          countriesStore.moveToFront(selected);
        }
      }, 0);
    }
  }
  function handleClose() {
    dispatch("closeLocation");
  }
  function applyChanges() {
    console.log($selectedOptions);
  }
</script>

<style>
  .location-search {
    background-color: #fff;
    height: 90vh;

    width: 100%;
    position: absolute;
    margin-top: 8rem;
    z-index: 10;
  }
  .content {
    padding: 1rem 2rem;
  }
  .actions .action:first-of-type {
    flex: 3;
  }
  .close {
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 50%;
    border: 3px solid #222;
  }
  .close img {
    width: 60%;
  }
</style>

<main class="location-search bg-white overflow-hidden">
  <div class="content mx-auto">
    <Search on:search={e => (search = e.detail)} />
    <div class="actions flex items-center mt-5">
      <div class="action w-full mr-4">
        <Filters
          {cities}
          on:selected={e => {
            selectedCity = e.detail;
            selectedOptions.updateCity(e.detail.trim());
          }}
          on:resetFilter={() => (selectedCity = '')}
          {resetFilter} />
      </div>
      <div class="action font-semibold text-xl relative mr-4">
        <button
          class="text-xl font-semibold rounded-md shadow p-6"
          on:click={applyChanges}>
          Apply Changes
        </button>
      </div>
      <div class="action font-semibold text-xl relative text-white">
        <button
          class="text-xl font-semibold rounded-md shadow close flex
          justify-center items-center"
          on:click={handleClose}>
          <img src="./images/close.svg" />
        </button>
      </div>
    </div>
    <CountriesList on:select={handleSelection} {search} {selected} />
  </div>

</main>
