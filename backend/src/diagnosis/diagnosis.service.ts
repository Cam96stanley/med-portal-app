import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from 'src/diagnosis/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiagnosisService {
  constructor(private prisma: PrismaService) {}

  async createDiagnosis(providerId: string, dto: CreateDiagnosisDto) {
    const provider = await this.prisma.user.findUnique({
      where: { cognitoSub: providerId },
    });

    if (!provider) {
      throw new Error('User not found');
    }

    const newDiagnosis = await this.prisma.diagnosis.create({
      data: {
        provider: { connect: { id: provider.id } },
        patient: { connect: { id: dto.patientId } },
        ...(dto.externalProviderId && {
          externalProvider: { connect: { id: dto.externalProviderId } },
        }),
        diagnosisName: dto.diagnosisName,
        diagnosisCode: dto.diagnosisCode,
        notes: dto.notes,
      },
    });

    return newDiagnosis;
  }
}
