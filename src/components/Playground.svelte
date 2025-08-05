<script lang="ts">
import { type JSONQuery, jsonquery, parse, stringify } from '@jsonquerylang/jsonquery'
import Button from './Button.svelte'
import DebuggerModal from './DebuggerModal.svelte'
import QuickReference from './QuickReference.svelte'
import { stringifyJson } from './stringifyJson'
import { isJSONQueryError, isOutputError, isTextFormat } from './typeguards.ts'
import type { JSONQueryError, JSONType, Output, ProcessedQuery, QueryText } from './types'

let {
  input = $bindable('input'),
  query = $bindable('query'),
  queryTab = $bindable('queryTab')
} = $props<{
  input: string
  query: QueryText
  queryTab: 'text' | 'json'
}>()

let debugError: JSONQueryError | null = $state(null)
const processedQuery: ProcessedQuery = $derived(processQuery(query))
const output = $derived(go(input, processedQuery))

function processQuery(query: QueryText): ProcessedQuery {
  if (isTextFormat(query)) {
    const { textFormat } = query

    try {
      const queryJson = parse(textFormat)
      const jsonFormat = stringifyJson(queryJson)

      return { textFormat, jsonFormat, queryJson }
    } catch (err) {
      return { textFormat, jsonError: err as Error }
    }
  } else {
    const { jsonFormat } = query

    try {
      const queryJson = JSON.parse(jsonFormat)
      const textFormat = stringify(queryJson)

      return { jsonFormat, textFormat, queryJson }
    } catch (err) {
      return { jsonFormat, textError: err as Error }
    }
  }
}

function go(inputText: string, parsedQuery: ProcessedQuery): Output {
  if (parsedQuery.textError) {
    return { error: parsedQuery.textError }
  }

  if (parsedQuery.jsonError) {
    return { error: parsedQuery.jsonError }
  }

  if (!parsedQuery.queryJson) {
    return { error: new Error('Query is missing') }
  }

  try {
    const input = JSON.parse(inputText)

    return {
      json: jsonquery(input, parsedQuery.queryJson) as JSONType
    }
  } catch (err) {
    console.error(err)
    return {
      error: err as Error
    }
  }
}

function handleChangeTextQuery(
  event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
) {
  query = {
    textFormat: event.currentTarget?.value
  }
}

function handleChangeJSONQuery(
  event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
) {
  query = {
    jsonFormat: event.currentTarget?.value
  }
}

function handleDebug(error: Error | JSONQueryError) {
  debugError = isJSONQueryError(error) ? error : null
}

function stringifyError(error: Error | JSONQueryError): string {
  const errorStack: { query: JSONQuery }[] | null = 'jsonquery' in error ? error.jsonquery : null
  if (errorStack) {
    const lastQuery = errorStack[errorStack.length - 1].query
    return `${error}\n\nWhilst executing the following part of the query:\n\n${JSON.stringify(lastQuery)}`
  }

  return String(error)
}
</script>

<div class="playground">
  <div class="column">
    <label for="input-text">Input</label>
    <textarea
      id="input-text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      bind:value={input}
    ></textarea>
  </div>
  <div class="column">
    <div class="row">
      <div class="tab-section text-format">
        <div class="tabs">
          <label class="query-label" for="query-text">Query</label>
          <label for="query-text"
            ><button
              title="Text format"
              class:selected={queryTab === 'text'}
              onclick={() => (queryTab = 'text')}>Text</button
            ></label
          >
          <label for="query-json"
            ><button
              title="JSON format"
              class:selected={queryTab === 'json'}
              onclick={() => (queryTab = 'json')}>JSON</button
            ></label
          >
        </div>
        <div class="tab-contents">
          <textarea
            id="query-text"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            class:selected={queryTab === 'text'}
            oninput={handleChangeTextQuery}
            >{processedQuery.textFormat ?? processedQuery.textError}</textarea
          >
          <textarea
            id="query-json"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            class:selected={queryTab === 'json'}
            oninput={handleChangeJSONQuery}
            >{processedQuery.jsonFormat ?? processedQuery.jsonError}</textarea
          >
        </div>
      </div>
    </div>
  </div>
  <div class="column">
    <label for="output-text">Output</label>
    {#if isOutputError(output)}
      {@const error = output.error}
      {#if isJSONQueryError(error)}
        <Button
          type="button"
          onclick={() => handleDebug(error)}>Debug</Button
        >
      {/if}
      <textarea id="output-text" readonly class="error">{stringifyError(output.error)}</textarea>
    {:else}
      <textarea id="output-text" readonly>{stringifyJson(output.json)}</textarea>
    {/if}
  </div>
  <div class="column">
    <label for="output-text">Quick Reference</label>
    <div class="quick-reference">
      <QuickReference />
    </div>
  </div>
</div>

{#if debugError}
  <DebuggerModal error={debugError} onClose={() => (debugError = null)} />
{/if}

<style>
  .playground {
    flex: 1;
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;

    padding: 10px 10px 20px;
    margin: 0;
    gap: 10px;
    width: 1020px; /* 1000 + 2 * padding */
    max-width: 100%;
    box-sizing: border-box;
  }

  .column {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 220px;
  }

  .row {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tab-section {
    flex: 1;
    display: flex;
    flex-direction: column;

    .tabs {
      display: flex;
      align-items: end;
      gap: var(--tab-border-width);
      padding: 0 var(--tab-border-width);

      label {
        margin: 0;
      }

      .query-label {
        flex: 1;
        margin: 0 0 2px;
      }

      button {
        margin: 0;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        background: white;
        border: 1px solid var(--theme-color);
        border-bottom: none;
        color: var(--color);
        font-family: inherit;
        font-size: inherit;
        padding: 2px 10px 5px;
        cursor: pointer;

        &:hover {
          background: var(--theme-color-highlight);
        }

        &.selected {
          background: var(--theme-color);
          padding: 5px 10px;
        }
      }
    }

    .tab-contents {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: var(--border-radius);
      padding: var(--tab-border-width);
      margin-bottom: -5px;
      background: var(--theme-color);

      textarea:not(.selected) {
        display: none;

        /*TODO: hide the textarea instead of removing it, so the history (undo/redo) is remembered */
        /*flex: none;*/
        /*visibility: hidden;*/
        /*width: 0;*/
        /*height: 0;*/
      }
    }
  }

  @media (max-width: 860px) {
    .playground {
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    .column {
      display: flex;
    }

    .row {
      min-height: 110px;
    }
  }

  label {
    font-weight: bold;
    margin-top: var(--padding);
    margin-bottom: 7px;
  }

  textarea {
    flex: 1;
    width: 100%;
    border: var(--input-border);
    border-radius: var(--border-radius);
    padding: 5px;
    box-sizing: border-box;
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-mono);
    color: inherit;
    resize: none;
  }

  .quick-reference {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    line-height: 1.3em;
    gap: 5px;
    border: 1px solid #dcdcdc;
    border-radius: var(--border-radius);
    padding: 10px;
  }

  #output-text.error {
    color: var(--error-color);
  }
</style>
