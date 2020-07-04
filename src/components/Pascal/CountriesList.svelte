<script>
  import axios from "axios";
  import cities from "../../cities.json";
  import { cityNameData } from "../../utils";
  import { onMount } from "svelte";
  import ListItem from "../UI/ListItem.svelte";
  import countriesStore from "../../stores/countries-store.js";
  export let search = "";
  export let selected = "Current Location";
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
  $: console.log(selected);
</script>

<style>
  .countries-list {
    overflow-y: scroll;
    height: 67.5vh;
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

<ul class="countries-list my-8 pr-4">
  <ListItem
    text={'Current Location'}
    on:select
    displaySpan={'Current Location' === selected} />
  {#each countries as country (country)}
    <div class="list-item-container">
      <ListItem
        text={country[0]}
        cities={country[1]}
        on:select
        displaySpan={country[0] === selected} />
    </div>
  {/each}
</ul>
