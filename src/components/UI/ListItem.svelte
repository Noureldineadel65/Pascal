<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { removeDataAttribute } from "../../utils";
  import { scale } from "svelte/transition";

  import countriesStore from "../../stores/countries-store.js";
  let listItem;
  const dispatch = createEventDispatcher();
  export let selected;
  export let text = "";
  let displaySpan = false;
  export let cities = { cities: [] };
  function selectCountry(e) {
    dispatch("select", {
      name: e.target.textContent,
      cities: cities ? cities.cities : cities
    });
  }
  $: displaySpan = selected.toLowerCase().trim() == text.toLowerCase().trim();
</script>

<style>
  .country {
    font-size: 1.9rem;
    background-color: rgba(202, 202, 202, 0.075);
    padding: 2rem;
    box-shadow: 10px 0px 49px -36px rgba(0, 0, 0, 0.63);
    cursor: pointer;
    transition: all 0.3s;
  }
  .country:hover {
    /* transform: translateX(2rem); */
  }
  .check {
    background-color: rgb(0, 223, 193);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;

    top: 50%;
    transform: translateY(-50%);
    right: 2rem;
  }
  .check img {
    width: 80%;
  }
  .country[data-selected="true"] {
    /* border-right: 4px solid #222; */
    /* margin-right: 2rem; */
  }
</style>

<li
  class="country mb-2 relative"
  on:click={selectCountry}
  bind:this={listItem}
  data-selected="false">
  {text}
  {#if displaySpan}
    <div
      class="check absolute flex items-center justify-center"
      transition:scale={{ duration: 300 }}>
      <img src="./images/check.svg" />
    </div>
  {/if}
</li>
