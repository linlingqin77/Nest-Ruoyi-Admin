import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}
export enum TypeEnum {
  Instruct = '1',
  Notice = '2',
}
export class CreateNoticeDto {
  @ApiProperty({ required: true, description: '公告标题' })
  @IsString()
  @Length(0, 50)
  noticeTitle: string;

  @ApiProperty({ required: true, description: '公告类型（1通知 2公告）' })
  @IsString()
  @IsEnum(TypeEnum)
  noticeType: string;

  @ApiProperty({
    required: true,
    description: '备注',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({
    required: false,
    description: '状态（0正常 1停用）',
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false, description: '公告内容' })
  @IsOptional()
  @IsString()
  noticeContent?: string;
}

export class UpdateNoticeDto extends CreateNoticeDto {
  @ApiProperty({ required: true, description: '公告ID' })
  @IsNumber()
  noticeId: number;
}

export class ListNoticeDto extends PagingDto {
  @ApiProperty({ required: false, description: '公告标题' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  noticeTitle?: string;

  @ApiProperty({ required: false, description: '公告类型（1通知 2公告）' })
  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  noticeType?: string;

  @ApiProperty({ required: false, description: '创建人' })
  @IsOptional()
  @IsString()
  createBy?: string;
}
