import { afterEach, describe, expect, it, vi } from 'vitest';
import { listMakes, listModels, listVersions, listYears } from './vehicles';

afterEach(() => vi.unstubAllGlobals());

describe('vehicle API', () => {
  it('monta as URLs para cada nível da seleção', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify([]), { status: 200 }))
    );
    vi.stubGlobal('fetch', fetchMock);

    await listMakes();
    await listModels('Toyota/BR');
    await listVersions('Toyota/BR', 'Corolla sedan');
    await listYears('Toyota/BR', 'Corolla sedan', 'XEi 2.0');

    const urls = fetchMock.mock.calls.map(([url]) => new URL(String(url)).pathname);
    expect(urls).toEqual([
      '/vehicles/makes',
      '/vehicles/makes/Toyota%2FBR/models',
      '/vehicles/makes/Toyota%2FBR/models/Corolla%20sedan/versions',
      '/vehicles/makes/Toyota%2FBR/models/Corolla%20sedan/versions/XEi%202.0/years'
    ]);
  });

  it('retorna as opções recebidas da API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: '1', name: 'Toyota' }]), { status: 200 })
    ));

    await expect(listMakes()).resolves.toEqual([{ id: '1', name: 'Toyota' }]);
  });
});
