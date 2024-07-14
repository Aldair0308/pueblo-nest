import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaDto } from './create-mesa.dto';
import { IsOptional } from 'class-validator';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {
    @IsOptional()
    noMesa?: number;

    @IsOptional()
    cliente?: string;

    @IsOptional()
    estado?: string;

    @IsOptional()
    totalCuenta?: number;

    @IsOptional()
    horaPago?: string;
}
