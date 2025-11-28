import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

//菜单类型
export enum MenuTypeEnum {
  M = 'M',
  C = 'C',
  F = 'F',
}

export class CreateMenuDto {
  @ApiProperty({ required: true, description: '菜单名称' })
  @IsString()
  @Length(0, 50)
  menuName: string;

  @ApiProperty({ required: false, description: '显示顺序' })
  @IsOptional()
  @IsNumber()
  orderNum: number;

  @ApiProperty({ required: true, description: '父菜单ID' })
  @IsOptional()
  @IsNumber()
  parentId: number;

  @ApiProperty({ required: false, description: '路由地址' })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  path?: string;

  @ApiProperty({ required: false, description: '路由参数' })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  query: string;

  @ApiProperty({ required: false, description: '组件路径' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  component?: string;

  @ApiProperty({ required: false, description: '菜单图标' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  icon?: string;

  @ApiProperty({ required: false, description: '菜单类型（M目录 C菜单 F按钮）' })
  @IsOptional()
  @IsString()
  @IsEnum(MenuTypeEnum)
  menuType: string;

  @ApiProperty({ required: false, description: '是否缓存（0缓存 1不缓存）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  isCache: string;

  @ApiProperty({ required: true, description: '是否为外链（0是 1否）' })
  @IsString()
  @IsEnum(StatusEnum)
  isFrame: string;

  @ApiProperty({ required: false, description: '菜单状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status: string;

  @ApiProperty({ required: false, description: '显示状态（0显示 1隐藏）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  visible: string;

  @ApiProperty({ required: false, description: '权限标识' })
  @IsOptional()
  @IsString()
  perms: string;
}

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ required: true, description: '菜单ID' })
  @ApiProperty({
    required: false,
    description: '菜单ID',
  })
  @IsNumber()
  menuId: number;
}

export class ListDeptDto {
  @ApiProperty({
    required: false,
    description: '菜单名称',
  })
  @IsOptional()
  @IsString()
  menuName?: string;

  @ApiProperty({
    required: false,
    description: '菜单状态',
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
