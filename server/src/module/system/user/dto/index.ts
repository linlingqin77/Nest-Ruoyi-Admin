import { IsString, IsJSON, IsEnum, IsPhoneNumber, IsArray, Min, Length, IsOptional, IsBoolean, IsNumber, IsNumberString, IsEmail } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreateUserDto {
  @ApiProperty({ required: false, description: '部门ID' })
  @IsOptional()
  @IsNumber()
  deptId?: number;

  @ApiProperty({ required: false, description: '邮箱地址' })
  @IsOptional()
  // @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: true, description: '用户昵称' })
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: true, description: '用户账号' })
  @IsString()
  @Length(0, 30)
  userName: string;

  @ApiProperty({ required: true, description: '用户密码' })
  @IsString()
  @Length(0, 200)
  password: string;

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  // @IsPhoneNumber('CN')
  phonenumber?: string;

  @ApiProperty({ required: false, description: '岗位ID列表', type: [Number] })
  @IsOptional()
  @IsArray()
  postIds?: Array<number>;

  @ApiProperty({ required: false, description: '角色ID列表', type: [Number] })
  @IsOptional()
  @IsArray()
  roleIds?: Array<number>;

  @ApiProperty({ required: false, description: '用户状态（0正常 1停用）', enum: StatusEnum })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false, description: '用户性别（0男 1女 2未知）', enum: StatusEnum })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex?: string;

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: false, description: '显示排序' })
  @IsOptional()
  @IsNumber()
  postSort?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: true,
    description: '用户ID',
  })
  @IsNumber()
  userId: number;
}

export class ChangeStatusDto {
  @ApiProperty({
    required: true,
    description: '用户ID',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ required: true, description: '用户状态（0正常 1停用）', enum: StatusEnum })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

export class ListUserDto extends PagingDto {
  @ApiProperty({ required: false, description: '部门ID' })
  @IsOptional()
  @IsNumberString()
  deptId?: string;

  @ApiProperty({ required: false, description: '用户昵称' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName?: string;

  @ApiProperty({ required: false, description: '邮箱地址' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  email?: string;

  @ApiProperty({ required: false, description: '用户账号' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber?: string;

  @ApiProperty({ required: false, description: '用户状态（0正常 1停用）', enum: StatusEnum })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class ResetPwdDto {
  @ApiProperty({
    required: true,
    description: '用户ID',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    required: true,
    description: '新密码',
  })
  @IsString()
  @Length(5, 20)
  password: string;
}

export class AllocatedListDto extends PagingDto {
  @ApiProperty({ required: false, description: '用户账号' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber?: string;

  @ApiProperty({ required: false, description: '角色ID' })
  @IsOptional()
  @IsNumberString()
  roleId?: string;
}

export class UpdateProfileDto {
  @ApiProperty({ required: true, description: '用户昵称' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: true, description: '邮箱地址' })
  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: true, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber: string;

  @ApiProperty({ required: true, description: '用户性别（0男 1女 2未知）', enum: StatusEnum })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex: string;

  @ApiProperty({ required: false, description: '头像地址' })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UpdatePwdDto {
  @ApiProperty({ required: true, description: '旧密码' })
  @IsString()
  @Length(0, 200)
  oldPassword: string;

  @ApiProperty({ required: true, description: '新密码' })
  @IsString()
  @Length(0, 200)
  newPassword: string;
}
