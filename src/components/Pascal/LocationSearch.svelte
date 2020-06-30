<script>
  import Search from "../UI/Search.svelte";
  import Filters from "../UI/Filters.svelte";
  import CountriesList from "./CountriesList.svelte";
  let search = "";
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
</style>

<main class="location-search bg-white overflow-hidden">
  <div class="content mx-auto">
    <Search on:search={e => console.log(e.detail)} />
    <Filters />
    <CountriesList />
  </div>

</main>
