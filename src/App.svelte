<script>
  import Game from "./lib/Game.svelte";
  import Score from "./lib/Score.svelte";
  import Menu from "./lib/Menu.svelte";

  let playing = false;
</script>

<main>
  {#if playing}
    <Score />
    <Game />
  {:else}
    <Menu on:gameStart={() => playing = true} />
  {/if}
</main>