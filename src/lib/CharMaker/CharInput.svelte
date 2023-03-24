<script lang="ts">
  export let value: string;
  export let placeholder: string;
  export let type: string;
</script>

{#if type === "text"}
  <main class="border-b-2 border-black w-full">
    <input
      class="focus:outline-0 w-full"
      type="text"
      {placeholder}
      bind:value
    />
  </main>
{:else if type === "number"}
  <main class="border-b-2 border-black w-full">
    <input
      class="focus:outline-0 w-full"
      type="number"
      {placeholder}
      bind:value
    />
  </main>
{:else if type === "textarea"}
  <main class="border-2 border-gray-300 w-full max-h-[100px]">
    <textarea class="focus:outline-0 w-full max-h-[90px] p-2" {placeholder} bind:value />
  </main>
{/if}
