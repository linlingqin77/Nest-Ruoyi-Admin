import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('开始初始化数据库...');

  // 生成密码hash
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('admin123', salt);

  // 1. 创建部门数据
  console.log('创建部门数据...');
  const depts = await prisma.$transaction([
    prisma.sysDept.create({
      data: {
        deptId: 100,
        parentId: 0,
        ancestors: '0',
        deptName: '若依科技',
        orderNum: 0,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 101,
        parentId: 100,
        ancestors: '0,100',
        deptName: '深圳总公司',
        orderNum: 1,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 102,
        parentId: 100,
        ancestors: '0,100',
        deptName: '长沙分公司',
        orderNum: 2,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 103,
        parentId: 101,
        ancestors: '0,100,101',
        deptName: '研发部门',
        orderNum: 1,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 104,
        parentId: 101,
        ancestors: '0,100,101',
        deptName: '市场部门',
        orderNum: 2,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 105,
        parentId: 101,
        ancestors: '0,100,101',
        deptName: '测试部门',
        orderNum: 3,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 106,
        parentId: 101,
        ancestors: '0,100,101',
        deptName: '财务部门',
        orderNum: 4,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 107,
        parentId: 101,
        ancestors: '0,100,101',
        deptName: '运维部门',
        orderNum: 5,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 108,
        parentId: 102,
        ancestors: '0,100,102',
        deptName: '市场部门',
        orderNum: 1,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
    prisma.sysDept.create({
      data: {
        deptId: 109,
        parentId: 102,
        ancestors: '0,100,102',
        deptName: '财务部门',
        orderNum: 2,
        leader: '若依',
        phone: '15888888888',
        email: 'ry@qq.com',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${depts.length} 个部门`);

  // 2. 创建用户数据
  console.log('创建用户数据...');
  const users = await prisma.$transaction([
    prisma.sysUser.create({
      data: {
        userId: 1,
        deptId: 103,
        userName: 'admin',
        nickName: 'nest-admin',
        userType: '00',
        email: 'ry@163.com',
        phonenumber: '15888888888',
        sex: '1',
        password: passwordHash,
        status: '0',
        delFlag: '0',
        loginIp: '127.0.0.1',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '管理员',
        avatar: '',
      },
    }),
    prisma.sysUser.create({
      data: {
        userId: 2,
        deptId: 105,
        userName: 'ry',
        nickName: 'nest-admin',
        userType: '00',
        email: 'ry@qq.com',
        phonenumber: '15666666666',
        sex: '1',
        password: passwordHash,
        status: '0',
        delFlag: '0',
        loginIp: '127.0.0.1',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '测试员',
        avatar: '',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${users.length} 个用户 (密码: admin123)`);

  // 3. 创建角色数据
  console.log('创建角色数据...');
  const roles = await prisma.$transaction([
    prisma.sysRole.create({
      data: {
        roleId: 1,
        roleName: '超级管理员',
        roleKey: 'admin',
        roleSort: 1,
        dataScope: '1',
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '超级管理员',
      },
    }),
    prisma.sysRole.create({
      data: {
        roleId: 2,
        roleName: '普通角色',
        roleKey: 'common',
        roleSort: 2,
        dataScope: '2',
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '普通角色',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${roles.length} 个角色`);

  // 4. 创建岗位数据
  console.log('创建岗位数据...');
  const posts = await prisma.$transaction([
    prisma.sysPost.create({
      data: {
        postId: 1,
        postCode: 'ceo',
        postName: '董事长',
        postSort: 1,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '',
      },
    }),
    prisma.sysPost.create({
      data: {
        postId: 2,
        postCode: 'se',
        postName: '项目经理',
        postSort: 2,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '',
      },
    }),
    prisma.sysPost.create({
      data: {
        postId: 3,
        postCode: 'hr',
        postName: '人力资源',
        postSort: 3,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '',
      },
    }),
    prisma.sysPost.create({
      data: {
        postId: 4,
        postCode: 'user',
        postName: '普通员工',
        postSort: 4,
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${posts.length} 个岗位`);

  // 5. 创建字典类型
  console.log('创建字典类型...');
  const dictTypes = await prisma.$transaction([
    prisma.sysDictType.create({
      data: {
        dictId: 1,
        dictName: '用户性别',
        dictType: 'sys_user_sex',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '用户性别列表',
      },
    }),
    prisma.sysDictType.create({
      data: {
        dictId: 2,
        dictName: '菜单状态',
        dictType: 'sys_show_hide',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '菜单状态列表',
      },
    }),
    prisma.sysDictType.create({
      data: {
        dictId: 3,
        dictName: '系统开关',
        dictType: 'sys_normal_disable',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '系统开关列表',
      },
    }),
    prisma.sysDictType.create({
      data: {
        dictId: 6,
        dictName: '系统是否',
        dictType: 'sys_yes_no',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '系统是否列表',
      },
    }),
    prisma.sysDictType.create({
      data: {
        dictId: 7,
        dictName: '通知类型',
        dictType: 'sys_notice_type',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '通知类型列表',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${dictTypes.length} 个字典类型`);

  // 6. 创建字典数据
  console.log('创建字典数据...');
  await prisma.sysDictData.createMany({
    data: [
      {
        dictCode: 1,
        dictSort: 1,
        dictLabel: '男',
        dictValue: '0',
        dictType: 'sys_user_sex',
        cssClass: '',
        listClass: 'default',
        isDefault: 'Y',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '性别男',
      },
      {
        dictCode: 2,
        dictSort: 2,
        dictLabel: '女',
        dictValue: '1',
        dictType: 'sys_user_sex',
        cssClass: '',
        listClass: 'default',
        isDefault: 'N',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '性别女',
      },
      {
        dictCode: 3,
        dictSort: 3,
        dictLabel: '未知',
        dictValue: '2',
        dictType: 'sys_user_sex',
        cssClass: '',
        listClass: 'default',
        isDefault: 'N',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '性别未知',
      },
      {
        dictCode: 4,
        dictSort: 1,
        dictLabel: '显示',
        dictValue: '0',
        dictType: 'sys_show_hide',
        cssClass: '',
        listClass: 'primary',
        isDefault: 'Y',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '显示菜单',
      },
      {
        dictCode: 5,
        dictSort: 2,
        dictLabel: '隐藏',
        dictValue: '1',
        dictType: 'sys_show_hide',
        cssClass: '',
        listClass: 'danger',
        isDefault: 'N',
        status: '0',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '隐藏菜单',
      },
    ],
  });
  console.log('✅ 创建了字典数据');

  // 7. 创建系统配置
  console.log('创建系统配置...');
  const configs = await prisma.sysConfig.createMany({
    data: [
      {
        configId: 1,
        configName: '主框架页-默认皮肤样式名称',
        configKey: 'sys.index.skinName',
        configValue: 'skin-blue',
        configType: 'Y',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow',
      },
      {
        configId: 2,
        configName: '用户管理-账号初始密码',
        configKey: 'sys.user.initPassword',
        configValue: '123456',
        configType: 'Y',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '初始化密码 123456',
      },
      {
        configId: 3,
        configName: '主框架页-侧边栏主题',
        configKey: 'sys.index.sideTheme',
        configValue: 'theme-dark',
        configType: 'Y',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '深色主题theme-dark，浅色主题theme-light',
      },
      {
        configId: 4,
        configName: '账号自助-验证码开关',
        configKey: 'sys.account.captchaEnabled',
        configValue: 'true',
        configType: 'Y',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '是否开启验证码功能（true开启，false关闭）',
      },
      {
        configId: 5,
        configName: '账号自助-是否开启用户注册功能',
        configKey: 'sys.account.registerUser',
        configValue: 'false',
        configType: 'Y',
        delFlag: '0',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '是否开启注册用户功能（true开启，false关闭）',
      },
    ],
  });
  console.log('✅ 创建了系统配置');

  // 8. 创建菜单数据（部分示例）
  console.log('创建菜单数据...');
  const menus = await prisma.$transaction([
    // 系统管理
    prisma.sysMenu.create({
      data: {
        menuId: 1,
        menuName: '系统管理',
        parentId: 0,
        orderNum: 1,
        path: 'system',
        component: '',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'M',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: '',
        icon: 'system',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '系统管理目录',
      },
    }),
    // 用户管理
    prisma.sysMenu.create({
      data: {
        menuId: 100,
        menuName: '用户管理',
        parentId: 1,
        orderNum: 1,
        path: 'user',
        component: 'system/user/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:user:list',
        icon: 'user',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '用户管理菜单',
      },
    }),
    // 角色管理
    prisma.sysMenu.create({
      data: {
        menuId: 101,
        menuName: '角色管理',
        parentId: 1,
        orderNum: 2,
        path: 'role',
        component: 'system/role/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:role:list',
        icon: 'peoples',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '角色管理菜单',
      },
    }),
    // 菜单管理
    prisma.sysMenu.create({
      data: {
        menuId: 102,
        menuName: '菜单管理',
        parentId: 1,
        orderNum: 3,
        path: 'menu',
        component: 'system/menu/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:menu:list',
        icon: 'tree-table',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '菜单管理菜单',
      },
    }),
    // 部门管理
    prisma.sysMenu.create({
      data: {
        menuId: 103,
        menuName: '部门管理',
        parentId: 1,
        orderNum: 4,
        path: 'dept',
        component: 'system/dept/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:dept:list',
        icon: 'tree',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '部门管理菜单',
      },
    }),
    // 岗位管理
    prisma.sysMenu.create({
      data: {
        menuId: 104,
        menuName: '岗位管理',
        parentId: 1,
        orderNum: 5,
        path: 'post',
        component: 'system/post/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:post:list',
        icon: 'post',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '岗位管理菜单',
      },
    }),
    // 字典管理
    prisma.sysMenu.create({
      data: {
        menuId: 105,
        menuName: '字典管理',
        parentId: 1,
        orderNum: 6,
        path: 'dict',
        component: 'system/dict/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:dict:list',
        icon: 'dict',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '字典管理菜单',
      },
    }),
    // 参数设置
    prisma.sysMenu.create({
      data: {
        menuId: 106,
        menuName: '参数设置',
        parentId: 1,
        orderNum: 7,
        path: 'config',
        component: 'system/config/index',
        query: '',
        isFrame: '1',
        isCache: '0',
        menuType: 'C',
        visible: '0',
        status: '0',
        delFlag: '0',
        perms: 'system:config:list',
        icon: 'edit',
        createBy: 'admin',
        createTime: new Date('2025-02-28 16:52:10'),
        updateBy: '',
        remark: '参数设置菜单',
      },
    }),
  ]);
  console.log(`✅ 创建了 ${menus.length} 个菜单`);

  // 9. 创建用户角色关联
  console.log('创建用户角色关联...');
  await prisma.sysUserRole.createMany({
    data: [
      { userId: 1, roleId: 1 }, // admin -> 超级管理员
      { userId: 2, roleId: 2 }, // ry -> 普通角色
    ],
  });
  console.log('✅ 创建了用户角色关联');

  // 10. 创建用户岗位关联
  console.log('创建用户岗位关联...');
  await prisma.sysUserPost.createMany({
    data: [
      { userId: 1, postId: 1 }, // admin -> 董事长
      { userId: 2, postId: 2 }, // ry -> 项目经理
    ],
  });
  console.log('✅ 创建了用户岗位关联');

  // 11. 创建角色菜单关联（给超级管理员分配所有菜单）
  console.log('创建角色菜单关联...');
  const allMenus = await prisma.sysMenu.findMany({
    select: { menuId: true },
  });
  await prisma.sysRoleMenu.createMany({
    data: allMenus.map((menu) => ({
      roleId: 1,
      menuId: menu.menuId,
    })),
  });
  console.log(`✅ 为超级管理员分配了 ${allMenus.length} 个菜单权限`);

  // 12. 创建角色部门关联
  console.log('创建角色部门关联...');
  await prisma.sysRoleDept.createMany({
    data: [
      { roleId: 2, deptId: 100 },
      { roleId: 2, deptId: 101 },
      { roleId: 2, deptId: 105 },
    ],
  });
  console.log('✅ 创建了角色部门关联');

  console.log('\n🎉 数据库初始化完成！');
  console.log('===============================');
  console.log('管理员账号: admin');
  console.log('管理员密码: admin123');
  console.log('测试账号: ry');
  console.log('测试密码: admin123');
  console.log('===============================');
}

main()
  .catch((e) => {
    console.error('❌ 种子数据初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
