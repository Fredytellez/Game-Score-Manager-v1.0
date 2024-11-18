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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
      return user; /* this.generateToken(user); */
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

    return user; /* this.generateToken(user) */
  }

  /* private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } */
}
