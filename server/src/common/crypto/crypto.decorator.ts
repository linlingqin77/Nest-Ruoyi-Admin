import { SetMetadata } from '@nestjs/common';

/**
 * 跳过加密的装饰器 key
 */
export const SKIP_ENCRYPT_KEY = 'skipEncrypt';

/**
 * 跳过解密的装饰器 key
 */
export const SKIP_DECRYPT_KEY = 'skipDecrypt';

/**
 * 跳过响应加密装饰器
 * 
 * 使用此装饰器的方法将返回未加密的响应
 * 适用于：
 * - 获取公钥接口
 * - 健康检查接口
 * - 不需要加密的公开接口
 * 
 * @example
 * ```typescript
 * @SkipEncrypt()
 * @Get('public-key')
 * getPublicKey() {
 *   return { publicKey: this.cryptoService.getPublicKey() };
 * }
 * ```
 */
export const SkipEncrypt = () => SetMetadata(SKIP_ENCRYPT_KEY, true);

/**
 * 跳过请求解密装饰器
 * 
 * 使用此装饰器的方法将不解密请求体
 * 适用于：
 * - 文件上传接口
 * - 接收第三方回调的接口
 * 
 * @example
 * ```typescript
 * @SkipDecrypt()
 * @Post('upload')
 * uploadFile(@Body() body: any) {
 *   // 接收未加密的请求体
 * }
 * ```
 */
export const SkipDecrypt = () => SetMetadata(SKIP_DECRYPT_KEY, true);

/**
 * 同时跳过加密和解密
 */
export const SkipCrypto = () => {
  return (target: any, key?: string, descriptor?: PropertyDescriptor) => {
    SkipEncrypt()(target, key, descriptor);
    SkipDecrypt()(target, key, descriptor);
  };
};
