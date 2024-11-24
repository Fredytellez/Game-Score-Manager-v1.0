import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { Role } from '@prisma/client';

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
  // Cambio de rol de usuario
  async updateUserRole(userId: number, newRole: Role) {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    // Validación del id del usuario
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with Id: ${userId} not found`);
    }
    // Verifica el rol
    // Prevenir cambios innecesarios
    if (user.role === newRole) {
      console.log(`User ${userId} already has role ${newRole}`);
      return user;
    }
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });
      console.log('Usuario actualizado:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new InternalServerErrorException('Could not update user role');
    }
  }

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

  // Actualizar imagen de usuario
  async updateProfileImage(userId: number, filePath: string) {
    try {
      // Verificar si el usuario existe
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
      }

      // Actualizar la imagen de perfil
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          profileImage: filePath,
        },
      });

      console.log(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al actualizar la imagen de perfil',
      );
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        profileImage: true,
        role: true, // Asegúrate de seleccionar 'role'
      },
    });
  }

  // Eliminar usuario
  async remove(userId: number) {
    try {
      // Intentar eliminar el usuario con el ID proporcionado
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      // Si el usuario no se encuentra, lanzamos un error específico
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      // Mostrar más detalles sobre el error
      console.error('Error during user deletion: ', error);
      if (error instanceof NotFoundException) {
        throw error; // Si es un error de "usuario no encontrado", lo lanzamos de nuevo
      }

      // Si es otro tipo de error, lanzamos una excepción interna del servidor
      throw new InternalServerErrorException(
        `An error occurred while trying to delete user with ID ${userId}: ${error.message}`,
      );
    }
  }
}
