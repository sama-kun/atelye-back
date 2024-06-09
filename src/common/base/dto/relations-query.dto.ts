import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RelationQueryDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Relations to load, e.g., ["school", "classRoomList"]',
    example: 'classRoomList,user',
  })
  @IsOptional()
  relations?: string;
}
