<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let newItem: string = "";
  let inventoryItems: string[] = [];

  const addNewItem = () => {
    inventoryItems = [...inventoryItems, newItem];
    dispatch("exportItems", inventoryItems);
    newItem = "";
  };

  const removeItem = (item: number) => {
    inventoryItems = inventoryItems.filter((i, index) => index !== item);
  };
</script>

<main class="bg-gray-100 w-full h-[180px] p-2">
  <span class="text-md font-bold text-gray-700">Inventário</span>
  <div
    class="w-full bg-white h-[60%] mt-1"
    class:overflow-scroll={inventoryItems.length > 0}
    class:overflow-x-hidden={inventoryItems.length > 0}
  >
    <div class="flex space-x-2 flex-wrap">
      {#each inventoryItems as item, i}
        <button
          class="p-1 mt-1 mx-1 h-[30px] bg-blue-300 hover:bg-red-300 text-white text-xs font-bold rounded"
          on:click={() => removeItem(i)}
          transition:fly
          title="Remover item">{item}</button
        >
      {/each}
    </div>
  </div>
  <div class="flex justify-between w-full mt-2">
    <div class="w-[70%]">
      <input
        type="text"
        class="w-full placeholder:text-xs px-1 py-1 text-xs focus:outline-none"
        placeholder="Adicionar item"
        bind:value={newItem}
      />
    </div>
    <button
      class="bg-green-400 text-xs px-2 text-white font-bold"
      class:opacity-20={newItem === ""}
      class:pointer-events-none={newItem === ""}
      on:click={addNewItem}>Adicionar</button
    >
  </div>
</main>
