<script lang="ts">
import Modal from './Modal.svelte'
import { stringifyJson } from './stringifyJson'
import type { JSONQueryError } from './types'

interface Props {
  error: JSONQueryError
  onClose: () => void
}

const { error, onClose }: Props = $props()

let errorIndex = $state(error.jsonquery.length - 1)
const current = $derived(error.jsonquery[errorIndex])

function close() {
  onClose()
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

<Modal title="Debugger" onClose={close}>
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
        <textarea class="debug-content" readonly>{stringifyJson(current.data)}</textarea>
      </div>
      <div class="debug-column">
        <label class="debug-label" for="error-query">Query</label>
        <textarea class="debug-content" readonly>{stringifyJson(current.query)}</textarea>
      </div>
    </div>
  </div>
</Modal>

<style>
  .dialog-contents {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--padding);
    padding: calc(2 * var(--padding));
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
        min-height: 200px;
        min-width: 300px;
        resize: none;
        border: var(--input-border);
        padding: 5px;
        border-radius: var(--border-radius);
      }
    }
  }
</style>
