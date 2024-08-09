import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAbonoDto {
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsNumber()
  @IsNotEmpty()
  mesaId: number;  // ID de la mesa a la que se aplica el abono
}
