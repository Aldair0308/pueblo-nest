import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @IsOptional()
  foto?: string;

  @IsOptional()
  nombre?: string;

  @IsOptional()
  precio?: number;

  @IsOptional()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  stock?: number; // Agregar stock como opcional
}
