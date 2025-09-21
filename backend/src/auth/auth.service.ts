import {
  AdminInitiateAuthCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  ListUsersCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto, AuthSignupDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private client: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.client = new CognitoIdentityProviderClient({
      region: this.config.get<string>('AWS_REGION')!,
    });
    this.userPoolId = this.config.get<string>('COGNITO_USER_POOL_ID')!;
    this.clientId = this.config.get<string>('COGNITO_CLIENT_ID')!;
  }

  async signup(dto: AuthSignupDto) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: dto.email,
      Password: dto.password,
      UserAttributes: [
        { Name: 'email', Value: dto.email },
        { Name: 'name', Value: dto.name },
      ],
    });

    await this.client.send(command);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });

    return newUser;
  }

  async resendConfirmationCode(email: string) {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      Username: email,
    });
    return this.client.send(command);
  }

  async confirmSignup(email: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
    });

    return this.client.send(command);
  }

  async login(dto: AuthLoginDto) {
    const listUsersCommand = new ListUsersCommand({
      UserPoolId: this.userPoolId,
      Filter: `email = "${dto.email}"`,
    });

    const users = await this.client.send(listUsersCommand);
    if (!users.Users?.length)
      throw new UnauthorizedException('Invalid credentials');
    const username = users.Users[0].Username!;

    const command = new AdminInitiateAuthCommand({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: dto.password,
      },
    });

    try {
      const response = await this.client.send(command);

      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      return {
        user,
        tokens: response.AuthenticationResult,
      };
    } catch {
      throw new UnauthorizedException('Invalide credentials');
    }
  }

  async signout(accessToken: string) {
    try {
      const command = new GlobalSignOutCommand({
        AccessToken: accessToken,
      });
      await this.client.send(command);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'NotAuthorizedException') {
          throw new UnauthorizedException('Access token is invalid or revoked');
        }
        throw new Error(err.message);
      }
      throw new Error('Unknown error during signout');
    }
  }
}
