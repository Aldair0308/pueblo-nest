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
}
