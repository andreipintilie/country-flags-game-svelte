<script lang="ts">
  import { onMount } from "svelte";
  import score from "../store";

  let options: Array<any> = [];
  let currentCountry;
  let clickedButton: HTMLElement;

  onMount(async () => await getCountry())

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getCountry = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    options = [currentCountry];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      options.push(countries[randomIndex]);
    }

    options = shuffleArray(options);
  }

  const checkCountry = async (name) => {
    if (name === currentCountry.name.common) {
        options = [];
        score.update((s) => s + 1);
        getCountry();
    } else {
        clickedButton.classList.add('wrong')

        setTimeout(() => {
            clickedButton.removeAttribute('class');
        }, 500);
    }
  }
</script>

<div class="container">
  {#if currentCountry}
    <h1 class="guess-title">Guess the country</h1>

    <img
      src={currentCountry.flags.svg}
      alt={currentCountry.cca2}
      class="country-image"
    />

    <div class="buttons">
      {#each options as option}
        <button on:click={(e) => {
            // @ts-ignore
            clickedButton = e.target;

            checkCountry(option.name.common);
        }}>{option.name.common}</button>
      {/each}
    </div>
  {:else}
    <div class="loading-wrapper">
      <div class="loading">
        <div class="inner-loading"></div>
      </div>
    </div>
  {/if}
</div>