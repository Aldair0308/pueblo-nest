import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsOptional()
    foto?: string;

    @IsOptional()
    nombre?: string;

    @IsOptional()
    precio?: number;

    @IsOptional()
    descripcion?: string;
}
