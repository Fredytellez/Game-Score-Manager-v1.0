import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client'; // Importa el enum Role de Prisma

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    const { user } = context.switchToHttp().getRequest(); // Obtenemos el usuario autenticado
    console.log('Current user role:', user?.role);

    if (!requiredRoles) return true;
    return requiredRoles.includes(user.role); // Verificamos si el rol del usuario está permitido
  }
}
