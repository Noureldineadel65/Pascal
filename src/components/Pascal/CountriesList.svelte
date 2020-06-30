<script>
  import axios from "axios";
  import { onMount } from "svelte";
  let countries = {};
  onMount(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.min.json"
      )
      .then(data => (countries = data.data));
  });
</script>

<style>
  .country {
    font-size: 1.9rem;
    background-color: rgba(202, 202, 202, 0.075);
    padding: 2rem;
    box-shadow: 10px 0px 49px -36px rgba(0, 0, 0, 0.63);
  }
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
  <li class="country mb-2">Current Location</li>
  {#each Object.keys(countries) as country (country)}
    <li class="country mb-2">{country}</li>
  {/each}
</ul>
