<script>
  import axios from "axios";
  import { cityNameData } from "../../utils";
  import { onMount } from "svelte";
  import ListItem from "../UI/ListItem.svelte";
  import countriesStore from "../../stores/countries-store.js";
  onMount(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.min.json"
      )
      .then(data => {
        countriesStore.setCountries(cityNameData(data.data));
      });
  });
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

<ul class="countries-list my-8">
  <!-- <li class="country mb-2">
    Current Location
    <span class="check">
      <img src="./images/check.svg" />
    </span>
  </li> -->
  <ListItem text={'Current Location'} />
  {#each $countriesStore as country, i (country)}
    <div class="list-item-container">
      <ListItem text={country[0]} />
    </div>
  {/each}
</ul>
