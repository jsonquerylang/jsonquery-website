<script lang="ts">
// code based on: https://svelte.dev/examples/modal
import { onDestroy, onMount } from 'svelte'
import { onEscape } from './onEscape.js'

// TODO: convert to Svelte 5
export let onClose: () => void

let dialog: HTMLDialogElement

onMount(() => dialog.showModal())
onDestroy(() => dialog.close())

function close() {
  onClose()
}
</script>

<dialog
    bind:this={dialog}
    on:close={close}
    on:pointerdown|self={close}
    on:cancel|preventDefault
    use:onEscape={close}
>
  <div class="content">
    <slot />
  </div>
</dialog>

<style>
  dialog {
    font-family: var(--font-family);
    font-size: var(--font-size);
    line-height: normal;
    background: white;
    color: var(--color);

    border-radius: var(--border-radius);
    border: none;
    padding: 0;
    display: flex;
    min-width: 0;
    width: calc(100% - 2 * var(--padding));
    max-width: 800px;
    margin: auto;
    overflow: auto;
    transition:
            width 0.1s ease-in-out,
            height 0.1s ease-in-out;

    &::backdrop {
      background: var(--overlay-background);
    }

    &[open] {
      animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &[open]::backdrop {
      animation: fade 0.2s ease-out;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      padding: 0;
    }

    /* TODO: reuse the styling from ContentLayout */
    :global(pre.astro-code) {
      padding: 5px;
      border-radius: 3px;
      line-height: 1.4em;
      font-size: var(--font-size-mono);
    }
    :global(p) {
      line-height: 1.5em;
      overflow: auto;
    }

    @keyframes zoom {
      from {
        transform: scale(0.95);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
