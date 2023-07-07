<script>
    import EarthIcon from "../assets/EarthIcon.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const playGame = () => dispatch('gameStart')
</script>

<div class="container">
    <EarthIcon />
    <h1>Country Flags Trivia</h1>
    <button on:click={playGame}>Play</button>
</div>

<style scoped lang="scss">
@use "../scss/mixins" as *;

h1 {
    color: white;
}

button {
    display: block;
    height: 50px;
    width: 170px;
    border-radius: 40px;
    font-weight: bold;
    background-color: transparent;
    border: none;
    border: 1px solid white;
    color: white;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-size: 18px;
    cursor: pointer;
    @include transitions(color, background-color, box-shadow);

    &:hover {
        color: black;
        background-color: white;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    } 
}

div {
    height: 100svh;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 40px;
}
</style>