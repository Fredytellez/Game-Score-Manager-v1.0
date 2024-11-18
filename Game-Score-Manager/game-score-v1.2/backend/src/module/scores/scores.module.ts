import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schemas/score.schemas';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    UsersModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService, PrismaService],
})
export class ScoresModule {}
