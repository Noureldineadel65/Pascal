<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { fly } from "svelte/transition";
  export let list = [];
  let listOn = false;
  export let text = "";
  let selected = text;
  function dispatchSelection(e) {
    dispatch("selected", e.target.textContent);
    selected = e.target.textContent;
    setTimeout(() => {
      listOn = false;
    }, 0);
  }
</script>

<style>
  .selections {
    bottom: -17.5rem;
    z-index: 10;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .fa-angle-down {
    transition: all 0.3s;
  }
</style>

<svelte:body
  on:click={e => {
    if (listOn) listOn = false;
  }} />
<div
  class="filter lg:w-1/6 font-semibold text-xl relative w-full"
  on:click|stopPropagation>
  <div
    class="dropdown flex items-center justify-between bg-white w-fulltext-xl p-6
    px-10 rounded-md shadow cursor-pointer"
    on:click={e => {
      if (e.target.classList.contains('close-filter')) {
        selected = text;
        dispatch('resetFilter');
      } else {
        listOn = !listOn;
      }
    }}>
    <div class="current-selected">{selected}</div>
    {#if selected !== text}
      <i class="fas fa-times close-filter" />
    {:else}
      <i class="fas fa-angle-down" class:rotate={listOn} />
    {/if}

  </div>
  {#if listOn && list.length}
    <ul
      class="bg-white static mt-4 lg:mt-0 lg:absolute w-full p-8 rounded-md
      shadow selections"
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
      <!-- <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Africa
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Americas
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Asia
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Europe
      </li>
      <li class="cursor-pointer selection-item" on:click={dispatchSelection}>
        Oceania
      </li> -->
    </ul>
  {/if}
</div>
