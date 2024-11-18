import { SetMetadata } from '@nestjs/common';

// Decorador para agregar roles a las rutas
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
