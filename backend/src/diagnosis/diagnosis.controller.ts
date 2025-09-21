import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, Roles } from 'src/common/decorators';
import { DiagnosisService } from 'src/diagnosis/diagnosis.service';
import { CreateDiagnosisDto } from 'src/diagnosis/dto';
import { Role } from 'src/common/types';
import { RolesGuard } from 'src/common/guards';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Roles(Role.PROVIDER)
  @UseGuards(RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createDiagnosis(
    @GetCurrentUser('sub') providerId: string,
    @Body() dto: CreateDiagnosisDto,
  ) {
    return this.diagnosisService.createDiagnosis(providerId, dto);
  }

  getAllDiagnoses() {}

  getDiagnosis() {}

  updateDiagnosis() {}
}
