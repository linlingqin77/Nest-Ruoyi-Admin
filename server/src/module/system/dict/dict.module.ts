import { Global, Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';

@Global()
@Module({
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {}
