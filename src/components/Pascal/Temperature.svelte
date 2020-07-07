<script>
  export let temp = "00";
  let tempratureDisplay = "";
  let typeOfTemp = "C";
  $: tempratureDisplay = `${Math.floor(temp)}°${typeOfTemp}`;
  function getFahrenheitFromCelsius(celsius) {
    return celsius * (9 / 5) + 32;
  }

  function getCelsiusFromFahrenheit(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
  }
  function changeTemp() {
    if (typeOfTemp === "C") {
      typeOfTemp = "F";
      temp = getFahrenheitFromCelsius(temp);
    } else {
      typeOfTemp = "C";
      temp = getCelsiusFromFahrenheit(temp);
    }
  }
</script>

<style>
  h1 {
    font-size: 8.1rem;
    font-family: "MuseoModerno", cursive;
  }
</style>

<h1 class="text-white mr-4" on:click={changeTemp}>{tempratureDisplay}</h1>
