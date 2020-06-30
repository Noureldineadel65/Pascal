<script>
  import WeatherStore from "../../stores/weather-store.js";
  import axios from "axios";
  import Carousel from "../UI/Carousel.svelte";
  import { extractWeatherInformation, getHour } from "../../utils";
  import { onMount } from "svelte";
  let list = [];
  let index = 0;
  $: list = $WeatherStore.length ? $WeatherStore[index] : [];
  onMount(() => {
    // axios
    //   .get(
    //     "https://api.openweathermap.org/data/2.5/forecast?q=cairo&units=metric&appid=dd91a9e6a83c49a6f37752ea71c27844"
    //   )
    //   .then(response => {
    //     WeatherStore.setWeatherData(
    //       response.data.list.map(e => {
    //         return extractWeatherInformation(e);
    //       })
    //     );
    //   });
  });
</script>

<style>
  div {
    color: rgb(255, 255, 255);
  }
  .weather-display {
    height: 16.5rem;
    position: absolute;
    bottom: 0;
  }
  .weather {
    box-shadow: 10px 10px 66px -29px rgba(0, 0, 0, 0.75);
  }
  .temperatures {
  }
  span {
    font-family: "MuseoModerno", cursive;
  }
  .weathers {
    padding: 1.5rem 0;
    position: relative;
  }
</style>

<div class="weather-display py-8 w-full">
  <div class="weathers">
    <Carousel>
      <div class="slide-1 flex items-center slide">
        {#each list.slice(0, 4) as weather}
          <div
            class="weather px-4 py-2 flex flex-col items-center justify-center
            no-select">
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
      </div>
      <div class="slide-2 flex items-center slide">
        {#each list.slice(4, list.length - 2) as weather}
          <div
            class="weather flex flex-col items-center justify-center no-select">
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
      </div>

      <!-- <div class="slide-1 flex items-center slide">
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">1</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">2</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">3</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">4</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>

      </div>
      <div class="slide-2 flex items-center slide">
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">6</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">7</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">8</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
        <div
          class="weather flex flex-col items-center justify-center no-select
          svelte-1kbnel3">
          <div class="weather-day mb-3 text-xl svelte-1kbnel3">
            <span class="font-bold svelte-1kbnel3">9</span>
            AM
          </div>
          <div class="weather-icon mb-2 svelte-1kbnel3">
            <i class="owf owf-500 owf-4x svelte-1kbnel3" />
          </div>
          <div
            class="temperatures text-lg flex items-center center svelte-1kbnel3">
            <div class="actual mr-2 font-bold svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
            <div class="feels-link svelte-1kbnel3">
              <span class="svelte-1kbnel3">26°</span>
            </div>
          </div>
        </div>
      </div> -->
    </Carousel>

  </div>
</div>
