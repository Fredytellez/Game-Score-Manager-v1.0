import { IsNumber, Min } from 'class-validator';

export class CreateScoreDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(0)
  score: number;
}
