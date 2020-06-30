<script>
  import Filter from "../UI/Filter.svelte";
  let citiesList = [];
  let regionsList = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
</script>

<div class="filters flex mt-5">
  <div class="filter-container mr-8 w-full">
    <Filter text="Filter Region" list={regionsList} />
  </div>
  <div class="filter-container w-full">
    <Filter text="Select City" list={citiesList} />
  </div>
</div>
