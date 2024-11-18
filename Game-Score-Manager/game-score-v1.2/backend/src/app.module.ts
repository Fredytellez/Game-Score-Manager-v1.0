import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ScoresModule } from './module/scores/scores.module';
import { UsersModule } from './module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './module/users/config/multer.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ScoresModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // En producción, usar variables de entorno
      signOptions: { expiresIn: '1h' },
    }),
    MulterModule.register(multerConfig),
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Conexión con MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI),
    // Módulo de Prisma
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
