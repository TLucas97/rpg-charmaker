<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FaWindowClose from "svelte-icons/fa/FaWindowClose.svelte";
  import FaCloudUploadAlt from "svelte-icons/fa/FaCloudUploadAlt.svelte";
  import CharInput from "./CharInput.svelte";
  import CharInventory from "./CharInventory.svelte";
  import Modal from "../Modal.svelte";
  import { v4 as uuidv4 } from "uuid";

  const dispatch = createEventDispatcher();

  interface CharacterBody {
    name: string;
    age: string;
    class: string;
    inventory: [];
    story: string;
    avatarLink?: string;
  }

  const characterBody: CharacterBody = {
    name: "",
    age: "",
    class: "",
    inventory: [],
    story: "",
    avatarLink: "",
  };

  let uuid = uuidv4();
  let avatarPictureModalView: boolean = false;
  let returnConfirmationModalView: boolean = false;
  let newAvatarPicture: string = "";
  let validationCounter: number = 0;

  const validateImageLink = (): void => {
    const image: HTMLImageElement = new Image();
    image.src = newAvatarPicture;

    image.onload = (): void => {
      characterBody.avatarLink = newAvatarPicture;
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

  const importInventoryItems = (e: any) => {
    characterBody.inventory = e.detail;
  };

  const validateIfObjectKeysAreEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj[key] === "") {
        return false;
      }
    }
    return true;
  };

  const validateObjectValues = (obj: any) => {
    let counter: number = 0;
    for (const key in obj) {
      if (obj[key] !== "") {
        validationCounter = counter++;
      }
    }
  };

  const returnToMainMenu = () => {
    validateObjectValues(characterBody);
    if (validationCounter > 0) {
      returnConfirmationModalView = true;
      return;
    }

    dispatch("returnToMainMenu");
  };

  const createCharacter = () => {
    const characterBodyForValidation = { ...characterBody };
    delete characterBodyForValidation.avatarLink;

    if (!validateIfObjectKeysAreEmpty(characterBodyForValidation)) {
      alert("Preencha todos os campos");
      return;
    }

    const characterBodyWithUUID = { ...characterBody, uuid };

    let charactersList = JSON.parse(
      localStorage.getItem("charactersList") || "[]"
    );
    charactersList = [...charactersList, characterBodyWithUUID];
    localStorage.setItem("charactersList", JSON.stringify(charactersList));
    alert("Personagem criado com sucesso!");
    dispatch("returnToMainMenu");
    dispatch("updateCharactersList");
  };
</script>

<main class="animate-fade bg-white w-[95%] evenSmaller:w-[600px] h-[580px] rounded-lg shadow-xl">
  <div class="flex justify-end items-end m-2">
    <button class="w-[30px] h-[30px]" on:click={returnToMainMenu}
      ><FaWindowClose /></button
    >
  </div>
  <div class="flex justify-center items-center flex-col space-y-2">
    <button on:click={() => (avatarPictureModalView = true)}>
      <img
        src={characterBody.avatarLink ||
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
        bind:value={characterBody.name}
        type="text"
        placeholder="Nome"
      />
    </div>
    <div class="flex w-full justify-center space-x-6">
      <CharInput
        bind:value={characterBody.age}
        type="number"
        placeholder="Idade"
      />
      <CharInput
        bind:value={characterBody.class}
        type="text"
        placeholder="Classe"
      />
    </div>
    <div class="flex justify-between space-x-4 w-full">
      <div class="w-[50%]">
        <CharInventory on:exportItems={importInventoryItems} />
      </div>
      <div class="w-[50%] max-h-[100px]">
        <CharInput
          bind:value={characterBody.story}
          type="textarea"
          placeholder="História"
        />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center space-x-3 w-full mt-8">
    <button
      class="p-3 bg-red-400 rounded text-white font-bold"
      on:click={returnToMainMenu}>Cancelar</button
    >
    <button
      class="p-3 bg-blue-400 rounded text-white font-bold"
      on:click={createCharacter}>Criar</button
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

<Modal isOpen={returnConfirmationModalView}>
  <div class="flex items-center justify-center flex-col p-3">
    <span class="text-xl font-bold text-center"
      >Tem certeza que deseja cancelar a criação do personagem?</span
    >
    <div class="flex items-center justify-center space-x-3 w-full mt-8">
      <button
        class="p-3 bg-red-400 rounded text-white font-bold"
        on:click={() => (returnConfirmationModalView = false)}
      >
        Voltar
      </button>
      <button
        class="p-3 bg-blue-400 rounded text-white font-bold"
        on:click={() => dispatch("returnToMainMenu")}
      >
        Confirmar
      </button>
    </div>
  </div></Modal
>
