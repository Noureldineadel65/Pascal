<script>
  import axios from "axios";
  import { flip } from "svelte/animate";
  import cities from "../../cities.json";
  import { cityNameData } from "../../utils";
  import { onMount } from "svelte";
  import ListItem from "../UI/ListItem.svelte";
  import countriesStore from "../../stores/countries-store.js";
  export let search = "";
  export let selected = "Current Location";
  let parent;
  onMount(() => {
    countriesStore.setCountries(cityNameData(cities));
  });
  let countries = [];

  function filterCountries(data) {
    return data.filter(e => e[0].toLowerCase().includes(search.toLowerCase()));
  }
  $: countries = Boolean(search)
    ? filterCountries($countriesStore)
    : $countriesStore;
  let indexes = 20;
</script>

<style>
  .countries-list {
    overflow-y: scroll;

    height: 58.5vh;
  }
  @media only screen and (min-width: 640px) {
    .countries-list {
      height: 67.5vh;
    }
  }
  .countries-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  .countries-list::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  .countries-list::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
</style>

<ul class="countries-list my-8 pr-4" bind:this={parent}>
  <div
    class="list-item-container current-location"
    class:selected={selected
      .toLowerCase()
      .trim() == 'Current Location'.toLowerCase().trim()}>
    <ListItem text={'Current Location'} on:select {selected} />
  </div>
  {#each countries.slice(0, indexes) as country (country)}
    <div
      class="list-item-container"
      class:selected={selected
        .toLowerCase()
        .trim() === country[0].toLowerCase().trim()}
      on:click={() => {
        parent.scrollTop = 0;
      }}
      animate:flip={{ duration: 200 }}>
      <ListItem text={country[0]} cities={country[1]} on:select {selected} />
    </div>
  {/each}
  {#if countries.length >= 20 && countries.slice(0, indexes).length !== countries.length}
    <div class="font-semibold text-xl relative flex justify-center my-8 w-full">
      <button
        class="text-xl font-semibold rounded-md shadow p-6 w-full text-center"
        on:click={() => (indexes += 20)}>
        Show More
      </button>
    </div>
  {/if}
</ul>
