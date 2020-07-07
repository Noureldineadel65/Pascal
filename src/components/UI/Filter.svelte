<script>
  import { createEventDispatcher } from "svelte";
  import selectedOptions from "../../stores/selected-options.js";

  const dispatch = createEventDispatcher();
  import { fly } from "svelte/transition";
  export let selectedCity = "";
  export let list = [];
  let listOn = false;
  export let text = "";
  let selected = text;
  export let resetFilter;
  function dispatchSelection(e) {
    dispatch("selected", e.target.textContent);
    selected = e.target.textContent;
    setTimeout(() => {
      listOn = false;
    }, 0);
  }
  function assignSelectedCity() {
    if (selectedCity) {
      selected = selectedCity;
    }
    return selected;
  }
  $: selected = list.length === 0 ? text : assignSelectedCity();
</script>

<style>
  .selections {
    z-index: 10;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .arrow-down,
  .close-filter {
    transition: all 0.3s;
    width: 2rem;
  }
</style>

<svelte:body
  on:click={e => {
    if (listOn) listOn = false;
  }} />
<div class="filter font-semibold text-xl relative" on:click|stopPropagation>
  <div
    class="dropdown flex items-center justify-between bg-white w-fulltext-xl
    py-6 px-8 px-10 rounded-md shadow cursor-pointer"
    on:click={e => {
      if (e.target.classList.contains('close-filter')) {
        selected = text;
        dispatch('resetFilter');
        selectedOptions.updateCity('');
      } else {
        listOn = !listOn;
      }
    }}>
    <div class="current-selected">{selected}</div>
    {#if selected !== text}
      <img
        src="./images/close.svg"
        class:rotate={listOn}
        class="close-filter ml-4" />
    {:else}
      <!-- <i class="fas fa-angle-down" class:rotate={listOn} /> -->
      <img
        src="./images/arrow-down.svg"
        class:rotate={listOn}
        class="arrow-down ml-4" />
    {/if}

  </div>
  {#if listOn && list && list.length}
    <ul
      class="bg-white mt-4 absolute p-8 rounded-md shadow selections w-full"
      transition:fly={{ y: -20, duration: 200 }}
      on:click|stopPropagation={() => (listOn = true)}>
      {#each list as item, i}
        <li
          class="cursor-pointer selection-item"
          class:mb-2={i !== list.length - 1}
          on:click={dispatchSelection}>
          {item}
        </li>
      {/each}
    </ul>
  {/if}
</div>
