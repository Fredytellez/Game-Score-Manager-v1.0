import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
/* import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards'; */
import { UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { extname } from 'path';
import { CustomFileInterceptor } from './interceptors/file-upload.interceptors';
import { Response } from 'express';
import { ChangeRoleDto } from './dto/role.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
/* @UseGuards(JwtAuthGuard) */
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener usuario por id
  @Get('profile/:userId')
  async getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findById(userId);
  }

  //Obteder todos los usuarios
  @Get('admin/all-users')
  /* @Roles('ADMIN') // Solo los administradores pueden acceder a esta ruta
  @UseGuards(RolesGuard) // Usamos el guardia para proteger la ruta */
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Editar usuario
  @Put('profile/:userId')
  @UseInterceptors(CustomFileInterceptor('profileImage'))
  async updateProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateUserDto.profileImage = file.filename;
    }
    return this.usersService.update(userId, updateUserDto);
  }

  // Ruta para cambiar el rol de un usuario (solo accesible por administradores)
  @Patch('admin/:userId/role')
  /*  @Roles('ADMIN') // Solo los administradores pueden cambiar roles
  @UseGuards(RolesGuard) */
  async changeUserRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() changeRoleDto: ChangeRoleDto, // Se espera un role como BODY
  ) {
    console.log('Incoming request:', { userId, role: changeRoleDto.role });
    try {
      const { role } = changeRoleDto; // Desestructurar role del DTO
      const result = await this.usersService.updateUserRole(userId, role);
      console.log('Role change successful:', result);
      return result;
    } catch (error) {
      console.log(error);
      console.error('Role change error:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Cargar imagen de perfil
  @Post('/profile/:userId/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/modules/uploads', // Directorio donde se almacenan las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9); // Generar un nombre único
          const ext = extname(file.originalname); // Extensión del archivo (.jpg, .png, etc.)
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 2 }, // Límite de tamaño de archivo: 2MB
    }),
  )
  async uploadProfileImage(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    // Ruta relativa del archivo cargado
    const filePath = `modules/uploads/${file.filename}`;

    // Delegar la lógica al servicio
    const updatedUser = await this.usersService.updateProfileImage(
      userId,
      filePath,
    );

    return {
      message: 'Imagen de perfil actualizada exitosamente',
      profileImage: filePath,
      user: updatedUser,
    };
  }

  // Endpoint para eliminar un usuario por ID
  @Delete('delete/:userId')
  @HttpCode(HttpStatus.OK)
  async removeUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.usersService.remove(userId);
      res.status(HttpStatus.OK).json({
        message: `User with ID ${userId} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error in removeUser controller:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `An error occurred while trying to delete user with ID ${userId}. Please try again.`,
      });
    }
  }
}
