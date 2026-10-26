<script lang="ts">
  export let label = '';
  export let value = 50;
  import { RADIUS_OPTIONS } from '../../lib/constants';
  const radiusOptions = RADIUS_OPTIONS;
  let selectedIndex = Math.max(0, radiusOptions.findIndex((option) => option === Number(value)));

  $: if (radiusOptions[selectedIndex] !== Number(value)) value = radiusOptions[selectedIndex];
</script>

<label class="field range-field">
  <span class="range-heading"><span class="field-label">{label}</span><strong>{value} km</strong></span>
  <input type="range" min="0" max="4" step="1" bind:value={selectedIndex} aria-label={label} />
</label>
