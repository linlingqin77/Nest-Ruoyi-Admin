import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: false,
    description: '验证码',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    required: true,
    description: '用户名',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  userName: string;

  @ApiProperty({
    required: true,
    description: '密码',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    required: true,
    description: '验证码唯一标识',
  })
  @IsOptional()
  @IsString()
  uuid?: string;
}
