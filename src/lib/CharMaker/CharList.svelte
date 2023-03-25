<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import FaWindowClose from "svelte-icons/fa/FaWindowClose.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte";
  import Modal from "../Modal.svelte";
  import DiceLoader from "../DiceLoader.svelte";

  const dispatch = createEventDispatcher();

  interface CharacterBody {
    uuid: string;
    name: string;
    age: string;
    class: string;
    inventory: [];
    story: string;
    avatarLink?: string;
  }

  let audio = new Audio("./sounds/dice-sound-effect.mp3");
  let charactersList: any = [];
  let selectedCharacter: CharacterBody;
  let selectedCharacterModalView: boolean = false;
  let characterRemovalConfirmationModalView: boolean = false;
  let diceLoading: boolean = false;
  let randomNumber: number = 0;
  let diceRolled: boolean = false;

  const playSound = () => {
    audio.loop = true;
    audio.play();
  };

  const pauseSound = () => {
    audio.pause();
  };

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

  const removeCharacterFromLocalStorage = (uuid: string) => {
    const filteredCharacter = charactersList.filter((character: any) => {
      return character.uuid !== uuid;
    });
    localStorage.setItem("charactersList", JSON.stringify(filteredCharacter));
    charactersList = filteredCharacter;
    characterRemovalConfirmationModalView = false;
    selectedCharacterModalView = false;
    alert("Personagem removido com sucesso!")
    loadCharactersFromLocalStorage();
  };

  const getRandomNumberBetweenOneAndTwenty = () => {
    diceLoading = true;
    playSound();
    setTimeout(() => {
      diceLoading = false;
      diceRolled = true;
      pauseSound();
    }, 6000);
    randomNumber = Math.floor(Math.random() * 20) + 1;
  };

  onMount(() => {
    loadCharactersFromLocalStorage();
  });
</script>

<main class="animate-fade w-[95%] smaller:w-[900px] h-[600px] bg-white px-2 pb-5 rounded-lg shadow-xl">
  <div class="flex justify-between items-end my-1">
    <span class="font-bold text-xl tiny:text-3xl">Meus personagens</span>
    <button class="w-[30px] h-[30px]" on:click={returnToMainMenu}>
      <FaWindowClose />
    </button>
  </div>
  {#if charactersList.length > 0}
    <div
      class="flex justify-evenly items-center flex-wrap overflow-scroll overflow-x-hidden p-5 smaller:w-[850px] h-[500px] m-auto border-2 mt-3"
    >
      {#each charactersList as characters}
        <button
          class="relative inline-block w-[250px] h-[250px] m-3"
          on:click={() => filterSelectedCharacter(characters.uuid)}
        >
          <img
            src={characters.avatarLink ||
              "https://st2.depositphotos.com/4549583/8110/i/600/depositphotos_81106984-stock-photo-male-avatar-profile-picture.jpg"}
            alt="avatar"
            class="object-cover w-full h-full opacity-80 rounded-lg border-2"
          />
          <div
            class="absolute inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm text-white opacity-100 hover:backdrop-blur-0 hover:bg-transparent transition-all duration-500"
          >
            <div
              class="font-bold text-2xl flex flex-col items-center justify-center space-y-2"
            >
              <span class="stroke text-3xl">{characters.name}</span>
              <div class="w-[25px] h-[25px] text-red-500">
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

<Modal isOpen={selectedCharacterModalView} width="950px">
  <div class="smaller:w-[100%] w-[95%]">
    <div class="flex justify-between items-center m-3">
      <span class="font-bold text-xl tiny:text-3xl underline">{selectedCharacter.name}</span>
      <div class="flex space-x-3 items-center">
        <button
          class="w-[26px] h-[26px] text-red-500"
          on:click={() => (characterRemovalConfirmationModalView = true)}
        >
          <FaTrashAlt />
        </button>
        <button
          class="w-[30px] h-[30px]"
          on:click={() => (selectedCharacterModalView = false)}
        >
          <FaWindowClose />
        </button>
      </div>
    </div>
    <div class="mt-4 border-b-2 border-gray-400">
      <img
        src={selectedCharacter.avatarLink ||
          "https://st2.depositphotos.com/4549583/8110/i/600/depositphotos_81106984-stock-photo-male-avatar-profile-picture.jpg"}
        alt="avatar-link"
        class="w-full h-[250px] object-cover"
      />
    </div>
    <div class="p-4 w-full">
      <div class="flex space-x-4 flex-wrap justify-center items-center text-xs tiny:text-base">
        <div class="border-2 border-gray-600 p-3 my-4 text-gray-600">
          <span class="font-bold">NOME: </span>
          <span>{selectedCharacter.name}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 my-4 text-gray-600">
          <span class="font-bold">IDADE: </span>
          <span>{selectedCharacter.age}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 my-4 text-gray-600">
          <span class="font-bold">CLASSE: </span>
          <span>{selectedCharacter.class}</span>
        </div>
      </div>
      <div class="flex space-x-4 mt-4 text-xs tiny:text-base">
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">HISTORIA: </span>
          <span>{selectedCharacter.story}</span>
        </div>
        <div class="border-2 border-gray-600 p-3 text-gray-600">
          <span class="font-bold">INVENTÁRIO: </span>
          <span>{selectedCharacter.inventory}</span>
        </div>
      </div>
      <div
        class="mt-[3.5em] flex items-center justify-center flex-col space-y-6"
      >
        {#if !diceLoading}
          <button
            class="text-xl p-3 bg-blue-400 rounded text-white font-bold animate-fade"
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
          <span class="text-5xl font-bold animate-fade">{randomNumber}</span>
        {/if}
      </div>
    </div>
  </div>
</Modal>

<Modal isOpen={characterRemovalConfirmationModalView} width="300px">
  <div class="p-5 flex items-center justify-center flex-col">
    <span class="font-bold text-2xl">Confirmar remoção</span>
    <small class="text-gray-600">Esta ação não poderá ser desfeita.</small>
    <div class="flex space-x-3 mt-5">
      <button
        class="p-3 bg-blue-400 rounded text-white font-bold"
        on:click={() => (characterRemovalConfirmationModalView = false)}
      >
        Não
      </button>
      <button
        class="p-3 bg-red-400 rounded text-white font-bold"
        on:click={() => removeCharacterFromLocalStorage(selectedCharacter.uuid)}
      >
        Sim
      </button>
    </div>
  </div>
</Modal>

<style>
  .stroke {
    -webkit-text-stroke: 1px #000000;
  }
</style>
