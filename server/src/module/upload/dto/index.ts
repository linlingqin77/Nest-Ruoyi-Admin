import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary', description: '上传文件' })
  file: any;
}
export class uploadIdDto {
  @ApiProperty({ type: 'string', description: '上传标识ID' })
  uploadId: string;
}
export class ChunkFileDto {
  @ApiProperty({ type: 'string', description: '分片索引' })
  index: number;
  @ApiProperty({ type: 'string', description: '总分片数' })
  totalChunks: number;
  @ApiProperty({ type: 'string', description: '上传标识ID' })
  uploadId: string;
  @ApiProperty({ type: 'string', description: '文件名称' })
  fileName: string;
}

export class ChunkMergeFileDto {
  @ApiProperty({ type: 'string', description: '上传标识ID' })
  uploadId: string;
  @ApiProperty({ type: 'string', description: '文件名称' })
  fileName: string;
}
