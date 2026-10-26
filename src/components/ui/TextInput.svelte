<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label = '';
  export let value = '';
  export let type = 'text';
  export let placeholder = '';
  export let required = false;
  export let autocomplete: 'off' | 'email' | 'on' = 'off';
  export let fieldId = '';
  export let invalid = false;
  const dispatch = createEventDispatcher<{ input: string }>();
</script>

<label class:invalid class="field">
  <span class="field-label">{label}</span>
  <input id={fieldId} {type} bind:value {placeholder} {required} {autocomplete} on:input={() => dispatch('input', value)} />
</label>
