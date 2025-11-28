import { Global, Module } from '@nestjs/common';
import { OperlogService } from './operlog.service';
import { OperlogController } from './operlog.controller';
@Global()
@Module({
  controllers: [OperlogController],
  providers: [OperlogService],
  exports: [OperlogService],
})
export class OperlogModule {}
