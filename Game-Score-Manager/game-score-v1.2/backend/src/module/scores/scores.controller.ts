import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create.score.dot';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  // Obtiene todos los pundajes del usuario
  @Get('scores/:userId')
  findByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.scoresService.findByUser(userId);
  }

  // Obtiene un ranking de los mejores puntajes
  @Get('scores/leaderboard')
  getGlobalTopScores(@Query('limit', ParseIntPipe) limit: number = 10) {
    return this.scoresService.getGlobalTopScores(limit);
  }

  // Obtiene el ranking de los jugadores con mejor puntaje
  @Get('player/leaderboard/:userId')
  getPlayerTopScores(
    @Param('id', ParseIntPipe) playerId: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.scoresService.getUserTopScores(playerId, limit);
  }
}
