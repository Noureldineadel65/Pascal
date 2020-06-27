<script>
  import axios from "axios";
  import { extractWeatherInformation } from "./utils";
  import Tailwind from "./Tailwind.svelte";
  import WeatherStore from "./stores/weather-store.js";
  import Header from "./components/UI/Header.svelte";
  import Temperature from "./components/Pascal/Temperature.svelte";
  import WeatherDetails from "./components/Pascal/WeatherDetails.svelte";
  import WeatherDisplay from "./components/Pascal/WeatherDisplay.svelte";

  import { onMount } from "svelte";
  const city = "toronto";
  let list = [];
  let currentWeather = {};
  onMount(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dd91a9e6a83c49a6f37752ea71c27844
    `
      )
      .then(response => {
        currentWeather = extractWeatherInformation(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    // axios.get(`https://restcountries.eu/rest/v2/capital/${city}`).then(data => {
    //   const { name, capital } = data.data[0];
    //   countryDetail = { name, capital };
    // });
  });
</script>

<style>
  .app {
    height: 100vh;
    width: 100%;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/8027935937.js"
    crossorigin="anonymous">

  </script>
  <title>Pascal | Weather App</title>
</svelte:head>
<div
  class="app"
  style={`background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.719),
        rgba(0, 0, 0, 0.3)
      ),
      url(https://source.unsplash.com/1600x900/?${city});`}>
  <div class="container">
    <Header {city} country={currentWeather.country} />
    <div class="flex items-center justify-between w-10/12 mx-auto">
      <Temperature temp={currentWeather.temp} />
      <WeatherDetails
        main={currentWeather.main}
        windSpeed={currentWeather.wind_speed}
        humidity={currentWeather.humidity} />
    </div>
  </div>
  <WeatherDisplay />
</div>
