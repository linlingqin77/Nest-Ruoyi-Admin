import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty({
    required: true,
    description: '岗位ID',
  })
  @IsNumber()
  postId: number;
}
