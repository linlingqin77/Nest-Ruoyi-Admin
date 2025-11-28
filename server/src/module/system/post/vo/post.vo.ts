import { ApiProperty } from '@nestjs/swagger';

/**
 * 岗位基础信息
 */
export class PostVo {
  @ApiProperty({ description: '岗位ID' })
  postId: number;

  @ApiProperty({ description: '岗位编码' })
  postCode: string;

  @ApiProperty({ description: '岗位名称' })
  postName: string;

  @ApiProperty({ description: '显示顺序' })
  postSort: number;

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
 * 岗位列表响应
 */
export class PostListVo {
  @ApiProperty({ description: '岗位列表', type: [PostVo] })
  rows: PostVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}
