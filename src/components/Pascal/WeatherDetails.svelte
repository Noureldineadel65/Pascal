<script>
  export let main = "";
  export let windSpeed = "";
  export let humidity = "";
  export let icon = "200";
</script>

<style>
  i {
    color: #fff !important;
  }
  li {
    color: #fff;
    display: flex;
    align-items: center;
  }
  li span {
    font-size: 1.2rem;
  }
  li img {
    width: 2.3rem;
  }
  .number {
    font-family: "MuseoModerno", cursive;
    font-weight: bolder;
  }
</style>

<div class="weather-details">
  <ul c lass="details-list">
    <li class="mb-4">
      <i class={`owf owf-${icon} owf-4x mr-3`} />
      <span>{main}</span>
    </li>
    <li class="mb-4">
      <img src="images/wind.svg" class="mr-3" />
      <span>
        <span class="number">{windSpeed}</span>
        mph
      </span>
    </li>
    <li>
      <img src="images/humidity.svg" class="mr-3" />
      <span>
        <span class="number">{humidity}%</span>
      </span>
    </li>
  </ul>
</div>
