import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScoreDocument = Score & Document;

// esquema de Mongoose para MongoDB 
@Schema()
export class Score {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  score: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
