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
}
