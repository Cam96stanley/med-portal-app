import { Body, Controller } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { DiagnosisService } from 'src/diagnosis/diagnosis.service';
import { CreateDiagnosisDto } from 'src/diagnosis/dto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

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
