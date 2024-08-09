import { IsNumber, IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAbonoDto {
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  fecha?: string;

  @IsNumber()
  @IsNotEmpty()
  mesaId: number;  // ID de la mesa a la que se aplica el abono
}
