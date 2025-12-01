import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateConfigDto } from './create-config.dto';

export class UpdateConfigDto extends CreateConfigDto {
  @ApiProperty({ required: true, description: '参数ID' })
  @IsNumber()
  configId: number;
}
