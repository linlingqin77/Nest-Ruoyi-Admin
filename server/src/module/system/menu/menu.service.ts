import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResultData } from 'src/common/utils/result';
import { CreateMenuDto, UpdateMenuDto, ListDeptDto } from './dto/index';
import { ListToTree, Uniq } from 'src/common/utils/index';
import { UserService } from '../user/user.service';
import { buildMenus } from './utils';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MenuService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const res = await this.prisma.sysMenu.create({
      data: {
        ...createMenuDto,
        path: createMenuDto.path ?? '',
        icon: createMenuDto.icon ?? '',
        createBy: '',
        updateBy: '',
        delFlag: '0',
      },
    });
    return ResultData.ok(res);
  }

  async findAll(query: ListDeptDto) {
    const where: Prisma.SysMenuWhereInput = {
      delFlag: '0',
    };

    if (query.menuName) {
      where.menuName = {
        contains: query.menuName,
      };
    }
    if (query.status) {
      where.status = query.status;
    }

    const res = await this.prisma.sysMenu.findMany({
      where,
      orderBy: { orderNum: 'asc' },
    });
    return ResultData.ok(res);
  }

  async treeSelect() {
    const res = await this.prisma.sysMenu.findMany({
      where: {
        delFlag: '0',
      },
      orderBy: {
        orderNum: 'asc',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    return ResultData.ok(tree);
  }

  async roleMenuTreeselect(roleId: number): Promise<any> {
    const res = await this.prisma.sysMenu.findMany({
      where: {
        delFlag: '0',
      },
      orderBy: [
        { orderNum: 'asc' },
        { parentId: 'asc' },
      ],
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    const menuIds = await this.prisma.sysRoleMenu.findMany({
      where: { roleId },
      select: { menuId: true },
    });
    const checkedKeys = menuIds.map((item) => {
      return item.menuId;
    });
    return ResultData.ok({
      menus: tree,
      checkedKeys: checkedKeys,
    });
  }

  /**
   * 租户套餐菜单树
   */
  async tenantPackageMenuTreeselect(packageId: number): Promise<any> {
    const res = await this.prisma.sysMenu.findMany({
      where: {
        delFlag: '0',
      },
      orderBy: [
        { orderNum: 'asc' },
        { parentId: 'asc' },
      ],
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    // 查询租户套餐关联的菜单ID（如果有对应的表）
    // 暂时返回空数组作为 checkedKeys
    return ResultData.ok({
      menus: tree,
      checkedKeys: [],
    });
  }

  async findOne(menuId: number) {
    const res = await this.prisma.sysMenu.findUnique({
      where: {
        menuId,
      },
    });
    return ResultData.ok(res);
  }

  async update(updateMenuDto: UpdateMenuDto) {
    const res = await this.prisma.sysMenu.update({ where: { menuId: updateMenuDto.menuId }, data: updateMenuDto });
    return ResultData.ok(res);
  }

  async remove(menuId: number) {
    const data = await this.prisma.sysMenu.update({
      where: { menuId },
      data: {
        delFlag: '1',
      },
    });
    return ResultData.ok(data);
  }

  /**
   * 级联删除菜单
   */
  async cascadeRemove(menuIds: number[]) {
    const data = await this.prisma.sysMenu.updateMany({
      where: {
        menuId: {
          in: menuIds,
        },
      },
      data: {
        delFlag: '1',
      },
    });
    return ResultData.ok(data.count);
  }

  async findMany(args: Prisma.SysMenuFindManyArgs) {
    return await this.prisma.sysMenu.findMany(args);
  }

  /**
   * 根据用户ID查询菜单
   *
   * @param userId 用户ID
   * @return 菜单列表
   */
  async getMenuListByUserId(userId: number) {
    const roleIds = await this.userService.getRoleIds([userId]);
    let menuIds: number[] = [];

    if (roleIds.includes(1)) {
      const allMenus = await this.prisma.sysMenu.findMany({
        where: {
          delFlag: '0',
          status: '0',
        },
        select: {
          menuId: true,
        },
      });
      menuIds = allMenus.map((item) => item.menuId);
    } else {
      const menuWidthRoleList = await this.prisma.sysRoleMenu.findMany({
        where: {
          roleId: {
            in: roleIds,
          },
        },
        select: {
          menuId: true,
        },
      });
      menuIds = Uniq(menuWidthRoleList.map((item) => item.menuId));
    }

    if (menuIds.length === 0) {
      return ResultData.ok([]);
    }

    const menuList = await this.prisma.sysMenu.findMany({
      where: {
        delFlag: '0',
        status: '0',
        menuId: {
          in: menuIds,
        },
      },
      orderBy: {
        orderNum: 'asc',
      },
    });
    // 构建前端需要的菜单树
    const menuTree = buildMenus(menuList);
    return ResultData.ok(menuTree);
  }
}
