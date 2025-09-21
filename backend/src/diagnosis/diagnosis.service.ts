import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from 'src/diagnosis/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiagnosisService {
  constructor(private prisma: PrismaService) {}

  async createDiagnosis(providerId: string, dto: CreateDiagnosisDto) {
    const newDiagnosis = await this.prisma.diagnosis.create({
      data: {
        provider: { connect: { id: providerId } },
        patient: { connect: { id: dto.patientId } },
        externalProvider: dto.externalProviderId
          ? { connect: { id: dto.externalProviderId } }
          : undefined,
        diagnosisName: dto.diagnosisName,
        diagnosisCode: dto.diagnosisCode,
        notes: dto.notes,
      },
    });

    return newDiagnosis;
  }
}
