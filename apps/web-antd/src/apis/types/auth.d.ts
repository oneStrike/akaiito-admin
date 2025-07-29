export type PublicKeyResponse = RsaPublicKeyDto;

/**
 *  类型定义 [RsaPublicKeyDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type RsaPublicKeyDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* RSA公钥 */
  publicKey: string;
};
