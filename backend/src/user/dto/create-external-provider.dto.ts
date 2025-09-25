import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExternalProviderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  facility: string;

  @IsOptional()
  @IsString()
  officeNumber: string;
}
