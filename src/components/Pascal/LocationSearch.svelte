<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  import weatherAPI from "../../api.js";
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
  let loading = false;
  onMount(() => {
    if (!($selectedOptions.country === "Current Location")) {
      cities = $countriesStore.find(e => e[0] === $selectedOptions.country)[1]
        .cities;
      selected = $selectedOptions.country;
      countriesStore.moveToFront($selectedOptions.country);
      if ($selectedOptions.city) {
        console.log($selectedOptions.city);
        selectedCity = $selectedOptions.city;
      }
    }
  });
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
    selectedOptions.set({ country: selected, city: selectedCity });
    dispatch("closeLocation");
  }
  function applyChanges() {
    loading = true;
    weatherAPI($selectedOptions).then(e => {
      loading = false;
      dispatch("closeLocation");
    });
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
  /* .actions .action:first-of-type {
    flex: 3;
  } */
  .close {
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 50%;
    border: 3px solid #222;
  }
  .close img {
    width: 60%;
  }
  .loading {
    width: 2.1rem;
  }
  .actions {
    display: grid !important;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 2rem;
  }
  @media only screen and (min-width: 640px) {
    .actions {
      display: flex !important;
    }
  }
  .actions > div:first-of-type {
    grid-column: 1/-1;
    grid-row: 1/2;
  }
  .actions .action:nth-of-type(2) {
    grid-column: 1/2;
    grid-row: 2/3;
  }
  .actions .action:last-of-type {
    grid-column: 2/3;
    grid-row: 2/3;
    justify-self: center;
    align-self: center;
  }
</style>

<main class="location-search bg-white overflow-hidden">
  <div class="content mx-auto">
    <Search on:search={e => (search = e.detail)} />
    <div class="actions flex items-center mt-5 w-full">
      <div class="action w-full mr-4">
        <Filters
          {cities}
          {selectedCity}
          on:selected={e => {
            selectedCity = e.detail;
            selectedOptions.updateCity(e.detail.trim());
          }}
          on:resetFilter={() => (selectedCity = '')}
          {resetFilter} />
      </div>

      <div class="action font-semibold text-xl relative mr-4 w-full">
        <button
          class="text-xl font-semibold rounded-md shadow p-6 w-full"
          on:click={applyChanges}>
          {#if loading}
            <img src="./images/loading.svg" class="loading" />
          {:else}
            <span>Apply Changes</span>
          {/if}
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
