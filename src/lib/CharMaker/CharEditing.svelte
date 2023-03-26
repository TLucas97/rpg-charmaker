<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CharacterBody } from "../../interfaces";
  import CharInput from "./CharInput.svelte";
  import FaWindowClose from "svelte-icons/fa/FaWindowClose.svelte";
  import FaCloudUploadAlt from "svelte-icons/fa/FaCloudUploadAlt.svelte";
  import CharInventory from "./CharInventory.svelte";
  import Modal from "../Modal.svelte";
  import { onMount } from "svelte";

  const dispatch = createEventDispatcher();

  export let uuid: string = "";
  const LOCAL_STORAGE_KEY = "charactersList";

  let editableCharacterBody: CharacterBody = {
    uuid,
    name: "",
    age: "",
    class: "",
    inventory: [],
    story: "",
    avatarLink: "",
  };
  let avatarPictureModalView: boolean = false;
  let newAvatarPicture: string = "";

  const returnToCharacterCard = () => {
    dispatch("returnToCharacterCard");
  };

  const updatedCharacterList = () => {
    dispatch("updatedCharacterList");
    returnToCharacterCard();
  };

  const validateIfObjectKeysAreEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj[key] === "") {
        return false;
      }
    }
    return true;
  };

  const importInventoryItems = (e: any) => {
    editableCharacterBody.inventory = e.detail;
  };

  const validateImageLink = (): void => {
    const image: HTMLImageElement = new Image();
    image.src = newAvatarPicture;

    image.onload = (): void => {
      editableCharacterBody.avatarLink = newAvatarPicture;
      avatarPictureModalView = false;
      newAvatarPicture = "";
      alert("Avatar adicionado com sucesso!");
      return;
    };

    image.onerror = (): void => {
      alert("Link inválido");
      return;
    };
  };

  const findCharacterByUUID = () => {
    const charactersList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const filteredCharacter = charactersList.filter((character: any) => {
      return character.uuid === uuid;
    });
    editableCharacterBody = filteredCharacter[0];
  };

  const updateLocalStorageCharacterBasedOnUUID = () => {
    const characterBodyForValidation = { ...editableCharacterBody };
    delete characterBodyForValidation.avatarLink;
    delete characterBodyForValidation.inventory;

    if (!validateIfObjectKeysAreEmpty(characterBodyForValidation)) {
      alert("Preencha todos os campos");
      return;
    }

    const charactersList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const filteredCharacter = charactersList.filter((character: any) => {
      return character.uuid !== uuid;
    });
    filteredCharacter.push(editableCharacterBody);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredCharacter));
    alert("Personagem atualizado com sucesso!");
    updatedCharacterList();
  };

  onMount(() => {
    findCharacterByUUID();
  });
</script>

<main
  class="animate-fade bg-white w-[95%] evenSmaller:w-[600px] h-[580px] rounded-lg shadow-xl"
>
  <div class="flex justify-end items-end m-2">
    <button class="w-[30px] h-[30px]" on:click={returnToCharacterCard}
      ><FaWindowClose /></button
    >
  </div>
  <div class="flex justify-center items-center flex-col space-y-2">
    <button on:click={() => (avatarPictureModalView = true)}>
      <img
        src={editableCharacterBody.avatarLink ||
          "https://st2.depositphotos.com/4549583/8110/i/600/depositphotos_81106984-stock-photo-male-avatar-profile-picture.jpg"}
        alt="default-avatar"
        class="w-[100px] h-[100px] rounded-full hover:border-black hover:border-2 border-2 border-transparent transition ease-in-out"
      />
    </button>
    <div class="flex items-end space-x-2 text-gray-400 font-semibold">
      <small> Upload your avatar </small>
      <div class="w-[20px] h-[20px]">
        <FaCloudUploadAlt />
      </div>
    </div>
  </div>
  <div class="mt-5 px-5 flex flex-col space-y-7">
    <div class="flex w-full justify-center">
      <CharInput
        bind:value={editableCharacterBody.name}
        type="text"
        placeholder="Nome"
      />
    </div>
    <div class="flex w-full justify-center space-x-6">
      <CharInput
        bind:value={editableCharacterBody.age}
        type="number"
        placeholder="Idade"
      />
      <CharInput
        bind:value={editableCharacterBody.class}
        type="text"
        placeholder="Classe"
      />
    </div>
    <div class="flex justify-between space-x-4 w-full">
      <div class="w-[50%]">
        <CharInventory
          on:exportItems={importInventoryItems}
          inventoryItems={editableCharacterBody.inventory}
        />
      </div>
      <div class="w-[50%] max-h-[100px]">
        <CharInput
          bind:value={editableCharacterBody.story}
          type="textarea"
          placeholder="História"
        />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center space-x-3 w-full mt-8">
    <button
      class="p-3 bg-red-400 rounded text-white font-bold"
      on:click={returnToCharacterCard}>Cancelar</button
    >
    <button
      class="p-3 bg-blue-400 rounded text-white font-bold"
      on:click={updateLocalStorageCharacterBasedOnUUID}>Atualizar</button
    >
  </div>
</main>

<Modal isOpen={avatarPictureModalView}>
  <div class="flex items-center justify-center flex-col p-3">
    <span class="text-xl font-bold">Adicione um link válido de uma imagem</span>
    <div class="mt-5">
      <CharInput
        placeholder="URL da imagem"
        type="text"
        bind:value={newAvatarPicture}
      />
    </div>
    <div class="flex items-center justify-center space-x-3 w-full mt-8">
      <button
        class="p-3 bg-red-400 rounded text-white font-bold"
        on:click={() => (avatarPictureModalView = false)}
      >
        Cancelar
      </button>
      <button
        class="p-3 bg-blue-400 rounded text-white font-bold"
        class:opacity-30={newAvatarPicture === ""}
        class:pointer-events-none={newAvatarPicture === ""}
        on:click={() => validateImageLink()}
      >
        Adicionar
      </button>
    </div>
  </div></Modal
>
