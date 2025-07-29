import type { PublicKeyResponse } from './types/auth.d';

import { requestClient } from '#/api/request';

/**
 * 获取Admin专用RSA公钥
 */
export async function publicKeyApi(): Promise<PublicKeyResponse> {
  return requestClient.get<PublicKeyResponse>('/api/admin/auth/public-key');
}
