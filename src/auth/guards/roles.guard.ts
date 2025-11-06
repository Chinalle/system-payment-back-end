import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PROVIDER_ROLES_KEY } from '../decorators/provider-roles.decorator';
import { Role, RoleProvider } from '../../entities/enum';
import { CompanyService } from '../../companies/company.service';
import { CompanyMemberService } from '../../companies/members.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly companyMemberService: CompanyMemberService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    if (!user) {
      return false;
    }

    const requiredMainRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredMainRoles) {
      if (!requiredMainRoles.some((role) => user.role === role)) {
        throw new ForbiddenException('You do not have the required role.');
      }
    }

    const requiredProviderRoles =
      this.reflector.getAllAndOverride<RoleProvider[]>(PROVIDER_ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!requiredProviderRoles) {
      return true;
    }

    const companyId = request.headers['x-company-id'];
    if (!companyId) {
      throw new ForbiddenException(
        'Company context (companyId) is required for this action.',
      );
    }

    const companyMember = await this.companyMemberService.findCompanyMember(
      user.id,
      companyId,
    );

    if (!companyMember) {
      throw new ForbiddenException('You are not a member of this company.');
    }

    const hasProviderRole = requiredProviderRoles.some(
      (role) => companyMember.providerRole === role,
    );

    if (!hasProviderRole) {
      throw new ForbiddenException(
        'You do not have the required permission within this company.',
      );
    }

    return true;
  }
}