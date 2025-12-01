import { IsString, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 重置密码 DTO
 */
export class ResetPwdDto {
  @ApiProperty({ required: true, description: '用户ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ required: true, description: '新密码' })
  @IsString()
  @Length(5, 20)
  password: string;
}
