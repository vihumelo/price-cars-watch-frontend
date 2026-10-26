import { request } from './client';
import type { SubscriptionRequest } from '../types';
export const createSubscription = (payload: SubscriptionRequest) => request<{ status: 'accepted' }>('/subscriptions', { method: 'POST', body: JSON.stringify(payload) });
export const confirmSubscription = (subscriptionId: string, token: string) => request<{ id: string; status: 'active' }>(`/subscriptions/${encodeURIComponent(subscriptionId)}/confirm?token=${encodeURIComponent(token)}`);
export const cancelSubscription = (subscriptionId: string, token: string) => request<void>(`/subscriptions/${encodeURIComponent(subscriptionId)}?token=${encodeURIComponent(token)}`, { method: 'DELETE' });
