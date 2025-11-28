import { ApiProperty } from '@nestjs/swagger';

/**
 * 字典类型基础信息
 */
export class DictTypeVo {
  @ApiProperty({ description: '字典类型ID' })
  dictId: number;

  @ApiProperty({ description: '字典名称' })
  dictName: string;

  @ApiProperty({ description: '字典类型' })
  dictType: string;

  @ApiProperty({ description: '状态（0正常 1停用）' })
  status: string;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;
}

/**
 * 字典类型列表响应
 */
export class DictTypeListVo {
  @ApiProperty({ description: '字典类型列表', type: [DictTypeVo] })
  rows: DictTypeVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}

/**
 * 字典数据基础信息
 */
export class DictDataVo {
  @ApiProperty({ description: '字典数据ID' })
  dictCode: number;

  @ApiProperty({ description: '字典排序' })
  dictSort: number;

  @ApiProperty({ description: '字典标签' })
  dictLabel: string;

  @ApiProperty({ description: '字典键值' })
  dictValue: string;

  @ApiProperty({ description: '字典类型' })
  dictType: string;

  @ApiProperty({ description: '样式属性' })
  cssClass: string;

  @ApiProperty({ description: '表格回显样式' })
  listClass: string;

  @ApiProperty({ description: '是否默认（Y是 N否）' })
  isDefault: string;

  @ApiProperty({ description: '状态（0正常 1停用）' })
  status: string;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;
}

/**
 * 字典数据列表响应
 */
export class DictDataListVo {
  @ApiProperty({ description: '字典数据列表', type: [DictDataVo] })
  rows: DictDataVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}

/**
 * 字典选项响应（下拉框）
 */
export class DictOptionVo {
  @ApiProperty({ description: '字典标签' })
  dictLabel: string;

  @ApiProperty({ description: '字典值' })
  dictValue: string;

  @ApiProperty({ description: '样式类名' })
  cssClass: string;

  @ApiProperty({ description: '列表样式' })
  listClass: string;
}
