export type SubscriptionField = 'make' | 'model' | 'version' | 'year' | 'city' | 'email';
export function validateSubscription(values: { makeId: string; modelId: string; versionId: string; yearId: string; hasCity: boolean; email: string }): Set<SubscriptionField> {
  const invalid = new Set<SubscriptionField>();
  if (!values.makeId) invalid.add('make');
  if (!values.modelId) invalid.add('model');
  if (!values.versionId) invalid.add('version');
  if (!values.yearId) invalid.add('year');
  if (!values.hasCity) invalid.add('city');
  if (!values.email.trim()) invalid.add('email');
  return invalid;
}
