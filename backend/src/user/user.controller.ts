import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateExternalProviderDto } from './dto';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/types';
import { RolesGuard } from 'src/common/guards';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('external-provider')
  @HttpCode(HttpStatus.CREATED)
  createExternalProvider(@Body() dto: CreateExternalProviderDto) {
    return this.userService.createExternalProvider(dto);
  }
}
