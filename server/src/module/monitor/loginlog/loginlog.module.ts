import { Module, Global } from '@nestjs/common';
import { LoginlogService } from './loginlog.service';
import { LoginlogController } from './loginlog.controller';
@Global()
@Module({
  controllers: [LoginlogController],
  providers: [LoginlogService],
  exports: [LoginlogService],
})
export class LoginlogModule {}
