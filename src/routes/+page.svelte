<script>
  import Playground from '$lib/Playground.svelte'
  import Button from '$lib/Button.svelte'

  const example1 = {
    input: `{
  "friends": [
    {"name": "Chris", "age": 23, "city": "New York"},
    {"name": "Emily", "age": 19, "city": "Atlanta"},
    {"name": "Joe", "age": 32, "city": "New York"},
    {"name": "Kevin", "age": 19, "city": "Atlanta"},
    {"name": "Michelle", "age": 27, "city": "Los Angeles"},
    {"name": "Robert", "age": 45, "city": "Manhattan"},
    {"name": "Sarah", "age": 31, "city": "New York"}
  ]
}`,
    query: `.friends
  | filter(.city == "New York")
  | sort(.age)
  | pick(.name, .age)`
  }

  const example2 = {
    input: `[
  {"name": "Chris", "age": 23, "city": "New York"},
  {"name": "Emily", "age": 19, "city": "Atlanta"},
  {"name": "Joe", "age": 32, "city": "New York"},
  {"name": "Kevin", "age": 19, "city": "Atlanta"},
  {"name": "Michelle", "age": 27, "city": "Los Angeles"},
  {"name": "Robert", "age": 45, "city": "Manhattan"},
  {"name": "Sarah", "age": 31, "city": "New York"}
]
`,
    query: `filter((.city == "New York") and (.age > 30))\n`
  }

  const example3 = {
    input: example2.input,
    query: `map({
  firstName: .name,
  details: {
    city: .city,
    age: .age
  }
})
`
  }

  const example4 = {
    input: example2.input,
    query: `{
  names: map(.name),
  count: size(),
  averageAge: map(.age) | average()
}
`
  }

  const example5 = {
    input: `[
  { "name": "bread", "price": 2.5, "quantity": 2 },
  { "name": "milk", "price": 1.2, "quantity": 3 }
]
`,
    query: `map(.price * .quantity) | sum()\n`
  }

  let example = $state(example1)
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
      <Button class="example" onclick={() => (example = example1)}>example 1</Button>
      <Button class="example" onclick={() => (example = example2)}>example 2</Button>
      <Button class="example" onclick={() => (example = example3)}>example 3</Button>
      <Button class="example" onclick={() => (example = example4)}>example 4</Button>
      <Button class="example" onclick={() => (example = example5)}>example 5</Button>
    </div>
  </div>
  <Playground input={example.input} query={example.query} />
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
