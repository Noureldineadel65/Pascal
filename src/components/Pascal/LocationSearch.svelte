<script>
  import Search from "../UI/Search.svelte";
  import Filters from "../UI/Filters.svelte";
  import CountriesList from "./CountriesList.svelte";
</script>

<style>
  .location-search {
    background-color: #fff;
    min-height: 100%;
    width: 100%;
    position: absolute;
    margin-top: 8rem;
    z-index: 10;
  }
  .content {
    padding: 1rem 2rem;
  }
</style>

<main class="location-search bg-white">
  <div class="content mx-auto">
    <Search />
    <Filters />
    <CountriesList />
  </div>

</main>
