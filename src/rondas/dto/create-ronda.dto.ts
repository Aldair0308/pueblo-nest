import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateRondaDto {
    @IsNotEmpty()
    @IsString()
    mesa: string;

    @IsNotEmpty()
    @IsNumber() // Validamos que sea un número
    numeroMesa: number;

    @IsNotEmpty()
    @IsString()
    estado: string;

    @IsNotEmpty()
    @IsString()
    mesero: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    productos: string[];

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    cantidades: number[];

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    descripciones: string[]; // Agregar campo descripciones

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalRonda: number;

    @IsOptional()
    @IsString()
    timestamp?: string;
}
