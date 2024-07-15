import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcriptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async register({ name, email, password }: RegisterDto) {
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Ya hay un usuario registrado usando ese correo');
        }
        // Si el correo electrónico no está registrado, crear el nuevo usuario
        return await this.usersService.create({ 
        name,
        email,
        password: await bcriptjs.hash(password, 10),
    });
    }

    async login({email, password}: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('El correo es incorrecto');
        }

        const isPasswordValid = await bcriptjs.compare(password, user.password);
        if (!isPasswordValid){
            throw new UnauthorizedException('La contraseña es incorrecta');
        }
        return user;
    }
}
