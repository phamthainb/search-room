import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateOrderDto {
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
}
