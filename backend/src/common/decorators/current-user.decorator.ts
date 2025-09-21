import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

export type CognitoUser = JwtPayload & {
  sub: string;
  email?: string;
  [key: string]: any;
};

export const GetCurrentUser = createParamDecorator(
  (property: string | undefined, context: ExecutionContext): unknown => {
    const request = context.switchToHttp().getRequest<{ user?: CognitoUser }>();
    const user = request.user;

    if (!user) return null;

    return property ? user[property as keyof CognitoUser] : user;
  },
);
