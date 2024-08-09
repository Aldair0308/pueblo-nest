import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Abono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  mesaId: number;  // Relaciona con la mesa

  @Column({ default: true })
  activo: boolean;  // Si el abono está activo o no
}
