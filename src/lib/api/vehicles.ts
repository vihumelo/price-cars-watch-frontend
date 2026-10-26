import { request } from './client';
import type { VehicleOption } from '../types';
export const listMakes = (signal?: AbortSignal) => request<VehicleOption[]>('/vehicles/makes', { signal });
export const listModels = (makeId: string, signal?: AbortSignal) => request<VehicleOption[]>(`/vehicles/makes/${encodeURIComponent(makeId)}/models`, { signal });
export const listVersions = (makeId: string, modelId: string, signal?: AbortSignal) => request<VehicleOption[]>(`/vehicles/makes/${encodeURIComponent(makeId)}/models/${encodeURIComponent(modelId)}/versions`, { signal });
export const listYears = (makeId: string, modelId: string, versionId: string, signal?: AbortSignal) => request<VehicleOption[]>(`/vehicles/makes/${encodeURIComponent(makeId)}/models/${encodeURIComponent(modelId)}/versions/${encodeURIComponent(versionId)}/years`, { signal });
