import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class ChangeRoleDto {
  @IsEnum(Role) // Validamos que el role esté dentro de los valores válidos del enum Role
  role: Role;
}
