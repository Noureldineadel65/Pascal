<script>
  import axios from "axios";
  import moment from "moment";
  import Tailwind from "./Tailwind.svelte";
  import Header from "./components/UI/Header.svelte";
  import Temperature from "./components/Pascal/Temperature.svelte";
  import WeatherDetails from "./components/Pascal/WeatherDetails.svelte";
  import WeatherDisplay from "./components/Pascal/WeatherDisplay.svelte";

  import { onMount } from "svelte";
  const city = "london";
  let list = [];
  onMount(() => {
    //     axios
    //       .get(
    //         `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=dd91a9e6a83c49a6f37752ea71c27844
    // `
    //       )
    //       .then(response => {
    //         list = response.data.list.map(e => {
    //           const { main, description, icon } = e.weather[0];
    //           const { temp, pressure, humidity } = e.main;
    //           const wind_speed = e.wind.speed;
    //           const time = moment(e.dt_text).format("h:mm A");
    //           const day = moment(e.dt_text).format("dddd");
    //           return {
    //             main,
    //             description,
    //             icon,
    //             temp,
    //             pressure,
    //             humidity,
    //             wind_speed,
    //             time,
    //             day
    //           };
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
  });
  $: console.log(list);
</script>

<style>
  .app {
    height: 100vh;
    width: 100%;
    background: linear-gradient(
        to bottom,
        rgba(56, 167, 231, 1),
        rgb(56, 167, 231, 0.3)
      ),
      url(https://cdn.welcometothejungle.co/uploads/article/image/0055/155870/Amsterdam-2.jpg);
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
<div class="app">
  <div class="container">
    <Header />
    <div class="flex items-center justify-between w-10/12 mx-auto">
      <Temperature />
      <WeatherDetails />
    </div>
  </div>
  <WeatherDisplay />
</div>
