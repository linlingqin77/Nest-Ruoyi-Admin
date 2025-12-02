import { Module, Global } from '@nestjs/common';
import { TenantHelper } from './tenant.helper';
import { TenantGuard } from './tenant.guard';

@Global()
@Module({
  providers: [TenantHelper, TenantGuard],
  exports: [TenantHelper, TenantGuard],
})
export class TenantModule {}
