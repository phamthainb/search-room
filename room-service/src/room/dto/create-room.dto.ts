import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateRoomDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  status: boolean;

  @ApiPropertyOptional()
  type: number;
}
