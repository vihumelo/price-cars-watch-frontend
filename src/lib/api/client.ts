export class ApiError extends Error {
  constructor(public status: number, public code?: string, message = 'Erro na API') { super(message); this.name = 'ApiError'; }
}

const REQUEST_TIMEOUT_MS = 10_000;
const backendUrl = (import.meta.env.VITE_BACKEND_URL ?? '').replace(/\/$/, '');

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abortFromCaller = () => controller.abort();
  if (init.signal?.aborted) controller.abort();
  else init.signal?.addEventListener('abort', abortFromCaller, { once: true });

  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(`${backendUrl}${path}`, { ...init, headers, signal: controller.signal });
    const rawBody = await response.text();
    let body: unknown;
    try { body = rawBody ? JSON.parse(rawBody) : undefined; } catch { body = undefined; }
    if (!response.ok) {
      const errorBody = body as { code?: string; message?: string } | undefined;
      throw new ApiError(response.status, errorBody?.code, errorBody?.message ?? `Erro na API (${response.status})`);
    }
    return body as T;
  } finally {
    clearTimeout(timeoutId);
    init.signal?.removeEventListener('abort', abortFromCaller);
  }
}
