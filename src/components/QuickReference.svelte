<script lang="ts">
import type { MarkdownHeading } from '@astrojs/markdown-remark'
import { compiledContent as compiledSyntaxContent } from '../content/documentation.md'
import { compiledContent as compiledReferenceContent, getHeadings } from '../content/reference.md'
import QuickReferenceModal from './QuickReferenceModal.svelte'
import categories from './data/reference.json'
import type { ReferenceCategory, ReferenceDoc } from './types'

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

async function getReferenceDoc(anchor: string): Promise<string | undefined> {
  const content = await compiledReferenceContent()

  return content
    .split(/(?=<h2)/)
    .slice(1)
    .find((doc) => doc.match(/<h2 id="([\w-]+)">/)?.[1] === anchor)
}

async function getSyntaxDoc(anchor: string): Promise<string | undefined> {
  const content = await compiledSyntaxContent()

  return content
    .split(/(?=<h3)/)
    .slice(1)
    .find((doc) => doc.match(/<h3 id="([\w-]+)">/)?.[1] === anchor)
}

const docsBaseUrl = '/docs/'
const referenceBaseUrl = '/reference/'

// biome-ignore lint/style/useConst: Svelte $state is not const
let selectedDoc: ReferenceDoc | undefined = $state()
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
<!--        <a href={`${docsBaseUrl}#${category.documentation.urlAnchor}`} target="_blank"-->
<!--          >{category.documentation.title}</a-->
<!--        >-->
        <button
            type="button"
            class="quick-reference-button"
            onclick={async () => selectedDoc = {
                    url: docsBaseUrl,
                    anchor: category.documentation.urlAnchor,
                    doc: await getSyntaxDoc(category.documentation.urlAnchor)
                  }}
        >
          <code>{category.documentation.title}</code>
        </button>
      </p>
      {#if category.references?.length > 0}
        <p>{category.name} reference:</p>
        <ul class="reference">
          {#each category.references as reference}
            <li>
              <button
                  type="button"
                  class="quick-reference-button"
                  onclick={async () => selectedDoc = {
                    url: referenceBaseUrl,
                    anchor: reference.urlAnchor,
                    doc: await getReferenceDoc(reference.urlAnchor)
                  }}
              >
                <code>{reference.syntax}</code>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </details>
{/each}

{#if selectedDoc}
  <QuickReferenceModal
      referenceDoc={selectedDoc}
      onClose={() => selectedDoc = undefined}
  />
{/if}

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
    line-height: 1.5em;
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px;
    border-radius: var(--border-radius);
    font-size: var(--font-size-mono);
  }

  pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px;
    border-radius: var(--border-radius);
    font-size: var(--font-size-mono);
  }

  pre code {
    background: none;
  }

  .quick-reference-button {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-mono);
    color: var(--link-color);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .quick-reference-button:hover {
    color: var(--link-color-highlight);
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
