import { Module, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/index';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { TenantMiddleware, TenantGuard, TenantModule } from './common/tenant';
import { CryptoModule, DecryptInterceptor, EncryptInterceptor } from './common/crypto';

import { MainModule } from './module/main/main.module';
import { UploadModule } from './module/upload/upload.module';
import { SystemModule } from './module/system/system.module';
import { CommonModule } from './module/common/common.module';
import { MonitorModule } from './module/monitor/monitor.module';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库改为 Prisma + PostgreSQL
    PrismaModule,
    // 多租户模块
    TenantModule,
    // 加解密模块
    CryptoModule,

    MainModule,
    UploadModule,

    CommonModule,
    SystemModule,
    MonitorModule,
  ],
  providers: [
    // 解密拦截器 (最先执行)
    {
      provide: APP_INTERCEPTOR,
      useClass: DecryptInterceptor,
    },
    // 加密拦截器 (最后执行)
    {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    // 租户守卫
    {
      provide: APP_GUARD,
      useClass: TenantGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 租户中间件应用于所有路由
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
