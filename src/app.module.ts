import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './modules/doctors/doctor.module';
import { TestModule } from './modules/test/test.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [DoctorModule, TestModule, PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
