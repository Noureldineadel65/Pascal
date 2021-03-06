<script>
  import { onMount } from "svelte";
  let carousel;
  let selectedIndex = 1;
  let innerWidth = 0;
  $: transition = innerWidth >= 768 ? "transform .3s" : "none";
  onMount(() => {
    innerWidth = window.innerWidth;
  });
  const NF = 30,
    TFN = {
      linear: function(k) {
        return k;
      },
      "ease-in": function(k, e = 1.675) {
        return Math.pow(k, e);
      },
      "ease-out": function(k, e = 1.675) {
        return 1 - Math.pow(1 - k, e);
      },
      "ease-in-out": function(k) {
        return 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);
      }
    };

  let i = 0,
    x0 = null,
    locked = false,
    w,
    ini,
    fin,
    rID = null,
    anf;
  function switchedSelectedIndex() {
    const property = getComputedStyle(carousel).getPropertyValue("--i");
    if (!isNaN(property)) {
      selectedIndex = property == "" || property == 0 ? 1 : 2;
    }
  }
  function stopAni() {
    cancelAnimationFrame(rID);
    rID = null;
  }

  function ani(cf = 0) {
    carousel.style.setProperty(
      "--i",
      ini + (fin - ini) * TFN["ease-out"](cf / anf)
    );

    if (cf === anf) {
      switchedSelectedIndex();
      stopAni();
      return;
    }

    rID = requestAnimationFrame(ani.bind(this, ++cf));
  }

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }
  function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix =
      style.transform || style.webkitTransform || style.mozTransform;

    // No transform property. Simply return 0 values.
    if (matrix === "none") {
      return {
        x: 0,
        y: 0,
        z: 0
      };
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes("3d") ? "3d" : "2d";
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === "2d") {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      };
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === "3d") {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      };
    }
  }
  function lock(e) {
    x0 = unify(e).clientX;
    locked = true;
  }

  function drag(e) {
    e.preventDefault();
    if (window.innerWidth <= 768) {
      if (locked) {
        let dx = unify(e).clientX - x0,
          f = +(dx / w).toFixed(2);

        carousel.style.setProperty("--i", i - f);
      }
    }
  }

  function move(e) {
    if (window.innerWidth <= 768) {
      if (locked) {
        let dx = unify(e).clientX - x0,
          s = Math.sign(dx),
          f = +((s * dx) / w).toFixed(2);

        ini = i - s * f;

        if ((i > 0 || s < 0) && (i < 2 - 1 || s > 0) && f > 0.2) {
          i -= s;
          f = 1 - f;
        }

        fin = i;
        anf = Math.round(f * NF);
        ani();
        x0 = null;
        locked = false;
      }
    }
  }

  function size() {
    w = window.innerWidth;
  }

  size();
</script>

<style>
  .carousel {
    --n: 2;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    width: calc(var(--n) * 100%);
    transform: translate(calc(var(--i, 0) / var(--n) * -100%));
  }
  .carousel :global(.slide) {
    width: 100%;
    width: calc(100% / 2);
    user-select: none;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
  .dot {
    width: 1.3rem;
    height: 1.3rem;
    background: rgba(255, 255, 255, 0.274);
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
    background: rgb(255, 255, 255);
  }

  .carousel-container {
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
  }
  @media only screen and (min-width: 768px) {
    .carousel-container {
      width: 70%;
      margin-left: 10%;
    }
    .dots {
      display: none;
    }
    div.desktop-switches {
      display: flex;
    }
  }
  .desktop-switches {
    position: absolute;
    top: 50%;
    right: -2rem;
    transform: translateY(-50%);
    margin-right: 10%;
    display: none;
  }
  .left-arrow,
  .right-arrow {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.397);
    cursor: pointer;
  }
  .left-arrow:hover,
  .right-arrow:hover {
    background-color: rgba(255, 255, 255, 0.555);
  }
  .left-arrow img,
  .right-arrow img {
    width: 3rem;
  }
</style>

<svelte:window bind:innerWidth />
<div class="carousel-container">
  <div
    class="carousel flex items-center overflow-x-hidden no-select"
    bind:this={carousel}
    on:mousedown={lock}
    on:touchstart={lock}
    on:mousemove={drag}
    on:touchmove={drag}
    on:mouseup={move}
    on:touchend={move}
    style="transition: {transition}">
    <slot />

  </div>
  <div class="dots sm:hidden">
    <div class="dot mr-2">
      <span
        class:activeDot={selectedIndex === 1}
        on:click={e => {
          carousel.style.setProperty('--1', 0);
          move(e);
        }} />
    </div>
    <div class="dot">
      <span class:activeDot={selectedIndex === 2} on:click={e => {}} />
    </div>
  </div>
  <div class="desktop-switches flex items-center">
    <div
      class="left-arrow mr-4 flex items-center justify-center"
      on:click={() => {
        carousel.style.setProperty('--i', 0);
      }}>
      <img src="./images/left-arrow.svg" />
    </div>
    <div
      class="right-arrow flex items-center justify-center"
      on:click={() => {
        carousel.style.setProperty('--i', 1);
      }}>
      <img src="./images/right-arrow.svg" />
    </div>
  </div>
</div>
