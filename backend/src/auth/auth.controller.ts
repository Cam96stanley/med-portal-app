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
import { CognitoAuthGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthSignupDto) {
    return this.authService.signup(dto);
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
