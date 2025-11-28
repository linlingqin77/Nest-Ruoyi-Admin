import { IsString, IsJSON, IsEnum, IsPhoneNumber, IsArray, Min, Length, IsOptional, IsBoolean, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreatePostDto {
  @ApiProperty({ required: true, description: '岗位名称' })
  @IsString()
  @Length(0, 50)
  postName: string;

  @ApiProperty({ required: true, description: '岗位编码' })
  @IsString()
  @Length(0, 64)
  postCode: string;

  @ApiProperty({ required: false, description: '状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({
    required: false,
    description: '备注',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: true, description: '岗位排序' })
  @IsOptional()
  @IsNumber()
  postSort?: number;
}

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty({
    required: true,
    description: '岗位ID',
  })
  @IsNumber()
  postId: number;
}

export class ListPostDto extends PagingDto {
  @ApiProperty({ required: false, description: '岗位名称' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  postName?: string;

  @ApiProperty({ required: false, description: '岗位编码' })
  @IsOptional()
  @IsString()
  @Length(0, 64)
  postCode?: string;

  @ApiProperty({ required: false, description: '状态（0正常 1停用）' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
