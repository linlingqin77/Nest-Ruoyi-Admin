import { Global, Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';

@Global()
@Module({
  controllers: [DeptController],
  providers: [DeptService],
  exports: [DeptService],
})
export class DeptModule {}
