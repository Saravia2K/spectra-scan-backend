import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { TestQuestionModule } from './modules/test-question/test-question.module';
import { PatientTestAnswerModule } from './modules/patient-test-answer/patient-test-answer.module';

@Module({
  imports: [TestQuestionModule, PatientTestAnswerModule],
  controllers: [TestController],
  providers: [TestService, PrismaService],
  exports: [TestService],
})
export class TestModule {}
