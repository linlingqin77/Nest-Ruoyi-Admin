import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDictDataDto } from './create-dict-data.dto';

export class UpdateDictDataDto extends CreateDictDataDto {
  @ApiProperty({ required: true, description: '字典编码' })
  @IsNumber()
  dictCode: number;
}
