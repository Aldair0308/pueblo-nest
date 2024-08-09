import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Abono } from './entities/abono.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbonoService {

  constructor(
    @InjectRepository(Abono)
    private readonly abonoRepository: Repository<Abono>,
  ) {}

  async create(createAbonoDto: CreateAbonoDto) {
    // Obtener la fecha y hora actual en UTC
    const now = new Date();
  
    // Obtener el desfase de UTC a la hora local de CDMX (CST)
    const offset = -6 * 60; // UTC-6 minutos
  
    // Ajustar la fecha y hora a la zona horaria de CDMX
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
  
    // Establecer el timestamp en el formato ISO
    createAbonoDto.fecha = localDate.toISOString();
  
    const abono = this.abonoRepository.create(createAbonoDto);
    return await this.abonoRepository.save(abono);
  }

  async findAll() {
    return await this.abonoRepository.find();
  }

  async findOne(id: number) {
    const abono = await this.abonoRepository.findOneBy({ id });
    if (!abono) {
      throw new NotFoundException(`Abono with ID ${id} not found`);
    }
    return abono;
  }

  async update(id: number, updateAbonoDto: UpdateAbonoDto) {
    const abono = await this.abonoRepository.preload({
      id,
      ...updateAbonoDto,
    });

    if (!abono) {
      throw new NotFoundException(`Abono with ID ${id} not found`);
    }

    return await this.abonoRepository.save(abono);
  }

  async remove(id: number) {
    const abono = await this.findOne(id); // Reuse findOne to check existence
    if (abono) {
      await this.abonoRepository.remove(abono);
      return { message: `Abono with ID ${id} has been removed` };
    }
  }

  async deactivateByMesaId(idMesa: number) {
    // Find all abonos with the given mesaId and where activo is true
    const abonos = await this.abonoRepository.find({
      where: { mesaId: idMesa, activo: true },
    });

    if (abonos.length === 0) {
      throw new NotFoundException(`No active abonos found for mesa ID ${idMesa}`);
    }

    // Set activo to false for all found abonos
    abonos.forEach(abono => {
      abono.activo = false;
    });

    // Save all updated abonos
    return await this.abonoRepository.save(abonos);
  }

  async findByMesaId(idMesa: number) {
    const abonos = await this.abonoRepository.find({
      where: { mesaId: idMesa },
    });

    if (abonos.length === 0) {
      throw new NotFoundException(`No abonos found for mesa ID ${idMesa}`);
    }

    return abonos;
  }
}
