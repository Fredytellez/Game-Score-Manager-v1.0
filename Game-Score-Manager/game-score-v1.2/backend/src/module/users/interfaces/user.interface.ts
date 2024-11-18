import { Role } from '@prisma/client';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  profileImage?: string;
  role: Role;
}
