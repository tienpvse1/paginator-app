import { SetMetadata } from '@nestjs/common';

// role as a number that can use to express the priority level
// higher level mean higher priority
export enum Role {
  USER = 1,
  MANAGER = 2,
  ADMIN = 3,
}

export const ROLE_KEY = 'role';
export const HasRoles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
