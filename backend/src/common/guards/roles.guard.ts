import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'jsonwebtoken';

export type CognitoUser = JwtPayload & {
  sub: string;
  email?: string;
  'cognito:groups'?: string[];
  [key: string]: any;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<{ user?: CognitoUser }>();
    const user = request.user;

    if (!user) throw new ForbiddenException('No user found');

    const userGroups = user['cognito:groups'] || [];

    const hasRole = requiredRoles.some((role) => userGroups.includes(role));

    if (!hasRole)
      throw new ForbiddenException(
        'You do not hav permission to access this route',
      );

    return true;
  }
}
