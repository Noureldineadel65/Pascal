<script>
  import { onMount } from "svelte";
  let carousel;

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
      stopAni();
      return;
    }

    rID = requestAnimationFrame(ani.bind(this, ++cf));
  }

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function lock(e) {
    x0 = unify(e).clientX;
    locked = true;
  }

  function drag(e) {
    e.preventDefault();

    if (locked) {
      let dx = unify(e).clientX - x0,
        f = +(dx / w).toFixed(2);

      carousel.style.setProperty("--i", i - f);
    }
  }

  function move(e) {
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

  function size() {
    w = window.innerWidth;
  }

  size();
  onMount(() => {
    $: console.log(getComputedStyle(carousel).getPropertyValue("--i"));
  });
</script>

<style>
  .carousel :global(.weather) {
    flex: 0 0 20%;
  }

  .carousel {
    --n: 2;
    display: flex;
    align-items: center;
    overflow-y: hidden;
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
  class="carousel flex items-center mx-auto overflow-x-hidden no-select"
  bind:this={carousel}
  on:mousedown={lock}
  on:touchstart={lock}
  on:mousemove={drag}
  on:touchmove={drag}
  on:mouseup={move}
  on:touchend={move}>
  <slot />

</div>
<div class="dots">
  <div class="dot mr-2">
    <span class="activeDot" />
  </div>
  <div class="dot">
    <span />
  </div>
</div>
