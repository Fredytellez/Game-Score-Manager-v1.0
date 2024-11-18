import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
/* import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards'; */
import { UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CustomFileInterceptor } from './interceptors/file-upload.interceptors';
import { Response } from 'express';

@Controller('users')
/* @UseGuards(JwtAuthGuard) */
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener usuario por id
  @Get('profile/:userId')
  async getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findById(userId);
  }

  // Obtener la imagen de perfil
  @Get('profile/image/:userId')
  async getProfileImage(
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findById(userId);
    if (!user.profileImage) {
      return null;
    }

    const file = createReadStream(
      join(process.cwd(), 'uploads/profiles', user.profileImage),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; filename="${user.profileImage}"`,
    });
    console.log(user, file);
    return new StreamableFile(file);
  }

  //Obteder todos los usuarios
  @Get('admin/all-users')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Obtiene el puntaje del usuario
  /* @Get('scores/:userId')
  async getScores(@Param('userId') userId: number) {
    return this.usersService.getUserScore(userId);
  } */

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
}
