import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 取消用户授权角色 DTO
 */
export class AuthUserCancelDto {
  @ApiProperty({ required: true, description: '角色ID' })
  @IsNumber()
  roleId: number;

  @ApiProperty({ required: true, description: '用户ID' })
  @IsNumber()
  userId: number;
}

/**
 * 批量取消用户授权角色 DTO
 */
export class AuthUserCancelAllDto {
  @ApiProperty({ required: true, description: '角色ID' })
  @IsNumber()
  roleId: number;

  @ApiProperty({ required: true, description: '用户ID列表' })
  @IsString()
  userIds: string;
}

/**
 * 批量选择用户授权角色 DTO
 */
export class AuthUserSelectAllDto {
  @ApiProperty({ required: true, description: '角色ID' })
  @IsNumber()
  roleId: number;

  @ApiProperty({ required: true, description: '用户ID列表' })
  @IsString()
  userIds: string;
}
