<script lang="ts">
import { compile, jsonquery, parse, stringify } from '@jsonquerylang/jsonquery'
import { isTextFormat } from './typeguards';
import Button from './Button.svelte'
import Playground from './Playground.svelte'
import { examples, type Example } from './data/examples'
import { loadLocalStorage, saveLocalStorage } from './runes/localStorageState.svelte'
import type { QueryText } from './types'

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.jsonquery = { jsonquery, stringify, parse, compile }
}

const keyInput = 'playground-input'
const keyQuery = 'playground-query'
const keyQueryTab = 'playground-query-tab'

let name = $state(examples[0].name)
let input = $state(loadLocalStorage(keyInput, examples[0].input))
// biome-ignore lint/style/useConst: must be let for Svelte
let queryTab: 'text' | 'json' = $state(loadLocalStorage(keyQueryTab, 'text'))
let query: QueryText = $state(loadLocalStorage(keyQuery, { textFormat: examples[0].query }))

$effect(() => saveLocalStorage(keyInput, input))
$effect(() => saveLocalStorage(keyQuery, query))
$effect(() => saveLocalStorage(keyQueryTab, queryTab))

function loadExample(example: Example) {
  input = example.input
  query = { textFormat: example.query }
  name = example.name
}

const activeExample = $derived(
    examples.find(
      (example) =>
        example.input === input &&
        isTextFormat(query) &&
        example.query === query.textFormat
    )
  );
</script>

<div class="examples">
  <div class="examples-inner">
    {#each examples as example}
      <Button class="example {activeExample === example ? 'active' : ''}" onclick={() => loadExample(example)}>{example.name}</Button>
    {/each}
  </div>
</div>

<Playground bind:input bind:query bind:queryTab />

<style>
  .examples {
    padding: 0 var(--padding);
    display: flex;
    flex-direction: column;
  }

  .examples-inner {
    align-self: center;

    width: 100%;
    max-width: 1000px;
    margin: 30px 0 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--button-margin);
  }
</style>