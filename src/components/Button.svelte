<script lang="ts">
const props = $props()
</script>

<button {...props}>{@render props.children?.()}</button>

<style>
  button {
    background: #808080;
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 5px 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }

  button:hover {
    background: #9c9c9c;
  }

  button.active {
    background: var(--color);
  }
</style>
