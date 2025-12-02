import { Module, Global } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { DecryptInterceptor, EncryptInterceptor } from './crypto.interceptor';

@Global()
@Module({
  providers: [
    CryptoService,
    DecryptInterceptor,
    EncryptInterceptor,
  ],
  exports: [
    CryptoService,
    DecryptInterceptor,
    EncryptInterceptor,
  ],
})
export class CryptoModule {}
