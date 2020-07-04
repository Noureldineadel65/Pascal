<script>
  import Filter from "../UI/Filter.svelte";
  export let cities;
</script>

<div class="filters flex w-full">
  <div class="filter-container w-full">
    <Filter text="Select City" list={cities} />
  </div>
</div>
