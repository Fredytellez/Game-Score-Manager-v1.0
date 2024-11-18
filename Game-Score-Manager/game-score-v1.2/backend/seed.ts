// src/seed.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserSeeder } from "./seeders/user.seeder";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(UserSeeder);

  try {
    // Obtener argumentos de la línea de comandos
    const args = process.argv.slice(2);
    const quantityIndex = args.indexOf("-q");
    const quantity =
      quantityIndex !== -1 ? parseInt(args[quantityIndex + 1]) : 100;

    console.log(`Iniciando seeding de ${quantity} usuarios...`);
    const result = await seeder.seed(quantity);

    console.log("\nResultados del seeding:");
    console.log(`Usuarios creados exitosamente: ${result.success}`);
    console.log(`Usuarios fallidos: ${result.failed}`);
  } catch (error) {
    console.error("Error durante el seeding:", error);
  } finally {
    await app.close();
  }
}

bootstrap();
