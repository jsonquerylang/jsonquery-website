<script lang="ts">
  import categories from './data/reference.json'

  const docsBaseUrl = 'https://github.com/jsonquerylang/jsonquery'
  const referenceBaseUrl =
    'https://github.com/jsonquerylang/jsonquery/blob/main/reference/functions.md'
</script>

{#each categories as category}
  <details>
    <summary>
      <span class="category">{category.name}</span>
      <code>{category.syntax}</code>
    </summary>
    <div class="details-content">
      <p>
        {@html category.description}
      </p>
      <p>
        {#if category.examples.length === 1}
          Example:
        {:else}
          Examples:
        {/if}
      </p>
      {#each category.examples as example}
        <pre><code>{example}</code></pre>
      {/each}
      <p>
        Documentation:
        <a href={`${docsBaseUrl}#${category.documentation.urlAnchor}`} target="_blank"
          >{category.documentation.title}</a
        >
      </p>
      {#if category.references?.length > 0}
        <p>{category.name} reference:</p>
        <ul class="reference">
          {#each category.references as reference}
            <li>
              <a
                title={reference.title}
                href={`${referenceBaseUrl}#${reference.urlAnchor}`}
                target="_blank"><code>{reference.syntax}</code></a
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </details>
{/each}

<style>
  details {
    display: flex;
    flex-direction: column;
    min-height: min-content;
  }

  details p {
    padding: 0;
    margin: 0.5em 0;
  }

  details p:first-child {
    margin-top: 0;
  }

  details p:last-child {
    margin-bottom: 0;
  }

  details ul {
    margin: 0;
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px;
    border-radius: var(--border-radius);
  }

  pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px;
    border-radius: var(--border-radius);
  }

  pre code {
    background: none;
  }

  .reference a {
    text-decoration: none;
  }

  summary {
    cursor: pointer;
  }

  summary .category {
    min-width: 80px;
    display: inline-block;
  }

  .details-content {
    padding: 0.5em;
    margin: 0.5em 0 0.5em 30px;
    border-radius: var(--border-radius);
  }
</style>
