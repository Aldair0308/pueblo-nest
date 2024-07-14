import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mesa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    noMesa: number;

    @Column({ nullable: true })
    cliente: string;

    @Column()
    estado: string;

    @Column({ type: 'double', default: 0 })
    totalCuenta: number;

    @Column({ type: 'timestamp', nullable: true })
    horaPago: Date;
}
