<script lang="ts">
import { faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import Fa from 'svelte-fa'
import Modal from './Modal.svelte'
import type { ReferenceDoc } from './types'

interface Props {
  referenceDoc: ReferenceDoc
  onClose: () => void
}

const { referenceDoc, onClose }: Props = $props()

function openExternalLink() {
  // onClose()
  window.open(`${referenceDoc.url}#${referenceDoc.anchor}`, '_blank')
}
</script>

<Modal {onClose}>
  <div class="header">
    <div class="title">Quick reference</div>
    <button type="button" title="Open the documentation in a separate page" onclick={openExternalLink}>
      <Fa icon={faUpRightFromSquare} size="lg" />
    </button>
    <button type="button" title="Close (Esc)" class="close" onclick={onClose}>
      <Fa icon={faXmark} size="lg" />
    </button>
  </div>
  <div class="content">
    {#if referenceDoc.doc}
      {@html referenceDoc.doc}
    {:else}
      No documentation found
    {/if}
  </div>
</Modal>

<style>
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
    position: relative;
    margin: calc(2 * var(--padding));
  }

  :global(dialog h1),
  :global(dialog h2),
  :global(dialog h3) {
    margin-top: 0;
    pointer-events: none; /* disable clickable link in header */
  }
</style>