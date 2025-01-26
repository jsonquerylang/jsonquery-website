<script lang="ts">
  import Playground from '$lib/Playground.svelte'
  import Button from '$lib/Button.svelte'
  import { loadLocalStorage, saveLocalStorage } from '$lib/runes/localStorageState.svelte'
  import type { QueryText } from '$lib/types'
  import { compile, jsonquery, parse, stringify } from '@jsonquerylang/jsonquery'
  import { examples, type Example } from '$lib/data/examples'

  if (typeof window !== 'undefined') {
    // @ts-ignore
    window['jsonquery'] = { jsonquery, stringify, parse, compile }
  }

  const keyInput = 'playground-input'
  const keyQuery = 'playground-query'
  const keyQueryTab = 'playground-query-tab'

  let name = $state(examples[0].name)
  let input = $state(loadLocalStorage(keyInput, examples[0].input))
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

  function isActive(example: Example) {
    return name === example.name ? 'active' : ''
  }
</script>

<div class="app">
  <div class="header">
    <div class="header-contents">
      <!-- source: https://pixy.org/756900/ -->
      <img
        src="frog-756900-100.png"
        srcset="frog-756900-200.png 2x"
        alt="JSON Query logo"
        class="header-icon"
        width="100"
        height="98"
      />
      <div class="header-text">
        <h1>JSON Query</h1>
        <p>A small, flexible, and expandable JSON query language.</p>
        <p>
          Documentation:
          <a href="https://github.com/jsonquerylang/jsonquery">
            https://github.com/jsonquerylang/jsonquery
          </a>
        </p>
      </div>
    </div>
  </div>
  <div class="examples">
    <div class="examples-inner">
      {#each examples as example}
        <Button class="example {isActive(example)} " onclick={() => loadExample(example)}
          >{example.name}</Button
        >
      {/each}
    </div>
  </div>
  <Playground bind:input bind:query bind:queryTab />
</div>

<style>
  :root {
    --theme-color: #d5f3bb;
    --theme-color-highlight: #e1f6ce;
    --font-family-mono: consolas, menlo, monaco, 'Ubuntu Mono', 'source-code-pro', monospace;
    --font-size-mono: 13px;
    --background-color: #fafafa;
    --color: #222b00;
    --error-color: #f65252;
    --padding: 10px;
    --border-radius: 3px;
    --tab-border-width: 5px;
  }

  .app {
    flex: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: var(--background-color);
  }

  .header {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 10px 20px;
    color: var(--color);
    background: var(--theme-color);
    border-style: solid;
    border-color: transparent;
    border-width: 0 0 10px 0;
    background-color: hsla(0, 0%, 0%, 0);
    background-image: linear-gradient(var(--theme-color), var(--theme-color)),
      linear-gradient(to top right, transparent 50.5%, var(--theme-color) 50.5%),
      linear-gradient(to top left, transparent 50.5%, var(--theme-color) 50.5%);
    background-repeat: repeat, repeat-x, repeat-x;
    background-position:
      0 0,
      10px 100%,
      10px 100%;
    background-size:
      auto auto,
      20px 20px,
      20px 20px;
    background-clip: padding-box, border-box, border-box;
    background-origin: padding-box, border-box, border-box;
  }

  .header-contents {
    width: 100%;
    max-width: 1000px;
    align-self: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }

  h1 {
    font-size: 150%;
    margin: 0;
    padding: 0;
  }

  .examples {
    padding: 0 10px;
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
    gap: 5px;
  }
</style>
