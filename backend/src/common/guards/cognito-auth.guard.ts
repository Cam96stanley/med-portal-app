import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

interface JwkRsaKey {
  kid: string;
  kty: 'RSA';
  n: string;
  e: string;
  [key: string]: any;
}

interface CognitoJwtPayload extends JwtPayload {
  sub: string;
  email?: string;
  [key: string]: any;
}

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private pems: Record<string, string> = {};

  constructor(private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    interface AuthenticatedRequest {
      headers: { authorization?: string };
      user?: JwtPayload;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;
    const token =
      typeof authHeader === 'string'
        ? authHeader.replace('Bearer ', '').trim()
        : undefined;

    if (!token) throw new UnauthorizedException('Missing token');

    if (Object.keys(this.pems).length === 0) {
      const userPoolId = this.config.get<string>('COGNITO_USER_POOL_ID');
      const region = this.config.get<string>('AWS_REGION');
      const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

      const { data } = await axios.get<{ keys: JwkRsaKey[] }>(url);
      data.keys.forEach((key) => {
        if (key.kty === 'RSA') {
          if (typeof jwkToPem === 'function') {
            try {
              this.pems[key.kid] = (jwkToPem as (key: JwkRsaKey) => string)(
                key,
              );
            } catch {
              throw new UnauthorizedException('Failed to convert JWK to PEM');
            }
          } else {
            throw new UnauthorizedException('jwkToPem is not a function');
          }
        }
      });
    }

    const decodedJwt = jwt.decode(token, { complete: true });
    if (
      !decodedJwt ||
      typeof decodedJwt !== 'object' ||
      !('header' in decodedJwt) ||
      typeof decodedJwt.header !== 'object' ||
      !('kid' in decodedJwt.header)
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    const pem = this.pems[(decodedJwt.header as { kid: string }).kid];
    if (!pem) throw new UnauthorizedException('Invalid token');

    try {
      const payload = jwt.verify(token, pem) as CognitoJwtPayload;
      request.user = { ...payload, accessToken: token };
      return true;
    } catch {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
