<script lang="ts">
  import { onMount } from "svelte";
  import { shuffleArray } from "../utils";

  import CountryInfo from "./CountryInfo.svelte";

  import score from "../store.ts";

  let options: Array<any> = [];
  let currentCountry;
  let onAnimate: boolean = false;
  let clickedButton: HTMLElement;
  let countries: Array<any> = [];
  let showCountryData: boolean = false;

  onMount(async () => await getCountry())

  const getCountry = async () => {
    if (countries.length === 0) {
      const response = await fetch('https://restcountries.com/v3.1/all');
      countries = await response.json();
    }

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
    if (onAnimate === true) return;

    if (name === currentCountry.name.common) {
        score.update((s) => s + 1);
        showCountryData = true;
        
    } else {
        onAnimate = true;
        clickedButton.classList.add('wrong')

        setTimeout(() => {
            onAnimate = false;
            clickedButton.removeAttribute('class');
        }, 600);
    }
  }

  const nextCountry = () => {
    options = [];
    getCountry();
    showCountryData = false;
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

    {#if showCountryData}
      <CountryInfo country={currentCountry} on:nextCountry={nextCountry} />
    {/if}
  {:else}
    <div class="loading-wrapper">
      <div class="loading">
        <div class="inner-loading"></div>
      </div>
    </div>
  {/if}
</div>