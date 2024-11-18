import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Crear usuario

  async create(userdata: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({
        data: userdata,
      });
    } catch (error) {
      console.error('Error en register:', error);
      if (error.code === 'P2002') {
        throw new HttpException(
          'Ya hay un usuario registrado con ese correo.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Hubo un error al crear el usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // buscar usuario por Id
  async findById(userId: number): Promise<User | null> {
    try {
      const existingUserId = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUserId) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      return existingUserId;
    } catch (error) {
      console.log('Error searching user by id:', error);
      throw new HttpException(
        'Error searching user by id:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // buscar por usuario
  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  // buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  // actualizar usuario y se agrega el cambio de imagen de perfil
  /* async update(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);

    // Si hay una nueva imagen y existe una imagen anterior, eliminar la anterior
    if (updateData.profileImage && user.profileImage) {
      const oldImagePath = join(
        process.cwd(),
        'uploads/profiles',
        user.profileImage,
      );
      try {number
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old profile image:', error);
      }
    }
    Object.assign(user, updateData, { updatedAt: new Date() });
    return user;
  } */

  // actualizar usuario valida que no exista el username
  async update(
    userId: number,
    updateData: Prisma.UserUpdateInput,
  ): Promise<User> {
    // Verifica si el username ya está en uso por otro usuario
    if (updateData.username) {
      const existingUserWithUsername = await this.prisma.user.findUnique({
        where: { username: updateData.username as string },
      });

      if (existingUserWithUsername && existingUserWithUsername.id !== userId) {
        throw new HttpException('The username is in use', HttpStatus.CONFLICT);
      }
    }
    // actualiza y encripta la contraseña
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword; // Asigna la nueva contraseña encriptada
    }

    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.code === 'P2002') {
        throw new HttpException(
          'Unique constraint failed on the fields: (email, password)',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  /* async getUserScore(userId: string): Promise<Score[]> {
    await this.findById(userId); // Veririfica que el usuario exista
    return this.scores.filter((score) => score.userId === userId);
  } */
  /* async getUserScore(userId: number): Promise<Score[]> {
    await this.findById(userId);
    return this.prisma.score.findMany({
      where: { userId },
    });
  } */
  // Eliminar usuario
  async remove(userId: number) {
    try {
      return await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      throw new NotFoundException(`Player with ID ${userId} not found`, error);
    }
  }
}
