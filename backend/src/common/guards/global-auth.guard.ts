import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators';
import { CognitoAuthGuard } from 'src/common/guards/cognito-auth.guard';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cognitoAuthGuard: CognitoAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return this.cognitoAuthGuard.canActivate(context);
  }
}
