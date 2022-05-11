import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class SearchOrderDto {
  @ApiPropertyOptional()
  customer: number;

  @ApiPropertyOptional()
  room: number;

  @ApiPropertyOptional()
  employee: number;

  @ApiPropertyOptional()
  @IsDateString()
  start: Date;

  @ApiPropertyOptional()
  @IsDateString()
  end: Date;

  @ApiPropertyOptional()
  status: number;
}
