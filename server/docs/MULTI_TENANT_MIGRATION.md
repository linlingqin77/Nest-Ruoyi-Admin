# 多租户迁移指南

本文档说明如何将现有 Nest-Admin 项目升级到多租户版本。

## 变更概述

### 新增数据表

1. **SysTenant** - 租户表
   - 存储租户基本信息（企业名称、联系人、有效期等）
   - `tenantId` 字段是租户的唯一标识，默认值为 '000000'（平台管理员）

2. **SysTenantPackage** - 租户套餐表
   - 定义租户可使用的菜单权限
   - 支持不同租户使用不同的功能套餐

3. **SysClient** - 客户端表
   - 支持多端登录（PC、App、小程序等）
   - OAuth2 客户端凭证管理

### 修改的数据表

以下表新增了 `tenantId` 字段用于租户隔离：

- SysConfig
- SysDept  
- SysDictData
- SysDictType
- SysJob
- SysLogininfor
- SysMenu
- SysNotice
- SysOperLog
- SysPost
- SysRole
- SysUpload
- SysUser

## 升级步骤

### 1. 生成 Prisma 客户端

```bash
cd server
pnpm prisma:generate
```

### 2. 创建数据库迁移

```bash
pnpm prisma:migrate
```

当提示输入迁移名称时，输入: `add_multi_tenant_support`

### 3. 初始化租户数据

迁移完成后，需要初始化默认租户数据：

```bash
pnpm prisma:seed
```

或者手动执行 SQL：

```sql
-- 创建默认租户套餐
INSERT INTO "SysTenantPackage" ("packageId", "packageName", "menuIds", "menuCheckStrictly", "status", "delFlag", "createBy", "createTime")
VALUES (1, '默认套餐', '1,2,3,4,5,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117', 1, '0', '0', 'admin', NOW());

-- 创建平台管理员租户
INSERT INTO "SysTenant" ("id", "tenantId", "companyName", "contactUserName", "packageId", "expireTime", "accountCount", "status", "delFlag", "createBy", "createTime")
VALUES (1, '000000', '平台管理', '管理员', 1, '2099-12-31', -1, '0', '0', 'admin', NOW());

-- 创建默认客户端
INSERT INTO "SysClient" ("id", "clientId", "clientKey", "clientSecret", "grantTypeList", "deviceType", "activeTimeout", "timeout", "status", "delFlag", "createBy", "createTime")
VALUES (1, 'pc', 'pc', 'pc123', 'password,social', 'pc', 7200, 86400, '0', '0', 'admin', NOW());
```

### 4. 更新现有数据的租户ID

如果已有数据，需要更新为默认租户ID：

```sql
-- 更新所有现有数据的租户ID为默认值
UPDATE "SysConfig" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysDept" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysDictData" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysDictType" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysJob" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysLogininfor" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysMenu" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysNotice" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysOperLog" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysPost" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysRole" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysUpload" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
UPDATE "SysUser" SET "tenantId" = '000000' WHERE "tenantId" IS NULL OR "tenantId" = '';
```

## 配置说明

在 `config/dev.yml` 中添加了以下配置：

```yaml
# 多租户配置
tenant:
  # 是否启用多租户
  enabled: true
  # 超级管理员租户ID
  superTenantId: '000000'
  # 默认租户ID
  defaultTenantId: '000000'

# 加解密配置
crypto:
  # 是否启用加解密
  enabled: false
  rsaPublicKey: ''
  rsaPrivateKey: ''

# 客户端配置
client:
  defaultClientId: 'pc'
  defaultGrantType: 'password'
```

## API 变更

### 新增认证 API (匹配 Soybean 前端)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /auth/tenant/list | 获取租户列表 |
| GET | /auth/code | 获取验证码 |
| POST | /auth/login | 用户登录 |
| POST | /auth/register | 用户注册 |
| POST | /auth/logout | 退出登录 |
| POST | /auth/social/callback | 社交登录回调 |

### 原有 API 保持兼容

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /login | 用户登录 (旧) |
| POST | /logout | 退出登录 (旧) |
| POST | /register | 用户注册 (旧) |
| GET | /captchaImage | 获取验证码 (旧) |

## 租户使用说明

### 请求头

前端请求时需要在 Header 中携带租户信息：

```
tenant-id: 000000
```

### 租户隔离规则

1. **平台管理员** (tenantId='000000')
   - 可以查看和管理所有租户的数据
   - 可以创建新租户
   - 可以分配租户套餐

2. **普通租户**
   - 只能查看自己租户的数据
   - 创建的数据自动绑定当前租户ID
   - 查询时自动过滤其他租户的数据

### 忽略租户过滤

某些场景需要跨租户查询，可以使用 `@IgnoreTenant()` 装饰器：

```typescript
@IgnoreTenant()
@Get('all-tenants')
findAllTenants() {
  // 此方法将跨租户查询
}
```

## 回滚方案

如需回滚到非多租户版本：

1. 恢复 `prisma/schema.prisma` 到之前的版本
2. 删除新增的文件：
   - `src/common/tenant/*`
   - `src/common/crypto/*`
   - `src/module/main/auth.controller.ts`
   - `src/module/main/dto/auth.dto.ts`
   - `src/module/main/vo/auth.vo.ts`
3. 还原 `src/app.module.ts`
4. 还原 `src/config/dev.yml`
5. 执行数据库迁移回滚或重建数据库
