<script lang="ts">
  import FaGithub from "svelte-icons/fa/FaGithub.svelte";
  import FaVolumeUp from "svelte-icons/fa/FaVolumeUp.svelte";
  import FaVolumeMute from "svelte-icons/fa/FaVolumeMute.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let hasAudio = false;

  const handleAudio = () => {
    if (!hasAudio) {
      hasAudio = true;
      dispatch("playSound");
    } else {
      hasAudio = false;
      dispatch("pauseSound");
    }
  };
</script>

<main class="p-2 flex justify-between items-center bg-gray-800 text-white">
  <span class="text-2xl font-bold">RPG-Maker</span>
  <div class="flex space-x-3">
    <button class="w-[35px] h-[35px]" on:click={handleAudio}>
      {#if !hasAudio}
        <FaVolumeMute />
      {:else}
        <FaVolumeUp />
      {/if}
    </button>
    <div class="w-[35px] h-[35px]">
      <FaGithub />
    </div>
  </div>
</main>
