import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}
export class CreateDeptDto {
  @ApiProperty({
    required: true,
    description: '父部门ID',
  })
  @IsNumber()
  parentId: number;

  @ApiProperty({
    required: true,
    description: '部门名称',
  })
  @IsString()
  @Length(0, 30)
  deptName: string;

  @ApiProperty({
    required: true,
    description: '显示顺序',
  })
  @IsNumber()
  @Min(0)
  orderNum: number;

  @ApiProperty({
    required: false,
    description: '负责人',
  })
  @IsOptional()
  @IsString()
  leader?: string;

  @ApiProperty({
    required: false,
    description: '联系电话',
  })
  @IsOptional()
  @IsString()
  @Length(0, 11)
  phone?: string;

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    description: '部门状态（0正常 1停用）',
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateDeptDto extends CreateDeptDto {
  @ApiProperty({
    required: false,
    description: '部门ID',
  })
  @IsNumber()
  deptId: number;
}

export class ListDeptDto {
  @ApiProperty({
    required: false,
    description: '部门名称',
  })
  @IsOptional()
  @IsString()
  deptName?: string;

  @ApiProperty({
    required: false,
    description: '部门状态',
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
