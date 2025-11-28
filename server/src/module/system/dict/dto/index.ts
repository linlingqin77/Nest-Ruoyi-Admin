import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreateDictTypeDto {
  @ApiProperty({
    required: true,
    description: '字典名称',
  })
  @IsString()
  @Length(0, 100)
  dictName: string;

  @ApiProperty({
    required: true,
    description: '字典类型',
  })
  @IsString()
  @Length(0, 100)
  dictType: string;

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
}

export class UpdateDictTypeDto extends CreateDictTypeDto {
  @ApiProperty({ required: true, description: '字典ID' })
  @IsNumber()
  dictId: number;
}

export class ListDictType extends PagingDto {
  @ApiProperty({ required: false, description: '字典名称' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictName?: string;

  @ApiProperty({ required: false, description: '字典类型' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictType?: string;

  @ApiProperty({ required: false, description: '状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class CreateDictDataDto {
  @ApiProperty({ required: true, description: '字典类型' })
  @IsString()
  @Length(0, 100)
  dictType: string;

  @ApiProperty({ required: true, description: '字典标签' })
  @IsString()
  @Length(0, 100)
  dictLabel: string;

  @ApiProperty({ required: true, description: '字典键值' })
  @IsString()
  @Length(0, 100)
  dictValue: string;

  @ApiProperty({ required: true, description: '样式属性' })
  @IsString()
  @Length(0, 100)
  listClass: string;

  @ApiProperty({ required: false, description: 'CSS样式' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  cssClass: string;

  @ApiProperty({ required: false, description: '字典排序' })
  @IsOptional()
  @IsNumber()
  dictSort?: number;

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: false, description: '状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateDictDataDto extends CreateDictDataDto {
  @ApiProperty({ required: true, description: '字典编码' })
  @IsNumber()
  dictCode: number;
}

export class ListDictData extends PagingDto {
  @ApiProperty({ required: false, description: '字典标签' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictLabel?: string;

  @ApiProperty({ required: false, description: '字典类型' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictType?: string;

  @ApiProperty({ required: false, description: '状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
