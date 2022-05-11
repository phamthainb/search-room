import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchRoomDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  desc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  status: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  type: number;

  @ApiPropertyOptional()
  @IsOptional()
  startTime: Date;

  @ApiPropertyOptional()
  @IsOptional()
  endTime: Date;
}
