// @ts-check
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    shikiConfig: {
      // syntax highlighting
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      // theme: 'github-dark'
      // theme: 'andromeeda'
      // theme: 'aurora-x'
      // theme: 'dracula-soft'
      // theme: 'github-dark-dimmed'
      // theme: 'catppuccin-latte'
      theme: 'material-theme'
    }
  }
})
