<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../components/ui/Card.svelte';
  import Button from '../components/ui/Button.svelte';
  import { cancelSubscription } from '../lib/api/subscriptions';
  let subscriptionId = '', token = '', loading = false, cancelled = false, error = '';
  onMount(() => { const params = new URLSearchParams(window.location.search); subscriptionId = params.get('subscriptionId') ?? ''; token = params.get('token') ?? ''; if (!subscriptionId || !token) error = 'Este link de cancelamento é inválido ou está incompleto.'; });
  async function unsubscribe() { if (!subscriptionId || !token) return; error = ''; loading = true; try { await cancelSubscription(subscriptionId, token); cancelled = true; } catch { error = 'Não foi possível cancelar sua inscrição. O link pode ter expirado.'; } finally { loading = false; } }
</script>

<main class="shell"><Card>
  {#if cancelled}<div class="success-state"><span class="success-icon">✓</span><p class="eyebrow">ALERTA DESLIGADO</p><h1>Inscrição cancelada.</h1><p>Você não receberá mais alertas sobre novos anúncios.</p></div>
  {:else}<div class="unsubscribe-state"><span class="unsubscribe-icon">×</span><p class="eyebrow">CANCELAR ALERTA</p><h1>Deseja cancelar sua inscrição?</h1><p>Ao continuar, você deixará de receber alertas de novos anúncios.</p>{#if error}<p class="form-error">{error}</p>{/if}<Button type="button" loading={loading} disabled={loading || !subscriptionId || !token} on:click={unsubscribe}>{loading ? 'Cancelando...' : 'Cancelar inscrição'}</Button></div>{/if}
</Card></main>
