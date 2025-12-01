import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDictTypeDto } from './create-dict-type.dto';

export class UpdateDictTypeDto extends CreateDictTypeDto {
  @ApiProperty({ required: true, description: '字典ID' })
  @IsNumber()
  dictId: number;
}
