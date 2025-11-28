import { ApiProperty } from '@nestjs/swagger';

/**
 * 通知公告基础信息
 */
export class NoticeVo {
  @ApiProperty({ description: '公告ID' })
  noticeId: number;

  @ApiProperty({ description: '公告标题' })
  noticeTitle: string;

  @ApiProperty({ description: '公告类型（1通知 2公告）' })
  noticeType: string;

  @ApiProperty({ description: '公告内容' })
  noticeContent: string;

  @ApiProperty({ description: '公告状态（0正常 1关闭）' })
  status: string;

  @ApiProperty({ description: '创建者' })
  createBy: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @ApiProperty({ description: '备注' })
  remark: string;
}

/**
 * 通知公告列表响应
 */
export class NoticeListVo {
  @ApiProperty({ description: '公告列表', type: [NoticeVo] })
  rows: NoticeVo[];

  @ApiProperty({ description: '总数量' })
  total: number;
}
