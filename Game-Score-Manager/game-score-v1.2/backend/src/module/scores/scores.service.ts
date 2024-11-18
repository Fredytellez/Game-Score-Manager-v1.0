import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score, ScoreDocument } from './schemas/score.schemas';
import { UsersService } from '../users/users.service';
import { CreateScoreDto } from './dto/create.score.dot';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<ScoreDocument>,
    private userService: UsersService,
  ) {}

  // crear puntuacion
  async create(createScoreDto: CreateScoreDto) {
    // Verifica que el jugador existye antes de crear la puntuacion
    await this.userService.findById(createScoreDto.userId);

    const createdScore = new this.scoreModel(createScoreDto);
    return createdScore.save();
  }

  // busca todas las puntuaciones
  async findAll() {
    // exec() convierte la consulta en una promesa
    return this.scoreModel.find().exec();
  }

  // busca puntuacion por id del usuario
  async findByUser(userId: number) {
    // Verifica que el jugador existe
    await this.userService.findById(userId);
    // lo busca en la base de datos
    return this.scoreModel.find({ userId }).exec();
  }

  // genera un ranking de las mejores 10 puntuaciones por usuario
  async getUserTopScores(userId: number, limit: number = 10) {
    // verifica que el jugador existe
    await this.userService.findById(userId);

    return this.scoreModel
      .find({ userId })
      .sort({ scores: -1 })
      .limit(limit)
      .exec();
  }

  // genera un ranking de las mejores 10 puntuaciones generales
  async getGlobalTopScores(limit: number = 10) {
    return this.scoreModel.find().sort({ scores: -1 }).limit(limit).exec();
  }
}
