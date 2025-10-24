import { SetMetadata } from '@nestjs/common';
import { RoleProvider } from '../../entities/enum';

export const PROVIDER_ROLES_KEY = 'provider_roles';

export const ProviderRoles = (...roles: RoleProvider[]) =>
  SetMetadata(PROVIDER_ROLES_KEY, roles);