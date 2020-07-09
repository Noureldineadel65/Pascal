<script>
  import WeatherStore from "../../stores/weather-store.js";
  import axios from "axios";
  import Carousel from "../UI/Carousel.svelte";
  import { extractWeatherInformation, getHour } from "../../utils";
  let list = [];
  let index = 0;
  $: list = $WeatherStore.length ? $WeatherStore[index] : [];
</script>

<style>
  div {
    color: rgb(255, 255, 255);
  }
  .weather-display {
    height: 16.5rem;
    position: fixed;

    bottom: 0;
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
  .tag {
    display: none;
  }
  @media only screen and (min-width: 640px) {
    .weather-display {
      height: 20.5rem;
    }
    .weather {
      width: 14rem;
      height: 14rem;
    }
    .actual {
      font-size: 4.4rem;
      font-weight: bolder;
    }
    .feels-like {
      font-size: 1.4rem;
    }
    .tag {
      display: inline-block;
    }
  }
</style>

<div>
  <div class="weather-display py-8 w-full">
    <div class="weathers">
      <Carousel>
        <div class="slide-1 flex items-center slide">
          {#each list.slice(0, 4) as weather}
            <div
              class="weather px-4 py-2 flex flex-col justify-between
              items-center sm:items-start no-select">
              <div class="weather-day mb-3 text-xl">
                <span class="font-bold">{weather.time.split(':')[0]}</span>
                {weather.time
                  .split(':')[1]
                  .substring(
                    weather.time.split(':')[1].length - 2,
                    weather.time.split(':')[1].length
                  )}
              </div>
              <div class="weather-icon mb-2 sm:hidden">
                <i class="owf owf-{weather.id} owf-4x" />
              </div>
              <div
                class="temperatures text-lg flex items-center center sm:flex-col">
                <div class="actual mr-2 font-bold sm:mr-0">
                  <span>{Math.floor(weather.temp)}°C</span>
                </div>
                <div class="feels-like">
                  <span class="tag">Feels like</span>
                  <span>{Math.floor(weather.feels_like)}°C</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div class="slide-2 flex items-center slide">
          {#each list.slice(4, list.length) as weather}
            <div
              class="weather flex flex-col items-center justify-center no-select
              sm:items-start">
              <div class="weather-day mb-3 text-xl">
                <span class="font-bold">{weather.time.split(':')[0]}</span>
                {weather.time
                  .split(':')[1]
                  .substring(
                    weather.time.split(':')[1].length - 2,
                    weather.time.split(':')[1].length
                  )}
              </div>
              <div class="weather-icon mb-2 sm:hidden">
                <i class="owf owf-{weather.id} owf-4x" />
              </div>
              <div
                class="temperatures text-lg flex items-center center sm:flex-col
                sm:items-center">
                <div class="actual mr-2 font-bold sm:mr-0">
                  <span>{Math.floor(weather.temp)}°C</span>
                </div>
                <div class="feels-like">
                  <span class="tag">Feels like</span>
                  <span>{Math.floor(weather.feels_like)}°C</span>
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
</div>
