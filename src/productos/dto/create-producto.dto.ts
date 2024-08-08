import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  foto?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  stock?: number; // Agregar stock como opcional
}
