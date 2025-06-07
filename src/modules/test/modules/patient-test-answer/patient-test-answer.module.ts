import { Module } from '@nestjs/common';
import { PatientTestAnswerController } from './patient-test-answer.controller';
import { PatientTestAnswerService } from './patient-test-answer.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';

@Module({
  controllers: [PatientTestAnswerController],
  providers: [PatientTestAnswerService, PrismaService],
  exports: [PatientTestAnswerService],
})
export class PatientTestAnswerModule {}
