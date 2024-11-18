// src/seeders/user.seeder.ts

import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { AuthService } from 'src/module/auth/auth.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly authService: AuthService) {}

  async seed(quantity: number = 100) {
    const users = [];
    const errors = [];

    // Crear un admin primero
    try {
      const adminUser = {
        username: 'admin',
        email: 'admin@example.com',
        password: 'Admin123!',
        role: Role.ADMIN,
        isActive: true,
        profileImage: faker.image.avatar(),
      };

      const admin = await this.authService.register(adminUser);
      users.push(admin);
      console.log('Admin usuario creado:', adminUser.email);
    } catch (error) {
      console.error('Error creando admin:', error.message);
    }

    // Crear usuarios regulares
    for (let i = 0; i < quantity - 1; i++) {
      try {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const userData = {
          username: faker.internet.userName({ firstName, lastName }),
          email: faker.internet.email({ firstName, lastName }),
          password: faker.internet.password({ length: 12, memorable: true }),
          role: Role.PLAYER,
          isActive: faker.datatype.boolean({ probability: 0.9 }), // 90% activos
          profileImage: faker.image.avatar(),
        };

        const user = await this.authService.register(userData);
        users.push(user);

        // Log progress
        console.log(`Usuario ${i + 1}/${quantity} creado:`, userData.email);
      } catch (error) {
        errors.push({
          index: i,
          error: error.message,
        });
        console.error(`Error creando usuario ${i + 1}:`, error.message);
      }

      // Pequeña pausa para no sobrecargar la BD
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return {
      success: users.length,
      failed: errors.length,
      errors,
      users,
    };
  }

  // Método útil para generar contraseñas que cumplan requisitos específicos
  private generateStrongPassword(): string {
    return faker.internet.password({
      length: 12,
      memorable: true,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    });
  }
}
