<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function handleSearch(e) {
    dispatch("search", e.target.value);
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
  img {
    width: 40%;
  }
</style>

<div class="search mx-auto relative">
  <input
    type="text"
    placeholder="Search countries..."
    on:keyup={handleSearch} />
  <div class="search-icon flex items-center justify-center absolute">
    <img src="./images/search.svg" />
  </div>
</div>
