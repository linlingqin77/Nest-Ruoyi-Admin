import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

/**
 * 更新角色 DTO
 */
export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({ required: true, description: '角色ID' })
  @IsNumber()
  roleId: number;
}
