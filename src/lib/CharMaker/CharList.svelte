<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import FaWindowClose from "svelte-icons/fa/FaWindowClose.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import Modal from "../Modal.svelte";
  import DiceLoader from "../DiceLoader.svelte";

  const dispatch = createEventDispatcher();

  interface CharacterBody {
    name: string;
    age: string;
    class: string;
    inventory: [];
    story: string;
    avatarLink?: string;
  }

  let charactersList: any = [];
  let selectedCharacter: CharacterBody;
  let selectedCharacterModalView: boolean = false;
  let diceLoading: boolean = false;
  let randomNumber: number = 0;
  let diceRolled: boolean = false;

  const returnToMainMenu = () => {
    dispatch("returnToMainMenu");
  };

  const loadCharactersFromLocalStorage = () => {
    const characters = localStorage.getItem("charactersList");
    if (characters) {
      charactersList = JSON.parse(characters);
    }
    return [];
  };

  const filterSelectedCharacter = (uuid: string) => {
    const filteredCharacter = charactersList.filter((character: any) => {
      return character.uuid === uuid;
    });
    selectedCharacter = filteredCharacter[0];
    selectedCharacterModalView = true;
  };

  const getRandomNumberBetweenOneAndTwenty = () => {
    diceLoading = true;
    setTimeout(() => {
      diceLoading = false;
      diceRolled = true;
    }, 2000);
    randomNumber = Math.floor(Math.random() * 20) + 1;
  };

  onMount(() => {
    loadCharactersFromLocalStorage();
  });
</script>

<main class="animate-fade w-[900px] bg-white px-5 pt-2 pb-5">
  <div class="flex justify-end items-end my-3">
    <button class="w-[30px] h-[30px]" on:click={returnToMainMenu}>
      <FaWindowClose />
    </button>
  </div>
  {#if charactersList.length > 0}
    <div class="flex justify-between items-center space-x-6">
      {#each charactersList as characters}
        <button
          class="relative inline-block"
          on:click={() => filterSelectedCharacter(characters.uuid)}
        >
          <img
            src={characters.avatarLink}
            alt="avatar"
            class="w-[250px] h-[250px] opacity-80"
          />
          <div
            class="absolute inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm text-white opacity-100 hover:backdrop-blur-0 hover:bg-transparent transition-all duration-500"
          >
            <div
              class="font-bold text-2xl flex flex-col items-center justify-center space-y-2"
            >
              <span class="stroke">{characters.name}</span>
              <div class="w-[25px] h-[25px]">
                <FaPlay />
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="flex items-center justify-center flex-col space-y-7">
      <span class="text-center font-bold text-xl"
        >Você não possui nenhum personagem criado. Clique no botão abaixo para:</span
      >
      <button
        class="p-3 bg-blue-400 rounded text-white font-bold"
        on:click={() => dispatch("createNewCharacter")}
      >
        Criar novo personagem
      </button>
    </div>
  {/if}
</main>

<Modal isOpen={selectedCharacterModalView} width="800px">
  <div>
    <div class="flex justify-between items-center m-3">
      <span class="font-bold text-3xl underline">{selectedCharacter.name}</span>
      <button
        class="w-[30px] h-[30px]"
        on:click={() => (selectedCharacterModalView = false)}
      >
        <FaWindowClose />
      </button>
    </div>
    <div class="mt-4 border-b-2 border-gray-400">
      <img
        src={selectedCharacter.avatarLink}
        alt="avatar-link"
        class="w-full h-[250px] object-cover"
      />
    </div>
    <div class="p-4 w-full">
      <div class="flex space-x-4">
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">NOME: </span>
          <span>{selectedCharacter.name}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">IDADE: </span>
          <span>{selectedCharacter.age}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">CLASSE: </span>
          <span>{selectedCharacter.class}</span>
        </div>
      </div>
      <div class="flex space-x-4 mt-4">
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">HISTORIA: </span>
          <span>{selectedCharacter.story}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">INVENTÁRIO: </span>
          <span>{selectedCharacter.inventory}</span>
        </div>
      </div>
      <div class="mt-[3.5em] flex items-center justify-center flex-col space-y-6">
        {#if !diceLoading}
          <button
            class="text-xl p-3 bg-blue-400 rounded text-white font-bold"
            on:click={getRandomNumberBetweenOneAndTwenty}
            >{diceRolled ? "Jogar dado novamente" : "Jogar dado"}</button
          >
        {/if}
        {#if diceLoading}
          <div class="mt-[3em]">
            <DiceLoader />
          </div>
        {/if}
        {#if diceRolled && !diceLoading}
          <span class="text-5xl font-bold">{randomNumber}</span>
        {/if}
      </div>
    </div>
  </div>
</Modal>

<style>
  .stroke {
    -webkit-text-stroke: 1px #000000;
  }
</style>
