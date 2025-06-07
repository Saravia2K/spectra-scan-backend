import { Module } from '@nestjs/common';
import { TestQuestionController } from './test-question.controller';
import { TestQuestionService } from './test-question.service';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';

@Module({
  controllers: [TestQuestionController],
  providers: [TestQuestionService, PrismaService],
  exports: [TestQuestionService],
})
export class TestQuestionModule {}
