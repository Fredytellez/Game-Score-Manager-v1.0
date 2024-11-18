import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        postgres: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  // Metodo que inicializa las conexiones
  async onModuleInit() {
    // conecta a PostgreSQL
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
