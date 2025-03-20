<script lang="ts">
import type { MarkdownHeading } from '@astrojs/markdown-remark'

interface Props {
  headings: MarkdownHeading[]
  enableSearch?: boolean
}

const { headings, enableSearch = false }: Props = $props()

// biome-ignore lint/style/useConst: Svelte state must not be const
let search = $state('')

const searchTrimLower = $derived(search.trim().toLowerCase())

const filteredHeadings = $derived(
  search.trim()
    ? headings.filter((heading) => heading.text.toLowerCase().includes(searchTrimLower))
    : headings
)
</script>

<div class="outline">
  <h3>
    Outline
  </h3>

  {#if enableSearch}
    <!-- svelte-ignore a11y_autofocus -->
    <input bind:value={search} placeholder="Search..." class="search" autofocus />
  {/if}

  <ul>
    {#each filteredHeadings as heading}
      {#if heading.depth > 1}
        <li style={`margin-left: ${2 * (heading.depth - 2)}em`}>
          <a href={`#${heading.slug}`}>{heading.text}</a>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .outline {
    background: var(--outline-background);
    border-radius: var(--outline-border-radius);
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    gap: calc(2 * var(--padding));
  }

  .search {
    padding: 5px;
    font-family: inherit;
    font-size: inherit;
    border: var(--button-border);
    border-radius: var(--border-radius);
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    line-height: 1.6em;
  }

  h3 {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  a:active,
  a:hover {
    text-decoration: underline;
    color: var(--link-color);
  }
</style>