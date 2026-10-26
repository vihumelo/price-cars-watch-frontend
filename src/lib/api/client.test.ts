import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, request } from './client';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('request', () => {
  it('retorna o JSON de uma resposta bem-sucedida', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
    ));

    await expect(request<{ status: string }>('/health')).resolves.toEqual({ status: 'ok' });
  });

  it('converte erros HTTP em ApiError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ code: 'INVALID_REQUEST', message: 'Dados inválidos' }), { status: 400 })
    ));

    await expect(request('/subscriptions')).rejects.toEqual(
      new ApiError(400, 'INVALID_REQUEST', 'Dados inválidos')
    );
  });

  it('aborta requisições que excedem o timeout', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn((_input: RequestInfo | URL, init?: RequestInit) => (
      new Promise((_, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      })
    )));

    const pendingRequest = request('/slow-endpoint');
    const rejection = expect(pendingRequest).rejects.toMatchObject({ name: 'AbortError' });
    await vi.advanceTimersByTimeAsync(10_000);

    await rejection;
  });
});
