import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMesaDto {
    @IsNotEmpty()
    @IsNumber()
    noMesa: number;

    @IsString()
    cliente: string;

    @IsNotEmpty()
    @IsString()
    estado?: string;

    @IsNumber()
    totalCuenta?: number;

    @IsOptional()
    @IsString()
    horaPago?: string;
}
