import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNoticeDto } from './create-notice.dto';

export class UpdateNoticeDto extends CreateNoticeDto {
  @ApiProperty({ required: true, description: '公告ID' })
  @IsNumber()
  noticeId: number;
}
