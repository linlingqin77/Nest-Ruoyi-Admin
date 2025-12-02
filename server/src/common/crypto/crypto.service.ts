import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

/**
 * 加解密服务
 * 
 * 实现 RSA + AES 混合加密方案:
 * - RSA 用于加密/解密 AES 密钥
 * - AES 用于加密/解密实际数据
 * 
 * 与 Soybean 前端的 crypto.ts 保持一致
 */
@Injectable()
export class CryptoService implements OnModuleInit {
  private readonly logger = new Logger(CryptoService.name);
  
  // RSA 密钥对
  private publicKey: string;
  private privateKey: string;
  
  // 是否启用加密
  private enabled: boolean = false;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.enabled = this.configService.get<boolean>('crypto.enabled', false);
    
    if (this.enabled) {
      // 从配置加载或生成 RSA 密钥对
      this.publicKey = this.configService.get<string>('crypto.rsaPublicKey', '');
      this.privateKey = this.configService.get<string>('crypto.rsaPrivateKey', '');
      
      if (!this.publicKey || !this.privateKey) {
        this.logger.warn('RSA keys not configured, generating new key pair...');
        this.generateRsaKeyPair();
      }
      
      this.logger.log('Crypto service initialized with RSA+AES encryption');
    } else {
      this.logger.log('Crypto service disabled');
    }
  }

  /**
   * 检查加密是否启用
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * 获取 RSA 公钥 (返回给前端用于加密)
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * 生成 RSA 密钥对
   */
  private generateRsaKeyPair(): void {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    
    // 输出公钥供配置使用
    this.logger.debug('Generated RSA Public Key:');
    this.logger.debug(this.publicKey);
  }

  /**
   * RSA 解密 (使用私钥解密前端发送的 AES 密钥)
   */
  rsaDecrypt(encryptedData: string): string {
    try {
      const buffer = Buffer.from(encryptedData, 'base64');
      const decrypted = crypto.privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      return decrypted.toString('utf8');
    } catch (error) {
      this.logger.error('RSA decrypt error:', error.message);
      throw new Error('RSA decrypt failed');
    }
  }

  /**
   * RSA 加密 (使用公钥加密 AES 密钥返回给前端)
   */
  rsaEncrypt(data: string): string {
    try {
      const buffer = Buffer.from(data, 'utf8');
      const encrypted = crypto.publicEncrypt(
        {
          key: this.publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      return encrypted.toString('base64');
    } catch (error) {
      this.logger.error('RSA encrypt error:', error.message);
      throw new Error('RSA encrypt failed');
    }
  }

  /**
   * AES 解密 (ECB 模式，PKCS7 填充)
   * 与 Soybean 前端保持一致
   */
  aesDecrypt(encryptedData: string, aesKey: string): string {
    try {
      // 确保 AES key 是 16 字节 (128位)
      const key = this.normalizeAesKey(aesKey);
      
      const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
      decipher.setAutoPadding(true); // PKCS7 padding
      
      let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      this.logger.error('AES decrypt error:', error.message);
      throw new Error('AES decrypt failed');
    }
  }

  /**
   * AES 加密 (ECB 模式，PKCS7 填充)
   * 与 Soybean 前端保持一致
   */
  aesEncrypt(data: string, aesKey: string): string {
    try {
      const key = this.normalizeAesKey(aesKey);
      
      const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
      cipher.setAutoPadding(true); // PKCS7 padding
      
      let encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      
      return encrypted;
    } catch (error) {
      this.logger.error('AES encrypt error:', error.message);
      throw new Error('AES encrypt failed');
    }
  }

  /**
   * 规范化 AES 密钥到 16 字节
   */
  private normalizeAesKey(key: string): Buffer {
    const keyBuffer = Buffer.from(key, 'utf8');
    if (keyBuffer.length === 16) {
      return keyBuffer;
    }
    // 如果不是 16 字节，进行填充或截断
    const normalizedKey = Buffer.alloc(16);
    keyBuffer.copy(normalizedKey, 0, 0, Math.min(keyBuffer.length, 16));
    return normalizedKey;
  }

  /**
   * 生成随机 AES 密钥
   */
  generateAesKey(): string {
    return crypto.randomBytes(16).toString('hex').substring(0, 16);
  }

  /**
   * 解密请求数据
   * 前端发送格式: { encryptedKey: string, encryptedData: string }
   */
  decryptRequest(encryptedKey: string, encryptedData: string): any {
    // 1. 使用 RSA 私钥解密 AES 密钥
    const aesKey = this.rsaDecrypt(encryptedKey);
    
    // 2. 使用 AES 密钥解密数据
    const decryptedJson = this.aesDecrypt(encryptedData, aesKey);
    
    // 3. 解析 JSON
    return JSON.parse(decryptedJson);
  }

  /**
   * 加密响应数据
   * 返回格式: { encryptedKey: string, encryptedData: string }
   */
  encryptResponse(data: any, clientAesKey?: string): { encryptedKey: string; encryptedData: string } {
    // 如果客户端提供了 AES 密钥，使用它；否则生成新的
    const aesKey = clientAesKey || this.generateAesKey();
    
    // 1. 使用 AES 加密数据
    const jsonData = JSON.stringify(data);
    const encryptedData = this.aesEncrypt(jsonData, aesKey);
    
    // 2. 使用 RSA 公钥加密 AES 密钥 (如果需要发送新密钥)
    const encryptedKey = clientAesKey ? '' : this.rsaEncrypt(aesKey);
    
    return { encryptedKey, encryptedData };
  }
}
