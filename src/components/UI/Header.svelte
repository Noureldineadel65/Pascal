<script>
  export let city = "";
  export let country = "";
</script>

<style>
  .add img {
    width: 2.3rem;
  }
  .days img {
    width: 4rem;
  }
  header {
    padding: 2rem 0;
  }
  nav img {
    width: 4rem;
  }
</style>

<header class="flex items-center text-xl text-white justify-between">
  <a href="#" class="add">
    <img src="images/location.svg" />
  </a>
  <div class="name">
    <span class="font-bold uppercase country-capital">{city}</span>
    <span class="uppercase country-name">{country}</span>
  </div>
  <a href="#" class="days">
    <img src="images/menu.svg" />
  </a>
</header>
