import { describe, expect, it } from 'vitest';
import { validateSubscription } from './subscription';

describe('validateSubscription', () => {
  it('identifica todos os campos obrigatórios vazios', () => {
    const invalid = validateSubscription({
      makeId: '',
      modelId: '',
      versionId: '',
      yearId: '',
      hasCity: false,
      email: '   '
    });

    expect([...invalid]).toEqual(['make', 'model', 'version', 'year', 'city', 'email']);
  });

  it('retorna nenhum erro quando o formulário está completo', () => {
    const invalid = validateSubscription({
      makeId: '1',
      modelId: '2',
      versionId: '3',
      yearId: '2025',
      hasCity: true,
      email: 'cliente@example.com'
    });

    expect(invalid.size).toBe(0);
  });
});
