import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async createScore(userId: number, score: number, game: string) {
    try {
      // Verificar si el usuario existe
      const user = await this.prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        // Log de error cuando no se encuentra al usuario
        console.error(`Usuario con ID ${userId} no encontrado`);
        throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
      }

      // Crear una nueva puntuación
      const newScore = await this.prisma.score.create({
        data: {
          score: score,
          game: game,
          userId: userId,
        },
      });

      console.log(
        `Puntuación de ${score} para el usuario con ID ${userId} en el juego ${game} creada correctamente`,
      );
      return newScore;
    } catch (error) {
      // Log de error si algo falla
      console.error(
        `Error al crear la puntuación para el usuario ${userId} en el juego ${game}:`,
        error,
      );

      // Lanza un error con mensaje interno y el error real
      throw new InternalServerErrorException('Error al crear la puntuación');
    }
  }

  async getScoresByUser(userId: number) {
    try {
      // Obtener las puntuaciones de un usuario
      const scores = await this.prisma.score.findMany({
        where: { userId: userId },
      });

      if (!scores || scores.length === 0) {
        console.error(
          `No se encontraron puntuaciones para el usuario con ID ${userId}`,
        );
      }

      return scores;
    } catch (error) {
      // Log de error si falla la búsqueda de puntuaciones
      console.error(
        `Error al obtener las puntuaciones para el usuario con ID ${userId}:`,
        error,
      );

      // Lanza un error con mensaje interno
      throw new InternalServerErrorException(
        'Error al obtener las puntuaciones',
      );
    }
  }
}
