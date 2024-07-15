import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const { password, ...rest } = updateUserDto;
    if (id !== undefined) {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.update(id, { ...rest, password: hashedPassword });
      } else {
        await this.userRepository.update(id, rest);
      }
      return this.userRepository.findOne({ where: { id } });
    } else {
      return undefined; // Retorna undefined si el id es undefined
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async resetPassword(userId: number, newPassword: string): Promise<void> {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('ID de usuario no válido');
    }
  
    if (!newPassword) {
      throw new BadRequestException('La nueva contraseña no puede estar vacía');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}
