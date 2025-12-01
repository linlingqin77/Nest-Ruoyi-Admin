import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * 更新用户 DTO
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true, description: '用户ID' })
  @IsNumber()
  userId: number;
}
