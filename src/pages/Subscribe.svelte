<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import ContactSection from '../components/ContactSection.svelte';
  import CitySelect from '../components/CitySelect.svelte';
  import VehicleSelect from '../components/VehicleSelect.svelte';
  import { createSubscription } from '../lib/api/subscriptions';
  import { listMakes, listModels, listVersions, listYears } from '../lib/api/vehicles';
  import { validateSubscription, type SubscriptionField } from '../lib/forms/subscription';
  import type { SelectedCity, VehicleOption } from '../lib/types';

  let makes: VehicleOption[] = [], models: VehicleOption[] = [], versions: VehicleOption[] = [], years: VehicleOption[] = [];
  let makeId = '', modelId = '', versionId = '', yearId = '', email = '', radiusKm = 50;
  let city: SelectedCity | null = null, loadingSubmit = false, submitted = false, error = '';
  let loadingMakes = true, loadingModels = false, loadingVersions = false, loadingYears = false;
  let invalidFields = new Set<SubscriptionField>();

  onMount(async () => {
    try { makes = await listMakes(); }
    catch { error = 'Não foi possível carregar as marcas.'; }
    finally { loadingMakes = false; }
  });

  async function changedMake() {
    clearInvalid('make'); modelId = versionId = yearId = ''; models = versions = years = [];
    if (!makeId) return;
    loadingModels = true;
    try { models = await listModels(makeId); }
    catch { error = 'Não foi possível carregar os modelos.'; }
    finally { loadingModels = false; }
  }

  async function changedModel() {
    clearInvalid('model'); versionId = yearId = ''; versions = years = [];
    if (!modelId) return;
    loadingVersions = true;
    try { versions = await listVersions(makeId, modelId); }
    catch { error = 'Não foi possível carregar as versões.'; }
    finally { loadingVersions = false; }
  }

  async function changedVersion() {
    clearInvalid('version'); yearId = ''; years = [];
    if (!versionId) return;
    loadingYears = true;
    try { years = await listYears(makeId, modelId, versionId); }
    catch { error = 'Não foi possível carregar os anos.'; }
    finally { loadingYears = false; }
  }

  function changedYear() { clearInvalid('year'); }
  function clearVehicle() { models = versions = years = []; }
  function clearInvalid(field: SubscriptionField) {
    if (!invalidFields.has(field)) return;
    const next = new Set(invalidFields); next.delete(field); invalidFields = next;
  }

  async function submit() {
    error = '';
    invalidFields = validateSubscription({ makeId, modelId, versionId, yearId, hasCity: Boolean(city), email });
    if (invalidFields.size) {
      await tick();
      document.getElementById([...invalidFields][0])?.focus();
      return;
    }
    if (!city) return;
    loadingSubmit = true;
    try { await createSubscription({ email, makeId, modelId, versionId, yearId, ...city, radiusKm }); submitted = true; }
    catch { error = 'Não foi possível criar sua inscrição. Tente novamente.'; }
    finally { loadingSubmit = false; }
  }
</script>

<main class="shell"><Card>
  {#if submitted}
    <div class="success-state"><span class="success-icon">✓</span><p class="eyebrow">ALERTA CRIADO</p><h1>Confira seu e-mail</h1><p>Recebemos sua solicitação. Enviamos um link para confirmar o monitoramento.</p></div>
  {:else}
    <div class="hero"><p class="eyebrow">MONITORAMENTO INTELIGENTE</p><h1>Encontre seu próximo carro.</h1><p class="intro">Receba um alerta assim que surgir um novo anúncio do veículo que você procura.</p></div>
    <form on:submit|preventDefault={submit}>
      <VehicleSelect bind:makes bind:models bind:versions bind:years bind:makeId bind:modelId bind:versionId bind:yearId loadingMakes={loadingMakes} loadingModels={loadingModels} loadingVersions={loadingVersions} loadingYears={loadingYears} invalidMake={invalidFields.has('make')} invalidModel={invalidFields.has('model')} invalidVersion={invalidFields.has('version')} invalidYear={invalidFields.has('year')} on:make={changedMake} on:model={changedModel} on:version={changedVersion} on:year={changedYear} on:clear={clearVehicle} />
      <CitySelect bind:selected={city} bind:radiusKm invalid={invalidFields.has('city')} on:change={() => clearInvalid('city')} />
      <ContactSection bind:email invalid={invalidFields.has('email')} on:input={() => clearInvalid('email')} />
      {#if error}<p class="form-error">{error}</p>{/if}
      <Button type="submit" loading={loadingSubmit} disabled={loadingSubmit}>{loadingSubmit ? 'Criando alerta...' : 'Criar meu alerta'}</Button>
    </form>
  {/if}
</Card></main>
