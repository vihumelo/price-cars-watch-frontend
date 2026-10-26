<script lang="ts">
  import Confirm from './pages/Confirm.svelte';
  import Subscribe from './pages/Subscribe.svelte';
  import Unsubscribe from './pages/Unsubscribe.svelte';
  import { ROUTES } from './lib/constants';

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const currentPage = path === ROUTES.confirm ? 'confirm' : path === ROUTES.unsubscribe ? 'unsubscribe' : 'subscribe';
</script>

{#if currentPage === 'confirm'}
  <Confirm />
{:else if currentPage === 'unsubscribe'}
  <Unsubscribe />
{:else}
  <Subscribe />
{/if}
