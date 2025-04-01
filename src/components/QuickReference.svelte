<script lang="ts">
import type { MarkdownHeading } from '@astrojs/markdown-remark'
import { getHeadings } from '../content/reference.md'
import categories from './data/reference.json'
import type { ReferenceCategory } from './types'

function validateQuickReference(headings: MarkdownHeading[], categories: ReferenceCategory[]) {
  const documentationAnchors = new Set(
    headings.filter((heading) => heading.depth === 2).map((heading) => heading.slug)
  )

  const quickReferenceAnchors = new Set(
    categories.flatMap((category) => category.references.map((reference) => reference.urlAnchor))
  )

  const issues = [
    ...[...documentationAnchors]
      .filter((anchor) => !quickReferenceAnchors.has(anchor))
      .map((missingAnchor) => `"${missingAnchor}" is missing in the quick reference`),
    ...[...quickReferenceAnchors]
      .filter((anchor) => !documentationAnchors.has(anchor))
      .map((missingAnchor) => `"${missingAnchor}" found in the quick reference but not in the docs`)
  ]

  if (issues.length > 0) {
    throw new Error(`Error: issues found in the QuickReference:\n${issues.join('. \n')}`)
  }
}

validateQuickReference(getHeadings(), categories)

const docsBaseUrl = '/docs/'
const referenceBaseUrl = '/reference/'
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
