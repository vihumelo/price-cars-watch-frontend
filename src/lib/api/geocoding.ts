import type { SelectedCity } from '../types';
const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
export async function searchCities(name: string, signal?: AbortSignal): Promise<SelectedCity[]> {
  const params = new URLSearchParams({ name, count: '5', language: 'pt', countryCode: 'BR' });
  const response = await fetch(`${geocodingUrl}?${params}`, { signal });
  if (!response.ok) throw new Error('Não foi possível buscar cidades');
  const data = await response.json();
  return (data.results ?? []).map((item: { name: string; admin1: string; latitude: number; longitude: number }) => ({ city: item.name, state: item.admin1, latitude: item.latitude, longitude: item.longitude }));
}
