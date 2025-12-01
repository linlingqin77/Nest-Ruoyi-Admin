import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDeptDto } from './create-dept.dto';

export class UpdateDeptDto extends CreateDeptDto {
  @ApiProperty({
    required: false,
    description: '部门ID',
  })
  @IsNumber()
  deptId: number;
}
