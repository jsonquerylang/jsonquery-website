<script lang="ts">
import { type IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons'
import { type Snippet, onDestroy, onMount } from 'svelte'
import Fa from 'svelte-fa'

interface Props {
  title: string
  onClose: () => void
  actions?: Array<{
    title: string
    onclick: () => void
    icon: IconDefinition
  }>
  children: Snippet
}

const { title, children, actions = [], onClose }: Props = $props()

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
  <div class="header">
    <div class="title">{title}</div>
    {#each actions as action}
      <button
          type="button"
          title={action.title}
          onclick={() => action.onclick()}
      >
        <Fa icon={action.icon} size="lg" />
      </button>
    {/each}
    <button type="button" title="Close (Esc)" class="close" onclick={onClose}>
      <Fa icon={faXmark} size="lg" />
    </button>
  </div>
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
    flex-direction: column;
    min-width: 0;
    width: calc(100% - 2 * var(--padding));
    max-width: 800px;
    margin: auto;
    overflow: hidden;
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

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: var(--theme-color);

      .title {
        flex: 1;
        font-weight: bold;
        padding: var(--padding);
      }

      button {
        width: 40px;
        align-self: stretch;
        background: transparent;
        border: none;
        color: var(--color);
        cursor: pointer;
      }

      button:hover {
        background: var(--theme-color-highlight);
      }

      button.close:hover {
        color: var(--error-color);
      }
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      padding: 0;
      overflow: auto;
    }
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
</style>
