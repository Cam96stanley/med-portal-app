import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDiagnosisDto {
  @IsNotEmpty()
  @IsString()
  diagnosisName: string;

  @IsNotEmpty()
  @IsString()
  diagnosisCode: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsUUID()
  externalProviderId?: string;
}
