// src/commands/seed.command.ts

import { Command, CommandRunner, Option } from 'nest-commander';
import { UserSeeder } from '../seeders/user.seeder';

@Command({ name: 'seed-users', description: 'Seed users into database' })
export class SeedUsersCommand extends CommandRunner {
  constructor(private readonly userSeeder: UserSeeder) {
    super();
  }

  @Option({
    flags: '-q, --quantity <number>',
    description: 'Number of users to create',
    defaultValue: 100,
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  async run(
    passedParams: string[],
    options?: { quantity: number },
  ): Promise<void> {
    const quantity = options?.quantity || 100;
    console.log(`Iniciando seeding de ${quantity} usuarios...`);

    const startTime = Date.now();
    const result = await this.userSeeder.seed(quantity);
    const endTime = Date.now();

    console.log('\nResultados del seeding:');
    console.log(`Tiempo total: ${(endTime - startTime) / 1000} segundos`);
    console.log(`Usuarios creados exitosamente: ${result.success}`);
    console.log(`Usuarios fallidos: ${result.failed}`);

    if (result.failed > 0) {
      console.log('\nErrores encontrados:');
      result.errors.forEach((error) => {
        console.log(`Usuario ${error.index + 1}: ${error.error}`);
      });
    }
  }
}
