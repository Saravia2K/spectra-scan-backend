import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { TestQuestionModule } from './modules/test-question/test-question.module';

@Module({
  imports: [TestQuestionModule],
  controllers: [TestController],
  providers: [TestService, PrismaService],
  exports: [TestService],
})
export class TestModule {}
