import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API para mi proyecto')
    .setVersion('1.0')
    /* .addBearerAuth() */
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.useGlobalPipes(new ValidationPipe());
  // Guarda el archivo en formato JSON
  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  // Configuracion del CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Tu URL de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.enableVersioning().setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
