import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosisDto } from 'src/diagnosis/dto/create-diagnosis.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateDiagnosisDto extends PartialType(CreateDiagnosisDto) {}
