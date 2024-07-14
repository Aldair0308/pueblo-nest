import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ronda {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    mesa: string;

    @Column()
    numeroMesa: number; // Nuevo campo para enumerar las mesas

    @Column()
    estado: string;

    @Column()
    mesero: string;

    @Column("simple-array")
    productos: string[];

    @Column("simple-array")
    cantidades: number[];

    @Column("simple-array") // Arreglo de descripciones correspondientes a los productos
    descripciones: string[];

    @Column({ type: 'double' })
    totalRonda: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    
    @DeleteDateColumn()
    deletedAt: Date;
}
