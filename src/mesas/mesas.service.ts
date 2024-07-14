import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ){}

  async create(createMesaDto: CreateMesaDto) {
    const mesa = this.mesaRepository.create(createMesaDto);
    return await this.mesaRepository.save(mesa);
  }

  async findAll() {
    return await this.mesaRepository.find();
  }

  async findOne(id: number) {
    const mesa = await this.mesaRepository.findOne({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa with id ${id} not found`);
    }
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const existingMesa = await this.mesaRepository.findOne({ where: { id } });
    if (!existingMesa) {
      throw new NotFoundException(`Mesa with id ${id} no found`);
    }
    await this.mesaRepository.update(id, updateMesaDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const mesa = await this.findOne(id);
    return await this.mesaRepository.remove(mesa);
  }
  
  async pagarMesa(id: number, totalCuenta: number): Promise<Mesa> {
    const mesa = await this.mesaRepository.findOne({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa with id ${id} not found`);
    }
    mesa.estado = 'Pagada';
    mesa.totalCuenta = totalCuenta;
    mesa.horaPago = new Date(); // Establecer la fecha y hora actual
    return await this.mesaRepository.save(mesa);
  }
  
  // Nuevo método para encontrar una mesa por su nombre
// Nuevo método para encontrar una mesa por su nombre y devolver el registro con el id más alto
async findHighestIdByName(cliente: string): Promise<Mesa | undefined> {
  const mesas = await this.mesaRepository.find({
    where: { cliente },
    order: { id: 'DESC' },
    take: 1,
  });

  // Retorna el primer registro encontrado, que será el que tenga el id más alto
  return mesas[0];
}

  // Método para encontrar todas las mesas pagadas de hoy
  async findMesasPagadasHoy(): Promise<Mesa[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return await this.mesaRepository.find({
      where: {
        estado: 'Pagada',
        horaPago: Between(today, tomorrow),
      },
    });
  }

  // Método para encontrar todas las mesas pagadas de ayer
  async findMesasPagadasAyer(): Promise<Mesa[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const todayStart = new Date(yesterday);
    const todayEnd = new Date(today);
    return await this.mesaRepository.find({
      where: {
        estado: 'Pagada',
        horaPago: Between(todayStart, todayEnd),
      },
    });
  }

  // Método para encontrar todas las mesas pagadas de antier
  async findMesasPagadasAntier(): Promise<Mesa[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const antier = new Date(today);
    antier.setDate(antier.getDate() - 2);
    const todayStart = new Date(antier);
    const todayEnd = new Date(today);
    return await this.mesaRepository.find({
      where: {
        estado: 'Pagada',
        horaPago: Between(todayStart, todayEnd),
      },
    });
  }

  async updateM(id: number, updateMesaDto: UpdateMesaDto) {
    const existingMesa = await this.mesaRepository.findOne({ where: { id } });
    if (!existingMesa) {
      throw new NotFoundException(`Mesa with id ${id} not found`);
    }
    const updatedMesa = Object.assign(existingMesa, updateMesaDto); // Merge de los datos del DTO en la entidad existente
    await this.mesaRepository.save(updatedMesa); // Guardar los cambios en la base de datos
    return updatedMesa;
  }
  

}
