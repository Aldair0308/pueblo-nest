import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto) {
    return await this.mesasService.create(createMesaDto);
  }

  @Get()
  findAll() {
    return this.mesasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mesasService.findOne(id);
  }
  

  @Patch('pagar/:id')
  async updateMesa(@Param('id') id: number, @Body('totalCuenta') totalCuenta: number) {
    return await this.mesasService.pagarMesa(id, totalCuenta);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mesasService.remove(id);
  }

  // Nuevo método para encontrar una mesa por su nombre
  @Get('encontrar/:cliente')
  async findByName(@Param('cliente') cliente: string) {
    return await this.mesasService.findHighestIdByName(cliente);
  }

  // Nueva ruta para obtener todas las mesas pagadas de hoy
  @Get('dias/hoy')
  async findMesasPagadasHoy() {
    return await this.mesasService.findMesasPagadasHoy();
  }

  // Nueva ruta para obtener todas las mesas pagadas de ayer
  @Get('dias/ayer')
  async findMesasPagadasAyer() {
    return await this.mesasService.findMesasPagadasAyer();
  }

  // Nueva ruta para obtener todas las mesas pagadas de antier
  @Get('dias/antier')
  async findMesasPagadasAntier() {
    return await this.mesasService.findMesasPagadasAntier();
  }

    @Patch(':id')
  async updateM(@Param('id') id: number, @Body() updateMesaDto: UpdateMesaDto) {
    return await this.mesasService.update(id, updateMesaDto);
  }

}

