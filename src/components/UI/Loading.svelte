<script>
  import { onMount } from "svelte";
  let loadingScreen;
  onMount(() => {
    var txt = "PASCAL";
    txt.split();
    var txt_now = "";
    for (var i = 0; i < txt.length; i++) {
      txt_now += txt[i] + " ";
    }
    var txt_rep = "",
      l = 0;
    while (l < 100) {
      txt_rep += txt_now;
      l++;
    }
    var attribute = document.createAttribute("data-bg");
    attribute.nodeValue = txt_rep;
    loadingScreen.setAttributeNode(attribute);
  });
</script>

<style>
  .loading-screen {
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    z-index: 15;
  }

  .loading-screen::after {
    content: attr(data-bg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    overflow-y: hidden;
    text-align: justify;
    speak: none;
    font-family: inherit;
    font-weight: bolder;
    font-style: italic;
    font-size: 2rem;
    color: rgba(85, 85, 85, 0.219);
  }

  div#wave {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 10rem;
    margin-left: auto;
    margin-right: auto;
    z-index: 15;
  }
  div#wave .dot {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin-right: 3px;
    background: #303131;
    animation: wave 1.3s linear infinite;
  }
  div#wave .dot:nth-child(2) {
    animation-delay: -1.1s;
  }
  div#wave .dot:nth-child(3) {
    animation-delay: -0.9s;
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
    }
    30% {
      transform: translateY(-15px);
    }
  }
</style>

<div
  class="loading-screen flex flex-col justify-center items-center absolute"
  bind:this={loadingScreen}>
  <div id="wave">
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
  </div>
</div>
