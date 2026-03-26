import { SetMetadata } from '@nestjs/common';

// This decorator attaches roles metadata to route handlers
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);