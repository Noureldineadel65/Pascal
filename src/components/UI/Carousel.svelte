<script>
  let carousel;
  let isDown = false;
  let startX;
  let scrollLeft;
  let slideIndex = 1;
  function handleWalk(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = x - startX;

    carousel.scrollLeft = scrollLeft - walk;
  }
</script>

<style>
  .carousel :global(.weather) {
    flex: 0 0 20%;
  }

  .carousel {
    width: 95%;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  .carousel::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
    height: 0;
  }
  .dot {
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.274);
    border-radius: 50%;
    position: relative;
  }
  .dots {
    position: absolute;
    display: flex;
    bottom: -1rem;
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
  }
  .dot span {
    width: 0.5rem;
    height: 0.5rem;
    background: rgba(255, 255, 255, 0);
    position: absolute;
    top: 50%;
    border-radius: 50%;
    transition: all 0.3s;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .dot .activeDot {
    background: rgba(255, 255, 255, 1);
  }
</style>

<div
  class="carousel flex items-center mx-auto overflow-x-scroll no-select"
  on:mousemove={handleWalk}
  on:mousedown={e => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }}
  on:mouseup={() => {
    isDown = false;
    if (carousel.scrollLeft <= 221) {
      carousel.scrollLeft = 0;
      slideIndex = 2;
    } else {
      carousel.scrollLeft = carousel.offsetWidth;
      slideIndex = 1;
    }
  }}
  on:mouseleave={() => {
    isDown = false;
    if (carousel.scrollLeft <= 221) {
      carousel.scrollLeft = 0;
      slideIndex = 2;
    } else {
      carousel.scrollLeft = carousel.offsetWidth;
      slideIndex = 1;
    }
  }}
  bind:this={carousel}>
  <slot />
  <div class="dots">
    <div
      class="dot mr-2"
      on:click={() => {
        carousel.scrollLeft = 0;
      }}>
      <span class:activeDot={slideIndex === 1} />
    </div>
    <div
      class="dot"
      on:click={() => {
        carousel.scrollLeft = carousel.offsetWidth;
      }}>
      <span class:activeDot={slideIndex === 2} />
    </div>
  </div>
</div>
