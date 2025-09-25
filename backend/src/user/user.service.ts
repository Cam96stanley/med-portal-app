import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExternalProviderDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createExternalProvider(dto: CreateExternalProviderDto) {
    const externalProvider = await this.prisma.externalProvider.create({
      data: {
        name: dto.name,
        facility: dto.facility,
        officeNumber: dto.officeNumber,
      },
    });

    return externalProvider;
  }
}
