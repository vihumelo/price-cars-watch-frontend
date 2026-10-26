export interface VehicleOption { id: string; name: string; }

export interface SelectedCity {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface SubscriptionRequest {
  email: string;
  makeId: string;
  modelId: string;
  versionId: string;
  yearId: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
}
