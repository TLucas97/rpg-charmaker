<script lang="ts">
  import Header from "./lib/Header.svelte";
  import CharMaker from "./lib/CharMaker/CharMenu.svelte";
  import Footer from "./lib/Footer.svelte";

  let audio = new Audio("./sounds/rpg-bg-sound.mp3");

  const playSound = () => {
    audio.loop = true;
    audio.play();
  };

  const pauseSound = () => {
    audio.pause();
  };
</script>

<main
  class="bg-[url('http://twistedsifter.com/wp-content/uploads/2013/05/animated-gifs-of-fighting-game-backgrounds-25.gif')] bg-no-repeat bg-cover w-full font-source-code-pro"
>
  <Header on:playSound={playSound} on:pauseSound={pauseSound} />
  <div class="opacity-90">
    <CharMaker />
  </div>
  <Footer />
</main>
