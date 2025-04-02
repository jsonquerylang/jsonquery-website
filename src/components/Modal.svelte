<script lang="ts">
import { onDestroy, onMount, type Snippet } from 'svelte'

interface Props {
  onClose: () => void
  children: Snippet
}

const { onClose, children }: Props = $props()

// biome-ignore lint/style/useConst: must be let, not const
let refDialog = $state<HTMLDialogElement>()

onMount(() => {
  refDialog?.showModal()
  refDialog?.addEventListener('close', close)
  refDialog?.addEventListener('click', closeWhenClickingOutside)
})

onDestroy(() => refDialog?.close())

function close() {
  onClose()
}

function closeWhenClickingOutside(event: Event) {
  if (event.target === refDialog) {
    close()
  }
}
</script>

<dialog bind:this={refDialog}>
  <div class="content">
    {@render children?.()}
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
