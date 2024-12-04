<script lang="ts">
  import type { JSONQueryError } from '$lib/types'
  import { onMount } from 'svelte'

  let { error, onClose } = $props<{ error: JSONQueryError; onClose: () => void }>()

  let refDebugger = $state<HTMLDialogElement>()
  let errorIndex = $state(error.jsonquery.length - 1)
  let current = $derived(error.jsonquery[errorIndex])

  onMount(() => {
    refDebugger?.showModal()
    refDebugger?.addEventListener('close', close)
    refDebugger?.addEventListener('click', closeWhenClickingOutside)
  })

  function close() {
    onClose()
  }

  function closeWhenClickingOutside(event: Event) {
    if (event.target === refDebugger) {
      close()
    }
  }

  function prev() {
    if (errorIndex > 0) {
      errorIndex--
    }
  }

  function next() {
    if (errorIndex < error?.jsonquery?.length - 1) {
      errorIndex++
    }
  }
</script>

<dialog bind:this={refDebugger}>
  <div class="dialog-header">
    <h3 class="title">Debugger</h3>
    <button type="button" onclick={close}>Close</button>
  </div>
  <div class="dialog-contents">
    <div class="error-message">{String(error)}</div>
    <div class="stack-toggles">
      Stack: <button type="button" onclick={prev}>Previous</button>
      <span>{errorIndex + 1}/{error.jsonquery.length}</span>
      <button type="button" onclick={next}>Next</button>
    </div>
    <div class="debug-columns">
      <div class="debug-column">
        <label class="debug-label" for="error-data">Input</label>
        <textarea class="debug-content" readonly>{JSON.stringify(current.data, null, 2)}</textarea>
      </div>
      <div class="debug-column">
        <label class="debug-label" for="error-query">Query</label>
        <textarea class="debug-content" readonly>{JSON.stringify(current.query, null, 2)}</textarea>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog {
    width: 800px;
    max-width: calc(100% - var(--padding));
    height: 600px;
    max-height: calc(100% - var(--padding));
    padding: 0;
    border-radius: var(--border-radius);
    background: var(--background-color);
    color: inherit;

    flex-direction: column;
    min-height: 0;

    border: none;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
    font-family: inherit;
    font-size: inherit;

    transition:
      width 0.1s ease-in-out,
      height 0.1s ease-in-out;

    &[open] {
      display: flex;
      animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &[open]::backdrop {
      animation: fade 0.2s ease-out;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      background: var(--theme-color);
      padding: var(--padding);

      .title {
        flex: 1;
        margin: 0;
        color: inherit;
      }
    }

    .dialog-contents {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--padding);
      padding: var(--padding);
    }

    .error-message {
      color: var(--error-color);
    }

    .debug-columns {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      min-height: 0;

      .debug-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 0;

        .debug-label {
          font-weight: bold;
        }

        label {
          margin: 0;
        }

        textarea {
          flex: 1;
          min-height: 150px;
          min-width: 300px;
        }
      }
    }
  }
</style>
