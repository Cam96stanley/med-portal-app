import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, Roles } from 'src/common/decorators';
import { DiagnosisService } from 'src/diagnosis/diagnosis.service';
import { CreateDiagnosisDto, UpdateDiagnosisDto } from 'src/diagnosis/dto';
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

  @Roles(Role.PROVIDER)
  @UseGuards(RolesGuard)
  @Patch('/:diagnosisId')
  updateDiagnosis(
    @Param('diagnosisId') diagnosisId: string,
    @Body() dto: UpdateDiagnosisDto,
  ) {
    return this.diagnosisService.updateDiagnosis(diagnosisId, dto);
  }

  @Get('my-patients')
  getAllProviderPatients(@GetCurrentUser('sub') providerId: string) {
    return this.diagnosisService.getAllProviderPatients(providerId);
  }
}
