import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'photo_product.jpg' })
    foto: string;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column({ default: 'Normal' }) // Descripción por defecto: 'Normal'
    descripcion: string;

    @Column({ type: 'int', default: 0 }) // Agregar la columna de stock
    stock: number;
}
