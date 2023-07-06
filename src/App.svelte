<script lang="ts">
  import { onMount } from "svelte";

  let options = [];
  let currentCountry;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onMount(async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    options.push(currentCountry);

    for(let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      options.push(countries[randomIndex]);
    }

    shuffleArray(options);
  })

  const checkCountry = (name) => {
    if (name === currentCountry.name.common) console.log('corect');
  }
</script>

<main>
  {#if currentCountry}
    <h1>Guess the country</h1>
    <img src={`https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${currentCountry.cca2.toLowerCase()}.svg`} alt={currentCountry.cca2}>
    <br><br>

    {#each options as option}
      <button on:click={() => checkCountry(option.name.common)}>{option.name.common}</button><br><br>
    {/each}

  {:else}
    <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="">
  {/if}
</main>