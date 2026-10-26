import { afterEach, describe, expect, it, vi } from 'vitest';
import { searchCities } from './geocoding';

afterEach(() => vi.unstubAllGlobals());

describe('searchCities', () => {
  it('converte os resultados da Open-Meteo para cidades do frontend', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        results: [{ name: 'São Paulo', admin1: 'São Paulo', latitude: -23.55, longitude: -46.63 }]
      }), { status: 200 })
    ));

    await expect(searchCities('São Paulo')).resolves.toEqual([{
      city: 'São Paulo',
      state: 'São Paulo',
      latitude: -23.55,
      longitude: -46.63
    }]);

    const [url] = vi.mocked(fetch).mock.calls[0];
    const params = new URL(String(url)).searchParams;
    expect(params.get('name')).toBe('São Paulo');
    expect(params.get('count')).toBe('5');
    expect(params.get('language')).toBe('pt');
    expect(params.get('countryCode')).toBe('BR');
  });

  it('retorna uma lista vazia quando a API não encontra resultados', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    ));

    await expect(searchCities('Cidade inexistente')).resolves.toEqual([]);
  });

  it('falha quando a API de geocoding responde com erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response('', { status: 503 })
    ));

    await expect(searchCities('São Paulo')).rejects.toThrow('Não foi possível buscar cidades');
  });
});
