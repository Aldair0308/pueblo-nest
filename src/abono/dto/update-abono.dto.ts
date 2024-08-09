import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonoDto } from './create-abono.dto';
import { IsOptional, IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';

export class UpdateAbonoDto extends PartialType(CreateAbonoDto) {
  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDate()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  mesaId?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
