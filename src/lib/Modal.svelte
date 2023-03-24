<!-- Modal.svelte -->
<script lang="ts">
  export let isOpen: boolean = false;
  export let width: string = "500px";
</script>

{#if isOpen}
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;

      <div
        class={`animate-fade inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[${width}]`}
      >
        <slot />
      </div>
    </div>
  </div>
{/if}
