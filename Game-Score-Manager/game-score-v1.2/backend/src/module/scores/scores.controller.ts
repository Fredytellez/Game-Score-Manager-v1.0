import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  InternalServerErrorException,
  Body,
  Post,
} from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  // Ruta para crear una puntuación
  @Post('user/:userId')
  async createScore(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('score') score: number,
    @Body('game') game: string,
  ) {
    try {
      // Llamar al servicio para crear la puntuación
      return await this.scoresService.createScore(userId, score, game);
    } catch (error) {
      // Manejo de error y respuesta apropiada
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Error al crear la puntuación');
      }
    }
  }

  // Ruta para obtener las puntuaciones de un usuario
  @Get('user/:userId')
  async getScoresByUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      // Llamar al servicio para obtener las puntuaciones
      return await this.scoresService.getScoresByUser(userId);
    } catch (error) {
      console.log(error);
      // Manejo de error y respuesta apropiada
      throw new InternalServerErrorException(
        'Error al obtener las puntuaciones',
      );
    }
  }
}
