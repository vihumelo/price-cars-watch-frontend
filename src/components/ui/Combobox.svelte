<script context="module" lang="ts">
  let closeActiveCombobox: (() => void) | null = null;
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onDestroy } from 'svelte';
  import type { VehicleOption } from '../../lib/types';

  export let label = '';
  export let value = '';
  export let options: VehicleOption[] = [];
  export let placeholder = 'Selecione';
  export let disabled = false;
  export let searchable = true;
  export let invalid = false;
  export let fieldId = '';
  export let loading = false;

  let open = false;
  let query = '';
  let inputElement: HTMLInputElement;
  let rootElement: HTMLDivElement;
  const dispatch = createEventDispatcher<{ change: string }>();

  $: selected = options.find((option) => option.id === value);
  $: filteredOptions = searchable
    ? options.filter((option) => option.name.toLowerCase().includes(query.trim().toLowerCase()))
    : options;
  $: effectiveDisabled = disabled || loading;

  function toggle() {
    if (effectiveDisabled) return;
    if (open) {
      closeThis();
      return;
    }

    if (closeActiveCombobox !== closeThis) closeActiveCombobox?.();
    open = true;
    closeActiveCombobox = closeThis;
    query = '';
    if (searchable) setTimeout(() => inputElement?.focus());
  }

  function closeThis() {
    open = false;
    query = '';
    if (closeActiveCombobox === closeThis) closeActiveCombobox = null;
  }

  function choose(option: VehicleOption) {
    value = option.id;
    closeThis();
    dispatch('change', value);
  }

  function close(event: MouseEvent) {
    const target = event.target as Node;
    if (!target || !rootElement?.contains(target)) closeThis();
  }

  onDestroy(() => {
    if (closeActiveCombobox === closeThis) closeActiveCombobox = null;
  });
</script>

<svelte:window on:click={close} />

<div class:invalid class="field combobox" bind:this={rootElement}>
  <span class="field-label">{label}</span>
  <button id={fieldId} type="button" class="combobox-trigger" aria-haspopup="listbox" aria-expanded={open} aria-busy={loading} disabled={effectiveDisabled} on:click|stopPropagation={toggle}>
    <span class:selected-placeholder={!selected}>{loading ? 'Carregando...' : selected?.name ?? placeholder}</span>
    <span class="select-chevron" aria-hidden="true">⌄</span>
  </button>

  {#if open}
    <div class="combobox-panel">
      {#if searchable}<input bind:this={inputElement} class="combobox-search" bind:value={query} placeholder={`Buscar ${label.toLowerCase()}...`} aria-label={`Buscar ${label.toLowerCase()}`} />{/if}
      <div class="combobox-options" role="listbox" aria-label={label}>
        {#if filteredOptions.length}
          {#each filteredOptions as option}
            <button type="button" class:selected-option={option.id === value} on:click={() => choose(option)}>{option.name}{#if option.id === value}<span>✓</span>{/if}</button>
          {/each}
        {:else}
          <p class="combobox-empty">Nenhuma opção encontrada.</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
