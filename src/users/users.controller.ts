import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }) {
    // Buscar al usuario por su correo electrónico
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
  
    // Verificar si el ID del usuario es un número válido
    if (isNaN(user.id)) {
      throw new BadRequestException('ID de usuario no válido');
    }
  
    // Generar una nueva contraseña aleatoria
    const newPassword = generateRandomPassword();
  
    // Actualizar la contraseña del usuario en la base de datos
    await this.usersService.resetPassword(user.id, newPassword);
  
    // Retornar la nueva contraseña generada
    return { newPassword };
  }
}


// Función para generar una contraseña aleatoria
function generateRandomPassword(): string {
  // Implementa aquí la lógica para generar una contraseña aleatoria
  // Puedes usar bibliotecas externas o generarla manualmente
  // Por ejemplo:
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 8;
  let newPassword = '';
  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPassword;
}

