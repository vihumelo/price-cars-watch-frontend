<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../components/ui/Card.svelte';
  import { confirmSubscription } from '../lib/api/subscriptions';
  let loading = true, confirmed = false, error = '';
  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const subscriptionId = params.get('subscriptionId'); const token = params.get('token');
    if (!subscriptionId || !token) { error = 'Este link de confirmação é inválido ou está incompleto.'; loading = false; return; }
    try { await confirmSubscription(subscriptionId, token); confirmed = true; }
    catch { error = 'Não foi possível confirmar sua inscrição. O link pode ter expirado.'; }
    finally { loading = false; }
  });
</script>

<main class="shell"><Card>
  {#if loading}<div class="confirmation-state"><span class="loader" aria-hidden="true"></span><p class="eyebrow">CONFIRMANDO SEU ALERTA</p><h1>Aguarde um momento.</h1><p>Estamos confirmando sua inscrição.</p></div>
  {:else if confirmed}<div class="success-state"><span class="success-icon">✓</span><p class="eyebrow">ALERTA LIGADO</p><h1>Tudo certo!</h1><p>Sua inscrição foi confirmada. Avisaremos quando encontrarmos novos anúncios para você.</p></div>
  {:else}<div class="confirmation-state confirmation-error"><span class="error-icon">!</span><p class="eyebrow">NÃO FOI POSSÍVEL CONFIRMAR</p><h1>Link inválido.</h1><p>{error}</p></div>{/if}
</Card></main>
