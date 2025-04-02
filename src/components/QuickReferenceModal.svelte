<script lang="ts">
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal.svelte'
import type { ReferenceDoc } from './types'

interface Props {
  referenceDoc: ReferenceDoc
  onClose: () => void
}

const { referenceDoc, onClose }: Props = $props()

function openExternalLink() {
  window.open(`${referenceDoc.url}#${referenceDoc.anchor}`, '_blank')
}

const actions = $derived([
  {
    title: 'Open the documentation in a separate page',
    onclick: openExternalLink,
    icon: faUpRightFromSquare
  }
])
</script>

<Modal title="Quick reference" {actions} {onClose}>
  <div class="content">
    {#if referenceDoc.doc}
      {@html referenceDoc.doc}
    {:else}
      No documentation found
    {/if}
  </div>
</Modal>

<style>
  .content {
    margin: calc(2 * var(--padding));
  }

  :global(dialog h1),
  :global(dialog h2),
  :global(dialog h3) {
    margin-top: 0;
    pointer-events: none; /* disable clickable link in header */
  }
</style>