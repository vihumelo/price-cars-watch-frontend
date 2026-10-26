<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { searchCities } from '../lib/api/geocoding';
  import type { SelectedCity } from '../lib/types';
  import RangeSlider from './ui/RangeSlider.svelte';
  import TextInput from './ui/TextInput.svelte';
  export let selected: SelectedCity | null = null;
  export let radiusKm = 50;
  export let invalid = false;
  const dispatch = createEventDispatcher<{ change: SelectedCity }>();
  let query = '', suggestions: SelectedCity[] = [], loading = false;
  let timer: ReturnType<typeof setTimeout>;
  let controller: AbortController | null = null;
  function onInput() {
    selected = null; clearTimeout(timer);
    if (query.trim().length < 3) { suggestions = []; return; }
    controller?.abort();
    timer = setTimeout(async () => {
      controller = new AbortController(); loading = true;
      try { suggestions = await searchCities(query.trim(), controller.signal); }
      catch (error) { if ((error as DOMException).name !== 'AbortError') suggestions = []; }
      finally { loading = false; }
    }, 300);
  }
  function choose(city: SelectedCity) { selected = city; query = `${city.city} - ${city.state}`; suggestions = []; dispatch('change', city); }
  onDestroy(() => { clearTimeout(timer); controller?.abort(); });
</script>

<div class="location-section">
  <div class="section-heading"><span class="section-number">02</span><div><h2>Escolha a localização</h2><p>Defina a cidade onde deseja encontrar anúncios.</p></div></div>
  <div class="city-field">
    <TextInput fieldId="city" label="Cidade" bind:value={query} on:input={onInput} placeholder="Digite uma cidade" autocomplete="off" {invalid} />
    {#if loading}<small>Buscando cidades...</small>{/if}
    {#if suggestions.length}
      <div class="suggestions">
        <p class="suggestions-title">Escolha uma localização</p>
        <ul>
          {#each suggestions as city}
            <li><button type="button" class="suggestion-option" on:click={() => choose(city)}><span class="suggestion-copy"><strong>{city.city}</strong><small>{city.state}</small></span></button></li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  <RangeSlider label="Raio de busca" bind:value={radiusKm} />
</div>
