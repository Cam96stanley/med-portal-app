import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto, UpdateDiagnosisDto } from 'src/diagnosis/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiagnosisService {
  constructor(private prisma: PrismaService) {}

  async createDiagnosis(providerId: string, dto: CreateDiagnosisDto) {
    const provider = await this.prisma.user.findUnique({
      where: { cognitoSub: providerId },
    });

    if (!provider) {
      throw new Error('Provider not found');
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

  async updateDiagnosis(diagnosisId: string, dto: UpdateDiagnosisDto) {
    const updateDiagnosis = await this.prisma.diagnosis.update({
      where: { id: diagnosisId },
      data: {
        ...dto,
      },
    });

    return updateDiagnosis;
  }

  async getAllProviderPatients(providerId: string) {
    const provider = await this.prisma.user.findUnique({
      where: { cognitoSub: providerId },
    });

    if (!provider) throw new Error('No provider found');

    const patients = await this.prisma.user.findMany({
      where: {
        role: 'PATIENT',
        diagnosesAsPatient: { some: { providerId: provider.id } },
      },
      select: {
        id: true,
        name: true,
        diagnosesAsPatient: {
          where: { providerId: provider.id },
          select: {
            diagnosisName: true,
            diagnosisCode: true,
            dateDiagnosed: true,
            notes: true,
            isActive: true,
          },
        },
      },
    });

    return patients;
  }
}
