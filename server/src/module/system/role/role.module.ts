import { Global, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Global()
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
