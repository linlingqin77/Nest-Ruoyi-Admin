---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "nest-admin"
  tagline: 让开发、部署、运维一步到位
  actions:
    - theme: brand
      text: 快速开始
      link: /deploy-online/step
    - theme: alt
      text: 数据库/Prisma 指南
      link: /deploy-online/mysql

features:
  - title: 快速上手
    details: 从克隆仓库、安装依赖到运行 admin-vue3 与 Nest Server 的完整指南。
    link: https://github.com/taozhi1010/nest-admin#backend-quick-start
  - title: 数据库 & Prisma
    details: 使用 `npm run prisma:migrate && npm run prisma:seed` 初始化演示数据。
    link: /deploy-online/mysql
  - title: 自动化测试
    details: 覆盖所有业务模块的 Jest 单测，`npm run test -- --runInBand` 即可运行。
    link: https://github.com/taozhi1010/nest-admin#自动化测试
---

