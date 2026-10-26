<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
  export let loading = false;
  const dispatch = createEventDispatcher<{ click: MouseEvent }>();
</script>

<button class="button" {type} {disabled} aria-busy={loading} on:click={(event) => dispatch('click', event)}>
  {#if loading}<span class="spinner" aria-hidden="true"></span>{/if}
  <slot />
</button>
