import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from 'src/auth/dto';
import { CognitoAuthGuard, RolesGuard } from 'src/common/guards';
import { GetCurrentUser, Public, Roles } from 'src/common/decorators';
import { Role } from '../common/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup-patient')
  @HttpCode(HttpStatus.CREATED)
  async signupPatient(@Body() dto: AuthSignupDto) {
    return this.authService.signupPatient(dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('signup-provider')
  @HttpCode(HttpStatus.CREATED)
  async signupProvider(@Body() dto: AuthSignupDto) {
    return this.authService.signupProvider(dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('signup-admin')
  @HttpCode(HttpStatus.CREATED)
  async signupAdmin(@Body() dto: AuthSignupDto) {
    return this.authService.signupAdmin(dto);
  }

  @Public()
  @Post('resend-confirmation')
  @HttpCode(HttpStatus.OK)
  resendConfirmation(@Body() email: string) {
    return this.authService.resendConfirmationCode(email);
  }

  @Public()
  @Post('confirm-signup')
  @HttpCode(HttpStatus.OK)
  confirmSignup(@Body() body: { email: string; code: string }) {
    return this.authService.confirmSignup(body.email, body.code);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(CognitoAuthGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUser('accessToken') accessToken: string) {
    return this.authService.signout(accessToken);
  }
}
