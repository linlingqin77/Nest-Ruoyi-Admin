import { Module, Global } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Global()
@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
