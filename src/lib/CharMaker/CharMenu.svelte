<script lang="ts">
  import CharForms from "./CharForms.svelte";
  import CharList from "./CharList.svelte";

  let currentState: string = "mainMenu";
</script>

<main class="w-full h-[90vh] flex items-center justify-center animate-fade">
  {#if currentState === "mainMenu"}
    <div class="flex space-x-5 animate-fade">
      <button
        class="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition ease-in-out"
        on:click={() => (currentState = "createNewCharacter")}
      >
        Criar novo personagem
      </button>
      <button
        class="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition ease-in-out"
        on:click={() => (currentState = "myCharactersList")}
      >
        Meus personagens
      </button>
    </div>
  {:else if currentState === "createNewCharacter"}
    <CharForms
      on:returnToMainMenu={() => (currentState = "mainMenu")}
      on:updateCharactersList={() => (currentState = "myCharactersList")}
    />
  {:else if currentState === "myCharactersList"}
    <CharList
      on:returnToMainMenu={() => (currentState = "mainMenu")}
      on:createNewCharacter={() => (currentState = "createNewCharacter")}
    />
  {/if}
</main>
