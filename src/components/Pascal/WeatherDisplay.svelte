<script>
  import WeatherStore from "../../stores/weather-store.js";
  import axios from "axios";
  import { extractWeatherInformation, getHour } from "../../utils";
  import { onMount } from "svelte";
  let list = [];
  let index = 0;
  $: list = $WeatherStore.length ? $WeatherStore[index] : [];
  $: console.log(list);
  onMount(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=toronto&units=metric&appid=dd91a9e6a83c49a6f37752ea71c27844"
      )
      .then(response => {
        WeatherStore.setWeatherData(
          response.data.list.map(e => {
            return extractWeatherInformation(e);
          })
        );
      });
  });
</script>

<style>
  div {
    color: rgb(56, 56, 56);
  }
  .weather-display {
    height: 14.5rem;
    position: absolute;
    bottom: 0;
  }
  .temperatures {
  }
  span {
    font-family: "MuseoModerno", cursive;
  }
</style>

<div class="weather-display bg-white py-8 w-full">
  <div class="weathers flex items-center justify-between w-10/12 mx-auto">
    {#each list.slice(0, 5) as weather}
      <div class="weather flex flex-col items-center justify-center">
        <div class="weather-day mb-3 text-xl">
          <span class="font-bold">{weather.time.split(':')[0]}</span>
          {weather.time
            .split(':')[1]
            .substring(
              weather.time.split(':')[1].length - 2,
              weather.time.split(':')[1].length
            )}
        </div>
        <div class="weather-icon mb-2">
          <i class="owf owf-{weather.id} owf-4x" />
        </div>
        <div class="temperatures text-lg flex items-center center">
          <div class="actual mr-2 font-bold">
            <span>{Math.floor(weather.temp)}°</span>
          </div>
          <div class="feels-link">
            <span>{Math.floor(weather.feels_like)}°</span>
          </div>
        </div>
      </div>
    {/each}
    <!-- <div class="weather flex flex-col items-center justify-center">
      <div class="weather-day mb-3 text-xl">
        <span class="font-bold">3</span>
        PM
      </div>
      <div class="weather-icon mb-2">
        <i class="owf owf-500 owf-4x" />
      </div>
      <div class="temperatures text-lg flex items-center center">
        <div class="actual mr-2 font-bold">
          <span>6°</span>
        </div>
        <div class="feels-link">
          <span>1°</span>
        </div>
      </div>
    </div>
    <div class="weather flex flex-col items-center justify-center">
      <div class="weather-day mb-3 text-xl">
        <span class="font-bold">4</span>
        PM
      </div>
      <div class="weather-icon mb-2">
        <i class="owf owf-500 owf-4x" />
      </div>
      <div class="temperatures text-lg flex items-center center">
        <div class="actual mr-2 font-bold">
          <span>4°</span>
        </div>
        <div class="feels-link">
          <span>-1°</span>
        </div>
      </div>
    </div>
    <div class="weather flex flex-col items-center justify-center">
      <div class="weather-day mb-3 text-xl">
        <span class="font-bold">5</span>
        PM
      </div>
      <div class="weather-icon mb-2">
        <i class="owf owf-500 owf-4x" />
      </div>
      <div class="temperatures text-lg flex items-center center">
        <div class="actual mr-2 font-bold">
          <span>5°</span>

        </div>
        <div class="feels-link">
          <span>-1°</span>
        </div>
      </div>
    </div>
    <div class="weather flex flex-col items-center justify-center">
      <div class="weather-day mb-3 text-xl">
        <span class="font-bold">6</span>
        PM
      </div>
      <div class="weather-icon mb-2">
        <i class="owf owf-500 owf-4x" />
      </div>
      <div class="temperatures text-lg flex items-center center">
        <div class="actual mr-2 font-bold">
          <span>8°</span>
        </div>
        <div class="feels-link">
          <span>3°</span>
        </div>
      </div>
    </div>
    <div class="weather flex flex-col items-center justify-center">
      <div class="weather-day mb-3 text-xl">
        <span class="font-bold">7</span>
        PM
      </div>
      <div class="weather-icon mb-2">
        <i class="owf owf-500 owf-4x" />
      </div>
      <div class="temperatures text-lg flex items-center center">
        <div class="actual mr-2 font-bold">
          <span>7°</span>
        </div>
        <div class="feels-link">
          <span>2°</span>
        </div>
      </div>
    </div> -->
  </div>
</div>
