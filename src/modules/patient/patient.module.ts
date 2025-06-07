import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientService],
})
export class PatientModule {}
