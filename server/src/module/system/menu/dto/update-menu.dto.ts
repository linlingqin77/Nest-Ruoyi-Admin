import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ required: true, description: '菜单ID' })
  @ApiProperty({
    required: false,
    description: '菜单ID',
  })
  @IsNumber()
  menuId: number;
}
