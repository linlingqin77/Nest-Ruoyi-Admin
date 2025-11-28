import { ApiProperty } from '@nestjs/swagger';

/**
 * 部门基础信息
 */
export class DeptVo {
  @ApiProperty({ description: '部门ID' })
  deptId: number;

  @ApiProperty({ description: '父部门ID' })
  parentId: number;

  @ApiProperty({ description: '祖级列表' })
  ancestors: string;

  @ApiProperty({ description: '部门名称' })
  deptName: string;

  @ApiProperty({ description: '显示顺序' })
  orderNum: number;

  @ApiProperty({ description: '负责人' })
  leader: string;

  @ApiProperty({ description: '联系电话' })
  phone: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '部门状态（0正常 1停用）' })
  status: string;

  @ApiProperty({ description: '删除标志（0代表存在 2代表删除）' })
  delFlag: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @ApiProperty({ description: '子部门列表', type: [DeptVo], required: false })
  children?: DeptVo[];
}

/**
 * 部门树节点
 */
export class DeptTreeNodeVo {
  @ApiProperty({ description: '部门ID' })
  id: number;

  @ApiProperty({ description: '部门名称' })
  label: string;

  @ApiProperty({ description: '子节点列表', type: [DeptTreeNodeVo], required: false })
  children?: DeptTreeNodeVo[];
}

/**
 * 部门列表响应
 */
export class DeptListVo {
  @ApiProperty({ description: '部门列表', type: [DeptVo] })
  list: DeptVo[];
}

/**
 * 部门树响应
 */
export class DeptTreeVo {
  @ApiProperty({ description: '部门树数据', type: [DeptTreeNodeVo] })
  data: DeptTreeNodeVo[];
}

/**
 * 部门下拉树选项
 */
export class DeptTreeSelectVo {
  @ApiProperty({ description: '部门下拉树数据', type: [DeptTreeNodeVo] })
  data: DeptTreeNodeVo[];
}

/**
 * 角色部门树响应
 */
export class RoleDeptTreeSelectVo {
  @ApiProperty({ description: '已选中的部门ID列表', type: [Number] })
  checkedKeys: number[];

  @ApiProperty({ description: '部门树数据', type: [DeptTreeNodeVo] })
  depts: DeptTreeNodeVo[];
}
