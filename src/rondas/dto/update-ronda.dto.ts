import { PartialType } from '@nestjs/mapped-types';
import { CreateRondaDto } from './create-ronda.dto';
import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateRondaDto extends PartialType(CreateRondaDto) {
    @IsOptional() // Hace que el campo sea opcional
    @IsString()
    mesa?: string;

    @IsOptional()
    @IsNumber() // Validamos que sea un número
    numeroMesa?: number;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    mesero?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    productos?: string[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    cantidades?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    descripciones?: string[]; // Agregar campo descripciones

    @IsOptional()
    @IsNumber()
    @Min(0)
    totalRonda?: number;
}
