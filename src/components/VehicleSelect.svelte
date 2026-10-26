<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { VehicleOption } from '../lib/types';
  import Combobox from './ui/Combobox.svelte';
  export let makes: VehicleOption[] = [];
  export let models: VehicleOption[] = [];
  export let versions: VehicleOption[] = [];
  export let years: VehicleOption[] = [];
  export let makeId = '';
  export let modelId = '';
  export let versionId = '';
  export let yearId = '';
  export let invalidMake = false;
  export let invalidModel = false;
  export let invalidVersion = false;
  export let invalidYear = false;
  export let loadingMakes = false;
  export let loadingModels = false;
  export let loadingVersions = false;
  export let loadingYears = false;
  const dispatch = createEventDispatcher<{ make: string; model: string; version: string; year: string; clear: void }>();
  $: hasSelection = Boolean(makeId || modelId || versionId || yearId);

  function clearVehicle() {
    makeId = modelId = versionId = yearId = '';
    dispatch('clear');
  }
  $: orderedYears = [...years].sort((a, b) => Number(b.name) - Number(a.name));
</script>

<div class="vehicle-section">
  <div class="section-heading"><span class="section-number">01</span><div><h2>Escolha o veículo</h2><p>Selecione a configuração que deseja monitorar.</p></div><button type="button" class="clear-vehicle" disabled={!hasSelection} on:click={clearVehicle}>Limpar</button></div>
  <div class="vehicle-grid">
    <Combobox fieldId="make" label="Marca" options={makes} bind:value={makeId} loading={loadingMakes} on:change={() => dispatch('make', makeId)} invalid={invalidMake} />
    <Combobox fieldId="model" label="Modelo" options={models} bind:value={modelId} disabled={!makeId} loading={loadingModels} on:change={() => dispatch('model', modelId)} invalid={invalidModel} />
    <Combobox fieldId="version" label="Versão" options={versions} bind:value={versionId} disabled={!modelId} loading={loadingVersions} on:change={() => dispatch('version', versionId)} invalid={invalidVersion} />
    <Combobox fieldId="year" label="Ano" options={orderedYears} bind:value={yearId} disabled={!versionId} loading={loadingYears} searchable={false} invalid={invalidYear} on:change={() => dispatch('year', yearId)} />
  </div>
</div>
