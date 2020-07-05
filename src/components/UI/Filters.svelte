<script>
  import Filter from "../UI/Filter.svelte";
  export let cities;
  export let resetFilter = false;
</script>

<div class="filters flex w-full">
  <div class="filter-container w-full">
    <Filter
      text="Select City"
      list={cities}
      on:selected
      on:resetFilter
      {resetFilter} />
  </div>
</div>
