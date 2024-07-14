import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RondasService } from './rondas.service';
import { CreateRondaDto } from './dto/create-ronda.dto';
import { UpdateRondaDto } from './dto/update-ronda.dto';

@Controller('rondas')
export class RondasController {
  constructor(private readonly rondasService: RondasService) {}

  @Post()
  create(@Body() createRondaDto: CreateRondaDto) {
    // Sobrescribir el timestamp con la hora actual de la computadora
    createRondaDto.timestamp = new Date().toISOString();

    return this.rondasService.create(createRondaDto);
  }

  @Get()
  findAll() {
    return this.rondasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rondasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRondaDto: UpdateRondaDto) {
    return this.rondasService.update(id, updateRondaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rondasService.remove(id);
  }

  // Ruta para buscar todas las rondas asociadas a una mesa específica
  @Get('mesa/:nombreMesa')
  async findRondasByMesa(@Param('nombreMesa') nombreMesa: string) {
    return await this.rondasService.findRondasSinPagarByMesa(nombreMesa);
  }

  // Ruta para obtener el total de todas las rondas de una mesa con estado 'por_pagar'
  @Get('mesa/total/:nombreMesa')
  async getTotalPorPagar(@Param('nombreMesa') nombreMesa: string) {
    return await this.rondasService.getTotalPorPagar(nombreMesa);
  }

  // Ruta para obtener los productos y sus cantidades totales para una mesa
  @Get('mesa/resumen/:nombreMesa')
  async getProductosCantidad(@Param('nombreMesa') nombreMesa: string) {
    return await this.rondasService.getProductosCantidad(nombreMesa);
  }

  // Ruta para cambiar el estado de las rondas de una mesa a 'pagada'
  @Patch('pagar/:nombreMesa')
  async pagarRondasPorMesa(@Param('nombreMesa') nombreMesa: string) {
    try {
      await this.rondasService.pagarRondasPorMesa(nombreMesa);
      return { message: 'Rondas pagadas exitosamente' };
    } catch (error) {
      throw new Error(`Failed to pay rondas for mesa ${nombreMesa}: ${error.message}`);
    }
  }

  @Get('productos/agrupados/hoy')
  async getProductosAgrupadosHoy() {
    return await this.rondasService.getProductosAgrupadosHoy();
  }

  @Get('productos/agrupados/ayer')
  async getProductosAgrupadosAyer() {
    return await this.rondasService.getProductosAgrupadosAyer();
  }
}
