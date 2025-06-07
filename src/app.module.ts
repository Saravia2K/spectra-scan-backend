import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './modules/doctors/doctor.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [DoctorModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
