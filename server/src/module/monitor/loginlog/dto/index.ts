import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreateLoginlogDto {
  @ApiProperty({ required: false, description: '登录IP地址' })
  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;

  @ApiProperty({ required: false, description: '用户名' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;

  @ApiProperty({ required: false, description: '登录地点' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  loginLocation?: string;

  @ApiProperty({ required: false, description: '浏览器类型' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  browser?: string;

  @ApiProperty({ required: false, description: '操作系统' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  os?: string;

  @ApiProperty({ required: false, description: '提示消息' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  msg?: string;

  @ApiProperty({ required: false, description: '登录状态（0成功 1失败）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateLoginlogDto extends CreateLoginlogDto {
  @ApiProperty({ required: true, description: '日志ID' })
  @IsNumber()
  infoId: number;
}

export class ListLoginlogDto extends PagingDto {
  @ApiProperty({
    required: false,
    description: '登录IP地址',
  })
  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;

  @ApiProperty({
    required: false,
    description: '用户名',
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;

  @ApiProperty({
    required: false,
    description: '登录状态（0成功 1失败）',
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
