import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para generar token
  generateToken(user: { id: number; email: string; role: Role }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      }),
    };
  }

  // Método para cambiar rol (solo para administradores)
  async changeUserRole(adminId: number, userId: number, newRole: Role) {
    // Primero, verificar que el admin que solicita el cambio existe
    const admin = await this.usersService.findById(adminId);

    if (!admin || admin.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        'Solo un administrador puede cambiar roles',
      );
    }

    // Cambiar el rol del usuario
    return this.usersService.updateUserRole(userId, newRole);
  }

  // Método para validar token (opcional, pero útil)
  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido');
    }
  }

  // Método para obtener usuario desde el token
  async getUserFromToken(token: string) {
    const payload = await this.validateToken(token);
    return this.usersService.findById(payload.sub);
  }

  async register(registerDto: RegisterDto) {
    // Valida por usuario:
    const existingUsername = await this.usersService.findByUsername(
      registerDto.username,
    );
    if (existingUsername) {
      throw new HttpException('username already exists', HttpStatus.CONFLICT);
    }
    // Valida por email:
    const existingEmail = await this.usersService.findByEmail(
      registerDto.email,
    );
    if (existingEmail) {
      throw new HttpException('the email already exists', HttpStatus.CONFLICT);
    }

    // Hasheo del password
    try {
      const hashedPasspord = await bcrypt.hash(registerDto.password, 10);
      // Crea el usuario
      const user = await this.usersService.create({
        ...registerDto,
        password: hashedPasspord,
      });
      return user;
    } catch (error) {
      console.error('Error en register:', error);
      throw new HttpException(
        'There was an error creating the user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    // Busca el usuario por el email
    const user = await this.usersService.findByEmail(loginDto.email);

    // Si el usuario no existe:
    if (!user) {
      throw new UnauthorizedException('Incorrect Email');
    }
    // Valida la contraseña en base de datos
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    // Si la contraseña es incorrecta:
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect Password');
    }

    return user;
  }
}
