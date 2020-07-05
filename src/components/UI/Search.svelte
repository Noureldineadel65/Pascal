<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  const dispatch = createEventDispatcher();
  let displayClose = false;
  let input;
  function handleSearch(e) {
    dispatch("search", e.target.value);
    if (Boolean(e.target.value)) {
      displayClose = true;
    } else {
      displayClose = false;
    }
  }
</script>

<style>
  input {
    font-size: 1.5rem;
    border: 5px solid rgba(104, 104, 104, 0.438);
    width: 100%;
    padding: 1.3rem 2.3rem;
    border-radius: 30px;
    padding-right: 6rem;
  }
  .search-icon {
    background-color: rgba(34, 34, 34, 0.863);
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 50%;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .search-icon-white {
    background-color: #fff !important;
  }
  img {
    width: 60%;
  }
</style>

<div class="search mx-auto relative">
  <input
    type="text"
    placeholder="Search countries..."
    on:input={handleSearch}
    bind:this={input} />
  {#if displayClose}
    <button
      class="search-icon flex items-center justify-center absolute
      cursor-pointer"
      on:click={() => {
        dispatch('search', '');
        input.value = '';
        displayClose = false;
      }}
      transition:scale={{ duration: 300 }}>
      <img src="./images/close2.svg" />
    </button>
  {:else}
    <div
      class="search-icon search-icon-white flex items-center justify-center
      absolute cursor-pointer"
      transition:scale={{ duration: 300 }}>
      <img src="./images/search.svg" />
    </div>
  {/if}
</div>
