<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { renderAsList } from "../utils";
    import type { CountryData } from "../types";

    export let country: CountryData;

    let isActive: boolean = true;
    const dispatch: (type: string) => void = createEventDispatcher();

    const onNextCountry = (e) => {
        if (e.target !== e.currentTarget) return;

        isActive = false;
        dispatch('nextCountry')
    }
</script>

<div class={`card-wrapper ${isActive ? 'active' : ''}`} on:click={onNextCountry} on:keydown={() => {}} role="button" tabindex="0">
    <div class="card">
        <div class="inline">
            <h1>{country.name.common}</h1>
            <h2>{country.fifa}</h2>
        </div>
        <p>Country in {country.region}</p>
        <br>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <div>Currencies:
            {#each Object.entries(country.currencies) as [short, currency], idx}
                <span>{currency['name']}</span>{renderAsList(country.currencies, idx)}
            {/each}
        </div>
        <div>Languages:
            {#each Object.entries(country.languages) as [short, title], idx}
                <span>{title}</span>{renderAsList(country.languages, idx)}
            {/each}
        </div>
    </div>
</div>