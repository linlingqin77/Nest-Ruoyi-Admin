import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}
export enum TypeEnum {
  YES = 'Y',
  NO = 'N',
}
export class CreateConfigDto {
  @ApiProperty({ required: true, description: '参数名称' })
  @IsString()
  @Length(0, 100)
  configName: string;

  @ApiProperty({ required: true, description: '参数键值' })
  @IsString()
  @Length(0, 500)
  configValue: string;

  @ApiProperty({ required: true, description: '参数键名' })
  @IsString()
  @Length(0, 100)
  configKey: string;

  @ApiProperty({ required: true, description: '系统内置（Y是 N否）' })
  @IsString()
  @IsEnum(TypeEnum)
  configType: string;

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

export class UpdateConfigDto extends CreateConfigDto {
  @ApiProperty({ required: true, description: '参数ID' })
  @IsNumber()
  configId: number;
}

export class ListConfigDto extends PagingDto {
  @ApiProperty({ required: false, description: '参数名称' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  configName?: string;

  @ApiProperty({ required: false, description: '参数键名' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  configKey?: string;

  @ApiProperty({ required: false, description: '系统内置（Y是 N否）' })
  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  configType?: string;
}
