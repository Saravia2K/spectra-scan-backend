import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { DoctorController } from './doctor.controller';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  exports: [DoctorService],
})
export class DoctorModule {}
