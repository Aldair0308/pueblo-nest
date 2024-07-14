import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateRondaDto } from './dto/create-ronda.dto';
import { UpdateRondaDto } from './dto/update-ronda.dto';
import { Ronda } from './entities/ronda.entity';

@Injectable()
export class RondasService {
  constructor(
    @InjectRepository(Ronda)
    private readonly rondaRepository: Repository<Ronda>,
  ){}

  async create(createRondaDto: CreateRondaDto): Promise<Ronda> {
    // Sobrescribir el timestamp con la hora actual de la computadora
    createRondaDto.timestamp = new Date().toISOString();

    const ronda = this.rondaRepository.create(createRondaDto);
    return await this.rondaRepository.save(ronda);
  }

  async findAll() {
    return await this.rondaRepository.find();
  }

  async findOne(id: number) { 
    return await this.rondaRepository.findOne({ where:{ id } }); 
  }

  async update(id: number, updateRondaDto: UpdateRondaDto) {
    await this.rondaRepository.update(id, updateRondaDto); 
    return await this.findOne(id); 
  }

  async remove(id: number) {
    const rondaToRemove = await this.findOne(id); 
    return await this.rondaRepository.remove(rondaToRemove); 
  }

  async findRondasSinPagarByMesa(nombreMesa: string): Promise<Ronda[]> {
    const rondas = await this.rondaRepository.find({ where: { mesa: nombreMesa, estado: 'por_pagar' } });

    if (!rondas.length) {
      throw new NotFoundException(`No se encontraron rondas 'sin_pagar' para la mesa ${nombreMesa}`);
    }

    return rondas;
  }

  async getTotalPorPagar(nombreMesa: string): Promise<number> {
    const rondas = await this.rondaRepository.find({ where: { mesa: nombreMesa, estado: 'por_pagar' } });

    if (!rondas.length) {
      throw new NotFoundException(`No se encontraron rondas 'por_pagar' para la mesa ${nombreMesa}`);
    }

    const total = rondas.reduce((acc, curr) => acc + curr.totalRonda, 0);

    return total;
  }

  async getProductosCantidad(nombreMesa: string): Promise<{ producto: string, cantidad: number }[]> {
    const rondas = await this.rondaRepository.find({ where: { mesa: nombreMesa, estado: 'por_pagar' } });

    if (!rondas.length) {
      throw new NotFoundException(`No se encontraron rondas para la mesa ${nombreMesa}`);
    }

    const productosCantidadMap = new Map<string, number>();

    rondas.forEach(ronda => {
      ronda.productos.forEach((producto, index) => {
        const cantidad = +ronda.cantidades[index];
        if (productosCantidadMap.has(producto)) {
          productosCantidadMap.set(producto, productosCantidadMap.get(producto) + cantidad);
        } else {
          productosCantidadMap.set(producto, cantidad);
        }
      });
    });

    return Array.from(productosCantidadMap).map(([producto, cantidad]) => ({ producto, cantidad }));
  }

  // Método para cambiar el estado de las rondas de una mesa a 'pagada'
  async pagarRondasPorMesa(nombreMesa: string) {
    const rondas = await this.rondaRepository.find({ where: { mesa: nombreMesa, estado: 'por_pagar' } });

    if (!rondas.length) {
      throw new NotFoundException(`No se encontraron rondas 'por_pagar' para la mesa ${nombreMesa}`);
    }

    rondas.forEach(async ronda => {
      ronda.estado = 'pagada';
      ronda.mesa = `pagada:${nombreMesa}`;
      await this.rondaRepository.save(ronda);
    });
  }

  
  async getProductosAgrupadosHoy(): Promise<{ producto: string; cantidad: number }[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const rondasHoy = await this.rondaRepository.find({
      where: {
        timestamp: Between(startOfDay, endOfDay),
      },
    });

    return this.calcularProductosAgrupados(rondasHoy);
  }

  async getProductosAgrupadosAyer(): Promise<{ producto: string; cantidad: number }[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStart = new Date(yesterday);
    const yesterdayEnd = new Date(today);

    const rondasAyer = await this.rondaRepository.find({
      where: {
        timestamp: Between(yesterdayStart, yesterdayEnd),
      },
    });

    return this.calcularProductosAgrupados(rondasAyer);
  }

  private calcularProductosAgrupados(rondas: Ronda[]): { producto: string; cantidad: number }[] {
    const productosMap = new Map<string, number>();

    rondas.forEach((ronda) => {
      for (let i = 0; i < ronda.productos.length; i++) {
        const producto = ronda.productos[i];
        const cantidad = +ronda.cantidades[i];

        if (productosMap.has(producto)) {
          productosMap.set(producto, productosMap.get(producto) + cantidad);
        } else {
          productosMap.set(producto, cantidad);
        }
      }
    });

    const productosAgrupados = [];
    productosMap.forEach((cantidad, producto) => {
      productosAgrupados.push({ producto, cantidad });
    });

    return productosAgrupados;
  }


}
