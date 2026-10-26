<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextInput from './ui/TextInput.svelte';
  export let email = '';
  export let invalid = false;
  const dispatch = createEventDispatcher<{ input: string }>();
</script>

<div class="contact-section">
  <div class="section-heading"><span class="section-number">03</span><div><h2>Receba seus alertas</h2><p>Enviaremos as novidades diretamente para o seu e-mail.</p></div></div>
  <TextInput fieldId="email" label="Seu melhor e-mail" type="email" bind:value={email} on:input={() => dispatch('input', email)} placeholder="voce@exemplo.com" required autocomplete="email" {invalid} />
</div>
