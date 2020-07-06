<script>
  import axios from "axios";
  import currentWeather from "./stores/current-weather.js";

  import { extractWeatherInformation } from "./utils";
  import Tailwind from "./Tailwind.svelte";
  import selectedOptions from "./stores/selected-options.js";
  import weatherAPI from "./api.js";
  import Loading from "./components/UI/Loading.svelte";
  import { fly } from "svelte/transition";
  import Nav from "./components/UI/Nav.svelte";
  import LocationSearch from "./components/Pascal/LocationSearch.svelte";
  import WeatherStore from "./stores/weather-store.js";
  import Header from "./components/UI/Header.svelte";
  import Temperature from "./components/Pascal/Temperature.svelte";
  import WeatherDetails from "./components/Pascal/WeatherDetails.svelte";
  import WeatherDisplay from "./components/Pascal/WeatherDisplay.svelte";

  import { onMount } from "svelte";
  let city = "";
  let showLocation = false;
  let showLoading = true;
  onMount(async () => {
    weatherAPI($selectedOptions).then(() => (showLoading = false));
  });
</script>

<style>
  .app {
    height: 100vh;
    width: 100%;
    overflow-y: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  button:focus global {
    outline: none;
  }
</style>

<svelte:head>
  <!-- <script
    src="https://kit.fontawesome.com/8027935937.js"
    crossorigin="anonymous" ✂prettier:content✂="CgogIA==">{}</script> -->
  <title>Pascal | Weather App</title>
</svelte:head>
{#if showLoading}
  <div class="loading-container" transition:fly={{ y: -1500, duration: 500 }}>
    <Loading />
  </div>
{/if}
<div
  class="app"
  style={`background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.719),
        rgba(0, 0, 0, 0.3)
      ),
      url(https://source.unsplash.com/1600x900/?${city});`}>

  {#if showLocation}
    <div class="location-page" transition:fly={{ x: -2000, duration: 500 }}>
      <LocationSearch on:closeLocation={() => (showLocation = false)} />
    </div>
  {/if}
  <main>
    <Nav />
    <div class="container">
      <Header
        city={$currentWeather.city}
        country={$currentWeather.country}
        on:openLocation={() => (showLocation = true)} />
      <div class="flex items-center justify-between w-10/12 mx-auto">
        <Temperature temp={$currentWeather.temp} />
        <WeatherDetails
          main={$currentWeather.main}
          windSpeed={$currentWeather.wind_speed}
          humidity={$currentWeather.humidity}
          icon={$currentWeather.id} />
      </div>
    </div>
    <WeatherDisplay />
  </main>
</div>
